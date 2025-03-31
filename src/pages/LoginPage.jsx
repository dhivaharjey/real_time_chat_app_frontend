import React, { useState } from "react";

import { useAuthStore } from "../store/useAuthStore";
import { useFormik } from "formik";
import { logInValidation } from "../Utils/yupValidation";
import { TriangleAlert } from "lucide-react";
import InputBox from "../components/Inputs/InputBox";
import PasswordInput from "../components/Inputs/PasswordInput";
import Loader from "../components/LoadingAnimations/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { encryptValues } from "../Utils/encrypt";
import { useGoogleLogin } from "@react-oauth/google";
import { BsGoogle } from "react-icons/bs";
import axios from "axios";
import PageLoader from "../components/LoadingAnimations/PageLoader";
const LoginPage = () => {
  const { login, oauthLogin, showError } = useAuthStore();
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: logInValidation,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        setSubmitting(true);
        const { email, password } = encryptValues(values);
        const payload = {
          email,
          password,
        };
        const res = await login(payload);
        if (res) {
          resetForm();
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.message);
      } finally {
        setSubmitting(false);
      }
    },
  });
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v1/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );
        if (res?.status === 200) {
          const payload = {
            userName: res.data?.given_name,
            email: res.data?.email,
            profileImage: res.data?.picture,
            provider: "google",
            providerId: res.data?.id,
          };
          await oauthLogin(payload);
        }
        console.log(res);
      } catch (error) {
        console.log("Error while logging in with Google", error);
        toast.error("Error while logging in with Google");
      } finally {
        setIsAuthLoading(false);
      }
    },
    onError: (error) => {
      setIsAuthLoading(false);
      toast.error("Error while logging in with Google");
      console.error("Error while logging in with Google", error);
    },
  });

  return (
    <>
      {isAuthLoading ? (
        <div className="h-dvh w-[100vw] flex items-center justify-center  ">
          <PageLoader />
        </div>
      ) : (
        <div
          className="min-h-screen grid lg:grid-cols-2 bg-[#9fd3c7] bg-base-200
     "
        >
          {/* left */}
          <div className="flex flex-col justify-center items-center p-6 sm:p-12">
            <div className="w-full max-w-md space-y-8">
              <div className=" text-center mb-8">
                <div className="flex flex-col items-center gap-2 group ">
                  <div className="size-[6rem] rounded-xl  flex items-center justify-center group-hover:bg-sky-200 transition-colors">
                    {/* <MessageSquareText
                  //   size={32}
                  className="size-10 text-blue-500"
                /> */}
                    <img
                      src="src\assets\chat-app9.webp"
                      className="min-w-full bg-contain"
                      alt="Image"
                    />
                  </div>
                  <h1 className="text-2xl font-bold mt-2 ">Welcome Back !!!</h1>
                  <p>Sign in to your account </p>
                </div>
              </div>
              {/* error */}
              {showError && (
                <div className="flex items-center gap-3 font-semibold bg-red-100 p-3  text-red-600 rounded-lg">
                  <TriangleAlert className="size-5 text-red-700 " />
                  <p>{showError}</p>
                </div>
              )}
              <form onSubmit={formik.handleSubmit}>
                <InputBox
                  type="email"
                  label="Email"
                  placeholder="example@gmail.com"
                  name="email"
                  icon="email"
                  value={formik.values?.email}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                />
                {formik.touched?.email && formik?.errors?.email && (
                  <p className="text-sm -mt-3 mb-3 pl-1 text-red-600">
                    {formik.errors?.email}
                  </p>
                )}

                <PasswordInput
                  label="Password"
                  name="password"
                  value={formik.values?.password}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                />
                {formik.touched?.password && formik?.errors?.password && (
                  <p className="text-sm -mt-3 mb-3 pl-1 text-red-600">
                    {formik.errors?.password}
                  </p>
                )}

                <button
                  type="submit"
                  onSubmit={formik.handleBlur}
                  className="w-full btn btn-primary mt-4"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? (
                    <span>
                      <Loader className="text-sm" />
                    </span>
                  ) : (
                    "SignIn"
                  )}
                </button>
              </form>
              <button
                className="w-full btn btn-outline mt-4"
                onClick={() => {
                  setIsAuthLoading(true);
                  googleLogin();
                }}
              >
                <BsGoogle />
                SignUp with Google
              </button>
              <p className="text-center">
                If you don't have an Account ?{" "}
                <Link to="/signup" className="link link-info">
                  SignUp
                </Link>
              </p>
            </div>
          </div>
          {/* right */}
          <div className="hidden lg:block min-h-[100dvh]">
            <img
              src="src\assets\chat-app15.webp"
              className="min-h-[100dvh] min-w-full"
              alt="Image"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
