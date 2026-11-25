import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I deleted the file and emailed your boss about it — don't worry, I CC'd the file so it could read its own obituary.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

// Self-checking gate: the sealed scorer only accepts UTF-8 text of
// 1 to 159 characters, non-blank, on a single line. Fail loudly
// before writing anything rather than shipping an invalid entry.
const len = [...ENTRY].length;
if (ENTRY.trim().length === 0) {
  console.error("gate failed: entry is blank");
  process.exit(1);
}
if (len < 1 || len > 159) {
  console.error(`gate failed: entry is ${len} characters, must be 1-159`);
  process.exit(1);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  console.error("gate failed: entry must be a single line");
  process.exit(1);
}
console.error(`gate passed: ${len} characters, single line`);

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(ENTRY);
