import { useState } from "react";
import { LoginContext } from "./LoginContext.js";

export function LoginProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function toggleLogin() {
    setIsLoggedIn((prev) => !prev);
  }

  return (
    <LoginContext value={{ isLoggedIn, toggleLogin }}>{children}</LoginContext>
  );
}
