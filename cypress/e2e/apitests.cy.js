/// <reference types="Cypress" />

// Osobny test tylko API ze wszystkim parametrami w jednym pliku

const apiURL1 = "https://pokeapi.co/api/v2/pokemon/";
const apiURL2 = "https://api.chucknorris.io/jokes/random";
const searchedElement1 = { name: "pikachu" };
const searchedElement2 = { value: "Chuck" };
const searchedElementAsString = "Chuck";

describe("REST API tests with Cypress", () => {
  it("should status code check", () => {
    cy.request(apiURL1).as("result1");
    cy.request(apiURL1 + 25).as("result2");

    cy.get("@result1").its("status").should("equal", 200);
    cy.get("@result2").its("status").should("equal", 200);
  });

  it("should find searched element", () => {
    cy.request(apiURL1 + 25).as("result2");
    cy.get("@result2").its("body").should("include", searchedElement1);
  });

  it("should validate error status code for this api", () => {
    cy.request({
      method: "GET",
      url: apiURL1 + "1500",
      failOnStatusCode: false,
    }).as("resultStatusCode");
    cy.get("@resultStatusCode").its("status").should("equal", 404);
  });

  it("should check chuck norris api", () => {
    //rozw Mariusza
    cy.request(apiURL2).then((response) => {
      expect(response.body)
        .property("value")
        .to.contain(searchedElementAsString);
    });

    //console.log("@value");
  });
});
