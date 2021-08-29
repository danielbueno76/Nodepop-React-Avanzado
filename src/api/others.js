import client from "./client";

export const resetPasswordSendEmail = ({ email, subject, body }) => {
  return client.post("/api/others/forgotPassword", { email, subject, body });
};

export const signEmail = (email) => {
  return client.post("/api/others/signEmail", { email });
};
