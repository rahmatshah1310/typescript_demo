import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "@api";
import { ResetPasswordInput, resetPasswordSchema } from "@types";
import { ROUTES } from "@constants";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [oobCode, setOobCode] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("oobCode");
    setOobCode(code);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const resetPasswordMutation = useResetPasswordMutation();

  useEffect(() => {
    if (resetPasswordMutation.status === "success") {
      toast.success("Password reset successfully!");
      navigate(`${ROUTES.auth}/${ROUTES.login}`);
    } else if (resetPasswordMutation.status === "error") {
      toast.error(`${resetPasswordMutation.error?.message}`);
    }
  }, [resetPasswordMutation.status, resetPasswordMutation.error, navigate]);

  const onSubmit = async (data) => {
    if (!oobCode) {
      toast.error("Invalid or missing password reset code.");
      return;
    }
    resetPasswordMutation.mutate({ oobCode, newPassword: data.password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

        <div className="mb-4">
          <label className="block mb-1">New Password</label>
          <input type="password" {...register("password")} className="w-full px-3 py-2 border border-gray-300 rounded" />
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Confirm Password</label>
          <input type="password" {...register("confirmPassword")} className="w-full px-3 py-2 border border-gray-300 rounded" />
          {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" disabled={resetPasswordMutation.isPending}>
          {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
