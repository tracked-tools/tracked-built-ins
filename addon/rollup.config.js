import typescript from 'rollup-plugin-ts';
import { Addon } from '@embroider/addon-dev/rollup';
import del from 'rollup-plugin-delete';
import copy from 'rollup-plugin-copy';

const addon = new Addon({
  srcDir: 'src',
  destDir: 'dist',
});

export default {
  // This provides defaults that work well alongside `publicEntrypoints` below.
  // You can augment this if you need to.
  output: addon.output(),

  plugins: [
    // These are the modules that users should be able to import from your
    // addon. Anything not listed here may get optimized away.
    addon.publicEntrypoints(['-private/**/*.{js,ts}', 'index.{js,ts}']),

    // These are the modules that should get reexported into the traditional
    // "app" tree. Things in here should also be in publicEntrypoints above, but
    // not everything in publicEntrypoints necessarily needs to go here.
    addon.appReexports([]),

    // This babel config should *not* apply presets or compile away ES modules.
    // It exists only to provide development niceties for you, like automatic
    // template colocation.
    //
    // By default, this will load the actual babel config from the file
    // babel.config.json.
    // typescript(),
    typescript({
      // can be changed to swc or other transpilers later
      // but we need the ember plugins converted first
      // (template compilation and co-location)
      transpiler: 'babel',
      browserslist: false,
      // NOTE: babel config must be CJS if in the same directory as CWD
      //       https://github.com/wessberg/rollup-plugin-ts/issues/167
      //       otherwise ESM babel.config.js can be imported and set here
      // babelConfig,
      // setting this true greatly improves performance, but
      // at the cost of safety (and no declarations output in your dist directory).
      // transpileOnly: false,
      tsconfig: {
        fileName: 'tsconfig.json',
        hook: (config) => ({ ...config, declaration: true }),
      },
    }),

    del({
      targets: ['dist/-private/object.d.d.ts', 'dist/-private/object.d.js'],
      hook: 'writeBundle',
    }),

    copy({
      targets: [
        {
          src: 'src/-private/object.d.ts',
          dest: 'dist/-private',
        },
      ],
      hook: 'writeBundle',
    }),

    // Follow the V2 Addon rules about dependencies. Your code can import from
    // `dependencies` and `peerDependencies` as well as standard Ember-provided
    // package names.
    addon.dependencies(),

    // Ensure that standalone .hbs files are properly integrated as Javascript.
    addon.hbs(),

    // addons are allowed to contain imports of .css files, which we want rollup
    // to leave alone and keep in the published output.
    addon.keepAssets(['**/*.css']),

    // Remove leftover build artifacts when starting a new build.
    addon.clean(),
  ],
};
