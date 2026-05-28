import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createEvelynChatMiddleware } from "./server/evelyn-chat-handler.mjs";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

function createChatPlugin(root) {
  const middleware = createEvelynChatMiddleware(root);
  return {
    name: "evelyn-chat-api",
    enforce: "pre",
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}

export default defineConfig(({ command }) => ({
  base: process.env.VITE_BASE || "/",
  plugins: [
    createChatPlugin(projectRoot),
    react(),
    {
      name: "sync-portfolio-skill-on-dev",
      configureServer() {
        if (command !== "serve") return;
        try {
          const script = path.join(projectRoot, "scripts", "build-portfolio-skill-context.mjs");
          if (fs.existsSync(script)) {
            execSync(`node "${script}"`, { cwd: projectRoot, stdio: "inherit" });
          }
        } catch (error) {
          console.warn("[evelyn-chat] portfolio skill sync skipped:", error.message);
        }
      },
    },
  ],
}));
