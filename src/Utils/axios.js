import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export const axiosUploadProfilePic = axios.create({
  baseURL: import.meta.env.CLOUDINARY_URL,
});
