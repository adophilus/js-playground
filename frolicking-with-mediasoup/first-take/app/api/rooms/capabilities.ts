import { router } from "@/lib/room/lib";

export default () => {
	return {
		capabilities: router.rtpCapabilities,
	};
};
