// components/ForgotPasswordForm.tsx
import { useForm } from "react-hook-form";
import { ROUTES } from "@constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "@api";
import { toast } from "react-toastify";
import { forgotPasswordSchema, ForgotPasswordSchema } from "@types";
import { useEffect } from "react";
import { Button, InputField } from "@components";

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const forgotPasswordMutation = useForgotPasswordMutation();
  useEffect(() => {
    if (forgotPasswordMutation.status === "success") {
      toast.success("Password reset link sent to your email");
    } else if (forgotPasswordMutation.status === "error") {
      toast.error(`${forgotPasswordMutation.error?.message}`);
    }
  }, [forgotPasswordMutation.status, forgotPasswordMutation.error]);

  const onSubmit = (data: ForgotPasswordSchema) => {
    forgotPasswordMutation.mutate(data.email);
    console.log("Send reset link to:", data.email);
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-20 p-6 bg-white border rounded-md shadow text-black">
      {/* Optional logo */}
      <h2 className="text-2xl font-semibold text-center mb-4">Trouble logging in?</h2>
      <p className="text-sm text-gray-600 text-center mb-6">Enter your email, phone, or username and we’ll send you a link to get back into your account.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputField
          type="email"
          label=""
          placeholder="Email address"
          {...register("email", { required: "Email is required" })}
          className="border px-4 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black "
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}

        <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-medium text-sm" disabled={forgotPasswordMutation.isPending}>
          {forgotPasswordMutation.isPending ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>

      <div className="flex items-center my-6">
        <div className="flex-grow border-t" />
        <span className="mx-2 text-xs text-gray-400">OR</span>
        <div className="flex-grow border-t" />
      </div>

      <div className="text-center">
        <Link to={`${ROUTES.auth}/${ROUTES.signup}`} className="text-blue-500 text-sm font-medium">
          Create new account
        </Link>
      </div>

      <div className="text-center mt-6">
        <Link to={`${ROUTES.auth}/${ROUTES.login}`} className="text-sm text-gray-500">
          Back to login
        </Link>
      </div>
    </div>
  );
}
