export const parametersAccountManager = {
  role: "Account Manager",
  subtitleMainPage: "Zaloguj się do naszego super bezpiecznego systemu!",
  subtitleRegisterPage: "Załóż konto w naszym systemie!",
  formURL: "https://frontendpodyplomowe.github.io/logging",
  linkText: "Zarejestruj się!",
  buttonText: "Zaloguj se",
  backToLoginText: "Wróć do logowania!",
  testedLogin: "tester",
  testedPassword: "1234",
  setUpAccountButton: "Załóż konto",
  loginErrorMsg: "Błędny login lub hasło",
  emptyRegisterMsg: "Musisz podać login i hasło!",
  logOutButton: "Wyloguj się",
};

// URL adresy jako oddzielnie stałe const
// export const registerURL = parametersAccountManager.formURL + "/register.html";
// export const loginURL = parametersAccountManager.formURL + "/index.html";
// export const loggedURL = parametersAccountManager.formURL + "/login.html";

// Zebranie adresy URL do jednego obiektu

export const URLs = {
  registerURL: parametersAccountManager.formURL + "/register.html",
  loginURL: parametersAccountManager.formURL + "/index.html",
  loggedURL: parametersAccountManager.formURL + "/login.html",
};

// Sales Manager w przyszłosci...
export const parametersSalesManager = {
  role: "Sales Manager",
};
