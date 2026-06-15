/// <reference types="cypress" />
Cypress.on("uncaught:exception", () => false);

const testedPage = "https://www.kozminski.edu.pl";
const phrase = "Selenium";
const courseName = "Tester automatyzujący w Selenium";
const studentName = "LidiaSobieska@T8.pl  ";
const studentPass = "1234567890";

// przypadek testowy:
// 1. wejdz na stronę ALK
// 2. kliknij na lupę i wpisz frazę Selenium i nacisnij enter
// 3. kliknij na wybrany link = kierunek

describe("ALK course search", () => {
  it("should open the page", () => {
    cy.visit(testedPage);
    cy.wait(2000); // 5 sekund oczekiwania
    cy.get("body").then(($element) => {
      if ($element.find('[data-testid="uc-accept-all-button"]').length > 0) {
        cy.get('[data-testid="uc-accept-all-button"]').click();
      }
    });
  });

  it("should find Selenium phrase", () => {
    cy.wait(2000);
    cy.get(".search-trigger").click();
    cy.wait(1000);
    cy.get('[name="q"]').type(phrase).type("{enter}");
    cy.wait(1000);
  });

  it("find course page", () => {
    cy.get(".search-results-container > #product").contains(courseName);
  });

  it("click on course page and SIGN UP to course", () => {
    cy.get(".search-results-container > #product a")
      .invoke("removeAttr", "target")
      .click();
    cy.wait(2000);
    cy.get("a > .button > span").click();
    cy.wait(4000);
    cy.get("c-tb-user-login-page").click();
    cy.get("c-tb-user-login-page")
      .find(".wrapper__input")
      .eq(0)
      .focus()
      .type(studentName);
    cy.get("c-tb-user-login-page")
      .find(".wrapper__input")
      .eq(1)
      .focus()
      .type(studentPass);

    cy.wait(4000);
    cy.get("c-tb-user-login-page").find(".tb-login-button").click();
  });
});
