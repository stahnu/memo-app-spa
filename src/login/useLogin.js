import { useContext } from "react";
import { LoginContext, SetLoginContext } from "./LoginContext.js";

export function useLogin() {
  return useContext(LoginContext);
}

export function useSetLogin() {
  return useContext(SetLoginContext);
}
