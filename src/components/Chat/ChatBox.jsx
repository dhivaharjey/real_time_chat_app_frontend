import React, { useEffect, useRef } from "react";
import { useChatStore } from "../../store/useChatStore";
import PageLoader from "../LoadingAnimations/PageLoader";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageLoadingSkeleton from "./MessageLoadingSkeleton";
import { useAuthStore } from "../../store/useAuthStore";
import { formatDate } from "../../Utils/fromatDate";

const ChatBox = () => {
  const {
    messages,
    getChatHistory,
    isMessagesLoading,
    selectedUser,
    listenToNewMessage,
    disconnectFromMessage,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef();
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    getChatHistory(selectedUser?._id);
    listenToNewMessage();

    return () => disconnectFromMessage();
  }, [
    selectedUser?._id,
    getChatHistory,
    listenToNewMessage,
    disconnectFromMessage,
  ]);

  if (isMessagesLoading) {
    return (
      <>
        <div className="flex flex-1  flex-col overflow-auto">
          <ChatHeader />
          <MessageLoadingSkeleton />
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-1  flex-col overflow-auto bg-white  ">
      <ChatHeader />
      <div
        className=" flex-1 overflow-y-auto scroll-smooth scrollbar-hide p-4 space-y-4"
        // ref={chatBoxRef}
      >
        {messages?.map((msg) => (
          <div
            key={msg?._id}
            className={`chat ${
              msg?.senderId === authUser?._id ? "chat-end" : "chat-start"
            }`}
            ref={messagesEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    msg?.senderId === authUser?._id
                      ? authUser?.profileImage || "src/assets/avatar.jpg"
                      : selectedUser?.profileImage || "src/assets/avatar.jpg"
                  }
                  alt="Profile Image"
                />
              </div>
            </div>

            <div className="chat-bubble flex flex-col">
              {msg?.image && (
                <img
                  src={msg.image}
                  alt="Image"
                  className="sm:max-w-[200px] rounded-none mb-2"
                />
              )}
              <p>{msg?.textMessage}</p>
            </div>
            <div className="chat-footer  mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatDate(msg?.createdAt)}
              </time>
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatBox;
