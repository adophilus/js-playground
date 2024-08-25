import { PlusIcon } from "lucide-react";
import "./topbar.module.css";
import { forwardRef, type HTMLAttributes, useRef } from "react";
import { toast } from "sonner";
import { RoomClient } from "@frontend/lib/room";
import { Button } from "@frontend/components/button";

// const FormDialog = forwardRef<
// 	HTMLDialogElement,
// 	HTMLAttributes<HTMLDialogElement>
// >(({}, ref) => (
// 	<dialog ref={ref}>
// 		<form method="dialog" className="p-5 rounded-md">
// 			<div className="font-Rowdies">
// 				<label htmlFor="form-dialog-username">Username</label>
// 				<input
// 					type="text"
// 					id="form-dialog-username"
// 					className="block text-xl p-2 focus:outline-none border-[3px] border-black rounded-md"
// 					placeholder="Enter username"
// 				/>
// 			</div>
// 		</form>
// 	</dialog>
// ));

export const Topbar = () => {
	const { mutate } = RoomClient.hooks.create();

	const createRoom = async () => {
		mutate(undefined, {
			onSuccess: () => {
				toast.success("Room has been created");
			},
		});
	};

	return (
		<>
			<div className="p-4 border-b-[5px] border-b-slate-400 flex justify-end">
				<Button
					variant="success"
					onClick={createRoom}
					className="items-center inline-flex gap-2 p-2 px-4 rounded-md text-lg hover:scale-105 hover:-rotate-[2deg]"
				>
					<PlusIcon className="size-6" />
					Create room
				</Button>
			</div>
		</>
	);
};
