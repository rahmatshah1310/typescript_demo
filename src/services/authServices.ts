import axios from "axios";
import { sendRequest } from "@utils";


export const login = async () => {
  try {
    const response = await sendRequest({
      method: "POST",
      url: "/auth/login",
    });
    return response.data.data;
  } catch (error) {
    console.log(`Auth Service [login] error: ${error}`);
    throw error;
  }
};

export const signUp = async (data: unknown) => {
  try {
    const response = await sendRequest({
      method: "POST",
      url: "/auth/signup",
      data,
    });
    return response.data;
  } catch (error) {
    console.log(`Auth Service [signUp] error: ${error}`);
    throw error;
  }
};

export const me = async () => {
  try {
    const response = await sendRequest({
      method: "GET",
      url: "/auth/me",
    });
    return response.data.data;
  } catch (error) {
    console.log(`Auth Service [me] error: ${error}`);
    throw error;
  }
};









