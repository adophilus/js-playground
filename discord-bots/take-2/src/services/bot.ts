import { NodeHttpClient, NodeSocket } from '@effect/platform-node'
import { Effect, Layer, Config, Console } from 'effect'
import { Discord, DiscordConfig } from 'dfx'
import { DiscordIxLive, InteractionsRegistry } from 'dfx/gateway'

const DiscordLayer = DiscordIxLive.pipe(
  Layer.provide([
    DiscordConfig.layerConfig({
      token: Config.redacted('DISCORD_BOT_TOKEN')
    }),
    NodeHttpClient.layerUndici,
    NodeSocket.layerWebSocketConstructor
  ])
)

export const BotLayer = Layer.effectDiscard(
  Effect.gen(function* () {
    yield* Console.log('hello')
  })
).pipe(Layer.provide(DiscordLayer))
