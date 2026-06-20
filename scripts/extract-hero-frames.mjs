import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpeg from "ffmpeg-static";

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const video = path.join(repo, "public/hero-journey.mp4");
const outDir = path.join(repo, "public/frames");

if (!fs.existsSync(video)) {
  console.error(`Missing ${video}`);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });
const pattern = path.join(outDir, "frame_%04d.jpg");
execSync(`"${ffmpeg}" -y -i "${video}" -vf "fps=24,scale=1920:-1" -q:v 3 "${pattern}"`, { stdio: "inherit" });

const count = fs.readdirSync(outDir).filter((f) => f.endsWith(".jpg")).length;
const configPath = path.join(repo, "src/config/heroFrames.ts");
let text = fs.readFileSync(configPath, "utf8");
text = text.replace(/HERO_FRAME_COUNT = \d+/, `HERO_FRAME_COUNT = ${count}`);
fs.writeFileSync(configPath, text);
console.log(`FRAME_COUNT=${count}`);