import UserChatArea from "../app/ui/UserCharArea";
import UserChatBar from "../app/ui/UserChatBar";
import UserChatInfo from "../app/ui/UserChatInfo";

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
