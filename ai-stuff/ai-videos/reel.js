#!/usr/bin/env node
/* ============================================================
   SHOWREEL — 15s motion graphics piece
   1920x1080 @ 30fps, 2x subframe motion blur, 128 BPM score.
   Scenes cut on beats; camera shake driven by the kick envelope.
   Usage: node reel.js [all|render|audio|encode|frame <t>]
   ============================================================ */
const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// ---------- constants ----------
const W = 1920, H = 1080, FPS = 30, DUR = 15;
const N = FPS * DUR;               // 450 frames
const SCENE = DUR / 8;             // 1.875s per scene (4 beats)
const BEAT = 60 / 128;             // 0.46875s
const TAU = Math.PI * 2;

// ---------- palette ----------
const C = {
  ink: '#101014', paper: '#f2efe7',
  blue: '#4f7cff', magenta: '#ff3d81', orange: '#ff9f1c',
  mint: '#2ee6a8', purple: '#b04cff', white: '#ffffff',
};
const PAL = [C.blue, C.magenta, C.orange, C.mint, C.purple];

// ---------- math ----------
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const lerp = (a, b, t) => a + (b - a) * t;
const norm = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
const outExpo = t => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const inExpo = t => (t <= 0 ? 0 : Math.pow(2, 10 * (t - 1)));
const outBack = (t, s = 1.70158) => 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2);
const outQuart = t => 1 - Math.pow(1 - t, 4);
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const kickEnv = T => Math.exp(-(T % BEAT) * 14);

// ---------- fonts ----------
const F = (w, s) => `${w} ${s}px "Avenir Next","Helvetica Neue",Arial,sans-serif`;
const MONO = s => `700 ${s}px Menlo,Menlo-Regular,monospace`;

// ---------- text helper ----------
function txt(g, str, x, y, font, o = {}) {
  const { tracking = 0, fill = '#fff', alpha = 1, align = 'center' } = o;
  g.save();
  g.font = font; g.textBaseline = 'middle'; g.globalAlpha = alpha;
  if (!tracking) {
    g.textAlign = align; g.fillStyle = fill;
    g.fillText(str, x, y); g.restore(); return;
  }
  const chars = [...str], ws = chars.map(c => g.measureText(c).width);
  const total = ws.reduce((a, b) => a + b, 0) + tracking * (chars.length - 1);
  let cx = align === 'center' ? x - total / 2 : align === 'right' ? x - total : x;
  g.textAlign = 'left'; g.fillStyle = fill;
  chars.forEach((c, i) => { g.fillText(c, cx, y); cx += ws[i] + tracking; });
  g.restore();
}

// ---------- prerendered assets ----------
const VIGNETTE = (() => {
  const c = createCanvas(W, H), x = c.getContext('2d');
  const rg = x.createRadialGradient(W / 2, H / 2, H * 0.42, W / 2, H / 2, Math.hypot(W, H) / 2);
  rg.addColorStop(0, 'rgba(0,0,0,0)'); rg.addColorStop(1, 'rgba(0,0,0,0.46)');
  x.fillStyle = rg; x.fillRect(0, 0, W, H); return c;
})();
const GRAIN = (() => {
  const c = createCanvas(320, 180), x = c.getContext('2d');
  const id = x.createImageData(320, 180), r = mulberry32(99);
  for (let i = 0; i < id.data.length; i += 4) {
    const v = 70 + r() * 190 | 0;
    id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 255;
  }
  x.putImageData(id, 0, 0); return c;
})();
const SCAN = (() => {
  const c = createCanvas(W, H), x = c.getContext('2d');
  x.fillStyle = 'rgba(255,255,255,0.028)';
  for (let y = 0; y < H; y += 4) x.fillRect(0, y, W, 1);
  return c;
})();

// ---------- seeded props ----------
const R1 = mulberry32(1234);
const SPEEDLINES = Array.from({ length: 26 }, () => ({
  a: R1() * TAU, r0: 80 + R1() * 160, len: 180 + R1() * 420, w: 1.5 + R1() * 2.5,
}));
const R2 = mulberry32(4321);
const BURST = Array.from({ length: 70 }, () => ({
  a: R2() * TAU, spd: 260 + R2() * 900, r: 2 + R2() * 3.5, col: PAL[R2() * 5 | 0],
}));
const R3 = mulberry32(777);
const BUBBLES = Array.from({ length: 26 }, () => ({
  x: R3() * W, spd: 45 + R3() * 90, r: 2 + R3() * 3.5, off: R3() * (H + 200),
}));
const R4 = mulberry32(2024);
const RAILS_SPEED = Array.from({ length: 14 }, () => ({
  y: 80 + R4() * (H - 160), spd: 1400 + R4() * 1600, len: 90 + R4() * 260, al: 0.08 + R4() * 0.12, off: R4() * 2600,
}));

