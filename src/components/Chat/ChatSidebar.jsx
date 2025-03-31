import React, { useEffect, useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import SidebarSkeleton from "../LoadingAnimations/SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const ChatSidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineUsers
    ? users.filter((user) => onlineUsers?.includes(user._id))
    : users;
  if (isUsersLoading) {
    return <SidebarSkeleton />;
  }
  return (
    <>
      <aside className="h-full w-20 lg:w-72 border-r-2    border-x-cyan-800 flex flex-col transition-all duration-200 scrollbar-hide bg-slate-200 ">
        <div className="border-b border-base-300 w-full p-5">
          <div className="flex items-center gap-2">
            <Users className="size-6" />
            <span className="font-medium hidden lg:block">Contacts</span>
          </div>
          {/* Online filter */}
          <div className="mt-3  lg:flex items-center gap-2">
            <label className="cursor-pointer flex items-center gap-2">
              <input
                type="checkbox"
                checked={showOnlineUsers}
                onChange={(e) => setShowOnlineUsers(e.target.checked)}
                className=" checkbox checkbox-sm"
              />
              <span className="text-sm hidden lg:flex"> Online Users</span>
            </label>
            <span className="text-[8px] text-zinc-500 lg:hidden ">Online</span>
            <span className="hidden lg:flex">({onlineUsers?.length})</span>
          </div>
        </div>
        <div className="overflow-y-auto w-full py-3">
          {filteredUsers?.map((user) => (
            <button
              key={user?._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors
              ${
                selectedUser?._id === user?._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              } `}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user?.profileImage || "src/assets/avatar.jpg"}
                  alt={user?.userName}
                  className="size-12 object-cover rounded-full "
                />

                {onlineUsers?.includes(user?._id) && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-400 rounded-full ring-1 ring-zinc-900" />
                )}
              </div>
              {/* User info  */}
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user?.userName}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers?.includes(user?._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))}
          {filteredUsers?.length === 0 && (
            <div className="p-4 text-center text-zinc-400">No Online Users</div>
          )}
        </div>
      </aside>
    </>
  );
};

export default ChatSidebar;
