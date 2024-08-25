import { forwardRef, type HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "primary" | "destructive" | "success";

type Props = HTMLAttributes<HTMLButtonElement> & {
	variant: ButtonVariant;
};

const variantToGradientClasses = (variant: ButtonVariant) => {
	switch (variant) {
		case "primary": {
			return "from-blue-400 via-blue-500 to-blue-400";
		}
		case "destructive": {
			return "from-red-400 via-red-500 to-red-400";
		}
		case "success": {
			return "from-emerald-400 via-emerald-500 to-emerald-400";
		}
	}
};

export const Button = forwardRef<HTMLButtonElement, Props>(
	({ variant, className, ...props }, ref) => (
		<button
			className={twMerge(
				`bg-gradient-to-r ${variantToGradientClasses(variant)} bg-[size:200%] bg-left hover:bg-right duration-250 transition-all text-white shadow-md px-4 py-2`,
				className,
			)}
			type="button"
			ref={ref}
			{...props}
		/>
	),
);
