import { z } from "zod";

export const SignupData = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z
        .string()
        .min(1, "Email is required")
        .email({ message: "Invalid email address" }),
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters long"),
    userName: z.string().min(1, "Username is required"),
});

export type SignupData = z.infer<typeof SignupData>;

export const LoginData = z.object({
    identifier: z
        .string()
        .min(1, "Email or username is required"),
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters long"),
});

export type LoginData = z.infer<typeof LoginData>;


export type LoginPayload = {
  identifier: string;  // Backend expects this name
  password: string;
};

export interface User {
    id: string;
    email: string;
    userName: string;
    fullName: string;
    avatar?: string;
    bio?: string;
    website?: string;
    followers?: number;
    following?: number;
    posts?: number;
    createdAt: string;
    updatedAt: string;
}
