"use client";
import { useEffect } from "react";
import addUserForChatStore, {
  userBody,
} from "../../lib/features/chat/addUserforChat";
import messageStore from "../../lib/features/chat/mesagesStore";
import { formatDate } from "../utils/formatDate";
import socketStore from "../../lib/features/socket/socketStore";

const UserChatArea = () => {
  const { messagesData } = messageStore();
  const { setUserForChat, user } = addUserForChatStore();

  const { setSocket, socket } = socketStore();
  let userInfo: any = localStorage.getItem("user");
  let tokenVal: any = localStorage.getItem("accessToken");
  let WS_URL = "ws://localhost:8080";
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
  }

  // console.log(userInfo);
  // if(user && user.id){

  useEffect(() => {
    // if (!user?.id) {
    //   return;
    // }
    console.log("njnkonk");
    const ws = new WebSocket(`${WS_URL}?token=${tokenVal}`);
    ws.onopen = () => {
      setSocket(ws);
      const data = JSON.stringify({
        event: "join_room",
        payload: {
          roomid: user?.id,
        },
      });
      console.log("joining room id:", data);
      ws.send(data);
    };

    return () => ws.close();
  }, [user, tokenVal, setSocket]);

  if (!socket) {
    return <div>connecting to ws...</div>;
  }
  if (!messagesData) {
    return null;
  }

  console.log(messagesData);

  return (
    <div className="flex h-full overflow-y-auto p-4 bg-gray-50 custom-scrollbar flex-col-reverse">
      <div className="flex flex-col space-y-4 ">
        {/* Change to flex-col */}
        {messagesData?.messages?.map((message, index) => (
          <div
            key={message?.senderId + (Math.random() * 100).toString()}
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
