import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import vue from 'rollup-plugin-vue'
import alias from '@rollup/plugin-alias';
import babel from 'rollup-plugin-babel';
import workerLoader from 'rollup-plugin-web-worker-loader';

function plugins() {
  return [
    alias({
      entries: [{
        find: '@',
        replacement: 'src',
      }],
    }),
    resolve(),
    workerLoader({
      targetPlatform: 'browser',
      // external: ['highlight.js'],
    }),
    typescript({
      sourceMap: false,
      useTsconfigDeclarationDir: true,
    }),
    vue(),
    commonjs({
      sourceMap: false,
    }),
    babel({
      exclude: 'node_modules/**',
    }),
  ];
}

const external = ['vue'];

export default [{
  input: 'src/index.ts',
  output: {
    file: 'dist/index.esm.js',
    format: 'esm',
    sourcemap: true,
  },
  plugins: plugins(),
  external,
}];
