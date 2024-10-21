import "@unocss/reset/tailwind.css";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas.getContext("2d")!;

const resizeCanvas = () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
};

window.addEventListener("resize", () => {
	resizeCanvas();
});

const drawRectangle = (x: number, y: number) => {
	ctx.fillRect(x, y, 400, 200);
};
window.addEventListener("DOMContentLoaded", () => {
	resizeCanvas();
	drawRectangle(0, 0);
});
