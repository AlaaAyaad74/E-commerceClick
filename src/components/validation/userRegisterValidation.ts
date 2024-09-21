import * as Yup from "yup";
const userRegisterValidation = Yup.object().shape({
  name: Yup.string()
    .required("Name is Required")
    .min(3, "Name must be at least 3 characters")
    .matches(/^[a-zA-Z\s]+$/, "Name must only contain letters and spaces"),
  email: Yup.string()
    .required("Email is Required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email is invalid!"
    )
    .email("Email is invalid!"),
  password: Yup.string()
    .required("Password is Required")
    .min(4, "Password must be at least 4 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Password Must match"),
  avatar: Yup.string()
    .required("Avatar URL is required")
    // .url("Invalid URL format"),
});
export default userRegisterValidation;
