import React, { createContext, useContext, useEffect } from "react";
import keycloakInstance from "./keycloak";
import Keycloak from "keycloak-js";

const KeycloakContext = createContext<Keycloak | undefined>(undefined);

export const KeycloakProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInitialized, setIsInitialized] = React.useState(false);
  useEffect(() => {
    const initKeycloak = async () => {
      try {
        const authenticated = await keycloakInstance.init({
          onLoad: "login-required"
        });
        
        console.log("Keycloak authenticated:", authenticated);
        setIsInitialized(true);
        if (!authenticated) {
          console.warn("User is not authenticated");
        }
      } catch (err) {
        console.error("Keycloak initialization error:", err);
      }
    };

    if (!keycloakInstance.didInitialize) initKeycloak();
   
  }, []);

  if (!isInitialized) {
    return <div>Loading authentication...</div>;
  }

  return (
    <KeycloakContext.Provider value={keycloakInstance}>
      {children}
    </KeycloakContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useKeycloak = (): Keycloak => {
  const context = useContext(KeycloakContext);
  if (!context) {
    throw new Error("useKeycloak must be used within KeycloakProvider");
  }
  return context;
};