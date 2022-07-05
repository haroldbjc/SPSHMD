module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import-helpers'],
  rules: {
    // Relax the rule to allow brace-less single-line if, else if, else, for,
    // while, or do, while still enforcing the use of curly braces for other instances
    curly: ['warn', 'multi-line'],

    // Import order
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: ['module', '/^~//', 'parent', 'sibling', 'index'],
      },
    ],
  },
};
