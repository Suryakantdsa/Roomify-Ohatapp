import { useEffect, useState } from "react";
import Avatar from "../../components/Avatar";
import { MessageCircleOff, UsersRound } from "lucide-react";
import inboxStore from "../../lib/features/chat/inboxStore";
import { formatDate } from "../utils/formatDate";
import messageStore from "../../lib/features/chat/mesagesStore";
import EmptyState from "./EmptyState";
import addUserForChatStore, {
  roomBody,
} from "../../lib/features/chat/addUserforChat";

const Chats = () => {
  const baseUrl = "http://localhost:8000/api/v1";

  const [activeUserChatClicked, setActiveUserchatClicked] = useState(0);
  const [chatId, setChatId] = useState(null);
  const { chatData, error, isInboxLoading, fetchInboxData } = inboxStore();
  const { fetchMessagesData, messagesData } = messageStore();
  const { setUserForChat, user } = addUserForChatStore();

  useEffect(() => {
    fetchInboxData(baseUrl);
  }, [fetchInboxData]);

  useEffect(() => {
    if (chatId) {
      fetchMessagesData(chatId);
      console.log(messagesData?.room);
      // setUserForChat(messages?.data.room as roomBody);
    }
  }, [chatId]);

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
        // <div className="flex flex-col mt-28 gap-y-4 justify-center w-full items-center">
        //   <div>
        //     <MessageCircleOff
        //       size={60}
        //       fontWeight={400}
        //       color="#374151"
        //       // className="text-gray-700"
        //     />
        //   </div>
        //   <div className="text-center">
        //     Looks like you're the popular one here. no messages yet!
        //   </div>
        // </div>
        <EmptyState
          icon={
            <MessageCircleOff
              size={60}
              fontWeight={400}
              color="#374151"
              // className="text-gray-700"
            />
          }
          message="Looks like you're the popular one here. no messages yet!"
        />
      ) : (
        chatData?.map((chat: any) => (
          <div
            key={chat.id}
            onClick={() => {
              setActiveUserchatClicked(chat.id);
              setChatId(chat.id);
              setUserForChat(chat);
              console.log(chat);
            }}
            className={`p-2 relative flex justify-between w-full items-center cursor-pointer border-pink-500 border-b  shadow-lg mt-3 
          ${activeUserChatClicked === chat.id ? "bg-pink-200" : "bg-gray-100"}
          `}
          >
            {chat?.isGroup ? (
              <div className="w-12 h-12 cursor-pointer rounded-full p-1 flex items-center justify-center ">
                <UsersRound size={30} />
              </div>
            ) : (
              <Avatar seed={chat.avatar} isSelected={false} />
            )}
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
