import { useEffect } from "react";
import addUserForChatStore, {
  userBody,
} from "../../lib/features/chat/addUserforChat";
import messageStore from "../../lib/features/chat/mesagesStore";
import { formatDate } from "../utils/formatDate";
import socketStore from "../../lib/features/socket/socketStore";

const UserChatArea = () => {
  // const messages = [
  //   { id: 1, sender: "User", text: "Hello!", time: "10:00 AM" },
  //   { id: 2, sender: "You", text: "Hi, how are you?", time: "10:01 AM" },
  //   {
  //     id: 3,
  //     sender: "User",
  //     text: "I’m good, thanks for asking.",
  //     time: "10:02 AM",
  //   },
  //   { id: 4, sender: "You", text: "Great to hear that!", time: "10:03 AM" },
  //   { id: 1, sender: "User", text: "Hello!", time: "10:00 AM" },
  //   { id: 2, sender: "You", text: "Hi, how are you?", time: "10:01 AM" },
  //   {
  //     id: 3,
  //     sender: "User",
  //     text: "I’m good, thanks for asking.",
  //     time: "10:02 AM",
  //   },
  //   { id: 4, sender: "You", text: "Great to hear that!", time: "10:03 AM" },
  //   { id: 1, sender: "User", text: "Hello!", time: "10:00 AM" },
  //   { id: 2, sender: "You", text: "Hi, how are you?", time: "10:01 AM" },
  //   {
  //     id: 3,
  //     sender: "User",
  //     text: "I’m good, thanks for asking.",
  //     time: "10:02 AM",
  //   },
  //   { id: 4, sender: "You", text: "Great to hear that!", time: "10:03 AM" },
  // ];
  const { messages } = messageStore();
  const { setUserForChat, user } = addUserForChatStore();

  const { setSocket, socket } = socketStore();
  let userInfo: any = localStorage.getItem("user");
  let tokenVal: any = localStorage.getItem("accessToken");
  let WS_URL = "ws://localhost:8080";
  userInfo = JSON.parse(userInfo);
  // if(user && user.id){
  if (!messages) {
    return null;
  }

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?token=${tokenVal}`);
    ws.onopen = () => {
      setSocket(ws);
      const data = JSON.stringify({
        event: "join_room",
        payload: {
          roomid: user?.id,
        },
      });
    };
  });

  if (!socket) {
    return <div>connecting to ws...</div>;
  }

  return (
    <div className="flex h-full overflow-y-auto p-4 bg-gray-50 custom-scrollbar flex-col-reverse">
      <div className="flex flex-col space-y-4 ">
        {/* Change to flex-col */}
        {messages?.data.messages.map((message) => (
          <div
            key={message.id + "slnklbolnN"}
            className={`flex ${
              message?.senderId === userInfo?.id
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.senderId === userInfo?.id
                  ? "bg-[#6C61C6] text-white"
                  : "bg-gray-200"
              }`}
            >
              <p>{message.content}</p>
              <span className="text-xs text-gray-900">
                {formatDate(message?.createdAt.toString())}
              </span>
            </div>
          </div>
        ))}
        {/* Invisible div to scroll into view */}
      </div>
    </div>
  );
};

// export default ChatMessages;

// };

export default UserChatArea;
