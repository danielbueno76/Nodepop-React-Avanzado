import client from "./client";

export const resetPasswordSendEmail = ({ email }) => {
  return client.post("/api/others/forgotPassword", { email });
};
