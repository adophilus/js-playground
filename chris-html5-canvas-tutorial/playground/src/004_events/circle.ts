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
	declare minRadius: number;
	declare maxRadius: number;
	declare mouse: { x: number; y: number };

	constructor({
		ctx,
		x,
		y,
		dx,
		dy,
		radius,
		maxRadius,
		minRadius,
		mouse,
	}: {
		ctx: CanvasRenderingContext2D;
		x: number;
		y: number;
		dx: number;
		dy: number;
		radius: number;
		maxRadius: number;
		minRadius: number;
		mouse: { x: number; y: number };
	}) {
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.radius = radius;
		this.minRadius = minRadius;
		this.maxRadius = maxRadius;
		this.mouse = mouse;
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		this.ctx.lineWidth = 2;
		this.ctx.strokeStyle = this.color.css();
		this.ctx.stroke();
		this.ctx.fillStyle = this.color.css();
		this.ctx.fill();

		if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
			this.dx *= -1;
		}

		if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
			this.dy *= -1;
		}

		if (
			this.x - this.mouse.x < 50 &&
			this.x - this.mouse.x > -50 &&
			this.y - this.mouse.y < 50 &&
			this.y - this.mouse.y > -50
		) {
			if (this.radius < this.maxRadius) {
				this.radius += 1;
			}
		} else if (this.radius > this.minRadius) {
			this.radius -= 1;
		}

		this.x += this.dx;
		this.y += this.dy;
	}
}

export { Circle };
