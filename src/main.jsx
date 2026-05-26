import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { Security } from "@okta/okta-react";

import App from "./App.jsx";
import { oktaAuth } from "./auth/oktaConfig";
import "./index.css";

function OktaSecurityWrapper() {
  const navigate = useNavigate();

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    navigate(originalUri || "/", { replace: true });
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <App />
    </Security>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <OktaSecurityWrapper />
    </BrowserRouter>
  </React.StrictMode>
);