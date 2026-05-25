import { useContext } from "react";
import { LoginContext } from "./LoginContext";

export function useLogin() {
  return useContext(LoginContext);
}
