  import { sendRequest } from "@utils";

  export const addProfilePic = async (data: FormData) => {
    try {
      const response = await sendRequest({
        method: "POST",
        url: "/profile-settings/profile-pic",
        data
      });
      return response.data;
    } catch (error) {
      console.log(`Profile Service [addProfilePic] error: ${error}`);
      throw error;
    }
  };

  export const updateProfile = async (data: FormData) => {
    try {
      const response = await sendRequest({
        method: "PUT",
        url: "/profile-settings/profile-pic",
        data,
      });
      return response.data;
    } catch (error) {
      console.log(`Profile Service [updateProfile] error: ${error}`);
      throw error;
    }
  };
