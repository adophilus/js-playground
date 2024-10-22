import { type Href, Link, Slot, usePathname, useSegments } from "expo-router";
import { Stack } from "expo-router";
import {
	ArrowRightLeftIcon,
	type LucideIcon,
	NewspaperIcon,
	ReceiptTextIcon,
	WalletMinimalIcon,
} from "lucide-react-native";
import type { FunctionComponent } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { cn } from "~/lib/utils";

const bottomBarIcons = [
	{
		label: "Feed",
		href: "/(dashboard)/feed",
		icon: NewspaperIcon,
	},
	{
		label: "Swap",
		href: "/(dashboard)",
		icon: ArrowRightLeftIcon,
	},
	{
		label: "Bills",
		href: "/(dashboard)/bills",
		icon: ReceiptTextIcon,
	},
	{
		label: "Assets",
		href: "/(dashboard)/assets",
		icon: WalletMinimalIcon,
	},
] satisfies BottomBarProp[];

type BottomBarProp = { label: string; href: Href; icon: LucideIcon };

const BottomBarIcon: FunctionComponent<BottomBarProp> = ({
	label,
	href,
	icon: Icon,
}) => {
	const segments = useSegments();
	const pathname = `/${segments.join("/")}`;
	const isActive = pathname === href;

	return (
		<Link asChild href={href}>
			<Pressable
				className={cn(
					"flex flex-col gap-1 items-center rounded-full w-20 justify-center aspect-square",
					isActive && "bg-[#1D61E7] -translate-y-1/2",
				)}
			>
				<Icon stroke="white" size={20} />
				<Text className="text-sm text-gray-300">{label}</Text>
			</Pressable>
		</Link>
	);
};

const BottomBar = () => (
	<View className="p-2 flex flex-row justify-evenly bg-black rounded-t-2xl">
		{bottomBarIcons.map((props) => (
			<BottomBarIcon key={props.href} {...props} />
		))}
	</View>
);

export default function DashboardLayout() {
	return (
		<View className="flex-1">
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="feed" />
				<Stack.Screen name="assets" />
				<Stack.Screen name="bills" />
				<Stack.Screen name="index" />
			</Stack>
			<BottomBar />
		</View>
	);
}
