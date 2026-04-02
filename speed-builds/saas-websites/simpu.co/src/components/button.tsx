import { ArrowUpRightIcon } from "lucide-react";
import { forwardRef, type ComponentProps } from "react";

export const Button = forwardRef<HTMLButtonElement, ComponentProps<"button">>(
	({ children, ...props }, ref) => (
		<button type="button" {...props} ref={ref}>
			{children} <ArrowUpRightIcon />
		</button>
	),
);
