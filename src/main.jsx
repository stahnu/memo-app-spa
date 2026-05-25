import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { LoginProvider } from "./LoginProvider.jsx";
import { NotesProvider } from "./NotesProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoginProvider>
      <NotesProvider>
        <App />
      </NotesProvider>
    </LoginProvider>
  </StrictMode>,
);
