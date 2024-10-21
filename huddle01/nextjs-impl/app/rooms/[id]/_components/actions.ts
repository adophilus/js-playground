"use server";

import { AccessToken, Role } from "@huddle01/server-sdk/auth";

export const getAccessToken = async (roomId: string) => {
	console.log(roomId);

	const accessToken = new AccessToken({
		apiKey: process.env.HUDDLE01_API_KEY!,
		roomId: roomId as string,
		role: Role.HOST,
		permissions: {
			admin: true,
			canConsume: true,
			canProduce: true,
			canProduceSources: {
				cam: true,
				mic: true,
				screen: true,
			},
			canRecvData: true,
			canSendData: true,
			canUpdateMetadata: true,
		},
	});

	const token = await accessToken.toJwt();

	return token;
};
