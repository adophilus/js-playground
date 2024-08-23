import "./style.css";
import { RoomClient } from "./lib/room";
import { Media } from "./lib/media";

const main = async () => {
	const rooms = await RoomClient.list();
	const stream = await Media.geStream();
	console.log(rooms);
};

document.addEventListener("DOMContentLoaded", () => {
	main();
});
