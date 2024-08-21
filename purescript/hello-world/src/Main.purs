module Main
  ( main
  )
  where

import Prelude

import Effect (Effect)
import Effect.Console (log)
import Data.Number.Format (toString)
import Data.HelloWorld (fibonnaci)

main ::  Effect Unit
main = do
  log (toString (fibonnaci 10))