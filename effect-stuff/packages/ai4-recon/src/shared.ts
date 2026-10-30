/**
 * Shared wiring: z.ai's Anthropic-compatible endpoint as a drop-in provider.
 * z.ai base: https://api.z.ai/api/anthropic  (+ /v1/messages appended by the client)
 */
import { Effect, Redacted, Stream } from "effect";
import type { HttpClient } from "effect/http";
import { HttpClient as HttpC, HttpClientResponse } from "effect/http";
import { AnthropicClient } from "@effect/ai-anthropic";
import { NodeHttpClient } from "@effect/platform-node";

/**
 * z.ai's anthropic-compat endpoint omits `usage.server_tool_use.web_fetch_requests`,
 * which @effect/ai-anthropic's response schema strictly requires. Inject it before
 * decoding — both for JSON responses and SSE event lines.
 */
const patchUsageJson = (body: any): any => {
  const stu = body?.usage?.server_tool_use;
  if (stu && typeof stu === "object" && !("web_fetch_requests" in stu)) {
    stu.web_fetch_requests = 0;
  }
  return body;
};

const patchZaiUsage = (client: HttpClient.HttpClient): HttpClient.HttpClient =>
  HttpC.transformResponse((effect) =>
    Effect.flatMap(effect, (response) => {
      const contentType = String(response.headers["content-type"] ?? "");
      if (contentType.includes("text/event-stream")) {
        const patched = response.stream.pipe(
          Stream.decodeText(),
          Stream.splitLines,
          Stream.map((line) => {
            if (!line.startsWith("data:")) return line + "\n";
            try {
              return `data: ${JSON.stringify(patchUsageJson(JSON.parse(line.slice(5))))}\n`;
            } catch {
              return line + "\n";
            }
          }),
          Stream.encodeText
        );
        const web = Stream.toReadableStream(patched);
        return Effect.succeed(
          HttpClientResponse.fromWeb(response.request, new Response(web, { status: response.status, headers: response.headers }))
        );
      }
      if (!contentType.includes("application/json")) return Effect.succeed(response);
      return Effect.flatMap(response.json, (body: any) =>
        Effect.succeed(
          HttpClientResponse.fromWeb(
            response.request,
            new Response(JSON.stringify(patchUsageJson(body)), {
              status: response.status,
              headers: response.headers
            })
          )
        )
      );
    })
  )(client);

const apiKey = Redacted.make(process.env.Z_AI_API_KEY ?? "");

export const ZaiAnthropicCompat = AnthropicClient.layer({
  apiKey,
  apiUrl: "https://api.z.ai/api/anthropic",
  transformClient: patchZaiUsage
});

// NOTE(effect-4): NodeHttpClient.layer was renamed — it's layerUndici / layerFetch / layerNodeHttp now.
export const Http = NodeHttpClient.layerUndici;
