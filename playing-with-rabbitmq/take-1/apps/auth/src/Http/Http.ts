import {
  HttpApiBuilder,
  HttpApiScalar,
  HttpMiddleware,
  HttpServer
} from '@effect/platform'
import { Layer } from 'effect'
import { Api } from '../Api'
import { HttpAccountsLive } from '../Accounts/Http'
import { NodeHttpServer } from '@effect/platform-node'
import { createServer } from 'node:http'

const ApiLive = Layer.provide(HttpApiBuilder.api(Api), [HttpAccountsLive])

export const HttpLive = HttpApiBuilder.serve(HttpMiddleware.logger).pipe(
  Layer.provide(HttpApiScalar.layer()),
  Layer.provide(HttpApiBuilder.middlewareOpenApi()),
  Layer.provide(HttpApiBuilder.middlewareCors()),
  Layer.provide(ApiLive),
  HttpServer.withLogAddress,
  Layer.provide(NodeHttpServer.layer(createServer, { port: 3000 }))
)
