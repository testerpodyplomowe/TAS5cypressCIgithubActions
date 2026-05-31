// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add("verifyFormUI", (role, subtitle, buttonText, linkText) => {
  cy.get(".section").should("contain", role);
  cy.get(".section").should("contain", subtitle);
  cy.get("#login").should("exist");
  cy.get("#password").should("exist");
  cy.get("button").should("have.text", buttonText);
  cy.get("a").should("have.text", linkText);
});

Cypress.Commands.add(
  "registerToApp",
  (registerLink, login, password, registerButton, url) => {
    cy.get("a").should("have.text", registerLink).click();
    cy.url().should("equal", url);
    cy.get("#login").type(login);
    cy.get("#password").type(password);
    cy.get("button").should("have.text", registerButton).click();
  },
);

Cypress.Commands.add("loginToApp", (login, password, loginButton, url) => {
  cy.url().should("equal", url);
  cy.get('[name="login"]').type(login); // ten sam element cy.get("#login")
  cy.get('[name="password"]').type(password);
  cy.get("button").should("have.text", loginButton).click();
  //cy.wait(5000);
});

Cypress.Commands.add("verifyLoggedUser", (loggedUser, buttonText, url) => {
  cy.url().should("equal", url);
  cy.get("#welcomemsg").should("have.text", `Witaj ${loggedUser}!`);
  cy.get("button").should("have.text", buttonText);
  //Sprawdzenie czy w pamieci przegladarki localStorage uzytkownik jest zapisany i czy jest w stanie zalogowania jako true
  cy.window().then(($win) => {
    expect($win.localStorage.getItem("logged")).to.eq("1");
    expect($win.localStorage.getItem("username")).to.eq(loggedUser);
  });
});
