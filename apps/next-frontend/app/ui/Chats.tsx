import { useEffect, useState } from "react";
import Avatar from "../../components/Avatar";
import { MessageCircleOff } from "lucide-react";
import inboxStore from "../../lib/features/chat/inboxStore";
import { formatDate } from "../utils/formatDate";

const Chats = () => {
  const baseUrl = "http://localhost:8002/api/v1";

  const [activeUserChatClicked, setActiveUserchatClicked] = useState(0);
  const { chatData, error, isInboxLoading, fetchInboxData } = inboxStore();

  useEffect(() => {
    fetchInboxData(baseUrl);
  }, [fetchInboxData]);

  if (isInboxLoading) {
    return (
      <p className="flex flex-col mt-28 gap-y-4 justify-center w-full items-center">
        Loading..
      </p>
    );
  }

  if (error) {
    return (
      <p className="flex flex-col mt-28 gap-y-4 justify-center w-full items-center">
        Error: {error}
      </p>
    );
  }
  return (
    <div className="h-screen overflow-y-auto custom-scrollbar ">
      {chatData?.length === 0 ? (
        <div className="flex flex-col mt-28 gap-y-4 justify-center w-full items-center">
          <div>
            <MessageCircleOff
              size={60}
              fontWeight={400}
              color="#374151"
              // className="text-gray-700"
            />
          </div>
          <div className="text-center">
            Looks like you're the popular one here. no messages yet!
          </div>
        </div>
      ) : (
        chatData?.map((chat: any) => (
          <div
            key={chat.id}
            onClick={() => {
              setActiveUserchatClicked(chat.id);
            }}
            className={`p-2 flex justify-between w-full items-center cursor-pointer border-pink-500 border-b  shadow-lg mt-3 
          ${activeUserChatClicked === chat.id ? "bg-pink-200" : "bg-gray-100"}
          `}
          >
            <Avatar seed={chat.avatar} isSelected={false} />
            <div className="w-[80%]">
              <div className="flex justify-between items-center ">
                <span className="font-bold text-lg">{chat.name}</span>
                <span className="text-sm font-semibold">
                  {formatDate(chat.lastTime)}
                </span>
              </div>
              <div className="text-xs w-full">{chat.lastMessage}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Chats;
