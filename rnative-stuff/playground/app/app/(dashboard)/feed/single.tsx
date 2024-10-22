import {
	BookmarkIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "lucide-react-native";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Header = () => (
	<View className="p-6">
		<View className="flex flex-row justify-between items-center">
			<ChevronLeftIcon size={24} stroke="black" />
			<BookmarkIcon size={24} stroke="black" />
		</View>
	</View>
);

const Banner = () => <View className="bg-gray-300 aspect-video" />;

const Title = () => (
	<View className="flex flex-col gap-2">
		<View className="w-full bg-gray-300 h-10" />
		<View className="w-52 bg-gray-300 h-10" />
	</View>
);

const Content = () => (
	<View className="flex flex-col gap-1">
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-full bg-gray-300 h-6" />
		<View className="w-64 bg-gray-300 h-6" />
	</View>
);

export default function SingleFeedScreen() {
	return (
		<ScrollView className="flex-1">
			<Header />
			<Banner />
			<View className="px-6 mt-4 flex-1 gap-4">
				<Title />
				<Content />
			</View>
		</ScrollView>
	);
}
