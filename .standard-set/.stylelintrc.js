const { defineStylelintConfig } = require('@mi/standard-set')

module.exports = defineStylelintConfig({
  rules: {
    // https://stylelint.io/user-guide/rules/import-notation/
    'import-notation': 'string',
  }
})
