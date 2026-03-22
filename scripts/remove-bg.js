const sharp = require('sharp');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const IMAGES = ['csm-logo', 'coastaflow-logo', 'coastaclaw-logo', 'lowcountry-logo'];

async function removeWhiteBg(inputPath, outputPath) {
  const image = sharp(inputPath);
  const { width, height } = await image.metadata();

  // Get raw pixel data
  const { data, info } = await image
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const numPixels = width * height;
  const numChannels = info.channels; // 3 (RGB)

  // RGBA output buffer
  const rgba = Buffer.alloc(numPixels * 4);

  for (let i = 0; i < numPixels; i++) {
    const srcIdx = i * numChannels;
    const r = data[srcIdx];
    const g = data[srcIdx + 1];
    const b = data[srcIdx + 2];

    const outIdx = i * 4;
    rgba[outIdx] = r;
    rgba[outIdx + 1] = g;
    rgba[outIdx + 2] = b;

    // Near-white → transparent (alpha = 0), otherwise opaque (alpha = 255)
    if (r > 240 && g > 240 && b > 240) {
      rgba[outIdx + 3] = 0;
    } else {
      rgba[outIdx + 3] = 255;
    }
  }

  await sharp(rgba, {
    raw: { width, height, channels: 4 }
  })
    .png()
    .toFile(outputPath);

  console.log(`✓ Saved: ${outputPath}`);
}

async function main() {
  for (const name of IMAGES) {
    const input = path.join(PUBLIC_DIR, `${name}.jpg`);
    const output = path.join(PUBLIC_DIR, `${name}.png`);
    try {
      await removeWhiteBg(input, output);
    } catch (err) {
      console.error(`✗ Failed on ${name}: ${err.message}`);
    }
  }
  console.log('\nDone.');
}

main();
