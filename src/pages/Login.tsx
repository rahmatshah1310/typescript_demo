// import React, { useState } from "react";
import { useEffect, useState } from "react";
import LoginPageImage_1 from "@assets/images/LoginPageImage_1.png";
import LoginPageImage_2 from "@assets/images/LoginPageImage_2.png";
import LoginPageImage_3 from "@assets/images/LoginPageImage_3.png";
import homePhones from "@assets/images/homePhones.png";
import playstore from "@assets/images/playstore.png";
import microsoft from "@assets/images/microsoft.png";
import {InputField,Button,} from "@components";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
// import Spinner from "@components/common/Spinner";
import { ROUTES } from "@constants";
// import { useAuth } from "@features/context/AuthContext";
import { useForm } from "react-hook-form";

const Login = () => {
  const [activeIndex, setActiveIndex] = useState(0);
//   const { loginUser, user, loading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const images = [LoginPageImage_1, LoginPageImage_2, LoginPageImage_3];
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmitForm = async (data) => {
    try {
      await loginUser(data.email, data.password);
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setActiveIndex((prev) => (prev + 1) % images.length);
  //   }, 5000); // Change image every 5 seconds
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <section className="bg-black border-[#555555] mt-12 sm:mt-24 font-noto">
      <div className="flex w-full items-start justify-center mb-10 sm:mb-20 px-4 sm:px-0">
        {/* Image Section - Hidden on Mobile */}
        <section className="hidden sm:block w-[25%] h-full relative">
          <img src={homePhones} alt="Phones" className="relative z-0" />
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index + 1}`}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                activeIndex === index ? "opacity-100" : "opacity-0"
              }`}
              style={{
                left: "33.5%",
                top: "4%",
                width: "54%",
                height: "auto",
                objectFit: "cover",
              }}
            />
          ))}
        </section>

        {/* Login Form Section */}
        <section className="w-full max-w-[350px] sm:w-[20%] h-full mt-4">
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="w-full space-y-2 border border-[#555555] px-4 sm:px-10"
          >
            <h1 className="flex justify-center text-3xl sm:text-4xl py-8 sm:py-10 text-white">
              Instagram
            </h1>
            <div className="relative">
              <InputField
                type="email"
                id="email"
                name="email"
                label="Phone number or email"
                {...register("email", { required: "Email is required" })}
                className="block py-2 px-2.5 w-full text-sm text-[#F5F5F5] border border-[#555555] appearance-none dark:text-white dark:border-[#555555] dark:focus:border-[#555555] focus:outline-none focus:ring-0 focus:border-[#555555]"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.email.message}
              </p>
            )}

            <div className="relative">
              <InputField
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                label="Password"
                {...register("password", { required: "Password is required" })}
                className="block py-2 px-2.5 w-full text-sm text-[#F5F5F5] border border-[#555555] appearance-none dark:text-white dark:border-[#555555] dark:focus:border-[#555555] focus:outline-none focus:ring-0 focus:border-[#555555]"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 end-2.5 flex items-center text-[#F5F5F5] text-xs sm:text-sm font-medium cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-[#0069AD] text-white py-2 mt-2 mb-6 text-sm rounded-md"
            >
              {/* {loading ? <Spinner type="fade" /> : "Log in"} */}
            </Button>

            <div className="flex flex-col space-y-4 w-full max-w-xs mx-auto">
              {/* OR Separator */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-[#555555]"></div>
                <span className="text-[#737373] text-xs sm:text-[13px] font-semibold">
                  OR
                </span>
                <div className="flex-1 h-px bg-[#555555]"></div>
              </div>

              {/* Facebook Login Button */}
              <Button className="flex items-center justify-center gap-2 w-full text-[#0095F6] rounded text-sm sm:text-base font-semibold bg-transparent">
                <FaFacebook className="text-[##0095F6]" />
                Log in with Facebook
              </Button>

              {/* Forgot Password Link */}
              <Link className="text-center text-sm sm:text-base text-white mb-4">
                Forgot password?
              </Link>
            </div>
          </form>
          <div className="text-center justify-center flex gap-1.5 p-4 border text-xs sm:text-sm border-[#555555] mt-3">
            <span className="text-white">Don't have an accout?</span>
            <Link to={ROUTES.signup} className="text-[#0095F6]">
              Sign Up
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 p-4">
            <h4 className="text-center text-sm sm:text-base text-[#F5F5F5]">
              Get the app.
            </h4>
            <div className="flex gap-4 w-full sm:w-[35%] justify-center">
              <img src={playstore} alt="playstore" className="w-32 sm:w-auto" />
              <img src={microsoft} alt="microsoft" className="w-32 sm:w-auto" />
            </div>
          </div>
        </section>
      </div>
      {/* <AppFooter /> */}
    </section>
  );
};

export default Login;
