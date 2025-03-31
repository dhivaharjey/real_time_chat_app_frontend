import React, { useState } from "react";
import { Camera, Trash2, User } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../components/LoadingAnimations/Loader";
import { useAuthStore } from "../store/useAuthStore";
import { uploadToCloudinary } from "../Utils/cloudinaryUpload";

const ProfilePicUpload = ({
  image,
  setImage,
  setLoading,
  loading,
  uploadProfilePic,
}) => {
  const [preview, setPreview] = useState(image || null);
  const { authUser, deleteProfilePic } = useAuthStore();

  //   console.log(image, preview);
  const handleImageUpload = async (e) => {
    try {
      setLoading(true);
      const file = e.target.files[0];
      if (!file) return;

      if (file.size > 3 * 1024 * 1024) {
        // 3MB limit
        toast.error("Image size must be less than 3MB");
        return;
      }
      // Show Preview Before Uploading
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => setPreview(reader.result);

      // Upload to Cloudinary

      // const url = await uploadToCloudinary(file);
      // if (url) {
      // setImage(res.data.secure_url);
      setImage(file);
      // toast.success("Image uploaded successfully");

      if (authUser) {
        // await uploadProfilePic(res.data.secure_url);
        const url = await uploadToCloudinary(file);
        url && (await uploadProfilePic(url));
      }
      // }
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      if (authUser) {
        await deleteProfilePic();
        setPreview(null);
      } else {
        setPreview(null);
        setImage(null);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete image");
    } finally {
      setLoading(false);
    }
  };
  // console.log(image, preview);
  // console.log(authUser?.profileImage);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <img
          src={preview || authUser?.profileImage || "src/assets/avatar.png"}
          alt="Profile"
          className="size-32 rounded-full object-cover border-4"
        />

        {/* {authUser?.userName?.slice(0, 1).toUpperCase()} */}
        <label
          htmlFor="profileUpload"
          className="absolute bottom-2 -right-1 p-2 rounded-full bg-base-content cursor-pointer"
        >
          {loading ? (
            <Loader />
          ) : (
            !preview && <Camera className="w-5 h-5 text-base-200" />
          )}
          <input
            type="file"
            id="profileUpload"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={preview}
          />
        </label>
        {!loading && preview && (
          <button
            onClick={handleDelete}
            className="absolute  bottom-[.28rem] right-[-.48rem] bg-error hover:bg-error-focus p-[.6rem] rounded-full transition-all duration-200 shadow-lg"
          >
            <Trash2 className="w-5 h-5 text-black" />
          </button>
        )}
      </div>
      <p className="text-sm text-gray-400">
        {loading
          ? "Uploading..."
          : preview
          ? "Click the trash icon to delete a photo"
          : "Click the camera icon to upload a photo"}
      </p>
    </div>
  );
};

export default ProfilePicUpload;
