import CryptoJS from "crypto-js";

export const encryptValues = ({ email, password, confirmPassword }) => {
  const encryptedEmail = CryptoJS.AES.encrypt(
    email,
    import.meta.env.VITE_ENCRYPT_KEY
  ).toString();
  const encryptedPassword = CryptoJS.AES.encrypt(
    password,
    import.meta.env.VITE_ENCRYPT_KEY
  ).toString();
  const encryptedConfirmPassword = confirmPassword
    ? CryptoJS.AES.encrypt(
        confirmPassword,
        import.meta.env.VITE_ENCRYPT_KEY
      ).toString()
    : null;
  const encryptedValues = {
    email: encryptedEmail,
    password: encryptedPassword,
    confirmPassword: confirmPassword && encryptedConfirmPassword,
  };
  // console.log(encryptedValues);

  return encryptedValues;
};
