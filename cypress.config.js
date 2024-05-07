const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'mochawesome',
    mochawesomeReporterOptions: {
      reportDir: 'cypress/reports/mocha',
      quite: true,
      overwrite: false,
      html: false,
      json: true,
    },
  },
  video: false,
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,

  e2e: {
    baseUrl: "https://www.saucedemo.com/v1/index.html",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
