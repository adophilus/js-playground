import "reflect-metadata";

import { createApp } from "../src";

const app = createApp();

export default { port: 8000, fetch: app.fetch };
