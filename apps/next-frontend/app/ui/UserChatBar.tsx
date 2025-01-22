import React, { useCallback, useEffect, useState } from "react";
import { Send, Smile } from "lucide-react";
import messageStore from "../../lib/features/chat/mesagesStore";
import sendMessageStore from "../../lib/features/chat/sendMessage";
import addUserForChatStore from "../../lib/features/chat/addUserforChat";
import socketStore from "../../lib/features/socket/socketStore";

const UserChatBar = () => {
  const [message, setMessage] = useState("");
  const { messages, fetchMessagesData, setMessages } = messageStore();
  const { fetchsendMessagesData, sendMessages } = sendMessageStore();
  const { setUserForChat, user } = addUserForChatStore();
  const { setSocket, socket } = socketStore();
  let userInfo: any = localStorage.getItem("user");

  // console.log(user);
  useEffect(() => {}, [messages]);
  const handleSendMessage = useCallback(() => {
    if (message.trim() !== "") {
      console.log("Message sent:", message); // Replace with actual send logic
      let body;
      if (messages) {
        body = {
          content: message,
          roomId: user?.id,
        };
      } else {
        body = {
          content: message,
          reciverId: user?.id,
        };
      }
      // fetchsendMessagesData(body);
      setMessage("");
      socket?.send(
        JSON.stringify({
          event: "chat-room",
          payload: body,
        })
      );
      sendMessages([
        ...message,
        { content: message, senderId: userInfo?.id, createdAt: new Date() },
      ]);
      // console.log(user);
      // fetchMessagesData(user?.roomId);
    }
  }, [message, messages, user, fetchMessagesData, fetchsendMessagesData]);

  return (
    <div className=" w-full bg-gray-300 border-t border-gray-300 p-4 flex items-center gap-4">
      <button className="text-gray-500">
        <Smile size={24} />
      </button>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        className="flex-1 p-2 bg-white border border-gray-300 rounded-md outline-none"
      />
      <button
        className={`p-2 rounded-full ${
          message.trim() === "" ? "bg-gray-400" : "bg-pink-500"
        }`}
        onClick={handleSendMessage}
        disabled={message.trim() === ""}
      >
        <Send size={20} className="text-white" />
      </button>
    </div>
  );
};

export default UserChatBar;
