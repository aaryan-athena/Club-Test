import sharp from "sharp";
import { fileURLToPath } from "node:url";

const input = fileURLToPath(
  new URL("../public/south-math-club-keyed.png", import.meta.url),
);
const output = fileURLToPath(
  new URL("../public/south-math-club-cutout.png", import.meta.url),
);

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let index = 0; index < data.length; index += 4) {
  const red = data[index];
  const green = data[index + 1];
  const blue = data[index + 2];

  const keyScore = Math.min(red, blue) - green;
  const isKeyColored = keyScore > 45 && red > green && blue > green;

  if (!isKeyColored) continue;

  const alpha = Math.max(0, Math.min(1, (140 - keyScore) / 95));
  const keyCoverage = 1 - alpha;

  if (alpha <= 0.015) {
    data[index] = 0;
    data[index + 1] = 0;
    data[index + 2] = 0;
    data[index + 3] = 0;
    continue;
  }

  data[index] = Math.round(
    Math.max(0, Math.min(255, (red - 245 * keyCoverage) / alpha)),
  );
  data[index + 1] = Math.round(
    Math.max(0, Math.min(255, (green - 4 * keyCoverage) / alpha)),
  );
  data[index + 2] = Math.round(
    Math.max(0, Math.min(255, (blue - 225 * keyCoverage) / alpha)),
  );
  data[index + 3] = Math.round(255 * alpha);
}

await sharp(data, { raw: info }).png().toFile(output);

console.log(`Created ${output} (${info.width}x${info.height})`);
