export const ROUTES = {
    auth: "/auth",
    login: "/auth/login",    // Updated to include parent path
    signup: "/auth/signup",  // Updated to include parent path
    home: "/",              // Changed to root path
   profile: (username) => `/${username}`,
    search: "/search",
} as const;