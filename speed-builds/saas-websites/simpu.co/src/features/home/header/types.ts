type SubItem = {
	label: string;
	description: string;
	link: string;
};

export type Item = {
	label: string;
	orientation: "horizontal" | "vertical";
	items: SubItem[];
};
