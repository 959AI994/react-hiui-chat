const { defineESLintConfig } = require('@mi/standard-set')

module.exports = defineESLintConfig({
  "rules": {
    "@typescript-eslint/no-var-requires": "off"
  },
  globals: {
    __DEV__: 'readonly'
  },
  ignorePatterns: ['!.*.js', 'src/hi-app-env.d.ts'],
})
