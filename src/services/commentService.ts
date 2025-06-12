import { sendRequest } from "@utils";

export const addComment = async (postId:string,data: FormData) => {
  try {
    const response = await sendRequest({
      method: "POST",
     url: `/post/comment/${postId}`,
      data,
    });
    return response.data;
  } catch (error) {
    console.log(`Add Comment Service error: ${error}`);
    throw error;
  }
};

export const getAllComment = async (postId:string) => {
  try {
    const response = await sendRequest({
      method: "GET",
     url: `/post/comment/${postId}`,
    });
    return response.data;
  } catch (error) {
    console.log(`Get All Comments Service error: ${error}`);
    throw error;
  }
};


export const deleteComment = async (commentId: string,) => {
  try {
    const response = await sendRequest({
      method: "PUT", 
      url: `/post/comments${commentId}`,
    });
    return response.data;
  } catch (error) {
    console.log(`Delete Comment Service error: ${error}`);
    throw error;
  }
};
