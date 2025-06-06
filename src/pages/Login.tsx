import { useEffect, useState } from "react";
import LoginPageImage_1 from "@assets/images/LoginPageImage_1.png";
import LoginPageImage_2 from "@assets/images/LoginPageImage_2.png";
import LoginPageImage_3 from "@assets/images/LoginPageImage_3.png";
import homePhones from "@assets/images/homePhones.png";
import playstore from "@assets/images/playstore.png";
import microsoft from "@assets/images/microsoft.png";
import { InputField, Button } from "@components";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ROUTES } from "@constants";
import { useForm, type SubmitHandler } from "react-hook-form";
import { LoginData } from "@types/";
import { useLoginMutation } from "@api";
import { useAuth } from "@context";



const Login = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const loginMutation = useLoginMutation();
  const { setAuthData  } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(LoginData),
  });

  const images = [LoginPageImage_1, LoginPageImage_2, LoginPageImage_3];

   useEffect(() => {
      if (loginMutation.status === "success") {
        setAuthData(loginMutation.data);
        alert("Authentication Successful");
        reset();
        // navigate(ROUTES.home);
      } else if (loginMutation.status === "error") {
        const errorMessage = loginMutation.error as string;
        alert(`Authentication failed!\n${errorMessage}`);
      }
    }, [loginMutation.status]);

    const onSubmit: SubmitHandler<LoginData> = (data:LoginData) => {
      loginMutation.mutate(data);
    };


  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-black border-[#555555] mt-12 sm:mt-24 font-noto">
      <div className="flex w-full items-start justify-center mb-10 sm:mb-20 px-4 sm:px-0">
        {/* Image Section */}
        <section className="hidden sm:block w-[25%] h-full relative">
          <img src={homePhones} alt="Phone Frame" className="relative z-0" />
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slideshow image ${index + 1}`}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${activeIndex === index ? "opacity-100" : "opacity-0"
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
            onSubmit={handleSubmit(onSubmit)}
            className="w-full space-y-2 border border-[#555555] px-4 sm:px-10"
          >
            <h1 className="flex justify-center text-3xl sm:text-4xl py-8 sm:py-10 text-white">
              Instagram
            </h1>

            {/* Email/Username Field */}
            <div className="relative">
              <InputField
                id="identifier"
                name="identifier"
                type="text"
                label="Phone number, username or email"
                register={register("identifier")}
                error={errors.identifier?.message}
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <InputField
                id="password"
                name="password"
                label="Password"
                isPassword="true"
                register={register("password")}
                error={errors.password?.message}
                className="block py-2 px-2.5 w-full text-sm text-[#F5F5F5] border border-[#555555] focus:outline-none focus:border-[#555555]"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#0069AD] text-white py-2 mt-2 mb-6 text-sm rounded-md"
            >
              {/* {isLoading ? "Logging in..." : "Log In"} */}
              Log In
            </Button>
           
            <div className="flex flex-col space-y-4 w-full max-w-xs mx-auto">
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-[#555555]" />
                <span className="text-[#737373] text-xs sm:text-[13px] font-semibold">
                  OR
                </span>
                <div className="flex-1 h-px bg-[#555555]" />
              </div>

              <Button className="flex items-center justify-center gap-2 w-full text-[#0095F6] rounded text-sm sm:text-base font-semibold bg-transparent">
                <FaFacebook />
                Log in with Facebook
              </Button>

              <Link className="text-center text-sm sm:text-base text-white mb-4">
                Forgot password?
              </Link>
            </div>
          </form>

          {/* Signup Redirect */}
          <div className="text-center flex justify-center gap-1.5 p-4 border text-xs sm:text-sm border-[#555555] mt-3">
            <span className="text-white">Don't have an account?</span>
            <Link to={ROUTES.signup} className="text-[#0095F6]">
              Sign Up
            </Link>
          </div>

          {/* App Download Section */}
          <div className="flex flex-col items-center justify-center gap-4 p-4">
            <h4 className="text-center text-sm sm:text-base text-[#F5F5F5]">
              Get the app.
            </h4>
            <div className="flex gap-4 justify-center">
              <img src={playstore} alt="Download from Play Store" className="w-32 sm:w-auto" />
              <img src={microsoft} alt="Download from Microsoft Store" className="w-32 sm:w-auto" />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Login;
