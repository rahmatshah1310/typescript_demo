import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

export const sendRequest = async (
  configs: AxiosRequestConfig
): Promise<AxiosResponse> => {
  const token = localStorage.getItem("accessToken");

  const headers = { ...(configs.headers || {}) } as Record<string, string>;

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const requestConfig: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_API_BASE_URL as string,
    ...configs,
    headers,
  };

  try {
  return await axios(requestConfig);
} catch (error) {
  console.log("AXIOS ERROR", error);

  if (axios.isAxiosError(error)) {
    if (error.code === "ERR_CANCELED") return Promise.reject(error);

    const responseError =
      error.response?.data?.data || error.response?.data?.message;

    if (responseError) {
      if (typeof responseError === "string") {
        return Promise.reject(responseError);
      }

      // Flatten nested object (e.g., { email: ["error 1"], password: ["error 2"] })
      if (typeof responseError === "object" && responseError !== null) {
        const messages: string[] = [];

        Object.entries(responseError).forEach(([field, value]) => {
          if (Array.isArray(value)) {
            value.forEach((msg) => messages.push(`${field}: ${msg}`));
          } else {
            messages.push(`${field}: ${value}`);
          }
        });

        return Promise.reject(messages.join("\n"));
      }
    }
  }

  // Fallback error
  return Promise.reject("An unknown error occurred");
}
};
