# TAS5 Cypress CI z GitHub Actions

Projekt testów end-to-end (E2E) z wykorzystaniem frameworka **Cypress** i integracji z **GitHub Actions**.

## 📋 Opis projektu

Projekt zawiera automatyczne testy funkcjonalne napisane w Cypress z integracją CI/CD za pośrednictwem GitHub Actions. Obsługuje dwie metody uruchamiania:
- Bezpośrednio na Ubuntu z Node.js (bez Docker'a)
- W izolowanym kontenerze Docker dla lepszej reproducibility

Testy są uruchamiane zarówno lokalnie jak i w chmurze Cypress z automatyczną rejestracją wyników.

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

Projekt obsługuje automatyczną integrację z GitHub Actions do ciągłego testowania (CI/CD). Dostępne są dwa workflow'i:

### Workflow 1: CypressTests_bez_DOCKERA
- **Plik:** `.github/workflows/cypress_tests_1.yml`
- **Wyzwalacze:** push, pull request, workflow_dispatch (ręczne)
- **Środowisko:** Ubuntu Latest z Node.js v24
- **Proces:**
  1. Pobiera kod z repozytorium
  2. Instaluje Node.js v24
  3. Uruchamia `npm ci` (instalacja zależności)
  4. Uruchamia testy Cypress z rejestracją w chmurze Cypress
- **Bezpieczeństwo:** Używa `CYPRESS_RECORD_KEY` z GitHub Secrets

### Workflow 2: CypressTests_z_DOCKEREM
- **Plik:** `.github/workflows/cypress_tests_docker_githubActions.yml`
- **Wyzwalacze:** push, pull request, workflow_dispatch (ręczne)
- **Środowisko:** Ubuntu Latest + Docker
- **Proces:**
  1. Pobiera kod z repozytorium
  2. Czyszcza Docker (system prune, builder prune)
  3. Buduje obraz Docker z `Dockerfile`
  4. Uruchamia testy Cypress w kontenerze Docker
- **Bezpieczeństwo:** Używa `CYPRESS_RECORD_KEY` z GitHub Secrets
- **Zaleta:** Izolacja środowiska, reproducible builds

## 🐳 Docker

Projekt zawiera `Dockerfile` do uruchamiania testów Cypress w kontenerze.

### Dockerfile konfiguracja

```dockerfile
FROM cypress/browsers:latest
WORKDIR /e2e
COPY . .
RUN npm install
RUN npx cypress install
CMD ["npx", "cypress", "run", "--browser", "firefox"]
```

### Uruchomienie testów w Docker lokalnie

```bash
# Budowanie obrazu
docker build -t cypress-test .

# Uruchomienie testów
docker run --rm cypress-test

# Uruchomienie z mapowaniem wyników
docker run --rm -v $(pwd)/cypress/reports:/e2e/cypress/reports cypress-test
```

### Zalety używania Docker'a
- ✅ Identyczne środowisko (CI i lokalne)
- ✅ Izolacja zależności
- ✅ Łatwa reprodukcja błędów
- ✅ Wsparcie dla wielu przeglądarek (Chromium, Firefox, Edge)

## 📊 Raporty

Projekt generuje raporty testów za pomocą Mochawesome reportera, dostępne po uruchomieniu testów (zarówno lokalnie jak i w CI/CD).
