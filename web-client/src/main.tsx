import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel} from "@radix-ui/themes";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme appearance="dark" accentColor="tomato">
      <App />
      <ThemePanel />
    </Theme>

  </StrictMode>,
);