// ---------- corner tags ----------
const TAGS = [null, '01 — KINETIC TYPE', '02 — GEOMETRY', '03 — ORBIT',
  '04 — SPECS', '05 — FLUID', '06 — CHROMA', null];
function tag(g, i, color = 'rgba(255,255,255,0.6)') {
  if (!TAGS[i]) return;
  g.save(); g.fillStyle = color; g.globalAlpha = 0.9;
  g.fillRect(70, 58, 10, 10);
  txt(g, TAGS[i], 94, 64, MONO(21), { align: 'left', fill: color, alpha: 0.75 });
  g.restore();
}

// ============================================================
// SCENE 1 — cold open: dot, ripple, MOTION slam
// ============================================================
function s1(g, t) {
  g.fillStyle = '#05050a'; g.fillRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2;

  // expanding rings
  for (const [d, w0] of [[0.05, 4], [0.18, 2.5]]) {
    const p = norm(t, d, d + 0.55);
    if (p > 0 && p < 1) {
      g.beginPath(); g.arc(cx, cy, outExpo(p) * 560, 0, TAU);
      g.strokeStyle = `rgba(255,255,255,${(1 - p) * 0.7})`; g.lineWidth = w0 * (1 - p) + 0.5; g.stroke();
    }
  }
  // pulsing dot
  const dotR = 5 + 2.5 * Math.sin(t * 12);
  const halo = g.createRadialGradient(cx, cy, 0, cx, cy, 90);
  halo.addColorStop(0, 'rgba(120,160,255,0.5)'); halo.addColorStop(1, 'rgba(120,160,255,0)');
  g.fillStyle = halo; g.beginPath(); g.arc(cx, cy, 90, 0, TAU); g.fill();
  g.fillStyle = '#fff'; g.beginPath(); g.arc(cx, cy, dotR, 0, TAU); g.fill();

  // speed lines at impact
  const lp = norm(t, 0.30, 0.78);
  if (lp > 0 && lp < 1) {
    const e = outExpo(lp);
    for (const s of SPEEDLINES) {
      const r1 = s.r0 * e, r2 = (s.r0 + s.len) * e;
      g.beginPath();
      g.moveTo(cx + Math.cos(s.a) * r1, cy + Math.sin(s.a) * r1);
      g.lineTo(cx + Math.cos(s.a) * r2, cy + Math.sin(s.a) * r2);
      g.strokeStyle = `rgba(255,255,255,${(1 - lp) * 0.85})`; g.lineWidth = s.w; g.stroke();
    }
  }

  // MOTION slam
  const p = norm(t, 0.28, 0.60);
  if (p > 0) {
    const sc = lerp(3.2, 1, outBack(p));
    const a = norm(t, 0.28, 0.36);
    g.save(); g.translate(cx, cy); g.scale(sc, sc);
    txt(g, 'MOTION', 0, -10, F(800, 210), { fill: '#fff', alpha: a });
    g.restore();
  }
  // subtitle tracking in
  const sp = norm(t, 0.58, 0.95);
  if (sp > 0) {
    const tr = lerp(30, 11, outExpo(sp));
    txt(g, 'IS MY NATIVE LANGUAGE', cx, cy + 165, MONO(27), { tracking: tr, alpha: outExpo(sp) * 0.95 });
    const w = 700;
    g.strokeStyle = `rgba(255,255,255,${outExpo(sp) * 0.5})`; g.lineWidth = 2;
    g.beginPath();
    g.moveTo(cx - w / 2, cy + 165); g.lineTo(cx - w / 2 - 120, cy + 165);
    g.moveTo(cx + w / 2, cy + 165); g.lineTo(cx + w / 2 + 120, cy + 165);
    g.stroke();
  }
  // top label
  txt(g, 'A MOTION DESIGN SHOWREEL', cx, 120, MONO(23), { tracking: 9, alpha: outExpo(norm(t, 0.9, 1.2)) * 0.55 });

  // impact flash
  const fl = 1 - norm(t, 0.30, 0.48);
  if (fl > 0) { g.globalAlpha = fl * 0.85; g.fillStyle = '#fff'; g.fillRect(0, 0, W, H); g.globalAlpha = 1; }
}

