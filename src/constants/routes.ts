export const ROUTES = {
  auth: "/auth",
  login: "/auth/login",
  signup: "/auth/signup",
  home: "/",
  profile: (username) => `/${username}`,
  search: "/search",
  explore: "/explore",
} as const;
