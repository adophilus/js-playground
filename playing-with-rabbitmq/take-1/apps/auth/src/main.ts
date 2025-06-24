import { NodeRuntime } from '@effect/platform-node'
import { HttpLive } from './Http'
import { Layer } from 'effect'
import { TracingLive } from './Tracing'

HttpLive.pipe(Layer.provide(TracingLive), Layer.launch, NodeRuntime.runMain)
