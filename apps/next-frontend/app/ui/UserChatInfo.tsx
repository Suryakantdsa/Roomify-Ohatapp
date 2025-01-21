import { Search, EllipsisVertical } from "lucide-react";
import React from "react";
import Avatar from "../../components/Avatar";
import addUserForChatStore from "../../lib/features/chat/addUserforChat";

const UserChatInfo = () => {
  const { isAddUserButtonClicked, toggleAddUserButton, setUserForChat, user } =
    addUserForChatStore();
  return (
    <div className="w-full">
      <div className=" w-full p-2 bg-gray-200 flex justify-between items-center ">
        <Avatar seed={user?.name || "rama"} isSelected={false} />

        <div className="flex flex-col w-[84%]">
          <span className="font-bold">{user?.name || "🍺ମାଡୁଆ ମଣ୍ଡଳୀ🍺"}</span>
          <span className=" text-xs">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint Lorem
            ipsum ...
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Search />
          <EllipsisVertical size={20} />
        </div>
      </div>
    </div>
  );
};

export default UserChatInfo;
