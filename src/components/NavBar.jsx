import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { LogOut, Palette, User } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { googleLogout } from "@react-oauth/google";
import { useChatStore } from "../store/useChatStore";

const NavBar = () => {
  const { logout } = useAuthStore();
  const { setSelectedUser } = useChatStore();

  const userLogout = async () => {
    googleLogout();
    await logout();
    setSelectedUser(null);
    window.history.pushState(null, "", window.location.pathname);
  };
  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80  "
    >
      <div className="container mx-auto px-4 lg:px-10 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8 lg:ml-6">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all "
            >
              <div className="size-16 rounded-lg bg-primary/10 flex items-center justify-center">
                {/* <MessageSquare className="w-5 h-5 text-primary" /> */}
                <img
                  src="src\assets\chat-app9.webp"
                  className="min-w-full bg-contain"
                  alt="Image"
                />
              </div>
              <h1 className="text-lg font-bold">Chat</h1>
            </Link>
          </div>
          {/* <div className="flex items-center  gap-2"> */}

          <div className="flex items-center  gap-4 lg:mr-6">
            {/* <Link to="/theme" className="btn btn-neutral btn-sm">
              <Palette size={18} />
              <span className="hidden sm:block text-sm ml-1">Theme</span>
            </Link> */}
            <Link to="/profile" className="btn btn-neutral btn-sm">
              <User size={18} />
              <span className="hidden sm:block text-sm ml-1">Profile</span>
            </Link>
            <button
              onClick={userLogout}
              className="btn btn-error btn-sm text-primary-500"
            >
              <LogOut size={18} />
              <span className="hidden sm:block text-sm ml-1">Logout</span>
            </button>
          </div>

          {/* </div> */}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
