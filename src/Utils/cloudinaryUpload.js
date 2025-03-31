import axios from "axios";
import { axiosInstance } from "./axios";

export const uploadToCloudinary = async (file) => {
  try {
    if (!file) throw new Error("No file selected");

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

    const res = await axios.post(import.meta.env.VITE_CLOUDINARY_URL, formData);

    if (res?.data?.secure_url) {
      return res.data?.secure_url;
    } else {
      throw new Error("Failed to upload image");
    }
  } catch (error) {
    console.error("Cloudinary Upload Error:", error.message);
    return null;
  }
};
