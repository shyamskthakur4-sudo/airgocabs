const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcPath = 'C:/Users/USER/.gemini/antigravity/brain/f0b4cacc-2724-468f-b5ab-a5db414eba65/.user_uploaded/media_1794909935623_acdd8093.jpg';

async function extract() {
  const meta = await sharp(srcPath).metadata();
  console.log('Source image dimensions:', meta.width, meta.height);

  // Top logo lockup region:
  // In the 571 x 1024 image:
  // The top lockup [Emblem] AIRGOCABS starts around y=90 and ends around y=180, x from 80 to 490
  // Let's extract a generous region first and find exact bounding box
  const topExtract = await sharp(srcPath)
    .extract({ left: 60, top: 75, width: 450, height: 125 })
    .toBuffer();

  // Convert pure white background to transparent for seamless integration on #F7F7F5 or any background
  // The background in the source image is pure white #FFFFFF (or close to 255)
  const rawTop = await sharp(topExtract).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { data, info } = rawTop;

  // Find tight bounding box of non-white pixels
  let minX = info.width, minY = info.height, maxX = 0, maxY = 0;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * 4;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      // If not white
      if (r < 245 || g < 245 || b < 245) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log('Detected top lockup bounds:', { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY });

  // Add a small 4px padding
  const pad = 4;
  const cropLeft = Math.max(0, minX - pad);
  const cropTop = Math.max(0, minY - pad);
  const cropWidth = Math.min(info.width - cropLeft, (maxX - minX) + pad * 2);
  const cropHeight = Math.min(info.height - cropTop, (maxY - minY) + pad * 2);

  // Crop tight lockup
  const croppedBuffer = await sharp(topExtract)
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Make near-white background transparent while preserving anti-aliased edge blending
  const transparentData = Buffer.from(croppedBuffer.data);
  for (let i = 0; i < transparentData.length; i += 4) {
    const r = transparentData[i];
    const g = transparentData[i + 1];
    const b = transparentData[i + 2];
    
    // Background is white: calculate luminance
    if (r > 240 && g > 240 && b > 240) {
      // Linear ramp for smooth alpha antialiasing near edges
      const brightness = (r + g + b) / 3;
      if (brightness >= 252) {
        transparentData[i + 3] = 0;
      } else {
        const factor = (252 - brightness) / 12; // 0 to 1
        transparentData[i + 3] = Math.round(factor * 255);
      }
    }
  }

  const transparentLogo = await sharp(transparentData, {
    raw: {
      width: croppedBuffer.info.width,
      height: croppedBuffer.info.height,
      channels: 4
    }
  }).png().toBuffer();

  fs.writeFileSync('public/logo.png', transparentLogo);
  fs.writeFileSync('public/images/logo.png', transparentLogo);
  console.log('Saved public/logo.png successfully! Size:', croppedBuffer.info.width, 'x', croppedBuffer.info.height);

  // Extract Standalone Emblem Mark from middle: around y=280 to y=450
  const emblemExtract = await sharp(srcPath)
    .extract({ left: 180, top: 290, width: 210, height: 160 })
    .toBuffer();

  const rawEmblem = await sharp(emblemExtract).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let eMinX = rawEmblem.info.width, eMinY = rawEmblem.info.height, eMaxX = 0, eMaxY = 0;
  for (let y = 0; y < rawEmblem.info.height; y++) {
    for (let x = 0; x < rawEmblem.info.width; x++) {
      const idx = (y * rawEmblem.info.width + x) * 4;
      const r = rawEmblem.data[idx], g = rawEmblem.data[idx + 1], b = rawEmblem.data[idx + 2];
      if (r < 245 || g < 245 || b < 245) {
        if (x < eMinX) eMinX = x;
        if (x > eMaxX) eMaxX = x;
        if (y < eMinY) eMinY = y;
        if (y > eMaxY) eMaxY = y;
      }
    }
  }

  const eCropLeft = Math.max(0, eMinX - pad);
  const eCropTop = Math.max(0, eMinY - pad);
  const eCropWidth = Math.min(rawEmblem.info.width - eCropLeft, (eMaxX - eMinX) + pad * 2);
  const eCropHeight = Math.min(rawEmblem.info.height - eCropTop, (eMaxY - eMinY) + pad * 2);

  const croppedEmblemBuffer = await sharp(emblemExtract)
    .extract({ left: eCropLeft, top: eCropTop, width: eCropWidth, height: eCropHeight })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const emblemTransparent = Buffer.from(croppedEmblemBuffer.data);
  for (let i = 0; i < emblemTransparent.length; i += 4) {
    const r = emblemTransparent[i], g = emblemTransparent[i + 1], b = emblemTransparent[i + 2];
    if (r > 240 && g > 240 && b > 240) {
      const brightness = (r + g + b) / 3;
      if (brightness >= 252) {
        emblemTransparent[i + 3] = 0;
      } else {
        const factor = (252 - brightness) / 12;
        emblemTransparent[i + 3] = Math.round(factor * 255);
      }
    }
  }

  const markLogo = await sharp(emblemTransparent, {
    raw: {
      width: croppedEmblemBuffer.info.width,
      height: croppedEmblemBuffer.info.height,
      channels: 4
    }
  }).png().toBuffer();

  fs.writeFileSync('public/logo-mark.png', markLogo);
  console.log('Saved public/logo-mark.png successfully! Size:', croppedEmblemBuffer.info.width, 'x', croppedEmblemBuffer.info.height);

  // Also extract White Logo Variant from the dark midnight navy block (around y=520 to y=680, x=280 to x=570)
  // for when the logo sits on dark backgrounds (e.g. Midnight Navy or Obsidian footer)
  const darkBlockExtract = await sharp(srcPath)
    .extract({ left: 290, top: 540, width: 250, height: 130 })
    .toBuffer();

  const rawDark = await sharp(darkBlockExtract).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let dMinX = rawDark.info.width, dMinY = rawDark.info.height, dMaxX = 0, dMaxY = 0;
  for (let y = 0; y < rawDark.info.height; y++) {
    for (let x = 0; x < rawDark.info.width; x++) {
      const idx = (y * rawDark.info.width + x) * 4;
      const r = rawDark.data[idx], g = rawDark.data[idx + 1], b = rawDark.data[idx + 2];
      // Looking for white icon in dark #101B2B background (r,g,b > 150)
      if (r > 120 || g > 120 || b > 120) {
        if (x < dMinX) dMinX = x;
        if (x > dMaxX) dMaxX = x;
        if (y < dMinY) dMinY = y;
        if (y > dMaxY) dMaxY = y;
      }
    }
  }

  if (dMaxX > dMinX && dMaxY > dMinY) {
    const dCropLeft = Math.max(0, dMinX - pad);
    const dCropTop = Math.max(0, dMinY - pad);
    const dCropWidth = Math.min(rawDark.info.width - dCropLeft, (dMaxX - dMinX) + pad * 2);
    const dCropHeight = Math.min(rawDark.info.height - dCropTop, (dMaxY - dMinY) + pad * 2);

    const croppedDarkBuffer = await sharp(darkBlockExtract)
      .extract({ left: dCropLeft, top: dCropTop, width: dCropWidth, height: dCropHeight })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const darkTransparent = Buffer.from(croppedDarkBuffer.data);
    for (let i = 0; i < darkTransparent.length; i += 4) {
      const r = darkTransparent[i], g = darkTransparent[i + 1], b = darkTransparent[i + 2];
      // Dark background is around r: 16, g: 27, b: 43 (#101B2B)
      if (r < 60 && g < 75 && b < 95) {
        darkTransparent[i + 3] = 0;
      }
    }

    const whiteEmblem = await sharp(darkTransparent, {
      raw: {
        width: croppedDarkBuffer.info.width,
        height: croppedDarkBuffer.info.height,
        channels: 4
      }
    }).png().toBuffer();

    fs.writeFileSync('public/logo-white.png', whiteEmblem);
    console.log('Saved public/logo-white.png successfully!');
  }
}

extract().catch(console.error);
