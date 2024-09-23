import {
	type FunctionComponent,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import {
	VideoIcon,
	MicIcon,
	MessageSquareIcon,
	MonitorIcon,
	VideoOffIcon,
	MicOffIcon,
	MonitorOffIcon,
	type LucideIcon,
	Loader2Icon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ActionButton = {
	label: string;
	action: () => Promise<void>;
} & (
	| {
			type: "stateful";
			states: ({ icon: LucideIcon; next: number } & Partial<{
				className?: string;
			}>)[];
			current: number;
	  }
	| {
			type: "stateless";
			icon: LucideIcon;
	  }
);

export const Meeting: FunctionComponent<{ actor: "host" | "guest" }> = ({
	actor,
}) => {
	const remoteVideoRef = useRef<HTMLVideoElement>(null);
	const localVideoRef = useRef<HTMLVideoElement>(null);
	const peerConnection = useMemo(() => new RTCPeerConnection(), []);
	const stream = useRef(new MediaStream());

	useEffect(() => {
		const localVideo = localVideoRef.current;
		if (localVideo) {
			localVideo.srcObject = stream.current;
		}
	}, []);

	useEffect(() => {
		(async () => {
			if (actor === "host") {
				peerConnection.addEventListener("negotiationneeded", async () => {
					const offer = await peerConnection.createOffer();
					// TODO: signal offer to 'guest'
				});

				const offer = await peerConnection.createOffer();
				// TODO: signal offer to 'guest'
			} else {
				const answer = await peerConnection.createAnswer();
				// TODO: signal answer to 'host'
			}
		})();
	}, [actor, peerConnection]);

	useEffect(() => {
		const _stream = stream.current;
		if (_stream)
			// biome-ignore lint/complexity/noForEach: this is fine
			_stream.getTracks().forEach((track) => peerConnection.addTrack(track));
	}, [peerConnection]);

	const [actionButtons, setActionButtons] = useState<ActionButton[]>([
		{
			label: "Toggle video",
			type: "stateful",
			states: [
				{
					icon: VideoOffIcon,
					className: "bg-neutral",
					next: 1,
				},
				{
					icon: VideoIcon,
					next: 0,
				},
			],
			current: 0,
			async action() {
				const isActive = this.current === 1;
				const _stream = stream.current;
				if (_stream) {
					if (isActive) {
						for (const track of _stream.getVideoTracks()) {
							track.stop();
							_stream.removeTrack(track);
						}
					} else {
						const newStream = await window.navigator.mediaDevices.getUserMedia({
							video: true,
						});
						for (const track of newStream.getVideoTracks()) {
							_stream.addTrack(track);
						}
					}
				}
			},
		},
		{
			label: "Toggle audio",
			type: "stateful",
			states: [
				{
					icon: MicOffIcon,
					className: "bg-neutral",
					next: 1,
				},
				{
					icon: MicIcon,
					next: 0,
				},
			],
			current: 0,
			async action() {
				const isActive = this.current === 1;
				const _stream = stream.current;
				if (_stream) {
					if (isActive) {
						for (const track of _stream.getAudioTracks()) {
							track.stop();
							_stream.removeTrack(track);
						}
					} else {
						const newStream = await window.navigator.mediaDevices.getUserMedia({
							audio: true,
						});
						for (const track of newStream.getAudioTracks()) {
							_stream.addTrack(track);
						}
					}
				}
			},
		},
		{
			label: "Share Screen",
			type: "stateful",
			states: [
				{
					icon: MonitorOffIcon,
					next: 1,
				},
				{
					icon: MicIcon,
					next: 0,
				},
			],
			current: 0,
			action: async () => {
				// TODO: toggle the video stream
			},
		},
		{
			label: "Chat",
			type: "stateless",
			icon: MessageSquareIcon,
			action: async () => {
				// TODO: show the chat dialog
			},
		},
	]);

	return (
		<div className="h-full p-4 flex flex-col bg-background">
			<div className="bg-primary grow relative rounded-md">
				{/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
				<video
					ref={remoteVideoRef}
					className="rounded-md bg-primary w-full h-full"
				/>
				{/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
				<video
					ref={localVideoRef}
					autoPlay
					className="object-cover absolute bottom-4 right-4 rounded-md bg-background aspect-[9/16] w-1/3"
				/>
			</div>
			<div className="pt-4">
				<div className="grid grid-cols-4 gap-4 justify-items-center">
					{actionButtons.map((button, index) => (
						<ActionButton
							key={button.label}
							button={button}
							updateState={(state) =>
								setActionButtons((btns) => {
									let newBtns = btns;
									newBtns[index].current = state;
									return newBtns;
								})
							}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

const ActionButton: FunctionComponent<{
	button: ActionButton;
	updateState: (state: number) => void;
}> = ({ button: btn, updateState }) => {
	const [isLoading, setIsLoading] = useState(false);

	const Icon = () => {
		if (btn.type === "stateless")
			return <btn.icon className="size-8 stroke-2" />;

		const currentBtn = btn.states[btn.current];
		return (
			<currentBtn.icon
				className={cn("size-8 stroke-2", currentBtn.className)}
			/>
		);
	};

	return (
		<button
			type="button"
			disabled={isLoading}
			onClick={async () => {
				try {
					setIsLoading(true);
					await btn.action();
				} catch (e) {
					console.warn(e);
				} finally {
					setIsLoading(false);
					updateState(btn.states[btn.current].next);
				}
			}}
			className="bg-primary text-background rounded-full p-4 hover:cursor-pointer"
		>
			{isLoading ? <Loader2Icon className="size-8 animate-spin" /> : <Icon />}
		</button>
	);
};
