import { sendRequest } from "@utils";
import { toast } from "react-toastify";

export const createPost = async (data: FormData) => {
  try {
    const response = await sendRequest({
      method: "POST",
     url: "/post",
      data,
    });
    return response.data;
  } catch (error) {
    console.log(`Post Service error: ${error}`);
    throw error;
  }
};

export const deletePost = async (id: string) => {
  try {
    const response = await sendRequest({
      method: " DELETE",
     url: `/post/${id}`,
    });
    return response.data.data;
  } catch (error) {
    console.log(`Delete Post Service error: ${error}`);
    throw error;
  }
};


export const updatePost = async (id: string, data: FormData) => {
  try {
    const response = await sendRequest({
      method: "PUT", 
      url: `/post/${id}`,
      data,
    });
    return response.data;
  } catch (error) {
    console.log(`Update Post Service error: ${error}`);
    throw error;
  }
};


export const getAllPosts = async () => {
  try {
    const response = await sendRequest({
      method: "GET",
      url: "/post/my-posts", // adjust if backend uses something like /posts
    });
    return response.data.data;
  } catch (error) {
    console.log(`Get All Posts Service error: ${error}`);
    throw error;
  }
};


export const getSinglePost = async (_id: string) => {
  try {
    const response = await sendRequest({
      method: "GET",
      url: `/post/${_id}`,
    });
    return response.data;
  } catch (error) {
    toast.error(`Get Single Post Service error: ${error}`);
    throw error;
  }
};
