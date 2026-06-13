# TAS5 Cypress CI/CD z GitHub Actions i Docker

Kompleksowy projekt testów end-to-end (E2E) z **Cypress**, integracją **CI/CD** w **GitHub Actions** i wsparcie **Docker**.

## 📋 Opis projektu

Projekt zawiera automatyczne testy funkcjonalne napisane w Cypress z dwoma metodami uruchamiania:
- **Bezpośrednio na Ubuntu** - tradycyjne podejście z Node.js i GitHub Actions
- **W kontenerze Docker** - izolowane środowisko dla spójności CI/CD

Testy uruchamiają się na każdy push, pull request i mogą być uruchamiane ręcznie. Wyniki rejestrują się automatycznie w chmurze Cypress dla analizy i raportowania.

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

### Tryby uruchamiania testów

Projekt obsługuje różne tryby testowania:

| Tryb | Polecenie | Zastosowanie |
|------|-----------|--------------|
| **Interaktywny** | `npm test` | Lokalna praca nad testami (live debugging) |
| **Headless** | `npm run cy:run` | Automatyczne uruchomienie wszystkich testów |
| **Specyficzny test** | `npm run mytests` | Uruchomienie wybranego testu |
| **API testy** | `npm run apitests` | Testowanie API bez interfejsu |
| **Cloud** | `npm run cy:run-cloud` | Uruchomienie z rejestracją w chmurze Cypress |

### Dostępne skrypty npm

| Skrypt | Polecenie | Opis |
|--------|-----------|------|
| `npm test` | `cypress open` | Otwiera interfejs Cypress (tryb interaktywny) |
| `npm run cy:run` | `npx cypress run` | Uruchamia wszystkie testy w trybie headless |
| `npm run mytests` | `npx cypress run --spec 'cypress/e2e/01test.cy.js'` | Uruchamia konkretny test (01test.cy.js) |
| `npm run apitests` | `npx cypress run --spec 'cypress/e2e/03apitestyzajecia.cy.js'` | Uruchamia testy API |
| `npm run cy:run-cloud` | `npx cypress run --record --key ...` | Uruchamia testy z rejestracją w chmurze Cypress |

## 📁 Struktura projektu

```
cypress/
├── e2e/              # Testy end-to-end i API
│   ├── 01test.cy.js
│   ├── 02todo.cy.js
│   ├── 03apitests.cy.js       # Testy API
│   └── 03apitestyzajecia.cy.js # Testy API zajęcia
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

# Kopiuj package.json i lock file najpierw dla lepszego cache'owania
COPY package*.json ./

# Instalacja zależności
RUN npm ci && npx cypress install

# Kopiuj resztę kodu
COPY . .

# Uruchomienie testów w Firefox
CMD ["npx", "cypress", "run", "--browser", "firefox"]
```

**Optymalizacje:**
- Używanie `npm ci` zamiast `npm install` (lepsze dla CI/CD)
- Warstwowe kopiowanie dla lepszego cache'owania Docker'a
- `.dockerignore` aby nie kopować niepotrzebnych plików

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
