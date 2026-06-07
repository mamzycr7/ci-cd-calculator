const {
  add,
  subtract,
  multiply,
  divide,
  squareArea,
  rectangleArea,
  circleArea,
  cubeVolume
} = require("../utils/math");

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

describe("Geometry Functions", () => {

  test("square area", () => {
    expect(squareArea(4)).toBe(16);
  });

  test("rectangle area", () => {
    expect(rectangleArea(4, 5)).toBe(20);
  });

  test("circle area", () => {
    expect(circleArea(3)).toBeCloseTo(28.274, 2);
  });

  test("cube volume", () => {
    expect(cubeVolume(3)).toBe(27);
  });

});