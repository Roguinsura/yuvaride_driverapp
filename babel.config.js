module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // Inlines .env values at transform time so src/api/config.tsx can read the
    // Maps key without it being committed. .env is gitignored — see .env.example.
    //
    // allowUndefined must stay true: with the default (false) a clone that has no
    // .env yet fails the build instead of falling back to an empty key.
    //
    // Values are baked into the bundle when Metro transforms, so after editing
    // .env you must restart Metro with --reset-cache or the old value survives.
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
      safe: false,
      allowUndefined: true,
      verbose: false,
    }],
    'react-native-reanimated/plugin',
    '@babel/plugin-transform-class-static-block',
  ],
}
