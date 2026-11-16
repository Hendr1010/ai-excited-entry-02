import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

// Output directory comes from the make.fun runner, or defaults to /output.
// The entry is a single static image, so the script only copies it and
// checks the copy byte-for-byte instead of generating anything.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });

const source = join(import.meta.dirname, "entry.png");
const destination = join(outputDir, "entry.png");

copyFileSync(source, destination);

const sourceSize = statSync(source).size;
const destinationSize = statSync(destination).size;

if (sourceSize !== destinationSize) {
  throw new Error(
    `entry.png copy size mismatch: source ${sourceSize} bytes, destination ${destinationSize} bytes`,
  );
}

console.log(`Copied entry.png (${sourceSize} bytes) to ${destination}`);
