import { Search, EllipsisVertical } from "lucide-react";
import React from "react";
import Avatar from "../utils/Avatar";

const UserChatInfo = () => {
  return (
    <div className="w-full">
      <div className=" w-full p-2 bg-gray-100 flex justify-between items-center ">
        <Avatar seed="aham" />

        <div className="flex flex-col w-[84%]">
          <span className="font-bold">🍺ମାଡୁଆ ମଣ୍ଡଳୀ🍺</span>
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
