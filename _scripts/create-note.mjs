import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

const noteTypes = {
  core_model: {
    folder: "10_Core_Model",
    template: "_templates/core-model.md",
  },
  technique: {
    folder: "20_Techniques",
    template: "_templates/technique.md",
  },
  body_region: {
    folder: "30_Body_Regions",
    template: "_templates/body-region.md",
  },
  case: {
    folder: "40_Cases",
    template: "_templates/case.md",
  },
  hypothesis: {
    folder: "50_Hypotheses",
    template: "_templates/hypothesis.md",
  },
  glossary: {
    folder: "60_Glossary",
    template: "_templates/glossary.md",
  },
  reference: {
    folder: "80_References",
    template: "_templates/reference.md",
  },
};

function usage() {
  console.error('Usage: node _scripts/create-note.mjs --type hypothesis --title "頭皮三層觸診模型"');
}

function parseArgs(args) {
  const parsed = {};

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--type" || arg === "--title") {
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
  const markers = ["AGENTS.md", "todo/000-overview.md", "_scripts/create-note.mjs"];

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

function safeFilename(title) {
  const filename = title
    .replace(/[<>:"/\\|?*]/g, "-")
    .replace(/\s+/g, " ")
    .trim();

  return `${filename}.md`;
}

function toRelativePath(fullPath) {
  return path.relative(root, fullPath).replaceAll(path.sep, "/");
}

await assertRunningFromVaultRoot();

const { type, title } = parseArgs(process.argv.slice(2));
const trimmedTitle = title?.trim();

if (!type || !trimmedTitle) {
  usage();
  process.exit(1);
}

if (!noteTypes[type]) {
  console.error(`Unsupported note type: ${type}`);
  console.error(`Supported types: ${Object.keys(noteTypes).join(", ")}`);
  process.exit(1);
}

const filename = safeFilename(trimmedTitle);

if (filename === ".md") {
  usage();
  process.exit(1);
}

const config = noteTypes[type];
const targetPath = path.join(root, config.folder, filename);
const relativeTargetPath = toRelativePath(targetPath);

if (await pathExists(relativeTargetPath)) {
  console.error(`Note already exists: ${relativeTargetPath}`);
  console.error("Refusing to overwrite.");
  process.exit(1);
}

const template = await fs.readFile(path.join(root, config.template), "utf8");
const date = currentLocalDate();
const content = template.replaceAll("{{title}}", trimmedTitle).replaceAll("{{date}}", date);

await fs.writeFile(targetPath, content, { flag: "wx" });

console.log(`Created note: ${relativeTargetPath}`);
