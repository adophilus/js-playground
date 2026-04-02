import { DevTools } from "@effect/experimental";
import { Effect, Layer } from "effect";
import { NodeSdk } from "@effect/opentelemetry";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
// import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";

// diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const someComputationTask = Effect.logInfo(
	"Calculated the answer to life, the universe, and everything",
).pipe(Effect.delay(5000), Effect.withSpan("someComputationTask"));

const program = someComputationTask.pipe(Effect.forever);

const NodeSdkLive = NodeSdk.layer(() => ({
	resource: { serviceName: "checking-out-otel" },
	spanProcessor: new BatchSpanProcessor(
		new OTLPTraceExporter({
			url: "http://localhost:5080/api/default/v1/traces",
			headers: {
				Authorization: "Basic " + process.env.OTEL_API_KEY,
			},
		}),
	),
}));

const AppDepLive = NodeSdkLive;

program.pipe(
	Effect.provide(AppDepLive),
	Effect.catchAllCause(Effect.logError),
	Effect.runPromise,
);
