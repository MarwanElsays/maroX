import React, { createContext, useContext, useEffect } from "react";
import keycloakInstance from "./keycloak";
import Keycloak from "keycloak-js";

type KeycloakContextType = {
  isInitialized: boolean;
  keycloak: Keycloak;
};

const KeycloakContext = createContext<KeycloakContextType | undefined>(undefined);

export const KeycloakProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInitialized, setIsInitialized] = React.useState(false);
  useEffect(() => {
    const initKeycloak = async () => {
      try {
        const authenticated = await keycloakInstance.init({
          onLoad: "check-sso",
          silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
        });
        
        console.log("Keycloak authenticated:", authenticated);
        setIsInitialized(true);
        if (!authenticated) {
          console.warn("User is not authenticated");
          keycloakInstance.login();
        }

      } catch (err) {
        console.error("Keycloak initialization error:", err);
      }
    };

    if (!keycloakInstance.didInitialize) initKeycloak();
  }, []);

  return (
    <KeycloakContext.Provider value={{ isInitialized, keycloak: keycloakInstance }}>
      {children}
    </KeycloakContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useKeycloak = (): KeycloakContextType => {
  const context = useContext(KeycloakContext);
  if (!context) {
    throw new Error("useKeycloak must be used within KeycloakProvider");
  }
  return context;
};