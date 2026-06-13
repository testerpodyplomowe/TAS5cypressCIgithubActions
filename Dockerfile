FROM cypress/browsers:latest

WORKDIR /e2e

COPY . .

RUN npm install
RUN npx cypress install

CMD ["npx", "cypress", "run", "--browser", "firefox"]

