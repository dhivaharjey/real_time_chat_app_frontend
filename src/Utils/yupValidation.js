import * as Yup from "yup";

export const signUpValidation = Yup.object().shape({
  userName: Yup.string()
    .trim()
    .matches(
      /^(?!.*(.)\1{3,})[A-Za-z0-9_]{3,32}$/,
      "Name must only contain letters and numbers, and no character should repeat more than twice consecutively! min 3 and max 32 characters"
    )
    .required("UserName is required"),

  email: Yup.string()
    .trim()
    .matches(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      "Enter Valid Email Address"
    )
    .required("Email is required"),
  password: Yup.string()
    .trim()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      "Minimum 8 characters, least one uppercase letter, one lowercase letter, one number and one special character,_ and - should not allowed"
    )
    .required("Password required"),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Password doesn't match, Enter same passsword"
    )
    .required("Confirm password is required"),
  profileImage: Yup.null,
});
export const logInValidation = Yup.object().shape({
  email: Yup.string()
    .trim()
    // .transform((value) => (value ? value.toLowerCase() : value))
    .matches(
      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
      "Enter a valid Email ID (must be lowercase)"
    )
    .required("Email is required"),
  password: Yup.string()
    .trim()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      "Password must be at least 8 characters long, contain 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
    )
    .required("Password is required"),
});
