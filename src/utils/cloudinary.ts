// utils/cloudinary.ts
export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "uploading_image");

  const response = await fetch("https://api.cloudinary.com/v1_1/dxlrswf59/image/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (!response.ok || !data.secure_url) {
    throw new Error(data.error?.message || "Cloudinary upload failed");
  }

  return data.secure_url;
};
