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

const circles = Array.from({ length: 100 }).map((_) => {
	const radius = 30;
	return new Circle({
		ctx,
		radius,
		x: Math.random() * (window.innerWidth - radius * 2) + radius,
		y: Math.random() * (window.innerHeight - radius * 2) + radius,
		dx: (Math.random() - 0.5) * 8,
		dy: (Math.random() - 0.5) * 8,
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
