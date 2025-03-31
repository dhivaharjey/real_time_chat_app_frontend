import React, { useRef, useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import { toast } from "react-toastify";
import { Image, Send, X } from "lucide-react";
import { uploadToCloudinary } from "../../Utils/cloudinaryUpload";

const MessageInput = () => {
  const [textMsg, setTextMsg] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        toast.error("Image size must be less than 10MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        // console.log(reader.result);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.log(error);
      toast.warn("Error while uploading image");
    }
  };
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!textMsg.trim() && !imagePreview) return;
      //   console.log(textMsg, imagePreview);
      const url = await uploadToCloudinary(imagePreview);
      const payload = {
        text: textMsg,
        image: url,
      };
      await sendMessage(payload);
      setTextMsg("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch (error) {
      console.log("Error while sending message", error);
      toast.error(
        error.response?.data?.message || "Error while sending message"
      );
    }
  };

  return (
    <>
      <div className="p-4 w-full">
        {imagePreview && (
          <div className="flex items-center mb-3 gap-2">
            <div className="relative">
              <img
                src={imagePreview}
                alt="preview"
                className="w-20 h-20 rounded-lg  object-cover border border-zinc-700"
              />
              <button
                onClick={removeImage}
                className="absolute -top-1.5 -right-1.5 rounded-full bg-base-300 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-800"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className=" flex items-center gap-2">
          <div className="flex flex-1 gap-2">
            <input
              type="text"
              className="w-full input rounded-lg input-sm sm:input-md focus:outline-none"
              placeholder="Type a message..."
              value={textMsg}
              onChange={(e) => setTextMsg(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <button
              type="button"
              className={`hidden sm:flex btn btn-circle ${
                imagePreview ? "text-emerald-500" : "text-zinc-400"
              }`}
              onClick={() => fileInputRef.current.click()}
            >
              <Image size={24} />
            </button>
          </div>
          <button
            type="submit"
            className="btn btn-circle btn-sm btn-primary"
            disabled={!textMsg.trim() && !imagePreview}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </>
  );
};

export default MessageInput;
