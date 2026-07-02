import { hc } from "hono/client";
import { useQuery } from "@tanstack/react-query";
import type { AppType } from "backend";

const client = hc<AppType>("/");

export function useGallery() {
  return useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const res = await client.api.gallery.$get();
      return res.json();
    },
  });
}
