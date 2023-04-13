/** @type {import('eslint-doc-generator').GenerateOptions} */
const config = {
    ignoreConfig: ['all'],
    ignoreDeprecatedRules: true,
    ruleDocTitleFormat: 'desc',
    ruleListColumns: [
      'name',
      'description',
      'configsError',
      // Omit `configsOff` since we don't intend to convey meaning by setting rules to `off` in the `recommended` config.
      'configsWarn',
      'fixable',
      'hasSuggestions',
      'requiresTypeChecking',
    ]
  };
  
  module.exports = config;