import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { readdirSync, existsSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

// 동적으로 entry point 생성
const generateEntries = () => {
  const entries: Record<string, string> = {
    index: resolve(__dirname, "src/index.ts"),
  };

  const srcDir = resolve(__dirname, "src");
  const dirs = readdirSync(srcDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  dirs.forEach((dir) => {
    const indexFile = resolve(srcDir, dir, "index.ts");
    // index.ts 파일이 실제로 존재하는 경우만 entry point로 등록
    if (existsSync(indexFile)) {
      entries[dir] = indexFile;
    }
  });

  return entries;
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      rollupTypes: false,
      outDir: "dist",
    }),
  ],
  build: {
    lib: {
      entry: generateEntries(),
      name: "VitePublish",
      formats: ["es", "cjs"],
      fileName: (format, entryName) => {
        const ext = format === "cjs" ? "js" : "js";
        const dir = format === "cjs" ? "cjs" : "es";
        if (entryName === "index") {
          return `${dir}.${ext}`;
        }
        return `${dir}/${entryName}/index.${ext}`;
      },
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@tanstack/react-query",
        "axios",
        "@radix-ui/react-checkbox",
        "@radix-ui/react-dialog",
        "@radix-ui/react-hover-card",
        "@radix-ui/react-label",
        "@radix-ui/react-popover",
        "@radix-ui/react-scroll-area",
        "@radix-ui/react-separator",
        "@radix-ui/react-slider",
        "@radix-ui/react-slot",
        "@radix-ui/react-tooltip",
        "class-variance-authority",
        "cmdk",
        "date-fns",
        "lucide-react",
        "react-resizable-panels",
        "tailwind-merge",
        "vaul",
      ],
    },
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
