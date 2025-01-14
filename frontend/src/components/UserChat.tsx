import UserChatBar from "../ui/UserChatBar";
import UserChatInfo from "../ui/UserChatInfo";
import UserSearchBar from "../ui/UserSearchBar";

const UserChat = () => {
  return (
    <div className="w-full h-screen">
      <div className="h-full flex flex-col justify-between ">
        <UserChatInfo />
        {/* <UserSearchBar /> */}
        <div>chat area</div>
        <div className="sticky bottom-0">
          <UserChatBar />
        </div>
      </div>
    </div>
  );
};

export default UserChat;
