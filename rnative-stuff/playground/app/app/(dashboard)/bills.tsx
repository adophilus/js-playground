import {
	BanknoteIcon,
	GiftIcon,
	GraduationCapIcon,
	HandCoinsIcon,
	HandshakeIcon,
	LayoutGridIcon,
	type LucideIcon,
	MonitorPlayIcon,
	PhoneIcon,
	PlaneIcon,
	PlugZapIcon,
	WifiIcon,
} from "lucide-react-native";
import type { FunctionComponent } from "react";
import { View, Text } from "react-native";
import { cn } from "~/lib/utils";
import { formatRelative } from "date-fns";
import { ScrollView } from "react-native-gesture-handler";

const bills = [
	{
		label: "Airtime",
		icon: PhoneIcon,
	},
	{
		label: "Internet",
		icon: WifiIcon,
	},
	{
		label: "Electricity",
		icon: PlugZapIcon,
	},
	{
		label: "Cable TV",
		icon: MonitorPlayIcon,
	},
	{
		label: "Betting",
		icon: HandCoinsIcon,
	},
	{
		label: "More",
		icon: LayoutGridIcon,
	},
	{
		label: "Flight",
		icon: PlaneIcon,
	},
	{
		label: "Insurance",
		icon: HandshakeIcon,
	},
	{
		label: "Gift Cards",
		icon: GiftIcon,
	},
	{
		label: "Tax",
		icon: BanknoteIcon,
	},
	{
		label: "Education",
		icon: GraduationCapIcon,
	},
] satisfies Bill[];
type Bill = { label: string; icon: LucideIcon };

const Tab: FunctionComponent<Bill> = ({ label, icon: Icon }) => {
	return (
		<View className="flex flex-col gap-2">
			<View className="aspect-square rounded-full bg-gray-200 p-4">
				<Icon stroke="black" size={24} />
			</View>
			<Text className="text-center font-medium">{label}</Text>
		</View>
	);
};

const BillsTabsSection = () => (
	<View className="flex flex-col gap-4">
		<View>
			<Text className="text-2xl font-bold">Utility Bills</Text>
		</View>
		<View className="flex flex-row flex-wrap justify-between">
			{bills.slice(0, 6).map((bill) => (
				<View
					key={bill.label}
					className="basis-1/3 bg-red-400 aspect-square flex items-center justify-center p-6"
				>
					<Tab {...bill} />
				</View>
			))}
		</View>
	</View>
);

const transactions = [
	{
		id: "c4a3e8f6-9e6a-4e7b-8e4d-3e2a1b0d9c2f",
		icon: PhoneIcon,
		amount: 100,
		description: "Paid for Amazon Prime",
		direction: "OUTGOING",
		occurred_at: "2022-01-01T10:30:00",
	},
	{
		id: "d7b2a1c0-8d9c-4b6e-9a6e-5f4e3d2c1b0a",
		icon: PhoneIcon,
		amount: 100,
		description: "Paid for Amazon Prime",
		direction: "OUTGOING",
		occurred_at: "2022-01-01T14:45:00",
	},
	{
		id: "e6f5d4c3-b2a1-4c0d-9e8f-7a6b5c4d3e2f",
		icon: PhoneIcon,
		amount: 100,
		description: "Paid for Amazon Prime",
		direction: "OUTGOING",
		occurred_at: "2022-01-01T18:15:00",
	},
	{
		id: "f4e3d2c1-a0b9-4c8d-9e6a-7b5c4d3e2a1f",
		icon: PhoneIcon,
		amount: 100,
		description: "Paid for Amazon Prime",
		direction: "OUTGOING",
		occurred_at: "2022-01-01T18:15:00",
	},
	{
		id: "a9b8c7d6-e5f4-4d3c-2b1a-0c9d8e7f6a5b",
		icon: PhoneIcon,
		amount: 100,
		description: "Paid for Amazon Prime",
		direction: "OUTGOING",
		occurred_at: "2022-01-01T18:15:00",
	},
	{
		id: "b0a1c2d3-e4f5-4c5d-6e7f-8a9b0c1d2e3f",
		icon: PhoneIcon,
		amount: 100,
		description: "Paid for Amazon Prime",
		direction: "OUTGOING",
		occurred_at: "2022-01-01T18:15:00",
	},
	{
		id: "c1d2e3f4-a5b6-4d7e-8f9a-0b1c2d3e4f5",
		icon: PhoneIcon,
		amount: 100,
		description: "Paid for Amazon Prime",
		direction: "OUTGOING",
		occurred_at: "2022-01-01T18:15:00",
	},
	{
		id: "d2e3f4a5-b6c7-4e8f-9a0b-1c3d4e5f6a7",
		icon: PhoneIcon,
		amount: 100,
		description: "Paid for Amazon Prime",
		direction: "OUTGOING",
		occurred_at: "2022-01-01T18:15:00",
	},
] satisfies Transaction[];

type Transaction = {
	id: string;
	icon: LucideIcon;
	amount: number;
	description: string;
	direction: "INCOMING" | "OUTGOING";
	occurred_at: string;
};

const Transaction: FunctionComponent<Transaction> = ({
	amount,
	direction,
	description,
	occurred_at,
}) => (
	<View className="py-4 border-b-[1px] border-b-gray-300">
		<View className="flex flex-row gap-4 items-center">
			<View className="aspect-square bg-gray-200 p-3 rounded-full">
				<PhoneIcon stroke="black" size={18} />
			</View>
			<View className="flex flex-col">
				<Text className="font-medium">{description}</Text>
				<Text className="text-gray-400 text-sm">
					{formatRelative(occurred_at, new Date())}
				</Text>
			</View>
			<View className="flex-grow" />
			<Text
				className={cn(
					"font-medium text-right text-xl",
					direction === "INCOMING" ? "text-emerald-700" : "text-red-700",
				)}
			>
				{direction === "INCOMING" ? "+" : "-"}${amount}
			</Text>
		</View>
	</View>
);

const TransactionsSection = () => (
	<View className="flex flex-col gap-2">
		<View>
			<Text className="text-2xl font-bold">Transactions</Text>
		</View>
		<View>
			{transactions.map((tx) => (
				<View key={tx.id}>
					<Transaction {...tx} />
				</View>
			))}
		</View>
	</View>
);

export default function BillsScreen() {
	return (
		<ScrollView contentContainerClassName="p-6 flex flex-col gap-12">
			<BillsTabsSection />
			<TransactionsSection />
		</ScrollView>
	);
}