// ============================================================
// SCENE 2 — kinetic typography
// ============================================================
function s2(g, t, p) {
  g.fillStyle = '#0a0a14'; g.fillRect(0, 0, W, H);
  // diagonal stripes
  g.save(); g.translate(W / 2, H / 2); g.rotate(-0.35);
  g.fillStyle = 'rgba(255,255,255,0.045)';
  const off = (t * 260) % 360;
  for (let x = -2200; x < 2200; x += 360) g.fillRect(x - off, -1600, 150, 3200);
  g.restore();

  const exits = [0, 1, 2].map(i => inExpo(norm(t, 1.55 + i * 0.06, 1.87)));
  const lines = [
    { s: 'I MAKE', x0: -500, d: [0.05, 0.50], y: H * 0.34 },
    { s: 'PIXELS', x0: W + 500, d: [0.18, 0.62], y: H * 0.53, grad: true },
    { s: 'MOVE.', y0: H * 0.97, d: [0.32, 0.72], y: H * 0.72, back: true },
  ];
  lines.forEach((L, i) => {
    const q = norm(t, L.d[0], L.d[1]);
    if (q <= 0) return;
    const e = L.back ? outBack(q) : outExpo(q);
    const x = L.x0 !== undefined ? lerp(L.x0, W / 2, e) : W / 2;
    const y = L.y0 !== undefined ? lerp(L.y0, L.y, e) : L.y;
    const a = norm(t, L.d[0], L.d[0] + 0.1) * (1 - exits[i]);
    g.save(); g.translate(0, -exits[i] * 560);
    if (L.grad) {
      const gr = g.createLinearGradient(W / 2 - 520, 0, W / 2 + 520, 0);
      gr.addColorStop(0, C.blue); gr.addColorStop(1, C.magenta);
      txt(g, L.s, x, y, F(800, 185), { fill: gr, alpha: a });
    } else {
      txt(g, L.s, x, y, F(800, 185), { fill: '#fff', alpha: a });
    }
    g.restore();
  });

  // marquee band
  const bp = norm(t, 0.1, 0.55);
  if (bp > 0) {
    const by = H * 0.885 + (1 - outExpo(bp)) * 140;
    g.save(); g.translate(0, by); g.rotate(-0.025);
    g.globalAlpha = bp * (1 - norm(t, 1.62, 1.85));
    g.fillStyle = C.orange; g.fillRect(-80, -37, W + 160, 74);
    g.fillStyle = '#14060a'; g.font = F(800, 40); g.textAlign = 'left'; g.textBaseline = 'middle';
    const word = 'SHOWREEL 2026  —  MOTION  —  ';
    const wW = g.measureText(word).width;
    const off = (t * 430) % wW;
    for (let x = -off - wW; x < W + wW; x += wW) g.fillText(word, x, 2);
    g.restore(); g.globalAlpha = 1;
  }
  tag(g, 1);
}

// ============================================================
// SCENE 3 — rotating square grid, wave + burst
// ============================================================
function s3(g, t, p) {
  const bgg = g.createLinearGradient(0, 0, 0, H);
  bgg.addColorStop(0, '#0b1026'); bgg.addColorStop(1, '#1c0b30');
  g.fillStyle = bgg; g.fillRect(0, 0, W, H);

  const cols = 12, rows = 7, cw = W / cols, ch = H / rows;
  const bp = norm(p, 0.80, 1.0), be = outExpo(bp);
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
    const x = (i + 0.5) * cw, y = (j + 0.5) * ch;
    const dist = Math.hypot(x - W / 2, y - H / 2);
    const wave = Math.sin(dist * 0.011 - t * 5.2);
    // center cells implode on burst
    let shrink = 1;
    if (bp > 0 && dist < 260) shrink = 1 - be * (1 - dist / 260);
    const sc = (0.55 + 0.45 * (wave * 0.5 + 0.5)) * shrink;
    if (sc < 0.02) continue;
    const col = PAL[(i * 5 + j * 3) % 5];
    g.save(); g.translate(x, y); g.rotate(wave * 0.9); g.scale(sc, sc);
    const sz = 78;
    if (wave > 0.55) { g.fillStyle = col; g.globalAlpha = 0.9; g.fillRect(-sz / 2, -sz / 2, sz, sz); }
    else { g.strokeStyle = col; g.globalAlpha = 0.36 + 0.4 * (wave * 0.5 + 0.5); g.lineWidth = 3; g.strokeRect(-sz / 2, -sz / 2, sz, sz); }
    g.restore(); g.globalAlpha = 1;
  }
  // particle burst
  if (bp > 0) {
    g.save(); g.globalCompositeOperation = 'lighter'; g.translate(W / 2, H / 2);
    for (const q of BURST) {
      const r = q.spd * be;
      g.beginPath(); g.arc(Math.cos(q.a) * r, Math.sin(q.a) * r, q.r * (1 - bp * 0.6), 0, TAU);
      g.fillStyle = q.col; g.globalAlpha = (1 - bp) * 0.95; g.fill();
    }
    g.restore(); g.globalAlpha = 1;
    const wp = 1 - norm(p, 0.8, 0.95);
    if (wp < 1) { g.globalAlpha = wp * 0.3; g.fillStyle = '#fff'; g.fillRect(0, 0, W, H); g.globalAlpha = 1; }
  }
  tag(g, 2);
}

