const { calculateShape } = require('../src/geometry');

describe('Geometry Calculator', () => {

  test('rectangle area', () => {
    expect(calculateShape('rectangle', 5, 4)).toBe(20);
  });

  test('triangle area', () => {
    expect(calculateShape('triangle', 10, 5)).toBe(25);
  });

  test('circle area', () => {
    expect(calculateShape('circle', 3)).toBeCloseTo(28.2743);
  });

  test('square area', () => {
    expect(calculateShape('square', 4)).toBe(16);
  });

  test('perimeter square', () => {
    expect(calculateShape('perimeterSquare', 6)).toBe(24);
  });

  test('perimeter rectangle', () => {
    expect(calculateShape('perimeterRectangle', 5, 3)).toBe(16);
  });

  test('cube volume', () => {
    expect(calculateShape('cubeVolume', 3)).toBe(27);
  });

  test('cylinder volume', () => {
    expect(calculateShape('cylinderVolume', 2, 5)).toBeCloseTo(62.8318);
  });

  test('invalid shape throws error', () => {
    expect(() => calculateShape('unknown', 2, 3)).toThrow();
  });

  test('missing value throws error', () => {
    expect(() => calculateShape('rectangle', NaN, 3)).toThrow();
  });

});