import * as NodeSdk from '@effect/opentelemetry/NodeSdk'
import { Config, Effect, Layer, Redacted } from 'effect'
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'

export const TracingLive = Layer.unwrapEffect(
  Effect.gen(function* () {
    const apiKey = yield* Config.redacted('HONEYCOMB_API_KEY')
    const dataset = yield* Config.string('HONEYCOMB_DATASET')

    const headers = {
      'X-Honeycomb-Team': Redacted.value(apiKey),
      'X-Honeycomb-Dataset': dataset
    }

    return NodeSdk.layer(() => ({
      resouce: {
        serviceName: dataset
      },
      spanProcessor: new BatchSpanProcessor(
        new OTLPTraceExporter({
          url: 'https://api.honeycomb.io/v1/traces',
          headers
        })
      )
    }))
  })
)
