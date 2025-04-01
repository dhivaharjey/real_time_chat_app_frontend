import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Mail, User, CircleX } from "lucide-react";

import ProfilePicUpload from "../components/ProfilePicUpload";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { authUser, updateProfile } = useAuthStore();
  const [profileImage, setProfileImage] = useState(
    authUser?.profileImage || null
  );
  const [loading, setLoading] = useState(false);
  // console.log(authUser);

  return (
    <>
      <div className="h-[100vh] pt-20 bg-slate-100 ">
        <div className="max-w-2xl mx-auto p-4 ">
          <div className="bg-base-300 rounded-xl p-6 relative ">
            <Link to="/" className="absolute top-4 right-4 text-zinc-600">
              <CircleX />
            </Link>
            <div className="text-center">
              <h1 className="text-2xl font-semibold ">Profile</h1>
              <p className=" mb-2">Your profile information</p>
            </div>

            {/* avatar upload section */}
            <ProfilePicUpload
              image={profileImage}
              setImage={setProfileImage}
              setLoading={setLoading}
              loading={loading}
              uploadProfilePic={updateProfile}
            />
            <div className="space-y-6 mt-4">
              <div className="space-y-1.5">
                {/* <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  User Name
                </div> */}
                <div className=" flex items-center px-4 py-2.5 bg-base-200 rounded-lg border">
                  <div className="text-sm text-zinc-400 flex items-center gap-2 border-r-2 border-zinc-300 pr-9">
                    <User className="w-4 h-4" />
                    User Name
                  </div>
                  <p className="mx-4">{authUser?.userName}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center px-4 py-2.5 bg-base-200 rounded-lg border">
                  <div className="text-sm text-zinc-400 flex items-center gap-2 border-r-2 border-zinc-300 pr-4">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </div>
                  <p className="mx-4">{authUser?.email}</p>
                </div>
              </div>
            </div>

            <div className="mt-2 bg-base-300 rounded-xl ">
              <h2 className="text-lg font-medium  mb-4">Account Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                  <span>Member Since</span>
                  <span>{authUser?.createdAt?.split("T")[0]}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span>Account Status</span>
                  <span className="text-green-500">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
