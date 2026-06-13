FROM cypress/browsers:latest

WORKDIR /e2e

# Kopiuj package.json i lock file najpierw dla lepszego cache'owania
COPY package*.json ./

# Instalacja zależności
RUN npm ci && npx cypress install

# Kopiuj resztę kodu
COPY . .

# Uruchomienie testów (domyślnie Electron, można wybrać inną: firefox, chromium, edge)
CMD ["npx", "cypress", "run"]