// ============================================================
// SCENE 4 — orbital particles + PRECISION
// ============================================================
function s4(g, t, p) {
  g.fillStyle = '#05060e'; g.fillRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2;
  const enter = outBack(norm(t, 0, 0.45), 1.4);
  g.save(); g.translate(cx, cy); g.scale(lerp(0.3, 1, enter), lerp(0.3, 1, enter));

  // glow core
  const halo = g.createRadialGradient(0, 0, 0, 0, 0, 130);
  halo.addColorStop(0, 'rgba(90,140,255,0.55)'); halo.addColorStop(1, 'rgba(90,140,255,0)');
  g.fillStyle = halo; g.beginPath(); g.arc(0, 0, 130, 0, TAU); g.fill();

  g.globalCompositeOperation = 'lighter';
  for (let k = 0; k < 3; k++) {
    const rx = 280 + k * 95, ry = rx * (0.30 + 0.05 * k);
    const rot = -0.55 + k * 0.55 + 0.05 * Math.sin(t * 0.7 + k * 2);
    g.save(); g.rotate(rot);
    g.beginPath(); g.ellipse(0, 0, rx, ry, 0, 0, TAU);
    g.strokeStyle = 'rgba(130,170,255,0.16)'; g.lineWidth = 1.5; g.stroke();
    const n = 42, spd = 1.15 + 0.35 * k;
    for (let i = 0; i < n; i++) {
      const a = t * spd + i * TAU / n;
      const px = Math.cos(a) * rx, py = Math.sin(a) * ry;
      for (let m = 3; m >= 0; m--) {
        const aa = a - (m + 1) * 0.05 * Math.sign(spd);
        const gx = Math.cos(aa) * rx, gy = Math.sin(aa) * ry;
        g.beginPath(); g.arc(gx, gy, m === 0 ? (i % 6 === 0 ? 4 : 2.6) : 2.6 - m * 0.5, 0, TAU);
        g.fillStyle = (i % 6 === 0 && m === 0) ? C.magenta : '#9db8ff';
        g.globalAlpha = (m === 0 ? 1 : 0.32 / m) * enter;
        g.fill();
      }
    }
    g.restore();
  }
  g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1;
  // core dot
  g.fillStyle = '#fff'; g.beginPath(); g.arc(0, 0, 7, 0, TAU); g.fill();
  g.restore();

  // headline behind-ish (drawn on top, additive accents already drawn)
  const tp = norm(t, 0.30, 1.15);
  txt(g, 'PRECISION', cx, cy, F(800, 118), {
    tracking: lerp(42, 12, outExpo(tp)), alpha: outExpo(tp) * 0.96,
  });
  txt(g, 'IN EVERY FRAME', cx, cy + 112, MONO(28), { tracking: 9, alpha: outExpo(norm(t, 0.8, 1.3)) * 0.92, fill: '#dfe6ff' });
  tag(g, 3);
}

// ============================================================
// SCENE 5 — spec sheet count-ups (light scene)
// ============================================================
function s5(g, t, p) {
  g.fillStyle = C.paper; g.fillRect(0, 0, W, H);
  const rows = [
    { v: [60], fmt: v => `${Math.round(v[0])}`, label: 'FRAMES PER SECOND', bar: 0.40 },
    { v: [1920, 1080], fmt: v => `${Math.round(v[0])}×${Math.round(v[1])}`, label: 'PIXEL CANVAS', bar: 1.0 },
    { v: [15], fmt: v => `${Math.round(v[0])}`, label: 'SECONDS OF INTENT', bar: 0.24 },
  ];
  rows.forEach((r, i) => {
    const d = [0.08 + i * 0.22, 0.62 + i * 0.22];
    const q = norm(t, d[0], d[1]);
    if (q <= 0) return;
    const e = outExpo(q), y = 300 + i * 235;
    g.save();
    g.beginPath(); g.rect(0, y - 130, W * e + 2, 260); g.clip();
    txt(g, r.fmt(r.v.map(v => v * e)), 150, y - 30, F(800, 165), { align: 'left', fill: C.ink });
    g.restore();
    const la = norm(t, d[0] + 0.12, d[0] + 0.3);
    txt(g, r.label, 152, y + 88, MONO(27), { align: 'left', tracking: 7, fill: 'rgba(16,16,20,0.65)', alpha: la });
    g.fillStyle = C.orange;
    g.fillRect(150, y + 122, 1300 * e, 13);
  });
  // rotating asterisk
  const ap = norm(t, 0.42, 0.85);
  if (ap > 0) {
    const ax = W - 330, ay = 305, e = outBack(ap);
    g.save(); g.translate(ax, ay); g.rotate(t * 0.9); g.scale(e, e);
    g.strokeStyle = C.orange; g.lineWidth = 32; g.lineCap = 'round';
    for (let k = 0; k < 6; k++) {
      const a = k * TAU / 6;
      g.beginPath(); g.moveTo(Math.cos(a) * 46, Math.sin(a) * 46);
      g.lineTo(Math.cos(a) * 145, Math.sin(a) * 145); g.stroke();
    }
    g.restore();
  }
  tag(g, 4, 'rgba(16,16,20,0.55)');
}

