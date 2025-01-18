import UserChatArea from "../ui/UserCharArea";
import UserChatBar from "../ui/UserChatBar";
import UserChatInfo from "../ui/UserChatInfo";

const UserChat = () => {
  return (
    <div className="w-full h-screen">
      <div className="h-full flex flex-col justify-between ">
        <UserChatInfo />
        <UserChatArea />
        <div className="sticky bottom-0">
          <UserChatBar />
        </div>
      </div>
    </div>
  );
};

export default UserChat;
