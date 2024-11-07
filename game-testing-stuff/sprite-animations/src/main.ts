import "@unocss/reset/tailwind.css";
import "./styles.css";
import shadowDogSpriteSheet from "./assets/sprite-sheets/shadow_dog.png";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const canvas = document.querySelector("canvas")!;

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const ctx = canvas.getContext("2d")!;

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

const SPRITE_WIDTH = 575;
const SPRITE_HEIGHT = 523;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const player_image = new Image();
player_image.src = shadowDogSpriteSheet;

type SpriteState = {
	x_offset_index: number;
	y_offset_index: number;
	count: number;
};

const sprite = {
	WIDTH: 575,
	HEIGHT: 523,
	states: {
		idle: {
			x_offset_index: 0,
			y_offset_index: 0,
			count: 7,
		},
		jumping: {
			x_offset_index: 0,
			y_offset_index: 1,
			count: 7,
		},
		falling: {
			x_offset_index: 0,
			y_offset_index: 2,
			count: 7,
		},
		running: {
			x_offset_index: 0,
			y_offset_index: 3,
			count: 9,
		},
		dizzy: {
			x_offset_index: 0,
			y_offset_index: 4,
			count: 11,
		},
		sitting: {
			x_offset_index: 0,
			y_offset_index: 5,
			count: 5,
		},
		rolling: {
			x_offset_index: 0,
			y_offset_index: 6,
			count: 7,
		},
		dashing: {
			x_offset_index: 0,
			y_offset_index: 7,
			count: 7,
		},
		dying: {
			x_offset_index: 0,
			y_offset_index: 8,
			count: 12,
		},
		howling: {
			x_offset_index: 0,
			y_offset_index: 9,
			count: 4,
		},
	} as Record<string, SpriteState>,
};

let activeSpriteState: SpriteState = sprite.states.idle;

const stateControl = document.createElement("select");
stateControl.addEventListener("change", function (e) {
	activeSpriteState = sprite.states[this.value];
});
for (const state of Object.keys(sprite.states)) {
	const stateControlOption = document.createElement("option");
	stateControlOption.value = state;
	stateControlOption.innerText = state;
	stateControl.appendChild(stateControlOption);
}
document.querySelector("#stateControls")?.appendChild(stateControl);

let sprite_frame = 0;

let msPrev = window.performance.now();
const FPS = 30;
const MS_PER_FRAME = 1000 / FPS;
let fpsCounter = 0;

setInterval(() => {
	console.log("FPS:", fpsCounter);
	fpsCounter = 0;
}, 1000);

const animate = () => {
	requestAnimationFrame(animate);

	const msNow = window.performance.now();
	const msPassed = msNow - msPrev;

	if (msPassed < MS_PER_FRAME) return;

	const excessTime = msPassed % MS_PER_FRAME;
	msPrev = msNow - excessTime;
	fpsCounter++;

	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	const sx = sprite_frame * SPRITE_WIDTH;
	const sy = activeSpriteState.y_offset_index * SPRITE_HEIGHT;
	const sw = SPRITE_WIDTH;
	const sh = SPRITE_HEIGHT;
	const dx = 0;
	const dy = 0;
	const dw = SPRITE_WIDTH;
	const dh = SPRITE_HEIGHT;

	if (fpsCounter % 2 === 0)
		sprite_frame = (sprite_frame + 1) % activeSpriteState.count;

	ctx.drawImage(player_image, sx, sy, sw, sh, dx, dy, dw, dh);
};

document.addEventListener("DOMContentLoaded", () => {
	animate();
});
