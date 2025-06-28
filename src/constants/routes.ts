export const ROUTES = {
    auth: "/auth",
    login: "/auth/login",    // Updated to include parent path
    signup: "/auth/signup", 
    home: "/",              
   profile: (username) => `/${username}`,
    search: "/search",
} as const;