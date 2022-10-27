# TypeScript Extras

Extras for TypeScript (`Result`, `Option`, `Either`).

## API

```typescript
namespace Either
  type Either<L, R> = { type: "left"; left: L; } | { type: "right"; right: R; }
  function left<L, R>(value: L): Either<L, R>
  function right<L, R>(right: R): Either<L, R>
  function isLeft<L, R>(self: Either<L, R>): boolean
  function isRight<L, R>(self: Either<L, R>): boolean
  function match<L, R>(self: Either<L, R>, on: { left: (_: L) => void; right: (_: R) => void; }): void
  function unwrapLeft<L, R>(self: Either<L, R>): L
  function unwrapRight<L, R>(self: Either<L, R>): R
  function mapLeft<L, R, U>(self: Either<L, R>, f: (_: L) => U): Either<U, R>
  function mapRight<L, R, U>(self: Either<L, R>, f: (_: R) => U): Either<L, U>

namespace Option
  type Option<T> = { type: "some"; some: T; } | { type: "none"; }
  function some<T>(value: T): Option<T>
  function none<T>(): Option<T>
  function isSome<T>(self: Option<T>): boolean
  function isNone<T>(self: Option<T>): boolean
  function match<T>(self: Option<T>, on: { some: (_: T) => void; none: () => void; })
  function unwrap<T>(self: Option<T>): T
  function map<T, U>(self: Option<T>, f: (_: T) => U): Option<U>
  function ify<T>(f: (...args: unknown[]) => T | undefined): (...args: unknown[]) => Option<T>

namespace Result
  type Result<T, E> = { type: "ok"; ok: T; } | { type: "error"; error: E; }
  function ok<T, E>(value: T): Result<T, E>
  function error<T, E>(error: E): Result<T, E>
  function isOk<T, E>(self: Result<T, E>): boolean
  function isError<T, E>(self: Result<T, E>): boolean
  function match<T, E>(self: Result<T, E>, on: { ok: (_: T) => void; error: (_: E) => void; }): void
  function unwrap<T, E>(self: Result<T, E>): T
  function map<T, E, U>(self: Result<T, E>, f: (_: T) => U): Result<U, E>
  function ify<T>(f: (...args: unknown[]) => T): (...args: unknown[]) => Result<T, Error>
```
