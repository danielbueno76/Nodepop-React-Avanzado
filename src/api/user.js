import client from "./client";

export const getUser = (username) => {
  return client.get(`/api/v1/users/${username}`);
};
