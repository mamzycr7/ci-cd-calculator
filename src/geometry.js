function calculateShape(shape, v1, v2) {
  if (isNaN(v1)) {
    throw new Error("Value1 required");
  }

  let result;

  switch (shape) {
    case "rectangle":
      if (isNaN(v2)) throw new Error("Value2 required");
      result = v1 * v2;
      break;

    case "triangle":
      if (isNaN(v2)) throw new Error("Value2 required");
      result = 0.5 * v1 * v2;
      break;

    case "circle":
      result = Math.PI * v1 * v1;
      break;

    case "square":
      result = v1 * v1;
      break;

    case "perimeterSquare":
      result = 4 * v1;
      break;

    case "perimeterRectangle":
      if (isNaN(v2)) throw new Error("Value2 required");
      result = 2 * (v1 + v2);
      break;

    case "cubeVolume":
      result = v1 * v1 * v1;
      break;

    case "cylinderVolume":
      if (isNaN(v2)) throw new Error("Height required");
      result = Math.PI * v1 * v1 * v2;
      break;

    default:
      throw new Error("Invalid shape");
  }

  return parseFloat(result.toFixed(4));
}

module.exports = { calculateShape };