import { defineConfig } from "tsup";

const config = {
  dts: true,
  clean: true,
  minify: true,
  outDir: "dist",
  sourcemap: false,
  external: ["vue"]
};

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["esm"],
    ...config
  }
]);
