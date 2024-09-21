import { FetchRegister } from "../../api/FetchRegister";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUser } from "../../components/interfaceModels/userModel";
import { yupResolver } from "@hookform/resolvers/yup";
import userRegisterValidation from "../../components/validation/userRegisterValidation";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useUploadImage from "../../utils/uploadAvatar";
import { IoCloudUploadSharp } from "react-icons/io5";

function Register() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { uploadFile, imageUrl } = useUploadImage();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({ resolver: yupResolver(userRegisterValidation) });
  const HandleRegister: SubmitHandler<IUser> = async (data) => {
    console.log(data);
    if (!imageUrl) {
      setErrorMessage("Please upload an avatar image.");
      return;
    }
    const formData = { ...data, avatar: imageUrl };
    console.log(formData);
    const result = await dispatch(FetchRegister(formData));
    // console.log(result);
    if (FetchRegister.rejected.match(result)) {
      // Display the error message from the thunk
      setErrorMessage(result.payload as string);
    } else {
      // Navigate on successful registration
      navigate("/login");
    }
  };

  return (
    <div
      className="relative flex h-[100vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-cover bg-center bg-no-repeat bg-[url('./cover.png')] before:content-[''] before:absolute before:inset-0 before:bg-black before:bg-opacity-20 before:pointer-events-none"
      style={{
        backgroundImage: `url('./assets/cover.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-[rgba(255,255,255,.9)] py-8 px-4 rounded-md w-[90%] sm:w-[420px] m-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="/assets/logo.png"
            className="mx-auto h-8 w-auto"
          />
          <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit(HandleRegister)}
            className="space-y-3  z-10 relative "
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  required
                  {...register("name")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  {...register("email")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  required
                  {...register("password")}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmpassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-1">
                <input
                  id="confirmpassword"
                  type="password"
                  required
                  {...register("confirmPassword")}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="avatar"
                  className=" w-[100%] my-1 py-2 rounded-md cursor-pointer text-sm font-medium leading-6 text-gray-900 bg-white flex items-center flex-col"
                >
                  <span>
                    <IoCloudUploadSharp />
                  </span>
                  Avatar
                  <span className="text-green-500">
                    {imageUrl && "Image Uplaoded Successfully!"}
                  </span>
                </label>
              </div>
              <div className="mt-1">
                <input
                  id="avatar"
                  type="file"
                  required
                  {...register("avatar")}
                  accept="image/*"
                  onChange={uploadFile}
                  className=" hidden"
                />

                {errors.avatar && (
                  <p className="text-red-500">{errors.avatar.message}</p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md disabled:bg-slate-500 disabled:cursor-not-allowed bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                disabled={!imageUrl}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
