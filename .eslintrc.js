module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'prettier', 'plugin:react/recommended'],
  settings: {
    react: {
      version: 'detect',
      flowVersion: '0.53'
    },
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      'Hyperlink',
      { name: 'Link', linkAttribute: 'to' }
    ]
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12
  },
  plugins: ['@typescript-eslint', 'jest', 'import', 'react'],
  rules: {
    // disallow non-import statements appearing before import statements
    'import/first': 'error',
    // Forbid import of modules using absolute paths
    'import/no-absolute-path': 'error',
    // disallow AMD require/define
    'import/no-amd': 'error',
    // Forbid mutable exports
    'import/no-mutable-exports': 'error',
    // Prevent importing the default as if it were named
    'import/no-named-default': 'error',
    // Forbid a module from importing itself
    'import/no-self-import': 'error',

    // Forbid the use of extraneous packages
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.spec.js', '**/*.spec.ts']
      }
    ]
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
      ],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-empty': 'warn',
        'no-var': 'warn'
      }
    },
    {
      files: ['*.spec.ts', '*.spec.js'],
      env: {
        jest: true
      },
      extends: ['plugin:jest/recommended'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-namespace': 'off',
        'jest/no-conditional-expect': 'off',
        'jest/no-try-expect': 'off',
        'jest/no-identical-title': 'off',
        'import/first': 'off'
      }
    }
  ]
};
