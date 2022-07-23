import * as esBuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path";
import { fetchPlugin } from "./plugins/fetch-plugin";

let INITIALIZED = false;
const initialize = async () => {
  await esBuild.initialize({
    worker: true,
    wasmURL: "https://unpkg.com/esbuild-wasm@0.14.48/esbuild.wasm",
  });
  INITIALIZED = true;
};
export const bundler = async (rawCode: string) => {
  if (!INITIALIZED) {
    await initialize();
  }
  try {
    const result = await esBuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        global: "window",
        // "process.env.NODE_ENV": '"production"',
      },
      jsxFactory: "_React.createElement",
      jsxFragment: "_React.Fragment",
    });
    return {
      err: "",
      code: result.outputFiles[0].text,
    };
  } catch (err: any) {
    return {
      code: "",
      err: err.message,
    };
  }
};
