import Keycloak from "keycloak-js";

const keycloakInstance = new Keycloak({
  url: "http://localhost:9090",
  realm: "MaroX",
  clientId: "Marox-frontend",
});

export default keycloakInstance;
