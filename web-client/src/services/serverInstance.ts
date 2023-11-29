import axios from "axios";
import { ENV_VARIABLES } from "../env";
export const ACCESS_TOKEN_KEY = "accessToken";

export const webClientInstance = axios.create({
  baseURL: ENV_VARIABLES.SERVER_BASE_URL,
});

export function getAuthorizedHeaders() {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
}
