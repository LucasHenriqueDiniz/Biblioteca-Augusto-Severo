import { createContext, useCallback, useContext, useState } from "react";
import {
  WebClientRegister,
  WebClientLogin,
  WebClientLogout,
  validateToken,
} from "../services/webClient";
export const ACCESS_TOKEN_KEY = "accessToken";

type StatusType = "unauthenticated" | "authenticated" | "validating";

export type AuthContextType = {
  status: StatusType;
  register(data: {
    email: string;
    username: string;
    password: string;
  }): Promise<boolean | any>;
  logIn(data: { email: string; password: string }): Promise<boolean>;
  logOut(): Promise<boolean>;
  checkAuthenticated: () => Promise<boolean>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: any) {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem(ACCESS_TOKEN_KEY)
  );
  const [status, setStatus] = useState<StatusType>("unauthenticated");

  const register = useCallback<AuthContextType["register"]>(
    async (data) => {
      try {
        setStatus("validating");
        const response = await WebClientRegister(data);
        console.log(response, "response")
        const token = response.data.Authorization;
        console.log(token, "token")
        setAccessToken(token);
        setStatus("authenticated");
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
        return { success: true };
      } catch (error) {
        return { success: false, error: error || "Registration failed" };
      }
    },
    [setAccessToken, setStatus]
  );

  const logIn = useCallback<AuthContextType["logIn"]>(
    async (data) => {
      try {
        setStatus("validating");
        const response = await WebClientLogin(data);
        const token = response.data.Authorization;
        setAccessToken(token);
        setStatus("authenticated");
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
        return true;
      } catch {
        return false;
      }
    },
    [setAccessToken, setStatus]
  );

  const logOut = useCallback<AuthContextType["logOut"]>(async () => {
    const clearToken = () => {
      setAccessToken(null);
      setStatus("unauthenticated");
      localStorage.removeItem(ACCESS_TOKEN_KEY);

      return true;
    };

    if (!accessToken) return clearToken();
    try {
      await WebClientLogout();
      return clearToken();
    } catch {
      return false;
    }
  }, [accessToken, setAccessToken, setStatus]);

  const checkAuthenticated = useCallback<
    AuthContextType["checkAuthenticated"]
  >(async () => {
    if (!accessToken) return false;
    try {
      setStatus("validating");
      await validateToken(accessToken);
      setStatus("authenticated");
      return true;
    } catch {
      return false;
    }
  }, [accessToken]);

  const values: AuthContextType = {
    status,
    register,
    logIn,
    logOut,
    checkAuthenticated,
  };

  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
