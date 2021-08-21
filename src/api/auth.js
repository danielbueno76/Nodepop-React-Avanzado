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

export const modifyUserInfo = ({ username, email, newPassword: password }) => {
  return password
    ? client.put("/api/auth/me", { username, email, password })
    : client.put("/api/auth/me", { username, email });
};

export const checkUserPassword = ({ oldPassword: password }) => {
  return client.post("/api/auth/checkPassword", { password });
};

export const deleteUser = async () => {
  await client.delete("/api/auth/me");
  return logout();
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
