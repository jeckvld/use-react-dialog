const { build } = require('esbuild');
const { source } = require('./package.json');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

const shared = {
  entryPoints: [source],
  bundle: true,
  sourcemap: true,
  minify: true,
  format: 'esm',
  target: 'esnext',
  plugins: [nodeExternalsPlugin()],
};

build({
  ...shared,
  format: 'esm',
  outfile: './dist/index.esm.js',
});

build({
  ...shared,
  format: 'cjs',
  outfile: './dist/index.js',
});
