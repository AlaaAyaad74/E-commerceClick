import * as Yup from "yup";
const userLoginValidation = Yup.object().shape({
  email: Yup.string()
    .required("Email is Required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email is invalid!"
    )
    .email("Email is invalid!"),
  password: Yup.string().required(),
});
export default userLoginValidation;
