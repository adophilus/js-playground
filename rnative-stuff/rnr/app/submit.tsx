import { View, Text } from "react-native";
import { Button } from "~/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import {
	Loader2Icon,
	CheckCircleIcon,
	XIcon,
	type LucideProps,
	RotateCwIcon,
	CircleXIcon,
} from "lucide-react-native";
import { cn } from "~/lib/utils";
import { useRouter } from "expo-router";

let x = 0;

export default function SubmitMicroAnimation() {
	const {
		mutate: submit,
		status,
		reset,
	} = useMutation({
		mutationFn: () =>
			new Promise((res, rej) =>
				setTimeout(() => {
					if (x % 2 === 0) res(null);
					else rej(null);
					x++;
				}, 3000),
			),
	});

	const resetState = () => {
		reset();
	};

	const isSubmitting = status === "pending";
	const hasSubmitted = status === "success";
	const isError = status === "error";

	const iconClasses = "";
	// const iconClasses = "transition-transform duration-500 scale-[110%]";
	// const preAnimatedIconClasses = "translate-y-[24]";
	// const postAnimatedIconClasses = "translate-y-0";

	const iconProps: LucideProps = {
		stroke: "white",
	};

	return (
		<View className="flex-1 items-center justify-center p-6 gap-6">
			<Button
				size="lg"
				disabled={isSubmitting || isError || hasSubmitted}
				className={cn(
					"w-full",
					hasSubmitted && "bg-emerald-600",
					isError && "bg-red-600",
				)}
				onPress={() => submit()}
			>
				{hasSubmitted ? (
					<CheckCircleIcon size={24} className={iconClasses} {...iconProps} />
				) : isSubmitting ? (
					<View className="animate-spin">
						<Loader2Icon size={24} className={iconClasses} {...iconProps} />
					</View>
				) : isError ? (
					<CircleXIcon size={24} className={iconClasses} {...iconProps} />
				) : (
					<Text className="text-white text-medium">Submit</Text>
				)}
			</Button>
			<Button
				className="p-2 rounded-full aspect-square"
				onPress={() => resetState()}
			>
				<RotateCwIcon size={24} {...iconProps} />
			</Button>
		</View>
	);
}
