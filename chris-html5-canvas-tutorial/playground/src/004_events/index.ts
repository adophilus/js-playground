import "@unocss/reset/tailwind.css";
import "./styles.css";
import { Circle } from "./circle";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas.getContext("2d")!;

const resizeCanvas = () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
};

const mouse = {
	x: window.innerWidth / 2,
	y: window.innerHeight / 2,
};

const circles = Array.from({ length: 500 }).map((_) => {
	const maxRadius = 40;
	const radius = Math.floor((Math.random() * maxRadius) / 2);
	const minRadius = Math.max(Math.floor((Math.random() * radius) / 2), 2);
	return new Circle({
		ctx,
		radius,
		maxRadius,
		minRadius,
		x: Math.random() * (window.innerWidth - radius * 2) + radius,
		y: Math.random() * (window.innerHeight - radius * 2) + radius,
		dx: (Math.random() - 0.5) * 8,
		dy: (Math.random() - 0.5) * 8,
		mouse,
	});
});

const animate = () => {
	window.requestAnimationFrame(animate);

	ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
	for (const circle of circles) {
		circle.draw();
	}
};

window.addEventListener("resize", () => {
	resizeCanvas();
});

window.addEventListener("DOMContentLoaded", () => {
	resizeCanvas();
	animate();
});

window.addEventListener("mousemove", (e) => {
	mouse.x = e.x;
	mouse.y = e.y;
});
