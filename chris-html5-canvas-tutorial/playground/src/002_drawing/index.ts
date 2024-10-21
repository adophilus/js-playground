import "@unocss/reset/tailwind.css";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas.getContext("2d")!;

const resizeCanvas = () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	drawCube();
};

const drawCube = () => {
	ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
	const sideOfBox = 200;
	const angle = Math.PI / 6;
	const adj = sideOfBox * Math.cos(angle);
	const opp = sideOfBox * Math.sin(angle);
	const boxHeight = sideOfBox + 2 * opp;

	ctx.lineWidth = 2;
	ctx.beginPath();

	ctx.moveTo(
		window.innerWidth * 0.5,
		window.innerHeight * 0.5 + boxHeight * 0.5,
	);
	ctx.lineTo(window.innerWidth * 0.5 + adj, window.innerHeight * 0.5 + opp);

	ctx.moveTo(
		window.innerWidth * 0.5,
		window.innerHeight * 0.5 + boxHeight * 0.5,
	);
	ctx.lineTo(window.innerWidth * 0.5 - adj, window.innerHeight * 0.5 + opp);

	ctx.moveTo(
		window.innerWidth * 0.5,
		window.innerHeight * 0.5 + boxHeight * 0.5,
	);
	ctx.lineTo(
		window.innerWidth * 0.5,
		window.innerHeight * 0.5 + boxHeight * 0.5 - sideOfBox,
	);

	ctx.moveTo(window.innerWidth * 0.5 + adj, window.innerHeight * 0.5 + opp);
	ctx.lineTo(
		window.innerWidth * 0.5 + adj,
		window.innerHeight * 0.5 + opp - sideOfBox,
	);

	ctx.moveTo(window.innerWidth * 0.5 - adj, window.innerHeight * 0.5 + opp);
	ctx.lineTo(
		window.innerWidth * 0.5 - adj,
		window.innerHeight * 0.5 + opp - sideOfBox,
	);

	ctx.moveTo(
		window.innerWidth * 0.5,
		window.innerHeight * 0.5 + boxHeight * 0.5 - sideOfBox,
	);
	ctx.lineTo(
		window.innerWidth * 0.5 + adj,
		window.innerHeight * 0.5 + boxHeight * 0.5 - sideOfBox - opp,
	);

	ctx.moveTo(
		window.innerWidth * 0.5,
		window.innerHeight * 0.5 + boxHeight * 0.5 - sideOfBox,
	);
	ctx.lineTo(
		window.innerWidth * 0.5 - adj,
		window.innerHeight * 0.5 + boxHeight * 0.5 - sideOfBox - opp,
	);

	ctx.moveTo(
		window.innerWidth * 0.5 - adj,
		window.innerHeight * 0.5 + boxHeight * 0.5 - sideOfBox - opp,
	);
	ctx.lineTo(
		window.innerWidth * 0.5,
		window.innerHeight * 0.5 - boxHeight * 0.5,
	);

	ctx.moveTo(
		window.innerWidth * 0.5 + adj,
		window.innerHeight * 0.5 + boxHeight * 0.5 - sideOfBox - opp,
	);
	ctx.lineTo(
		window.innerWidth * 0.5,
		window.innerHeight * 0.5 - boxHeight * 0.5,
	);

	ctx.stroke();
};

window.addEventListener("resize", () => {
	resizeCanvas();
});

window.addEventListener("DOMContentLoaded", () => {
	resizeCanvas();

	// rect
	// ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
	// ctx.fillRect(0, 0, 200, 100);
	//
	// // line
	// ctx.beginPath();
	// ctx.moveTo(0, 0);
	// ctx.lineTo(400, 400);
	// ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
	// ctx.stroke();
	//
	// // arc
	// ctx.beginPath();
	// ctx.arc(400, 400, 100, 0, Math.PI * 2, false);
	// ctx.stroke();
	//
	// for (let i = 0; i < 10; i++) {
	// 	const x = Math.random() * window.innerWidth;
	// 	const y = Math.random() * window.innerHeight;
	// 	ctx.beginPath();
	// 	ctx.arc(x, y, 100, 0, Math.PI * 2, false);
	// 	ctx.stroke();
	// }
});
