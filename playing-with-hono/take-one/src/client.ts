import { hc } from "hono/client";
import type { App } from "./index";

const client = hc<App>("http://localhost:3000");

async () => {
  const res = await client.users.$post({
    json: {
      age: 12,
      username: "testuser",
    },
  });

  const json = await res.json();
}
