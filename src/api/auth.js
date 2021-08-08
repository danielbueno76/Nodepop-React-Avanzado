import client, { configureClient, resetClient } from "./client";
import storage from "../utils/storage";

export const login = ({ remember, ...credentials }) => {
  return client.post("/api/auth/login", credentials).then(({ accessToken }) => {
    configureClient({ accessToken });
    if (remember) {
      storage.set("auth", accessToken);
    }
  });
};

export const signup = (credentials) => {
  return client.post("/api/auth/signup", credentials);
};

export const getUserInfo = () => {
  return client.get("/api/auth/me");
};

export const modifyUserPassword = (accessToken, password) => {
  configureClient({ accessToken });
  return client.put("/api/auth/me", { password });
};

export const logout = () => {
  return Promise.resolve().then(() => {
    resetClient();
    storage.remove("auth");
  });
};
