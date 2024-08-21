"use client";

import { HuddleClient } from "@huddle01/web-core";
import { config } from "../../lib/config";
import { useEffect, type FunctionComponent } from "react";

const initClient = async (roomId: string, token: string) => {
	const client = new HuddleClient({
		projectId: config.projectId,
	});

	const res = await client.joinRoom({
		roomId,
		token,
	});
	console.log(res);
};

export const Meeting: FunctionComponent<{
	token: string;
	roomId: string;
}> = ({ roomId, token }) => {
	useEffect(() => {
		initClient(roomId, token);
	}, []);

	return null;
};
