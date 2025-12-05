const CryptoJS = require("crypto-js");

// Function to encrypt the password
export function encryptPassword(password, secretKey) {
  return CryptoJS.AES.encrypt(password, secretKey).toString();
}

export function alterUsername(username) {
  const now = new Date();
  const year = now.getFullYear();
  const date = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const pepper = `${year}${date}${month}`;
  return (username + pepper).split('').reverse().join('');
}
