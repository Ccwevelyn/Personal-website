import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createEvelynChatMiddleware } from "./server/evelyn-chat-handler.mjs";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

function pdfjsWasmPlugin(root) {
  const wasmSrc = path.join(root, "node_modules", "pdfjs-dist", "wasm");
  let outDir = path.join(root, "dist");

  return {
    name: "pdfjs-wasm",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    configureServer(server) {
      const prefix = `${server.config.base}pdfjs/wasm/`.replace(/([^:]\/)\/+/g, "$1");
      server.middlewares.use((req, res, next) => {
        const raw = req.url?.split("?")[0] ?? "";
        if (!raw.startsWith(prefix)) return next();
        let rel = "";
        try {
          rel = decodeURIComponent(raw.slice(prefix.length));
        } catch {
          res.statusCode = 400;
          res.end();
          return;
        }
        if (!rel || rel.includes("..") || rel.includes("/") || rel.includes("\\")) {
          res.statusCode = 400;
          res.end();
          return;
        }
        const file = path.resolve(wasmSrc, rel);
        const fromRoot = path.relative(wasmSrc, file);
        if (fromRoot.startsWith("..") || path.isAbsolute(fromRoot) || !fs.existsSync(file)) {
          next();
          return;
        }
        const types = {
          ".wasm": "application/wasm",
          ".js": "text/javascript; charset=utf-8",
        };
        res.setHeader("Content-Type", types[path.extname(file).toLowerCase()] || "application/octet-stream");
        fs.createReadStream(file).pipe(res);
      });
    },
    closeBundle() {
      fs.cpSync(wasmSrc, path.join(outDir, "pdfjs", "wasm"), { recursive: true });
    },
  };
}

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
    pdfjsWasmPlugin(projectRoot),
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
