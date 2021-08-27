const aes256 = require("aes256");
//the secret key used for encrypting and decrypting messages
const secret_key = process.env.REACT_APP_AES_SECRET;

//returns the encrypted text
export const to_Encrypt = (text) => {
  var encrypted = aes256.encrypt(secret_key, text);
  return encrypted;
};
//welcome message is not decrypted
export const to_Decrypt = (cipher, username) => {
  if (cipher.startsWith("Welcome")) {
    return cipher;
  }

  if (cipher.startsWith(username)) {
    return cipher;
  }
  //decryped message is returned
  const decrypted = aes256.decrypt(secret_key, cipher);
  return decrypted;
};
