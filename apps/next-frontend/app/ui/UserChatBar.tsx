import React, { useCallback, useEffect, useState } from "react";
import { Send, Smile } from "lucide-react";
import messageStore, {
  Datum,
  MessageData,
} from "../../lib/features/chat/mesagesStore";
import sendMessageStore from "../../lib/features/chat/sendMessage";
import addUserForChatStore from "../../lib/features/chat/addUserforChat";
import socketStore from "../../lib/features/socket/socketStore";

const UserChatBar = () => {
  const [messageClient, setMessageClient] = useState("");
  const { messagesData, fetchMessagesData, setMessages } = messageStore();
  const { fetchsendMessagesData, sendMessages } = sendMessageStore();
  const { setUserForChat, user } = addUserForChatStore();
  const { setSocket, socket } = socketStore();
  let userInfo: any = localStorage.getItem("user");
  userInfo = JSON.parse(userInfo);

  // console.log(user);
  // useEffect(() => {}, [messagesData]);
  const handleSendMessage = useCallback(() => {
    if (messageClient.trim() === "") return;

    let body = {
      message: messageClient,
      ...(messagesData ? { roomId: user?.id } : { reciverId: user?.id }),
    };

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not open");
      return;
    }

    console.log("Sending message:", body);

    socket.send(
      JSON.stringify({
        event: "chat_room",
        payload: body,
      })
    );

    setMessages({
      content: messageClient,
      senderId: userInfo?.id,
      createdAt: new Date(),
    });

    setMessageClient("");
  }, [messageClient, user, messagesData, socket]);

  return (
    <div className=" w-full bg-gray-300 border-t border-gray-300 p-4 flex items-center gap-4">
      <button className="text-gray-500">
        <Smile size={24} />
      </button>
      <input
        type="text"
        placeholder="Type a message..."
        value={messageClient}
        onChange={(e) => setMessageClient(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        className="flex-1 p-2 bg-white border border-gray-300 rounded-md outline-none"
      />
      <button
        className={`p-2 rounded-full ${
          messageClient.trim() === "" ? "bg-gray-400" : "bg-pink-500"
        }`}
        onClick={handleSendMessage}
        disabled={messageClient.trim() === ""}
      >
        <Send size={20} className="text-white" />
      </button>
    </div>
  );
};

export default UserChatBar;
