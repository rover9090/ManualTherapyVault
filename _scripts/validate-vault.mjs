import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const errors = [];
const warnings = [];

const requiredFolders = [
  "00_MOC",
  "10_Core_Model",
  "20_Techniques",
  "30_Body_Regions",
  "40_Cases",
  "50_Hypotheses",
  "60_Glossary",
  "80_References",
  "_agent",
  "_templates",
  "_scripts",
  "todo",
];

const requiredMocFiles = [
  "00_MOC/徒手治療模型總覽.md",
  "00_MOC/技法總覽.md",
  "00_MOC/身體區域總覽.md",
  "00_MOC/假說總覽.md",
];

const requiredAgentFiles = [
  "_agent/instructions.md",
  "_agent/safety-rules.md",
  "_agent/note-type-routing.md",
  "_agent/write-protocol.md",
];

const requiredTemplateFiles = [
  "_templates/core-model.md",
  "_templates/technique.md",
  "_templates/body-region.md",
  "_templates/case.md",
  "_templates/hypothesis.md",
  "_templates/glossary.md",
  "_templates/reference.md",
];

const requiredRootFiles = [
  "AGENTS.md",
  "README.md",
  "package.json",
  ".gitignore",
];

const forbiddenMvpFolders = [
  "90_Inbox",
  "90_Conversation_Exports",
  "90_Raw_Conversations",
  "_proposals",
];

async function pathExists(relativePath) {
  try {
    await fs.access(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
}

async function readText(relativePath) {
  return fs.readFile(path.join(root, relativePath), "utf8");
}

async function isDirectory(relativePath) {
  try {
    const stats = await fs.stat(path.join(root, relativePath));
    return stats.isDirectory();
  } catch {
    return false;
  }
}

async function isFile(relativePath) {
  try {
    const stats = await fs.stat(path.join(root, relativePath));
    return stats.isFile();
  } catch {
    return false;
  }
}

function hasYamlFrontmatter(content) {
  const lines = content.split(/\r?\n/);
  return lines[0] === "---" && lines.slice(1).some((line) => line === "---");
}

function hasHeading(content) {
  return content.split(/\r?\n/).some((line) => line.startsWith("# "));
}

async function assertRunningFromVaultRoot() {
  const rootMarkers = [
    "AGENTS.md",
    "todo/000-overview.md",
    "_scripts/validate-vault.mjs",
  ];

  for (const marker of rootMarkers) {
    if (!(await pathExists(marker))) {
      console.error(
        "Please run this command from the vault root directory: manual-therapy-vault."
      );
      console.error(`Current directory: ${root}`);
      process.exit(1);
    }
  }
}

async function checkFolders() {
  for (const folder of requiredFolders) {
    if (!(await isDirectory(folder))) {
      errors.push(`Missing required folder: ${folder}`);
    }
  }
}

async function checkFiles(files, label) {
  for (const file of files) {
    if (!(await isFile(file))) {
      errors.push(`Missing required ${label}: ${file}`);
    }
  }
}

async function checkTemplates() {
  for (const file of requiredTemplateFiles) {
    if (!(await isFile(file))) {
      continue;
    }

    const content = await readText(file);

    if (!hasYamlFrontmatter(content)) {
      errors.push(`Template is missing YAML frontmatter: ${file}`);
    }

    for (const requiredText of ["{{title}}", "{{date}}", "## 相關筆記"]) {
      if (!content.includes(requiredText)) {
        errors.push(`Template is missing required content "${requiredText}": ${file}`);
      }
    }
  }
}

async function checkMocHeadings() {
  for (const file of requiredMocFiles) {
    if (!(await isFile(file))) {
      continue;
    }

    const content = await readText(file);
    if (!hasHeading(content)) {
      errors.push(`MOC file is missing a level-1 heading: ${file}`);
    }
  }
}

async function checkForbiddenFolders() {
  for (const folder of forbiddenMvpFolders) {
    if (await pathExists(folder)) {
      warnings.push(`Forbidden MVP folder exists early: ${folder}`);
    }
  }
}

function printList(title, items) {
  console.log("");
  console.log(`${title}:`);
  for (const item of items) {
    console.log(`- ${item}`);
  }
}

await assertRunningFromVaultRoot();
await checkFolders();
await checkFiles(requiredMocFiles, "MOC file");
await checkFiles(requiredAgentFiles, "agent file");
await checkFiles(requiredTemplateFiles, "template file");
await checkFiles(requiredRootFiles, "root file");
await checkTemplates();
await checkMocHeadings();
await checkForbiddenFolders();

if (errors.length > 0) {
  console.log("Vault validation failed.");
  printList("Errors", errors);
  process.exit(1);
}

if (warnings.length > 0) {
  console.log("Vault validation passed with warnings.");
  printList("Warnings", warnings);
  process.exit(0);
}

console.log("Vault validation passed.");
process.exit(0);