// ============================================================
// SCENE 6 — organic fluid blob
// ============================================================
function blobPath(g, R, t, scale) {
  g.beginPath();
  const K = 72;
  for (let i = 0; i <= K; i++) {
    const th = i / K * TAU;
    const r = R * scale * (1
      + 0.16 * Math.sin(3 * th + t * 1.3)
      + 0.11 * Math.sin(5 * th - t * 1.9)
      + 0.07 * Math.sin(8 * th + t * 2.7));
    const x = Math.cos(th) * r, y = Math.sin(th) * r;
    i === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
  }
  g.closePath();
}
function s6(g, t, p) {
  const rg = g.createRadialGradient(W / 2, H / 2, 100, W / 2, H / 2, 900);
  rg.addColorStop(0, '#0a0d20'); rg.addColorStop(1, '#05060c');
  g.fillStyle = rg; g.fillRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2;

  // bubbles
  g.fillStyle = 'rgba(255,255,255,0.3)';
  for (const b of BUBBLES) {
    const y = (H + 100) - ((t * b.spd + b.off) % (H + 200));
    g.beginPath(); g.arc(b.x, y, b.r, 0, TAU); g.fill();
  }
  const e = outBack(norm(t, 0.05, 0.55), 1.3);
  g.save(); g.translate(cx, cy); g.rotate(t * 0.15);
  // halo
  const halo = g.createRadialGradient(0, 0, 100, 0, 0, 580);
  halo.addColorStop(0, 'rgba(255,61,129,0.20)'); halo.addColorStop(1, 'rgba(255,61,129,0)');
  g.fillStyle = halo; g.beginPath(); g.arc(0, 0, 580, 0, TAU); g.fill();
  // echo strokes
  for (const [sc, al] of [[1.30, 0.10], [1.14, 0.26]]) {
    blobPath(g, 305, t, e * sc);
    g.strokeStyle = `rgba(176,76,255,${al})`; g.lineWidth = 2; g.stroke();
  }
  // body
  blobPath(g, 305, t, e);
  const gr = g.createLinearGradient(-260, -260, 260, 260);
  gr.addColorStop(0, C.blue); gr.addColorStop(0.55, C.purple); gr.addColorStop(1, C.magenta);
  g.fillStyle = gr; g.fill();
  g.restore();

  // ripple rings
  const rp = (t * 0.55) % 1;
  g.beginPath(); g.arc(cx, cy, 300 + rp * 340, 0, TAU);
  g.strokeStyle = `rgba(255,255,255,${(1 - rp) * 0.12})`; g.lineWidth = 1.5; g.stroke();

  g.save(); g.translate(cx, cy); g.rotate(-0.04);
  txt(g, 'FLOW', 0, 6, F(800, 148), { tracking: 6, alpha: norm(t, 0.25, 0.5) });
  g.restore();
  tag(g, 5);
}

// ============================================================
// SCENE 7 — chromatic marquee SHOWREEL
// ============================================================
let S7_SIZE = 305;
function drawWord(g, x, y, fill, alpha) {
  txt(g, 'SHOWREEL', x, y, F(800, S7_SIZE), { fill, alpha });
}
function s7(g, t, p, T) {
  // fit word to 86% of frame width once
  if (S7_SIZE === 305) {
    g.font = F(800, 305);
    S7_SIZE = Math.min(305, 305 * (W * 0.86) / g.measureText('SHOWREEL').width);
  }
  g.fillStyle = '#060609'; g.fillRect(0, 0, W, H);
  g.drawImage(SCAN, 0, 0);
  // speed lines
  const slA = 1 - norm(t, 0.75, 1.05);
  if (slA > 0) {
    g.strokeStyle = `rgba(255,255,255,${slA})`; g.lineWidth = 2;
    for (const s of RAILS_SPEED) {
      const x = W + 300 - ((t * s.spd + s.off) % (W + 700));
      g.globalAlpha = s.al;
      g.beginPath(); g.moveTo(x, s.y); g.lineTo(x + s.len, s.y); g.stroke();
    }
    g.globalAlpha = 1;
  }
  // word position: fly in with overshoot, settle with wobble
  const fp = norm(t, 0, 0.62);
  let x = lerp(W + 560, W / 2, outBack(fp, 1.1));
  if (t > 0.62) x += Math.sin((t - 0.62) * 18) * 10 * Math.exp(-(t - 0.62) * 3.5);
  const y = H * 0.5 + 12;

  const dx = t < 0.55 ? 20 * (1 - norm(t, 0.08, 0.55)) : 2 + 2.5 * kickEnv(T);
  // glitch slices
  const gl = norm(t, 0.02, 0.5);
  if (gl < 1) {
    const seed = Math.floor(T * 24);
    const r = mulberry32(seed);
    for (let i = 0; i < 6; i++) {
      const sy = r() * H, sh = 18 + r() * 55, off = (r() - 0.5) * 110 * (1 - gl);
      g.save(); g.beginPath(); g.rect(0, sy, W, sh); g.clip();
      drawWord(g, x + off, y, '#fff', 0.9);
      g.restore();
    }
  }
  // chromatic trio
  g.save(); g.globalCompositeOperation = 'lighter';
  drawWord(g, x - dx, y, '#ff2040', 0.75);
  drawWord(g, x, y, '#22ff90', 0.75);
  drawWord(g, x + dx, y, '#3060ff', 0.75);
  g.restore();
  drawWord(g, x, y, '#fff', 0.92);

  // side rails
  for (const s of [1, -1]) {
    g.save(); g.translate(s === 1 ? 54 : W - 54, H / 2); g.rotate(s * -Math.PI / 2);
    txt(g, 'MOTION DESIGN — SHOWREEL 2026', 0, 0, MONO(20), { tracking: 8, alpha: 0.4 });
    g.restore();
  }
  tag(g, 6);
}

