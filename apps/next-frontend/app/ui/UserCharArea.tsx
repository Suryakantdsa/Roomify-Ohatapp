"use client";
import { useEffect } from "react";
import addUserForChatStore from "../../lib/features/chat/addUserforChat";
import messageStore from "../../lib/features/chat/mesagesStore";
import { formatDate } from "../utils/formatDate";
import socketStore from "../../lib/features/socket/socketStore";

const UserChatArea = () => {
  const { messagesData, setMessages } = messageStore();
  const { user } = addUserForChatStore();
  const { setSocket, socket } = socketStore();

  let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  let tokenVal = localStorage.getItem("accessToken");
  const WS_URL = "ws://localhost:8080";

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?token=${tokenVal}`);
    ws.onopen = () => {
      setSocket(ws);
      ws.send(
        JSON.stringify({
          event: "join_room",
          payload: { roomId: user?.id },
        })
      );
    };

    // ws.onerror = (error) => console?.error("WebSocket error:", error);
    ws.onclose = () => console.warn("WebSocket closed");

    return () => ws.close();
  }, [user, tokenVal, setSocket]);

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const res = JSON.parse(event.data);
      if (res.event === "message") {
        setMessages(res.payload);
      }
    };

    return () => socket?.close();
  }, [socket, setMessages]);

  if (!socket) {
    return <div>Connecting to WebSocket...</div>;
  }

  if (!messagesData) {
    return null;
  }

  return (
    <div className="flex h-full overflow-y-auto p-4 bg-gray-50 custom-scrollbar flex-col-reverse">
      <div className="flex flex-col space-y-4">
        {messagesData?.messages?.map((message) => (
          <div
            key={`${message?.senderId}-${message?.createdAt}`}
            className={`flex ${
              message?.senderId === userInfo?.id
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message?.senderId === userInfo?.id
                  ? "bg-[#6C61C6] text-white"
                  : "bg-gray-200"
              }`}
            >
              <p>{message?.content}</p>
              <span className="text-xs text-gray-900">
                {message?.createdAt &&
                  formatDate(message?.createdAt.toString())}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserChatArea;
