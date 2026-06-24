import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const keyword = process.argv[2];
const excludedDirs = new Set([".git", ".obsidian", "node_modules"]);

if (!keyword) {
  console.error('Usage: node _scripts/search-notes.mjs "<keyword>"');
  process.exit(1);
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
  const markers = ["AGENTS.md", "todo/000-overview.md", "_scripts/search-notes.mjs"];

  for (const marker of markers) {
    if (!(await pathExists(marker))) {
      console.error("Please run this command from the vault root directory.");
      console.error(`Current directory: ${root}`);
      process.exit(1);
    }
  }
}

async function collectMarkdownFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (excludedDirs.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectMarkdownFiles(fullPath)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

function toRelativePath(fullPath) {
  return path.relative(root, fullPath).replaceAll(path.sep, "/");
}

await assertRunningFromVaultRoot();

const normalizedKeyword = keyword.toLocaleLowerCase();
const matches = [];

for (const file of await collectMarkdownFiles(root)) {
  const content = await fs.readFile(file, "utf8");
  const lines = content.split(/\r?\n/);
  const matchingLines = [];

  for (const [index, line] of lines.entries()) {
    if (line.toLocaleLowerCase().includes(normalizedKeyword)) {
      matchingLines.push(index + 1);
    }
  }

  if (matchingLines.length > 0) {
    matches.push({
      file: toRelativePath(file),
      lines: matchingLines,
    });
  }
}

if (matches.length === 0) {
  console.log(`No matching notes found for: ${keyword}`);
  process.exit(0);
}

console.log(`Found ${matches.length} matching files:`);
console.log("");

for (const match of matches) {
  console.log(`${match.file}:${match.lines.join(",")}`);
}
