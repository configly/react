import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

export default {
  input: 'src/index.tsx',
  plugins: [
    typescript({lib: ["es5", "es6", "dom"], target: "es5"})
  ],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false
    },
  ],
  external: ['react', 'react-dom']
}