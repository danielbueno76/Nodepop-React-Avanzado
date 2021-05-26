import client, { configureClient, resetClient } from "./client";
import storage from "../utils/storage";

export const login = (credentials, storeCredentials = false) => {
  return client.post("/api/auth/login", credentials).then(({ accessToken }) => {
    configureClient({ accessToken });
    if (storeCredentials) {
      storage.set("auth", accessToken);
    }
  });
};

export const logout = () => {
  return Promise.resolve().then(() => {
    resetClient();
    storage.remove("auth");
  });
};
