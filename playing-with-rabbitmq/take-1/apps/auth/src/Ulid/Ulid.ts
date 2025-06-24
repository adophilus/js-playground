import { Effect, Layer } from 'effect'
import { ulid } from 'ulidx'

export class Ulid extends Effect.Service<Ulid>()('Ulid', {
  succeed: {
    generate: Effect.sync(() => ulid())
  }
}) {
  static Test = Layer.succeed(
    Ulid,
    new Ulid({ generate: Effect.succeed('test-ulid') })
  )
}
