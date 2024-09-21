import { useDispatch } from "react-redux";
import { fetchLogin } from "../../api/FetchLogin";
import { AppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import userLoginValidation from "../../components/validation/userLoginValidation";
import { ILoguser } from "../../components/interfaceModels/userModel";
import { useEffect, useState } from "react";

function Login() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userLoginValidation) });

  const HandleLogin: SubmitHandler<ILoguser> = async (data) => {
    const result = await dispatch(fetchLogin(data));
    if (fetchLogin.fulfilled.match(result)) {
      navigate("/");
    } else if (fetchLogin.rejected.match(result)) {
      setLoginError("Password or Email Incorrect");
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
            className="mx-auto h-13 w-auto"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(HandleLogin)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  {...register("email")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  required
                  {...register("password")}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {loginError && (
              <p className="text-red-500" style={{ margin: 0 }}>
                {loginError}
              </p>
            )}
            <div>
              <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign in
              </button>
            </div>
            <div>
              <a
                href="/register"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
