module Data.HelloWorld where

import Prelude

fibonnaci :: Int -> Int
fibonnaci 0 = 1
fibonnaci 1 = 1
fibonnaci n = n * fibonnaci (n - 1)