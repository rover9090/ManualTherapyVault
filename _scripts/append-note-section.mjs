import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const forbiddenDirs = [".git", ".obsidian", "node_modules"];

function usage() {
  console.error(
    'Usage: node _scripts/append-note-section.mjs --file "50_Hypotheses/頭皮三層觸診模型.md" --heading "新增觀察" --content "測試內容"'
  );
}

function parseArgs(args) {
  const parsed = {
    dateHeading: false,
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--date-heading") {
      parsed.dateHeading = true;
      continue;
    }

    if (arg === "--file" || arg === "--heading" || arg === "--content") {
      parsed[arg.slice(2)] = args[index + 1];
      index += 1;
    }
  }

  return parsed;
}

async function pathExists(relativePath) {
  try {
    await fs.access(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
}

async function assertRunningFromVaultRoot() {
  const markers = ["AGENTS.md", "todo/000-overview.md", "_scripts/append-note-section.mjs"];

  for (const marker of markers) {
    if (!(await pathExists(marker))) {
      console.error("Please run this command from the vault root directory.");
      console.error(`Current directory: ${root}`);
      process.exit(1);
    }
  }
}

function currentLocalDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isInsideVault(fullPath) {
  const relativePath = path.relative(root, fullPath);
  return relativePath === "" || (!relativePath.startsWith("..") && !path.isAbsolute(relativePath));
}

function relativePathForDisplay(fullPath) {
  return path.relative(root, fullPath).replaceAll(path.sep, "/");
}

function isForbiddenPath(relativePath) {
  const normalized = relativePath.replaceAll("\\", "/");
  return forbiddenDirs.some((dir) => normalized === dir || normalized.startsWith(`${dir}/`));
}

await assertRunningFromVaultRoot();

const args = parseArgs(process.argv.slice(2));
const targetFile = args.file?.trim();
const heading = args.heading?.trim();
const content = args.content;

if (!targetFile || !heading || content === undefined) {
  usage();
  process.exit(1);
}

const resolvedTarget = path.resolve(root, targetFile);
const relativeTarget = relativePathForDisplay(resolvedTarget);

if (!isInsideVault(resolvedTarget)) {
  console.error("Refusing to modify file outside the vault.");
  process.exit(1);
}

if (isForbiddenPath(relativeTarget)) {
  console.error(`Refusing to modify forbidden path: ${relativeTarget}`);
  process.exit(1);
}

if (path.extname(resolvedTarget) !== ".md") {
  console.error(`Target file is not a Markdown file: ${relativeTarget}`);
  process.exit(1);
}

try {
  const stats = await fs.stat(resolvedTarget);

  if (!stats.isFile()) {
    console.error(`Target is not a file: ${relativeTarget}`);
    process.exit(1);
  }
} catch {
  console.error(`Target file does not exist: ${relativeTarget}`);
  process.exit(1);
}

const finalHeading = args.dateHeading ? `${currentLocalDate()} ${heading}` : heading;
const section = `\n\n## ${finalHeading}\n\n${content}\n`;

await fs.appendFile(resolvedTarget, section, "utf8");

console.log(`Appended section to: ${relativeTarget}`);
