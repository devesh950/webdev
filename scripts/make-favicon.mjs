/**
 * Generates public/favicon.ico — a gold plate mark on charcoal, at 16/32/48px.
 * Run with `node scripts/make-favicon.mjs`; the generated .ico is committed.
 *
 * 32-bit ICO DIBs are BGRA, so pixel channels are written B,G,R,A below while
 * the colour constants stay human-readable as R,G,B.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const CHARCOAL = [0x10, 0x10, 0x10, 0xff]; // R,G,B,A
const GOLD = [0xc8, 0xa9, 0x6b, 0xff]; // R,G,B,A  (#C8A96B)

/** Plate: gold rim plus a horizontal divider, on a charcoal disc. */
function renderPixel(x, y, size) {
  const centre = (size - 1) / 2;
  const dx = x - centre;
  const dy = y - centre;
  const radius = Math.hypot(dx, dy);

  const outer = size * 0.47;
  const inner = size * 0.34;
  const ring = size * 0.085;

  if (radius > outer) return [0, 0, 0, 0]; // transparent outside the disc

  // The divider is tested first: inside the plate it must win over the fill.
  // It runs the full width so it survives being scaled down to 16px.
  if (Math.abs(dy) <= size * 0.06) return GOLD;

  if (radius >= inner - ring && radius <= inner + ring) return GOLD; // rim

  return CHARCOAL;
}

/** Packs a 32-bit bitmap into a BMP-in-ICO DIB with an AND mask. */
function buildIcon(size) {
  const headerSize = 40;
  const pixels = Buffer.alloc(size * size * 4);

  // BMP rows are stored bottom-up.
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const [r, g, b, a] = renderPixel(col, size - 1 - row, size);
      const offset = (row * size + col) * 4;
      pixels[offset] = b;
      pixels[offset + 1] = g;
      pixels[offset + 2] = r;
      pixels[offset + 3] = a;
    }
  }

  const maskRowBytes = Math.ceil(size / 32) * 4;
  const mask = Buffer.alloc(maskRowBytes * size, 0);

  const dib = Buffer.alloc(headerSize);
  dib.writeUInt32LE(headerSize, 0);
  dib.writeInt32LE(size, 4);
  dib.writeInt32LE(size * 2, 8); // height * 2 = colour image + AND mask
  dib.writeUInt16LE(1, 12); // colour planes
  dib.writeUInt16LE(32, 14); // bits per pixel
  dib.writeUInt32LE(0, 16); // BI_RGB
  dib.writeUInt32LE(pixels.length + mask.length, 20);

  return { dib: Buffer.concat([dib, pixels, mask]), size };
}

const entries = [16, 32, 48].map(buildIcon);

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(entries.length, 4);

const directory = [];
let offset = 6 + entries.length * 16;

for (const entry of entries) {
  const dir = Buffer.alloc(16);
  dir.writeUInt8(entry.size, 0); // width (0 would mean 256)
  dir.writeUInt8(entry.size, 1); // height
  dir.writeUInt8(0, 2); // palette size
  dir.writeUInt8(0, 3); // reserved
  dir.writeUInt16LE(1, 4); // colour planes
  dir.writeUInt16LE(32, 6); // bits per pixel
  dir.writeUInt32LE(entry.dib.length, 8);
  dir.writeUInt32LE(offset, 12);
  directory.push(dir);
  offset += entry.dib.length;
}

const outDir = path.join(process.cwd(), 'public');
mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, 'favicon.ico');
writeFileSync(
  outFile,
  Buffer.concat([header, ...directory, ...entries.map((entry) => entry.dib)]),
);

console.log(`Wrote ${outFile} (${entries.length} sizes, ${offset} bytes)`);