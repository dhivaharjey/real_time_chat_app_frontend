import { create } from "zustand";
import { axiosInstance } from "../Utils/axios";
import { toast } from "react-toastify";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  getUsers: async () => {
    set({ isUsersLoading: true });
    // Fetch users from the server and update the users state
    try {
      const res = await axiosInstance.get("/api/messages/users");
      if (res.status === 200) {
        set({ users: res?.data });

        const userFromUrl = get().getSelectedUserFromUrl();
        if (userFromUrl) {
          set({ selectedUser: userFromUrl });
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getChatHistory: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/api/messages/${userId}`);
      if (res.status === 200) {
        set({ messages: res?.data });
        // set({ selectedUser: id });
      }
    } catch (error) {
      console.log("get message error ", error);
      toast.error(error.response.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/api/messages/send/${selectedUser?._id}`,

        messageData
      );
      if (res?.status === 201) {
        set({ messages: [...messages, res?.data] });
      }
    } catch (error) {
      console.log("send message error ", error);
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },
  listenToNewMessage: async () => {
    const { selectedUser } = get();
    // console.log("selectedUser", selectedUser);

    if (!selectedUser) return;

    const socket = useAuthStore.getState()?.socket;
    // console.log(" socket ", socket);

    socket.on("newMessage", (newMessage) => {
      //   console.log("newMessage", newMessage);
      // selected user is the one who sent the message to logged in user , so the message senderId should be same as selectedUser Id(the logged in user receiving msg from the selected user)
      if (newMessage?.senderId !== selectedUser?._id) {
        return;
      }

      set({ messages: [...get().messages, newMessage] });
    });
  },
  disconnectFromMessage: async () => {
    const socket = useAuthStore.getState()?.socket;

    socket.off("newMessage");
  },
  setSelectedUser: (user) => {
    set({ selectedUser: user });
    window.history.pushState(null, "", `?selectedUser=${user?._id}`);
  },
  getSelectedUserFromUrl: () => {
    // this will get the selected user from the url
    const userId = new URLSearchParams(window.location.search).get(
      "selectedUser"
    );
    return userId ? get().users.find((user) => user._id === userId) : null;
  },
}));
