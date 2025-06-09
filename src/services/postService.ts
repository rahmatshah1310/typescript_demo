import { sendRequest } from "@utils";

export const createPost = async (data: FormData) => {
  try {
    const response = await sendRequest({
      method: "POST",
     url: "/post",
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(`Post Service error: ${error}`);
    throw error;
  }
};