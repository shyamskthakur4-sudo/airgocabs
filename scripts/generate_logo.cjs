const fs = require('fs');
const zlib = require('zlib');

// Minimal pure Node PNG builder
function createPng(width, height, drawFn) {
  const buffer = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const [r, g, b, a] = drawFn(x, y, width, height);
      buffer[idx] = r;
      buffer[idx + 1] = g;
      buffer[idx + 2] = b;
      buffer[idx + 3] = a;
    }
  }

  // PNG filter byte (0 for None) for each scanline
  const scanlines = Buffer.alloc(height * (width * 4 + 1));
  for (let y = 0; y < height; y++) {
    const scanlineOffset = y * (width * 4 + 1);
    scanlines[scanlineOffset] = 0; // Filter: None
    buffer.copy(scanlines, scanlineOffset + 1, y * width * 4, (y + 1) * width * 4);
  }

  const compressed = zlib.deflateSync(scanlines);

  function crc32(buf) {
    let crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c;
  }

  function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    const crc = crc32(Buffer.concat([typeBuf, data]));
    crcBuf.writeUInt32BE(crc, 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type: RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

// Generate a luxury dark metallic badge logo for initial display
const png = createPng(280, 64, (x, y, w, h) => {
  // Transparent background
  if (x < 4 || x >= w - 4 || y < 4 || y >= h - 4) {
    return [0, 0, 0, 0];
  }
  // Subtle amber-gold emblem area on left
  if (x < 56) {
    const cx = 30, cy = 32, r = 22;
    const dx = x - cx, dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist <= r) {
      if (dist >= r - 2) return [229, 169, 60, 255]; // Gold ring
      // Wing chevron in center
      if (y > 20 && y < 44 && Math.abs(x - 30) < (44 - y) * 0.7) {
        return [229, 169, 60, 255];
      }
      return [16, 20, 28, 255];
    }
    return [0, 0, 0, 0];
  }
  
  // Right side: stylized metallic lettering lines
  if (y >= 22 && y <= 42) {
    // Top text bar (AIRGOCABS)
    if (x >= 64 && x <= 260) {
      if (x >= 170) return [229, 169, 60, 240]; // CABS in gold
      return [248, 249, 250, 240]; // AIRGO in off-white
    }
  }
  if (y >= 46 && y <= 50) {
    // Tagline bar (INDORE CAR RENTALS)
    if (x >= 64 && x <= 220) {
      return [156, 163, 175, 200];
    }
  }

  return [0, 0, 0, 0];
});

fs.writeFileSync('public/logo.png', png);
console.log('Generated public/logo.png successfully!');
