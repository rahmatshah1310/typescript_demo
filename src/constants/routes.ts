export const ROUTES = {
  auth: "/auth",
  login: "login",
  signup: "signup",
  forgotPassword: "forgot-password",
  resetPassword: "reset-password",
  home: "/",
  profile: (username) => `/${username}`,
  search: "/search",
  explore: "/explore",
} as const;
