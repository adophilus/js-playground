import { createRoute } from "honox/factory";
import { router } from "../../../lib/meeting";

export default createRoute((c) => {
	return c.json({
		capabilities: router.rtpCapabilities,
	});
});
