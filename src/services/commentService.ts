import { sendRequest } from "@utils";

// ✅ Add Comment (POST to /post/comment/:postId with form data)
export const addComment = async (postId: string, data: FormData) => {
  try {
    const response = await sendRequest({
      method: "POST",
      url: `/post/comment/${postId}`,
      data, 
    });
    return response.data;
  } catch (error) {
    console.error("Add Comment Service error:", error);
    throw error;
  }
};

// ✅ Get All Comments for a post
export const getAllComment = async (postId: string) => {
  try {
    const response = await sendRequest({
      method: "GET",
      url: `/post/comments/${postId}`,
    });
    return response.data;
  } catch (error) {
    console.error("Get All Comments Service error:", error);
    throw error;
  }
};

// ✅ Delete Comment (PUT is unusual — use DELETE if backend supports)
export const deleteComment = async (commentId: string) => {
  try {
    const response = await sendRequest({
      method: "DELETE", 
      url: `/post/comment/${commentId}`,
    });
    return response.data;
  } catch (error) {
    console.error("Delete Comment Service error:", error);
    throw error;
  }
};
