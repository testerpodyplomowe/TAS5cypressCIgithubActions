const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "nswvvw",
  allowCypressEnv: false,
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "custom-title",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    chromeWebSecurity: false,
    //defaultCommandTimeout: 8000,
    watchForFileChanges: false,
    video: false,
  },
});