// ============================================================
// SCENE 8 — outro lockup + iris out
// ============================================================
function s8(g, t, p) {
  const gr = g.createLinearGradient(0, 0, W, H);
  gr.addColorStop(0, C.magenta); gr.addColorStop(1, C.orange);
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  const slam = lerp(1.22, 1, outExpo(norm(t, 0, 0.3)));
  g.save(); g.translate(W / 2, H / 2); g.scale(slam, slam); g.translate(-W / 2, -H / 2);

  // frame border
  g.strokeStyle = 'rgba(255,255,255,0.55)'; g.lineWidth = 2;
  g.strokeRect(52, 52, W - 104, H - 104);

  // arc logo
  const la = t * 1.3 - 0.6;
  g.beginPath(); g.arc(W / 2, H * 0.33, 100, la, la + TAU * 0.82);
  g.strokeStyle = '#fff'; g.lineWidth = 10; g.lineCap = 'round'; g.stroke();
  g.beginPath();
  g.arc(W / 2 + Math.cos(la + TAU * 0.82) * 100, H * 0.33 + Math.sin(la + TAU * 0.82) * 100, 14, 0, TAU);
  g.fillStyle = '#fff'; g.fill();

  // headline
  ['LET’S MAKE', 'IT MOVE.'].forEach((s, i) => {
    const q = norm(t, 0.22 + i * 0.1, 0.62 + i * 0.1);
    if (q <= 0) return;
    const e = outBack(q);
    txt(g, s, W / 2, H * 0.575 + i * 118 - (1 - e) * 160, F(800, 104), { alpha: norm(t, 0.22 + i * 0.1, 0.3 + i * 0.1) });
  });
  txt(g, 'OPEN FOR FREELANCE — 2026', W / 2, H * 0.845, MONO(24),
    { tracking: 8, alpha: outExpo(norm(t, 0.6, 0.95)) * 0.9 });
  g.restore();

  // iris to end card
  const ip = norm(p, 0.845, 1.0);
  if (ip > 0) {
    const r = inExpo(ip) * 1300;
    g.save(); g.beginPath(); g.arc(W / 2, H / 2, r, 0, TAU); g.clip();
    g.fillStyle = C.paper; g.fillRect(0, 0, W, H);
    const ea = norm(p, 0.96, 1.0);
    if (ea > 0) {
      g.fillStyle = C.ink;
      g.beginPath(); g.arc(W / 2, H / 2 - 20, 9 + 2.5 * Math.sin(t * 9), 0, TAU); g.fill();
      txt(g, 'fin.', W / 2, H / 2 + 70, MONO(26), { tracking: 12, fill: C.ink, alpha: ea });
    }
    g.restore();
  }
}
// ============================================================
// frame composition: camera + post
// ============================================================
function renderFrame(g, T) {
  const si = Math.min(7, Math.floor(T / SCENE));
  const cut = T < 0.06 ? 0 : Math.exp(-(T % SCENE) * 9);
  const k = kickEnv(T);
  const amp = 2.2 * k + 11 * cut;
  const jx = (Math.sin(T * 91.7) + Math.sin(T * 47.3)) * 0.5 * amp;
  const jy = (Math.sin(T * 83.1 + 2) + Math.sin(T * 53.7)) * 0.5 * amp;
  const rot = (Math.sin(T * 67) + Math.sin(T * 41 + 1)) * 0.5 * amp * 0.00045;
  const punch = 1.018 + 0.035 * cut + 0.008 * k;

  g.save();
  g.translate(W / 2 + jx, H / 2 + jy);
  g.rotate(rot);
  g.scale(punch, punch);
  g.translate(-W / 2, -H / 2);
  [s1, s2, s3, s4, s5, s6, s7, s8][si](g, T - si * SCENE, (T - si * SCENE) / SCENE, T);
  g.restore();

  if (cut > 0.01) { g.globalAlpha = Math.min(0.5, cut * 0.5); g.fillStyle = '#fff'; g.fillRect(0, 0, W, H); g.globalAlpha = 1; }
  g.drawImage(VIGNETTE, 0, 0);
  g.save();
  g.globalCompositeOperation = 'overlay'; g.globalAlpha = 0.075;
  g.imageSmoothingEnabled = false;
  const gx = -Math.floor(Math.random() * 320), gy = -Math.floor(Math.random() * 180);
  for (let x = gx; x < W; x += 320) for (let y = gy; y < H; y += 180) g.drawImage(GRAIN, x, y);
  g.restore();
  g.imageSmoothingEnabled = true;
}

