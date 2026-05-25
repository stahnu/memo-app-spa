import { useState, useEffect } from "react";
import { LoginContext, SetLoginContext } from "./LoginContext.js";

export function LoginProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    return storedIsLoggedIn ? JSON.parse(storedIsLoggedIn) : false;
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <LoginContext value={isLoggedIn}>
      <SetLoginContext value={setIsLoggedIn}>{children}</SetLoginContext>
    </LoginContext>
  );
}
