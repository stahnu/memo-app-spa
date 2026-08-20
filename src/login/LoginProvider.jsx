import { useState, useEffect } from "react";
import { LoginContext } from "./LoginContext.js";

export function LoginProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    return storedIsLoggedIn ? JSON.parse(storedIsLoggedIn) : false;
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  function toggleLogin() {
    setIsLoggedIn((prev) => !prev);
  }

  return (
    <LoginContext value={{ isLoggedIn, toggleLogin }}>{children}</LoginContext>
  );
}
