import { AxiosResponse } from "axios";
import { getAuthorizedHeaders, webClientInstance } from "./serverInstance";

export type StatusType<T = {}> = {
  status: "success" | "fail";
  message: any;
  code?: string;
} & T;

export function WebClientRegister(data: {
  email: string;
  username: string;
  password: string;
}): Promise<AxiosResponse<StatusType<{ Authorization: string }>>> {
  return webClientInstance.post("http://localhost:5000/user/", data);
}

export function WebClientLogin(data: {
  email: string;
  password: string;
}): Promise<AxiosResponse<StatusType<{ Authorization: string, email: string }>>> {
  return webClientInstance.post("http://localhost:5000/auth/login", data);
}

export function WebClientLogout(): Promise<AxiosResponse<StatusType>> {
  return webClientInstance.post(
    "/auth/logout",
    undefined,
    getAuthorizedHeaders()
  );
}

export function validateToken(token: string): Promise<AxiosResponse> {
  return webClientInstance.get(
    "http://localhost:5000/auth/validate",
    getAuthorizedHeaders()
  );
}
