import React from "react";
import { useChatStore } from "../store/useChatStore";
import ChatSidebar from "../components/Chat/ChatSidebar";
import ChatBox from "../components/Chat/ChatBox";
import NoChatSelected from "../components/Chat/NoChatSelected";

const HomePage = () => {
  // console.log("home page");
  const { selectedUser } = useChatStore();

  return (
    <>
      <div className="h-screen bg-base-200 bg-white">
        <div className="flex items-center justify-center pt-20 px-4">
          <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-7xl  h-[calc(100vh-6.5rem)]">
            <div className="flex h-full rounded-lg overflow-hidden">
              <ChatSidebar />
              {selectedUser ? <ChatBox /> : <NoChatSelected />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
