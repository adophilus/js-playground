export type TSubItem = {
	label: string;
	description: string;
	link: string;
};

export type TItem = {
	label: string;
	orientation: "horizontal" | "vertical";
	items: TSubItem[];
};
