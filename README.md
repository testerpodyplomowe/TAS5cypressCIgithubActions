# TAS5 Cypress CI z GitHub Actions

Projekt testów end-to-end (E2E) z wykorzystaniem frameworka **Cypress** i integracji z **GitHub Actions**.

## 📋 Opis projektu

Projekt zawiera automatyczne testy funkcjonalne napisane w Cypress z integracją CI/CD za pośrednictwem GitHub Actions. Testy są uruchamiane zarówno lokalnie jak i w chmurze Cypress.

## 🚀 Szybki Start

### Wymagania
- **Node.js** v24 lub nowszy
- **npm** v10+ (dołączane z Node.js)
- **Cypress** v15.15.0 lub nowszy
- **Ubuntu 24.04 LTS** (dla GitHub Actions)

> **Uwaga:** W GitHub Actions projekt uruchamiany jest na Node.js v24 z Ubuntu 24.04 LTS

### Instalacja zależności

```bash
npm install
```

## 🧪 Uruchamianie testów

### Otwieranie interfejsu Cypress (tryb interaktywny)
```bash
npm test
```

### Uruchomienie testów w trybie headless
```bash
npm run cy:run
```

### Uruchomienie konkretnego testu
```bash
npm run mytests
```

### Uruchomienie testów w chmurze Cypress
```bash
npm run cy:run-cloud
```

## 📁 Struktura projektu

```
cypress/
├── e2e/              # Testy end-to-end
│   ├── 01test.cy.js
│   └── todo.cy.js
├── fixtures/         # Dane testowe
│   └── parameters.js
├── support/          # Wspólne konfiguracje
│   ├── commands.js
│   └── e2e.js
└── ...
```

## 🔧 Konfiguracja

- **cypress.config.js** - Główny plik konfiguracyjny Cypress
- **package.json** - Zależności i skrypty projektu

## 📦 Zależności

- **cypress** - Framework testowania E2E
- **cypress-mochawesome-reporter** (v4.0.2) - Zaawansowane raporty testów
- **prettier** (v3.8.3) - Formatowanie kodu

Wszystkie zależności instalowane automatycznie za pomocą `npm ci` (CI mode) lub `npm install`.

## 🔄 GitHub Actions

Projekt obsługuje automatyczną integrację z GitHub Actions do ciągłego testowania (CI/CD).

## 📊 Raporty

Projekty generuje raporty testów za pomocą Mochawesome reportera, dostępne po uruchomieniu testów.
