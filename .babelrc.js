module.exports = {
  presets: ['@babel/preset-typescript', '@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-function-bind',
    ['@babel/plugin-transform-class-properties', { loose: true }],
    '@babel/plugin-transform-nullish-coalescing-operator',
    '@babel/plugin-transform-optional-chaining',
  ],
}
