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
    typescript({
      transpiler: 'babel',
      browserslist: false,
      transpileOnly: false,
    }),

    // TODO: Remove after converting object.js -> ts
    del({
      targets: ['dist/-private/object.d.d.ts', 'dist/-private/object.d.js'],
      hook: 'writeBundle',
    }),

    // TODO: Remove after converting object.js -> ts
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

    // Remove leftover build artifacts when starting a new build.
    addon.clean(),
  ],
};
