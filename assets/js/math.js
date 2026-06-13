function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

/* =========================
   EXPORT FOR JEST (Node)
========================= */
if (typeof module !== "undefined") {
  module.exports = {
    add,
    subtract,
    multiply,
    divide,
    squareArea,
    rectangleArea,
    circleArea,
    cubeVolume
  };
}

/* =========================
   EXPOSE FOR BROWSER.
========================= */
if (typeof window !== "undefined") {
  window.MathLib = {
    add,
    subtract,
    multiply,
    divide,
    squareArea,
    rectangleArea,
    circleArea,
    cubeVolume
  };
}