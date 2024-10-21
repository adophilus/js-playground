import chroma from "chroma-js";

class Circle {
	declare ctx: CanvasRenderingContext2D;
	declare x: number;
	declare y: number;
	declare dx: number;
	declare dy: number;
	declare radius: number;
	color = chroma(
		Math.random() * 255,
		Math.random() * 255,
		Math.random() * 255,
		Math.max(0.2, Math.random()),
	);

	constructor({
		ctx,
		x,
		y,
		dx,
		dy,
		radius,
	}: {
		ctx: CanvasRenderingContext2D;
		x: number;
		y: number;
		dx: number;
		dy: number;
		radius: number;
	}) {
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.radius = radius;
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		this.ctx.lineWidth = 2;
		this.ctx.strokeStyle = this.color.css();
		this.ctx.stroke();

		if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
			this.dx *= -1;
		}

		if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
			this.dy *= -1;
		}

		this.x += this.dx;
		this.y += this.dy;
	}
}

export { Circle };