// ============================================================
// audio — 128 BPM synthesized score
// ============================================================
function synthMusic(file) {
  const SR = 44100, n = SR * DUR;
  const L = new Float64Array(n), R = new Float64Array(n);
  const put = (t, len, fn) => {
    const i0 = Math.round(t * SR);
    for (let i = 0; i < len; i++) {
      const j = i0 + i; if (j < 0 || j >= n) continue;
      const v = fn(i / SR); L[j] += v; R[j] += v;
    }
  };
  const kick = (t, amp = 1) => put(t, Math.round(0.30 * SR), u => {
    const ph = TAU * (48 * u + 3.75 * (1 - Math.exp(-32 * u)));
    return amp * Math.exp(-u * 13) * 0.9 * Math.sin(ph);
  });
  const hat = (t, open, amp = 1) => { let prev = 0;
    put(t, Math.round((open ? 0.14 : 0.05) * SR), u => {
      const w = Math.random() * 2 - 1, h = w - prev; prev = w;
      return amp * Math.exp(-u * (open ? 22 : 70)) * h * 0.9;
    }); };
  const clap = (t, amp = 1) => put(t, Math.round(0.22 * SR), u => {
    let e = 0; for (const o of [0, 0.013, 0.026]) if (u >= o) e += Math.exp(-(u - o) * 38);
    return amp * e * 0.5 * (Math.random() * 2 - 1);
  });
  const bass = (t, f0, dur, amp = 1) => { let lp = 0;
    put(t, Math.round(dur * SR), u => {
      const saw = 2 * ((f0 * u) % 1) - 1;
      const cut = 170 + 520 * Math.exp(-u * 9);
      lp += (saw - lp) * Math.min(1, TAU * cut / SR);
      return amp * Math.min(1, u * 200) * Math.exp(-u * 2.5) * lp * 1.6;
    }); };
  const pluck = (t, f0, amp = 1) => put(t, Math.round(0.5 * SR), u => {
    const pph = (f0 * u) % 1, tri = pph < 0.5 ? 4 * pph - 1 : 3 - 4 * pph;
    return amp * Math.exp(-u * 6.5) * tri * 0.55;
  });
  const riser = (t0, dur, amp = 1) => put(t0, Math.round(dur * SR), u => {
    const q = u / dur; return amp * q * q * (Math.random() * 2 - 1) * 0.55;
  });
  const crash = (t, amp = 1) => { let prev = 0;
    put(t, Math.round(1.2 * SR), u => {
      const w = Math.random() * 2 - 1, h = w - prev; prev = w;
      return amp * Math.exp(-u * 3.2) * h * 0.8;
    }); };

  // drums: 4-on-the-floor
  for (let b = 0; b < 32; b++) {
    const tb = b * BEAT;
    if (!(tb > 7.02 && tb < 7.5)) kick(tb);
    if (b % 2 === 1) clap(tb);
    hat(tb + BEAT / 2, false, 0.28); hat(tb, false, 0.14);
    if (b % 4 === 3) hat(tb + BEAT / 2, true, 0.24);
  }
  // bass: 8ths, A A F G
  const roots = [55, 55, 43.65, 49.0], pat = [1, 0, 1, 2, 1, 0, 1, 2];
  for (let bar = 0; bar < 16; bar++) for (let e8 = 0; e8 < 8; e8++) {
    const t = bar * 4 * BEAT + e8 * BEAT / 2;
    const f = pat[e8] === 2 ? roots[bar % 4] * 2 : roots[bar % 4];
    const sc = 1 - 0.45 * Math.exp(-(t % BEAT) * 14);
    bass(t, f, BEAT * 0.48, 0.5 * sc);
  }
  // plucks: sparse pentatonic echoes from bar 2
  const pent = [440, 523.25, 587.33, 659.25, 783.99], pr = mulberry32(7);
  for (let e8 = 16; e8 < 64; e8++) if (pr() < 0.38) {
    const t = e8 * BEAT / 2;
    if (t > 7.0 && t < 7.6) continue;
    const f = pent[pr() * pent.length | 0];
    const sc = 1 - 0.4 * Math.exp(-(t % BEAT) * 14);
    pluck(t, f, 0.4 * sc); pluck(t + BEAT * 0.75, f, 0.16 * sc);
  }
  // transitions
  kick(0.02, 0.9); riser(6.56, 0.94);
  for (let s = 1; s < 8; s++) crash(s * SCENE, s === 4 ? 1.1 : 0.6);
  kick(7.5, 1.25);

  // master: normalize + soft clip
  let peak = 0;
  for (let i = 0; i < n; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
  const g0 = 0.95 / (peak || 1), D = 1.3, k0 = Math.tanh(D);
  const pcm = Buffer.alloc(44 + n * 4);
  pcm.write('RIFF', 0); pcm.writeUInt32LE(36 + n * 4, 4); pcm.write('WAVEfmt ', 8);
  pcm.writeUInt32LE(16, 16); pcm.writeUInt16LE(1, 20); pcm.writeUInt16LE(2, 22);
  pcm.writeUInt32LE(SR, 24); pcm.writeUInt32LE(SR * 4, 28); pcm.writeUInt16LE(4, 32);
  pcm.writeUInt16LE(16, 34); pcm.write('data', 36); pcm.writeUInt32LE(n * 4, 40);
  for (let i = 0; i < n; i++) {
    const l = Math.tanh(L[i] * g0 * D) / k0, r = Math.tanh(R[i] * g0 * D) / k0;
    pcm.writeInt16LE(clamp(l, -1, 1) * 32767 | 0, 44 + i * 4);
    pcm.writeInt16LE(clamp(r, -1, 1) * 32767 | 0, 44 + i * 4 + 2);
  }
  fs.writeFileSync(file, pcm);
}

// ============================================================
// pipeline
// ============================================================
function selfcheck() {
  console.assert(N === 450, 'frame count');
  for (const [name, f] of [['outExpo', outExpo], ['inExpo', inExpo], ['outQuart', outQuart]]) {
    console.assert(f(0) <= 0.001 && Math.abs(f(1) - 1) < 0.001, name + ' bounds');
  }
  console.assert(Math.abs(SCENE / BEAT - 4) < 1e-9, 'scene = 4 beats');
  console.assert(Math.abs(DUR / SCENE - 8) < 1e-9, '8 scenes');
  const c = createCanvas(10, 10); console.assert(c.getContext('2d'), 'canvas');
  console.log('selfcheck OK');
}

async function renderFrames(outDir, SUB = 2) {
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });
  const work = createCanvas(W, H), acc = createCanvas(W, H);
  const wg = work.getContext('2d'), ag = acc.getContext('2d');
  const t0 = Date.now();
  for (let f = 0; f < N; f++) {
    for (let s = 0; s < SUB; s++) {
      const T = (f + s / SUB) / FPS;
      wg.setTransform(1, 0, 0, 1, 0, 0);
      wg.globalCompositeOperation = 'source-over'; wg.globalAlpha = 1;
      wg.fillStyle = '#000'; wg.fillRect(0, 0, W, H);
      renderFrame(wg, T);
      ag.setTransform(1, 0, 0, 1, 0, 0);
      ag.globalAlpha = 1 / (s + 1);
      ag.drawImage(work, 0, 0);
    }
    ag.globalAlpha = 1;
    fs.writeFileSync(path.join(outDir, String(f).padStart(5, '0') + '.png'), acc.toBuffer('image/png'));
    if (f % 75 === 0) {
      const el = (Date.now() - t0) / 1000;
      console.log(`frame ${f}/${N}  (${el.toFixed(0)}s elapsed)`);
    }
  }
  console.log(`render done in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
}

function renderSingle(T, file) {
  const c = createCanvas(W, H), g = c.getContext('2d');
  g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
  renderFrame(g, T);
  fs.writeFileSync(file, c.toBuffer('image/png'));
  console.log('wrote', file);
}

function encode() {
  const { execFileSync } = require('child_process');
  execFileSync('ffmpeg', ['-y', '-framerate', String(FPS), '-i', 'frames/%05d.png',
    '-i', 'score.wav', '-c:v', 'libx264', '-preset', 'slow', '-crf', '17',
    '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-shortest',
    '-movflags', '+faststart', 'showreel.mp4'], { stdio: 'inherit' });
  console.log('encoded showreel.mp4');
}

// ---------- cli ----------
const cmd = process.argv[2] || 'all';
selfcheck();
if (cmd === 'frame') renderSingle(parseFloat(process.argv[3]), process.argv[4] || 'preview.png');
else if (cmd === 'render') renderFrames('frames', 2);
else if (cmd === 'audio') synthMusic('score.wav');
else if (cmd === 'encode') encode();
else if (cmd === 'all') { renderFrames('frames', 2); synthMusic('score.wav'); encode(); }
