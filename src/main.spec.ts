import { describe, expect, it } from "bun:test";

import { test } from "./main";

describe("test", () => {
  it("should return test", () => {
    expect(test()).toBe("test");
  });
});