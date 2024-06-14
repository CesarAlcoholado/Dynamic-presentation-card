const rgbToHex = (r, g, b) =>
  "#" +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("");

function rgbDistance(color1, color2) {
  let rDiff = Math.pow(color1[0] - color2[0], 2);
  let gDiff = Math.pow(color1[1] - color2[1], 2);
  let bDiff = Math.pow(color1[2] - color2[2], 2);
  return Math.sqrt(rDiff + gDiff + bDiff);
}

function findDissimilarColor(primaryColor, colorPalette) {
  let maxDistance = -1;
  let secondaryColor = null;

  colorPalette.forEach((color) => {
    let distance = rgbDistance(primaryColor, color);
    if (distance > maxDistance) {
      maxDistance = distance;
      secondaryColor = color;
    }
  });

  return secondaryColor;
}

function isDarkColor(color) {
  // Calculate relative luminance
  let luminance =
    0.2126 * (color[0] / 255) +
    0.7152 * (color[1] / 255) +
    0.0722 * (color[2] / 255);

  // Return true if luminance is less than 0.5, false otherwise
  return luminance < 0.5;
}

module.exports = { rgbToHex, isDarkColor, findDissimilarColor, rgbDistance };
