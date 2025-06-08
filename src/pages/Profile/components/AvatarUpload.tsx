// import React, { useState } from "react";
// import { doc, updateDoc } from "firebase/firestore";
// import { firestore } from "@/firebase";
// import { useAuth } from "@features/context/AuthContext";
// import InputField from "@components/common/InputField";

// const AvatarUpload = () => {
//   const { user, setUser } = useAuth();
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleAvatarUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "uploading_image"); // <-- Use this, not "dxlrswf59" // Make sure this matches your Cloudinary preset
//     try {
//       setUploading(true);
//       setError(null);

//       // Fix 1: Replace {uploading_image} with your actual Cloudinary cloud name
//       const response = await fetch(
//         "https://api.cloudinary.com/v1_1/dxlrswf59/image/upload", // Replace YOUR_CLOUD_NAME
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await response.json();

//       // Fix 2: Better error handling for Cloudinary response
//       if (!response.ok || !data.secure_url) {
//         throw new Error(data.error?.message || "Cloudinary upload failed");
//       }

//       // Update Firestore
//       const userDoc = doc(firestore, "users", user.uid);
//       await updateDoc(userDoc, { profilePic: data.secure_url });

//       // Update user state
//       setUser((prevUser) => ({
//         ...prevUser,
//         profilePic: data.secure_url,
//       }));
//     } catch (err) {
//       console.error("Upload error:", err);
//       // Fix 3: More specific error message
//       setError(`Upload failed: ${err.message}`);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <label className="w-40 h-40 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden mb-4 cursor-pointer">
//         {user?.profilePic ? (
//           <img
//             src={user.profilePic}
//             alt="Profile"
//             className="object-cover w-full h-full"
//           />
//         ) : (
//           <span className="text-gray-400">
//             {uploading ? "Uploading..." : "No Image"}
//           </span>
//         )}
//         <InputField
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={handleAvatarUpload}
//           disabled={uploading}
//         />
//       </label>
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//     </div>
//   );
// };

// export default AvatarUpload;
