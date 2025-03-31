import { create } from "zustand";
import { axiosInstance } from "../Utils/axios";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isUserUpdatingProfile: false,
  isCheckingUserAuth: true,
  onlineUsers: [],
  showError: null,
  socket: null,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/api/auth/check-auth");
      // console.log(res);

      if (res?.data?.user) {
        set({ authUser: res?.data?.user });
        get().connectSocket();
      }
    } catch (error) {
      console.log("auth error", error);
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        console.log("Clearing cookies and logging out");
        await axiosInstance.post("/api/auth/logout");
        set({ authUser: null });
        // toast.success("Your Session is Timed Out!!!, Try to login Again");
      }
    } finally {
      set({ isCheckingUserAuth: false });
    }
  },
  oauthLogin: async (payload) => {
    set({ showError: null });
    try {
      const res = await axiosInstance.post("/api/auth/oauth-login", payload);

      if (res.status === 200) {
        set({ authUser: res?.data?.user });
        get().connectSocket();
        toast.success(res?.data?.message);
        return true;
      }
    } catch (error) {
      const errMsg = error?.response?.data?.message || "Something went wrong";
      toast.error(errMsg);
      set({ showError: error?.response?.data?.message });
      console.log(error, "oauthLogin");
      return false;
    }
  },
  signup: async (payload) => {
    set({ showError: null });
    try {
      const res = await axiosInstance.post("/api/auth/signup", payload);
      console.log(res);

      if (res.status === 201) {
        set({ authUser: res?.data?.user });
        get().connectSocket();
        toast.success(res?.data?.message);
        return true;
      }
    } catch (error) {
      const errMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      toast.error(errMsg);
      set({ showError: error?.response?.data?.message });
      console.log(error, "signup");
      return false;
    }
  },
  login: async (payload) => {
    set({ showError: null });
    try {
      const res = await axiosInstance.post("/api/auth/login", payload);
      if (res.status === 200) {
        set({ authUser: res?.data?.user });

        get().connectSocket();
        toast.success(res?.data?.message);
        return true;
      }
    } catch (error) {
      const errMsg = error?.response?.data?.message || "Something went wrong";
      toast.error(errMsg);
      set({ showError: error?.response?.data?.message });
      return false;
    } finally {
      // set({ isUserLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
      set({ authUser: null });
      window.history.pushState(null, "", window.location.pathname);

      get().disconnectSocket();

      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error?.response?.data?.message || "Failed to logout");
    }
  },
  updateProfile: async (data) => {
    try {
      // console.log(data);

      const res = await axiosInstance.patch("/api/auth/profile", {
        profileImage: data,
      });
      if (res?.status === 200) {
        set({ authUser: res?.data?.user });
        toast.success(res?.data?.message);
        return true;
      }
    } catch (error) {
      console.error("Update Profile Error:", error);
      toast.error(error?.response?.data?.message || "Failed to update profile");
      return false;
    }
  },
  deleteProfilePic: async () => {
    try {
      const res = await axiosInstance.delete("/api/auth/profile");
      if (res.status === 200) {
        set({ authUser: res?.data?.user });
        toast.success(res?.data?.message);
        return true;
      }
    } catch (error) {
      console.error("Delete Profile Error:", error);
      toast.error(error?.response?.data?.message || "Failed to delete profile");
      return false;
    }
  },
  connectSocket: function () {
    try {
      const { authUser } = get();
      // console.log(authUser, socket);

      if (!authUser || get().socket?.connected) return;
      const newSocket = io(import.meta.env.VITE_BACKEND_URL, {
        query: { userId: authUser?._id },
      });
      newSocket.connect();
      set({ socket: newSocket });

      newSocket.on("getOnlineUsers", (OnlineuserIds) => {
        set({ onlineUsers: OnlineuserIds });
        // console.log("Connected to socket server");
      });
    } catch (error) {
      console.error("Socket connection error:", error);
    }
  },
  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket?.disconnect();
      set({ socket: null });
    }
  },
}));
