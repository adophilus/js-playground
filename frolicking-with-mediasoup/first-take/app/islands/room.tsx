import mediasoup from "mediasoup-client";

const initClient = async () => {
	const device = new mediasoup.Device();

	const capabilities = await "";

	await device.load({ routerRtpCapabilities: capabilities });

	const transportParams = await "";

	const transport = device.createSendTransport({
		...transportParams,
		iceServers: [
			{
				urls: "stun:stun1.l.google.com:19302",
			},
		],
	});

	const stream = await window.navigator.mediaDevices.getUserMedia({
		audio: true,
		video: true,
	});

	for (const track of stream.getTracks()) {
		await transport.produce({
			track,
			codecOptions: {
				opusStereo: true,
				opusDtx: true,
			},
		});
	}
};

export const Room = () => {
	return null;
};
