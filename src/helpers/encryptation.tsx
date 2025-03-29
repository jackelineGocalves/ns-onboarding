var CryptoJS = require("crypto-js");

const secretKey = ")0-{;&BaGt>H]'JWO6bDaAO6VM3qW+";
export const dataEncrypt = (value : any) => {
  return CryptoJS.AES.encrypt(JSON.stringify(value), secretKey).toString();
};

export const dataDecrypt = (value : any) => {
  const bytes = CryptoJS.AES.decrypt(value, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
