import { Link } from "expo-router";
import {
	MenuIcon,
	SearchIcon,
	BellDotIcon,
	BookmarkIcon,
} from "lucide-react-native";
import { FunctionComponent } from "react";
import { View, Text, ScrollView } from "react-native";
import { cn } from "~/lib/utils";

const tabs = [
	{
		label: "Trending",
	},
	{
		label: "Education",
	},
	{
		label: "News",
	},
	{
		label: "Market",
	},
	{
		label: "Portfolio",
	},
	{
		label: "Community",
	},
];

const Tab: FunctionComponent<{ label: string; active: boolean }> = ({
	label,
	active,
}) => (
	<View
		className={cn(
			"px-4 py-2",
			active
				? "border-b-[#1D61E7] border-b-[3px]"
				: "border-b-gray-300 border-b-2",
		)}
	>
		<Text className="text-lg font-medium">{label}</Text>
	</View>
);

const Header = () => (
	<View>
		<View className="p-6 flex flex-row justify-between items-center">
			<MenuIcon size={24} stroke="black" />
			<View className="flex flex-row gap-4 items-center">
				<SearchIcon size={24} stroke="black" />
				<BellDotIcon size={24} stroke="black" />
				<BookmarkIcon size={24} stroke="black" />
			</View>
		</View>
		<ScrollView
			horizontal={true}
			contentContainerClassName="flex flex-row justify-start"
		>
			{tabs.flatMap((tab, index) => (
				<Tab key={tab.label} {...tab} active={index === 0} />
			))}
		</ScrollView>
	</View>
);

const Banner = () => (
	<View className="p-6">
		<View className="mb-4 shadow-md">
			<View className="rounded-lg aspect-video bg-gray-300" />
		</View>
		<View className="h-[1px] bg-gray-300" />
	</View>
);

const TopStories = () => (
	<View className="px-6">
		<View className="flex flex-row justify-between items-center">
			<Text className="text-lg font-medium">Top Stories</Text>
			<Text className="text-[#1D61E7] text-sm font-medium">See All</Text>
		</View>
	</View>
);

const FeedItem: FunctionComponent = () => (
	<Link asChild href="/(dashboard)/feed/single">
		<View className="rounded-lg h-36 bg-gray-300 shadow-md" />
	</Link>
);

const Feed = () => (
	<View className="p-6">
		<View className="flex flex-col gap-6">
			{Array.from({ length: 10 }).map((feed, index) => (
				<FeedItem key={index} {...feed} />
			))}
		</View>
	</View>
);

export default function DashboardFeedScreen() {
	return (
		<View className="flex-1">
			<ScrollView>
				<Header />
				<Banner />
				<TopStories />
				<Feed />
			</ScrollView>
		</View>
	);
}
