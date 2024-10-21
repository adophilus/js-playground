"use server";

export const createRoom = async (formData: FormData) => {
	const response = await fetch("https://api.huddle01.com/api/v1/create-room", {
		method: "POST",
		body: JSON.stringify({
			title: "Huddle01 Room",
		}),
		headers: {
			"Content-type": "application/json",
			"x-api-key": process.env.HUDDLE01_API_KEY!,
		},
		cache: "no-cache",
	});

	const data = await response.json();
	console.log(data);
	const roomId = data.data.roomId;
	return roomId as string;
};
