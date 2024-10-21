"use client";

import { Button } from "@chakra-ui/react";
import { useRoom } from "@huddle01/react/hooks";
import {
	useLocalVideo,
	useLocalAudio,
	useLocalScreenShare,
} from "@huddle01/react/hooks";
import {
	usePeerIds,
	useRemoteVideo,
	useRemoteAudio,
	useRemoteScreenShare,
} from "@huddle01/react/hooks";
import { Audio, Video } from "@huddle01/react/components";
import { getAccessToken } from "./_components/actions";
import { FunctionComponent } from "react";
import { Role } from "@huddle01/server-sdk/auth";

export default function RoomPage({ params }: { params: { id: string } }) {
	const roomId = params.id;

	const { joinRoom, leaveRoom } = useRoom({
		onJoin: () => {
			console.log("Joined the room");
		},
		onLeave: () => {
			console.log("Left the room");
		},
	});
	const {
		stream: videoStream,
		enableVideo,
		disableVideo,
		isVideoOn,
	} = useLocalVideo();
	const {
		stream: audioStream,
		enableAudio,
		disableAudio,
		isAudioOn,
	} = useLocalAudio();
	const { startScreenShare, stopScreenShare, shareStream } =
		useLocalScreenShare();

	return (
		<>
			<div>
				<Button
					onClick={async () => {
						const accessToken = await getAccessToken(roomId);
						joinRoom({
							roomId,
							token: accessToken,
						});
					}}
				>
					Join Room
				</Button>
				<Button onClick={leaveRoom}>Leave Room</Button>
			</div>
			<div>
				<Button
					onClick={() => {
						isVideoOn ? disableVideo() : enableVideo();
					}}
				>
					Fetch and Produce Video Stream
				</Button>
				<Button
					onClick={() => {
						isAudioOn ? disableAudio() : enableAudio();
					}}
				>
					Fetch and Produce Audio Stream
				</Button>
				<Button
					onClick={() => {
						shareStream ? stopScreenShare() : startScreenShare();
					}}
				>
					Fetch and Produce Screen Share Stream
				</Button>
			</div>
			<div>
				<ShowPeers />
			</div>
		</>
	);
}

interface RemotePeerProps {
	peerId: string;
}

const RemotePeer: FunctionComponent<RemotePeerProps> = ({ peerId }) => {
	const { stream: videoStream } = useRemoteVideo({ peerId });
	const { stream: audioStream } = useRemoteAudio({ peerId });
	const { videoStream: screenVideoStream, audioStream: screenAudioStream } =
		useRemoteScreenShare({ peerId });

	return (
		<div>
			{videoStream && <Video stream={videoStream} />}
			{audioStream && <Audio stream={audioStream} />}
			{screenVideoStream && <Video stream={screenVideoStream} />}
			{screenAudioStream && <Audio stream={screenAudioStream} />}
		</div>
	);
};

const ShowPeers = () => {
	const { peerIds } = usePeerIds({ roles: [Role.HOST, Role.CO_HOST] });

	return (
		<div>
			{peerIds.map((peerId) => {
				return <RemotePeer key={peerId} peerId={peerId} />;
			})}
		</div>
	);
};
