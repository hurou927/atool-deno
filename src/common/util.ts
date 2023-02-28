import {either} from "fp-ts"

export function eitherCond<T, E>(c: boolean, onTrue: () => T, onFalse: () => E): either.Either<E, T> {
  if (c) {
    return either.right(onTrue());
  } else {
    return either.left(onFalse());
  }
}
