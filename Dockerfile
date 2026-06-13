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
