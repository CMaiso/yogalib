// prettier options documentation
// https://prettier.io/docs/en/options.html

module.exports = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: `all`,
  printWidth: 80,
  quoteProps: `consistent`,
  arrowParens: `always`,
  overrides: [
    {
      files: [`*.config.js`, `*.setup.js`, `config.js`],
      options: {
        printWidth: 120,
      },
    },
    {
      files: [`*-mock.js`, `*-mock.mjs`],
      options: {
        printWidth: 1600,
      },
    },
  ],
};
