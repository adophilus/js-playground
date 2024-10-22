import { ArrowDownUpIcon, SettingsIcon } from "lucide-react-native";
import { View, Text } from "react-native";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import type { FunctionComponent } from "react";

const SwapBox: FunctionComponent<{ ticker: string; label: string }> = ({
	ticker,
	label,
}) => (
	<View className="bg-gray-100 p-4 rounded-xl flex flex-row">
		<View className="grow">
			<Text className="text-sm font-medium">{label}</Text>
			<Input
				placeholder="0.00"
				className="border-0 bg-transparent native:text-xl"
			/>
		</View>
		<View className="flex flex-col justify-center">
			<View className="bg-white shadow-md rounded-full p-1 pl-2 pr-4 flex flex-row justify-center items-center gap-2">
				<View className="w-8 h-8 aspect-square rounded-full shadow-md bg-gray-100" />
				<Text className="text-3xl font-semibold">{ticker}</Text>
			</View>
		</View>
	</View>
);

const SwapDialog = () => (
	<View className="rounded-md">
		<View className="flex flex-col gap-6">
			<View className="flex flex-row justify-between">
				<View />
				<Text className="font-medium text-xl">Swap</Text>
				<View>
					<SettingsIcon stroke="black" size={24} />
				</View>
			</View>
			<View className="flex flex-col gap-6">
				<SwapBox label="From" ticker="NGN" />
				<View className="flex flex-row justify-end px-8 -my-12">
					<View className="bg-white p-2 rounded-full z-10">
						<View className="bg-[#1D61E7]  rounded-full p-3">
							<ArrowDownUpIcon stroke="white" size={24} />
						</View>
					</View>
				</View>
				<SwapBox label="To" ticker="USDT" />
			</View>
			<View>
				<Button size="lg" className="bg-[#1D61E7] rounded-xl">
					<Text className="text-white font-medium text-lg">Swap</Text>
				</Button>
			</View>
			<View>
				<View className="flex flex-row gap-2">
					<Text className="font-medium">1 NGN = 0.0006 USDT</Text>
					<Text className="text-gray-400">($0.0006)</Text>
				</View>
			</View>
		</View>
	</View>
);

const ChartPlaceholder = () => (
	<View className="h-36 bg-gray-100">
		<Text>Chart placeholder</Text>
	</View>
);

export default function DashboardOverviewScreen() {
	return (
		<View className="flex-1 justify-center p-6 gap-6">
			<SwapDialog />
			<ChartPlaceholder />
		</View>
	);
}
