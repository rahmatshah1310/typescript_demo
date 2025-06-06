import { useEffect, useState } from "react";
import { InputField, Button } from "@components";
import { IoLogoFacebook } from "react-icons/io";
import playstore from "@assets/images/playstore.png";
import microsoft from "@assets/images/microsoft.png";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@constants";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { SignupData } from "@types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignupMutation } from "@api";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(SignupData),
    mode: "onBlur",
  });

  const navigate = useNavigate();
  const signupMutation = useSignupMutation();




 useEffect(() => {
  if (signupMutation.status === "success") {
    alert("Signup successful! Please login.");
    navigate(ROUTES.login);
    reset();
  } else if (signupMutation.status === "error") {
    const errorMessage = signupMutation.error as string;
    alert(`Signup failed!\n${errorMessage}`);
  }
}, [signupMutation.status]);

  const handleSubmitForm = (data: SignupData) => {
    signupMutation.mutate(data);
  };

  return (
    <section className="bg-black text-white mt-3 min-h-screen">
      <div className="flex justify-center px-4 sm:px-0">
        <div className="w-full max-w-[350px] sm:w-[20%]">
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="w-full space-y-2 border border-[#555555] px-4 sm:px-10"
          >
            <h1 className="flex justify-center text-3xl sm:text-4xl pt-8 sm:pt-10 py-2">
              Instagram
            </h1>
            <h4 className="flex justify-center text-sm sm:text-base px-2 sm:px-4 pb-3 text-center text-[#A8A8A8]">
              Sign up to see photos and videos from your friends.
            </h4>
            <Button className="flex items-center justify-center gap-2 w-full py-1 my-2 bg-primaryColor rounded-md text-white text-sm sm:text-base font-semibold">
              <IoLogoFacebook />
              Log in with Facebook
            </Button>
            <div className="flex items-center gap-4 my-5">
              <div className="flex-1 h-px bg-[#555555]"></div>
              <span className="text-[#737373] text-xs sm:text-sm font-medium">
                OR
              </span>
              <div className="flex-1 h-px bg-[#555555]"></div>
            </div>

            {/* Email input */}
            <div className="relative">
              <InputField
                name="email"
                type="email"
                label="Phone number or email"
                register={register("email")}
                error={errors.email?.message}
              />
            </div>

            {/* Password input */}
            <div className="relative">
              <InputField
                name="password"
                label="Password"
                isPassword="true"
                register={register("password")}
                error={errors.password?.message}
                className="block py-2 px-2.5 w-full text-sm text-[#F5F5F5] border border-[#555555] focus:outline-none focus:border-[#555555]"
              />
            </div>

            {/* Full Name input */}
            <div className="relative">
              <InputField
                name="fullName"
                label="Full Name"
                register={register("fullName")}
                error={errors.fullName?.message}
                className="block py-2 px-2.5 w-full text-sm text-[#F5F5F5] border border-[#555555] focus:outline-none focus:border-[#555555]"
              />
            </div>            {/* userName input */}
            <div className="relative">
              <InputField
                name="userName"
                label="Username"
                register={register("userName")}
                error={errors.userName?.message}
                className="block py-2 px-2.5 w-full text-sm text-[#F5F5F5] border border-[#555555] focus:outline-none focus:border-[#555555]"
              />
            </div>

            <div className="flex flex-col text-xs sm:text-sm text-[#A8A8A8] text-center py-2 space-y-2">
              <p>
                People who use our service may have uploaded your contact
                information to Instagram.
                <Link to="/learn-more" className="text-white">
                  Learn More
                </Link>
              </p>
              <p>
                By signing up, you agree to our{" "}
                <Link to="/terms" className="text-white">
                  Terms
                </Link>
                ,
                <Link to="/privacy-policy" className="text-white">
                  Privacy Policy
                </Link>
                and{" "}
                <Link to="/cookies-policy" className="text-white">
                  Cookies Policy
                </Link>
                .
              </p>
            </div>            <Button
              type="submit"
              // disabled={isLoading}
              className="w-full bg-[#0095f6] text-white py-2 my-2 rounded font-semibold text-sm sm:text-base"
            >
              {/* {isLoading ? "Signing up..." : "Sign up"} */}
              Sign Up
            </Button>
          </form>
          <div className="text-center flex flex-col py-2 border border-[#555555] mt-2 text-sm sm:text-base">
            <span>Have an account?</span>
            <Link to={ROUTES.login} className="text-[#0095F6]">
              Log in
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 p-2 mb-10">
            <h4 className="text-center text-sm sm:text-base">Get the app.</h4>
            <div className="flex gap-4 w-full sm:w-[35%] justify-center">
              <img src={playstore} alt="playstore" className="w-32 sm:w-auto" />
              <img src={microsoft} alt="microsoft" className="w-32 sm:w-auto" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 mb-10">
        {/* <AppFooter /> */}
      </div>
    </section>
  );
};

export default SignUp;
