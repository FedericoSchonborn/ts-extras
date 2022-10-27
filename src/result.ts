export type Result<T, E> =
  | {
    type: "ok";
    ok: T;
  }
  | {
    type: "error";
    error: E;
  };

export function ok<T, E>(value: T): Result<T, E> {
  return { type: "ok", ok: value };
}

export function error<T, E>(error: E): Result<T, E> {
  return { type: "error", error: error };
}

export function isOk<T, E>(self: Result<T, E>): boolean {
  return self.type === "ok";
}

export function isError<T, E>(self: Result<T, E>): boolean {
  return self.type === "error";
}

export function match<T, E>(
  self: Result<T, E>,
  on: { ok?: (_: T) => void; error?: (_: E) => void },
): void {
  switch (self.type) {
    case "ok":
      if (on.ok) {
        return on.ok(self.ok);
      }
      break;
    case "error":
      if (on.error) {
        return on.error(self.error);
      }
      break;
  }
}

export function unwrap<T, E>(self: Result<T, E>): T {
  switch (self.type) {
    case "ok":
      return self.ok;
    case "error":
      throw new Error("call to Result.unwrap in error variant");
  }
}

export function map<T, E, U>(self: Result<T, E>, f: (_: T) => U): Result<U, E> {
  switch (self.type) {
    case "ok":
      return { type: "ok", ok: f(self.ok) };
    case "error":
      return { type: "error", error: self.error };
  }
}

export function ify<T>(
  f: (...args: unknown[]) => T,
  ...args: unknown[]
): Result<T, Error> {
  try {
    return { type: "ok", ok: f(...args) };
  } catch (error) {
    return { type: "error", error: error };
  }
}
