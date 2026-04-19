import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReactLenis } from "lenis/react";

import "@cookie-design-studio/ui/styles/tokens.css";
import "@cookie-design-studio/ui/styles/site-header.css";
import "@cookie-design-studio/ui/styles/split-text.css";
import "./index.css";
import "./lib/gsapSetup";
import App from "./App";
import { LENIS_OPTIONS } from "./lib/lenisOptions";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactLenis root options={LENIS_OPTIONS}>
      <App />
    </ReactLenis>
  </StrictMode>,
);
