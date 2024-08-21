import { createApp } from "honox/server";
import { createNodeWebSocket } from "@hono/node-ws";
import { showRoutes } from "hono/dev";

const app = createApp();

// const { upgradeWebSocket, websocket } = createNodeWebSocket({ app });

// app.get(
// 	"/ws",
// 	upgradeWebSocket((c) => {
// 		return {
// 			onMessage(event, ws) {
// 				console.log(`Message from client: ${event.data}`);
// 				ws.send("Hello from server!");
// 			},
// 			onClose: () => {
// 				console.log("Connection closed");
// 			},
// 		};
// 	}),
// );

showRoutes(app);

export default app;
