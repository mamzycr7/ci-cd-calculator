const {
  add,
  subtract,
  multiply,
  divide,
  pi
} = require("../assets/js/math");

describe("Basic Calculator Functions", () => {

  test("adds numbers correctly", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("subtracts numbers correctly", () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test("multiplies numbers correctly", () => {
    expect(multiply(3, 4)).toBe(12);
  });

  test("divides numbers correctly", () => {
    expect(divide(10, 2)).toBe(5);
  });

});

describe("Pi Function", () => {

  test("pi", () => {
    expect(pi()).toBeCloseTo(3.14159, 5);
  });

});