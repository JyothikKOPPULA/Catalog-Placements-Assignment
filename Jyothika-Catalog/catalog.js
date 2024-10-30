const fs = require("fs");

function decodeValue(value, base) {
  let result = 0;
  for (const char of value) {
    const digit = isNaN(char)
      ? char.charCodeAt(0) - "a".charCodeAt(0) + 10
      : parseInt(char);
    result = result * base + digit;
  }
  return result;
}

function findConstantTerm(points, k) {
  let c = 0;
  const n = points.length;

  for (let i = 0; i < k; i++) {
    const [xi, yi] = points[i];
    let term = yi;

    for (let j = 0; j < k; j++) {
      if (j !== i) {
        const xj = points[j][0];
        term *= (0 - xj) / (xi - xj);
      }
    }
    c += term;
  }
  return Math.round(c);
}

function processFile(filePath) {
  const data = fs.readFileSync(filePath, "utf8");
  const json = JSON.parse(data);

  const n = json.keys.n;
  const k = json.keys.k;
  const points = [];

  for (const [key, value] of Object.entries(json)) {
    if (key !== "keys") {
      const x = parseInt(key);
      const base = parseInt(value.base);
      const y = decodeValue(value.value, base);
      points.push([x, y]);
    }
  }

  points.sort((a, b) => a[0] - b[0]);

  const c = findConstantTerm(points, k);
  console.log(`The constant term c for file ${filePath} is: ${c}`);
}

processFile("testcase1.json");
processFile("testcase2.json");
