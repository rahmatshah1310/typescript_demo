import { sendRequest } from "@utils";

export const likePost = async (postId: string) => {
    try {
        const response = await sendRequest({
            method: "POST",
            url: `/post/like/${postId}`,
        });
        return response.data;
    } catch (error) {
        console.error("Like Post Service error:", error);
        throw error;
    }
};

export const dislikePost = async (postId: string) => {
    try {
        const response = await sendRequest({
            method: "POST",
            url: `/post/dislike/${postId}`,
        });
        return response.data;
    } catch (error) {
        console.error("Dislike Post Service error:", error);
        throw error;
    }
};

