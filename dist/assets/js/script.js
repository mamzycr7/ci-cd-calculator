// ===============================
// 🧠 SMART RESULT MEMORY FEATURE
// ===============================

let LAST_RESULT = 0;
var currentExpression = "";

// ------------------------------
// Theme Toggle Logic
// ------------------------------
function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById("theme-toggle");

  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    btn.innerHTML = "☀️";
    btn.title = "Switch to light mode";
    localStorage.setItem("theme", "dark");
  } else {
    btn.innerHTML = "🌙";
    btn.title = "Switch to dark mode";
    localStorage.setItem("theme", "light");
  }
}

// Set theme on page load from localStorage
window.addEventListener("DOMContentLoaded", function () {
  const theme = localStorage.getItem("theme");
  const body = document.body;
  const btn = document.getElementById("theme-toggle");

  if (btn) {
    if (theme === "dark") {
      body.classList.add("dark-mode");
      btn.innerHTML = "☀️";
      btn.title = "Switch to light mode";
    } else {
      btn.innerHTML = "🌙";
      btn.title = "Switch to dark mode";
    }
  }
});

// ------------------------------
// Calculator State
// ------------------------------
let left = "";
let operator = "";
let right = "";
let steps = [];
const MAX_STEPS = 6;

// ------------------------------
// Basic Calculator Functions
// ------------------------------
function appendToResult(value) {
  currentExpression += value.toString();
  updateResult();
}

function bracketToResult(value) {
  currentExpression += value;
  updateResult();
}

function backspace() {
  currentExpression = currentExpression.slice(0, -1);
  updateResult();
}

function operatorToResult(value) {
  if (value === "^") {
    currentExpression += "**";
  } else {
    currentExpression += value;
  }
  updateResult();
}

function clearResult() {
  currentExpression = "";
  updateResult();
}


function normalizeExpression(expr) {
  return expr
    .replace(/asin\(/g, "asinDeg(")
    .replace(/acos\(/g, "acosDeg(")
    .replace(/atan\(/g, "atanDeg(")
    .replace(/sin\(/g, "sinDeg(")
    .replace(/cos\(/g, "cosDeg(")
    .replace(/tan\(/g, "tanDeg(")
    .replace(/asinh\(/g, "asinh(")
    .replace(/sinh\(/g, "sinh(")
    .replace(/\be\b/g, "Math.E")
    .replace(/\bpi\b/g, "Math.PI");
}

function percentToResult() {
  if (!currentExpression) return;

  const match = currentExpression.match(/(.+?)(\*\*|[+\-*/^])([0-9.]*)$/);

  if (!match) {
    const num = parseFloat(currentExpression);
    if (isNaN(num)) return;

    currentExpression = (num / 100).toString();
  } else {
    const leftPart = match[1];
    const rightPart = match[3];

    if (!rightPart) return;

    let leftVal;

    try {
      leftVal = eval(leftPart);
    } catch (e) {
      leftVal = parseFloat(leftPart);
    }

    const rightVal = parseFloat(rightPart);
    if (isNaN(leftVal) || isNaN(rightVal)) return;

    const percentVal = (leftVal * rightVal) / 100;

    currentExpression = percentVal.toString();
  }

  // 🔥 ADD THIS LINE
  currentExpression += "*";

  updateResult();
}

// ------------------------------
// Calculate Result
// ------------------------------
function calculateExpression(expression) {
  try {

    let normalizedExpression = normalizeExpression(expression);

    // 🧠 Replace "ans" with last result automatically
    normalizedExpression = normalizedExpression.replace(
      /\bans\b/gi,
      LAST_RESULT,
    );

    // Calculate result
    let result = eval(normalizedExpression);
    console.log("Calculated result for expression:", expression, "->", result);

    if (isNaN(result) || !isFinite(result)) {
      throw new Error();
    }

    return result;
  } catch (e) {
    return "Error";
  }
}
function calculateResult() {
  if (!currentExpression) return;
  const display = document.getElementById("result");
  // Calculate result
  let result = calculateExpression(currentExpression);
  result = String(result);

  // Save result for future expressions
  LAST_RESULT = result;

  // Display normally
  display.value = result;

  currentExpression = result;
  updateResult();
}


function updateResult() {
  document.getElementById("result").value = currentExpression || "0";
}

// ===============================
// 📐 GEOMETRY MODAL FEATURE
// ===============================

// Open modal
function openGeoModal() {
  const modal = new bootstrap.Modal(document.getElementById("geoModal"));
  modal.show();
}

// Dynamic inputs based on shape
document.addEventListener("change", function (e) {
  if (e.target.id === "shape") {
    renderInputs(e.target.value);
  }
});

function renderInputs(shape) {
  const area = document.getElementById("inputsArea");

  switch (shape) {
    case "square":
      area.innerHTML = `<input id="side" class="form-control" placeholder="Side length">`;
      break;

    case "rectangle":
      area.innerHTML = `
        <input id="length" class="form-control mb-2" placeholder="Length">
        <input id="width" class="form-control" placeholder="Width">
      `;
      break;

    case "circle":
      area.innerHTML = `<input id="radius" class="form-control" placeholder="Radius">`;
      break;

    case "cube":
      area.innerHTML = `<input id="side" class="form-control" placeholder="Side length">`;
      break;

    case "cylinder":
      area.innerHTML = `
        <input id="radius" class="form-control mb-2" placeholder="Radius">
        <input id="height" class="form-control" placeholder="Height">
      `;
      break;
  }
}

function computeGeometry() {
  const shape = document.getElementById("shape").value;
  const op = document.getElementById("operation").value;

  let result = 0;

  switch (shape) {

    case "square": {
      const s = parseFloat(document.getElementById("side").value);

      if (op === "area") result = MathLib.squareArea(s);
      if (op === "perimeter") result = MathLib.multiply(4, s);
      break;
    }

    case "rectangle": {
      const l = parseFloat(document.getElementById("length").value);
      const w = parseFloat(document.getElementById("width").value);

      if (op === "area") result = MathLib.rectangleArea(l, w);
      if (op === "perimeter") result = MathLib.multiply(2, MathLib.add(l, w));
      break;
    }

    case "circle": {
      const r = parseFloat(document.getElementById("radius").value);

      if (op === "area") result = MathLib.circleArea(r);
      if (op === "perimeter") result = MathLib.multiply(2, MathLib.multiply(Math.PI, r));
      break;
    }

    case "cube": {
      const s = parseFloat(document.getElementById("side").value);

      if (op === "area") result = MathLib.multiply(6, MathLib.squareArea(s));
      if (op === "perimeter") result = MathLib.multiply(12, s);
      if (op === "volume") result = MathLib.cubeVolume(s);
      break;
    }

    case "cylinder": {
      const r = parseFloat(document.getElementById("radius").value);
      const h = parseFloat(document.getElementById("height").value);

      if (op === "area") {
        result = MathLib.multiply(
          2 * Math.PI,
          MathLib.add(MathLib.squareArea(r), MathLib.multiply(r, h))
        );
      }

      if (op === "volume") {
        result = MathLib.multiply(Math.PI, MathLib.multiply(MathLib.squareArea(r), h));
      }

      break;
    }
  }

  if (isNaN(result)) {
    alert("Invalid input");
    return;
  }

  result = Number(result.toFixed(2));

  LAST_RESULT = result;
  currentExpression = result.toString();
  updateResult();

  const resBox = document.getElementById("geoResult");
  resBox.classList.remove("d-none");
  resBox.innerText = "Result: " + result;
}