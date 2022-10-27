export type Option<T> =
  | {
    type: "some";
    some: T;
  }
  | {
    type: "none";
  };

export function some<T>(value: T): Option<T> {
  return { type: "some", some: value };
}

export function none<T>(): Option<T> {
  return { type: "none" };
}

export function isSome<T>(self: Option<T>): boolean {
  return self.type === "some";
}

export function isNone<T>(self: Option<T>): boolean {
  return self.type === "none";
}

export function match<T>(
  self: Option<T>,
  on: { some?: (_: T) => void; none?: () => void },
) {
  switch (self.type) {
    case "some":
      if (on.some) {
        return on.some(self.some);
      }
      break;
    case "none":
      if (on.none) {
        return on.none();
      }
      break;
  }
}

export function unwrap<T>(self: Option<T>): T {
  switch (self.type) {
    case "some":
      return self.some;
    case "none":
      throw new Error("call to Option.unwrap in none variant");
  }
}

export function map<T, U>(self: Option<T>, f: (_: T) => U): Option<U> {
  switch (self.type) {
    case "some":
      return { type: "some", some: f(self.some) };
    case "none":
      return { type: "none" };
  }
}

export function ify<T>(
  f: (...args: unknown[]) => T | undefined,
): (...args: unknown[]) => Option<T> {
  return (...args) => {
    try {
      const value = f(...args);
      if (value !== undefined) {
        return { type: "some", some: value };
      } else {
        return { type: "none" };
      }
    } catch {
      return { type: "none" };
    }
  };
}
