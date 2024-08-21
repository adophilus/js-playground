import { Meeting } from "./_components/meeting";

import { AccessToken, Role } from "@huddle01/server-sdk/auth";

const generateAccessToken = async (roomId: string) => {
	const accessToken = new AccessToken({
		apiKey: process.env.HUDDLE01_API_KEY as string,
		roomId,
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

export default async function Home() {
	const roomId = "abba";
	const token = await generateAccessToken(roomId);

	return <Meeting roomId={roomId} token={token} />;
}
