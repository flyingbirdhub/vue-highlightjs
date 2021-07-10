import resolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import dts from 'rollup-plugin-dts';

const external = ['vue', 'highlight.js', /\.vue$/];

export default [{
  input: 'dist/types/src/index.d.ts',
  output: [{
    file: 'dist/index.esm.d.ts',
    format: 'esm',
  }],
  plugins: [
    alias({
      entries: [{
        find: '@',
        replacement: 'dist/types',
      }],
    }),
    resolve({
      extensions: ['.d.ts', '.vue.d.ts'],
    }),
    dts(),
  ],
  external,
}];
