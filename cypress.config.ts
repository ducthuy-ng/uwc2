import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    DB_CONN_STRING: "postgresql://dev:password@localhost:5432/dev"
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
