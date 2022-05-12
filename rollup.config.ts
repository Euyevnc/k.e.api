import esbuild from 'rollup-plugin-esbuild';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

const PATHS = { source: 'src', distination: 'build', static: 'build/public' };
const esBuildPlugin = esbuild({
  // All options are optional
  include: /\.[jt]s?$/, // default, inferred from `loaders` option
  exclude: /node_modules/, // default
  sourceMap: false, // by default inferred from rollup's `output.sourcemap` option
  minify: process.env.NODE_ENV === 'production',
  target: 'es6',
  define: {
    __VERSION__: '"x.y.z"',
  },
  tsconfig: 'tsconfig.json',
  loaders: {
    '.json': 'json',
  },
});

const appConfig = {
  input: `src/app.ts`,
  output: {
    file: `${PATHS.distination}/app.js`,
    format: 'cjs',
  },

  // plugins: [minifyPlugin, esBuildPlugin, nodeResolve()],
  plugins: [
    json(),
    esBuildPlugin,
    nodeResolve({ preferBuiltins: true }),
    commonjs(),
  ],
};

export default appConfig;
