/// <reference types="cypress" />
Cypress.config().waitForAnimations = true;

import { parametersAccountManager, URLs } from "../fixtures/parameters.js";
import 'cypress-mochawesome-reporter/register';

describe("Web form verification", {testIsolation: false}, () => {
  it("should open web app", () => {
    cy.visit(parametersAccountManager.formURL);
  });

  it("should check UI of main page of form", () => {
    cy.verifyFormUI(
      parametersAccountManager.role,
      parametersAccountManager.subtitleMainPage,
      parametersAccountManager.buttonText,
      parametersAccountManager.linkText,
    );
  });

  it("should register to app", () => {
    cy.registerToApp(
      parametersAccountManager.linkText,
      parametersAccountManager.testedLogin,
      parametersAccountManager.testedPassword,
      parametersAccountManager.setUpAccountButton,
      URLs.registerURL
    );
  });

  it("should login to app", () => {
    cy.loginToApp(
      parametersAccountManager.testedLogin,
      parametersAccountManager.testedPassword,
      parametersAccountManager.buttonText,
      URLs.loginURL
    );
    cy.verifyLoggedUser(
      parametersAccountManager.testedLogin,
      parametersAccountManager.logOutButton,
      URLs.loggedURL
    );
  });

  it("should log out", () => {
    cy.logoutFromApp(parametersAccountManager.logOutButton,URLs.loginURL)
  });
});
