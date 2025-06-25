import { Layer } from 'effect'
import { BotLayer } from './services/bot'
import { NodeRuntime } from '@effect/platform-node'

const MainLive = Layer.mergeAll(BotLayer)

NodeRuntime.runMain(Layer.launch(MainLive))
