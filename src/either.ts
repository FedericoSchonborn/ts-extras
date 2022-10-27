export type Either<L, R> =
  | {
    type: "left";
    left: L;
  }
  | {
    type: "right";
    right: R;
  };

export function left<L, R>(value: L): Either<L, R> {
  return { type: "left", left: value };
}

export function right<L, R>(right: R): Either<L, R> {
  return { type: "right", right: right };
}

export function isLeft<L, R>(self: Either<L, R>): boolean {
  return self.type === "left";
}

export function isRight<L, R>(self: Either<L, R>): boolean {
  return self.type === "right";
}

export function match<L, R>(
  self: Either<L, R>,
  on: { left?: (_: L) => void; right?: (_: R) => void },
): void {
  switch (self.type) {
    case "left":
      if (on.left) {
        return on.left(self.left);
      }
      break;
    case "right":
      if (on.right) {
        return on.right(self.right);
      }
      break;
  }
}

export function unwrapLeft<L, R>(self: Either<L, R>): L {
  switch (self.type) {
    case "left":
      return self.left;
    case "right":
      throw new Error("call to Either.unwrapLeft in right variant");
  }
}

export function unwrapRight<L, R>(self: Either<L, R>): R {
  switch (self.type) {
    case "left":
      throw new Error("call to Either.unwrapRight in left variant");
    case "right":
      return self.right;
  }
}

export function mapLeft<L, R, U>(
  self: Either<L, R>,
  f: (_: L) => U,
): Either<U, R> {
  switch (self.type) {
    case "left":
      return { type: "left", left: f(self.left) };
    case "right":
      return { type: "right", right: self.right };
  }
}

export function mapRight<L, R, U>(
  self: Either<L, R>,
  f: (_: R) => U,
): Either<L, U> {
  switch (self.type) {
    case "left":
      return { type: "left", left: self.left };
    case "right":
      return { type: "right", right: f(self.right) };
  }
}
