"use client";

import Spline from "@splinetool/react-spline/next";
import { useEffect, useRef } from "react";

const sleep = (ms: number) => new Promise((res) => setInterval(res, ms));

export const Hero = () => {
	// const textContainer = useRef<HTMLHeadingElement>(null);

	// const text = {
	// 	leading: "Need a recharge?",
	// 	lagging: "Have a refill",
	// };

	// const beginAnimation = async () => {
	// 	const container = textContainer.current!;
	//
	// 	for (const letter of text.leading) {
	// 		const span = document.createElement("span");
	// 		span.style.transform = "scale(110%)";
	// 		span.innerText = letter;
	//
	// 		container.appendChild(span);
	// 		await sleep(500);
	// 	}
	// };
	//
	// useEffect(() => {
	// 	beginAnimation();
	// }, []);

	return (
		<div className="h-screen relative">
			<Spline scene="https://prod.spline.design/3gUaPddC3Uo9NOsz/scene.splinecode" />
			<div className="absolute inset-0 bg-black/40 pointer-events-none" />
			<div className="absolute z-20 container inset-0 mx-auto pointer-events-none text-white grid h-full place-items-center">
				{/* biome-ignore lint/a11y/useHeadingContent: <explanation> */}
				<h2
					className="text-white text-4xl lg:text-[10rem] font-NewAmsterdam tracking-wide text-center"
					// ref={textContainer}
				>
					Need a recharge?
					<br />
					Have a refill
				</h2>
			</div>
		</div>
	);
};
