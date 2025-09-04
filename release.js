#!/usr/bin/env node

import { execSync } from "node:child_process";
import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (q) => new Promise((res) => rl.question(q, res));

async function main() {
  try {
    const bump = await question("Bump version (patch/minor/major): ");
    rl.close();

    if (!["patch", "minor", "major"].includes(bump)) {
      console.error("❌ Invalid choice. Use patch, minor, or major.");
      process.exit(1);
    }

    console.log("📦 Building library...");
    execSync("npm run build", { stdio: "inherit" });

    console.log(`🔼 Bumping version (${bump})...`);
    execSync(`npm version ${bump} --no-git-tag-version`, { stdio: "inherit" });

    console.log("🚀 Publishing to npm...");
    execSync("npm publish --access public", { stdio: "inherit" });

    console.log("✅ Release complete!");
  } catch (err) {
    console.error("❌ Release failed:", err.message);
    process.exit(1);
  }
}

main();
