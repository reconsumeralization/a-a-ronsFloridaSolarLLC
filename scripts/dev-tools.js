#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const commands = {
  clean: () => {
    console.log("🧹 Cleaning development environment...");
    try {
      execSync("rm -rf .next", { stdio: "inherit" });
      execSync("rm -rf node_modules/.cache", { stdio: "inherit" });
      console.log("✅ Clean completed");
    } catch (error) {
      console.error("❌ Clean failed:", error.message);
    }
  },

  ports: () => {
    console.log("🔍 Checking active ports...");
    try {
      execSync("netstat -ano | findstr :3000", { stdio: "inherit" });
      execSync("netstat -ano | findstr :8888", { stdio: "inherit" });
    } catch (error) {
      console.log("No active development ports found");
    }
  },

  setup: () => {
    console.log("🚀 Setting up development environment...");
    try {
      execSync("npm install", { stdio: "inherit" });
      execSync("npm run build", { stdio: "inherit" });
      console.log("✅ Setup completed");
    } catch (error) {
      console.error("❌ Setup failed:", error.message);
    }
  },

  dev: () => {
    console.log("🛠️ Starting development server...");
    try {
      execSync("npx kill-port 3000 8888", { stdio: "inherit" });
      execSync("npm run dev", { stdio: "inherit" });
    } catch (error) {
      console.error("❌ Development server failed:", error.message);
    }
  },

  netlify: () => {
    console.log("🌐 Starting Netlify development server...");
    try {
      execSync("npx kill-port 3000 8888", { stdio: "inherit" });
      execSync("npx netlify dev", { stdio: "inherit" });
    } catch (error) {
      console.error("❌ Netlify server failed:", error.message);
    }
  },

  test: () => {
    console.log("🧪 Running tests...");
    try {
      execSync("npm run test", { stdio: "inherit" });
    } catch (error) {
      console.error("❌ Tests failed:", error.message);
    }
  },

  lint: () => {
    console.log("🔍 Running linter...");
    try {
      execSync("npm run lint", { stdio: "inherit" });
    } catch (error) {
      console.error("❌ Linting failed:", error.message);
    }
  },

  help: () => {
    console.log(`
🛠️  Development Tools

Commands:
  clean   - Clean development environment
  ports   - Check active development ports
  setup   - Set up development environment
  dev     - Start development server
  netlify - Start Netlify development server
  test    - Run tests
  lint    - Run linter
  help    - Show this help message
    `);
  },
};

const command = process.argv[2];

if (commands[command]) {
  commands[command]();
} else {
  console.log('❌ Unknown command. Use "help" to see available commands.');
  commands.help();
}
