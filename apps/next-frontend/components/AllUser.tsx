import React, { useEffect } from "react";
import SearchBar from "../app/ui/SearchBar";
import { ArrowLeft, UserRoundX } from "lucide-react";
import Avatar from "./Avatar";
import getallUserStore from "../lib/features/chat/getAllUser";
import EmptyState from "../app/ui/EmptyState";
import addUserForChatStore from "../lib/features/chat/addUserforChat";
import Loading from "./Loading";
import useSidebarStore from "../lib/features/sidebar/sidebarStore";
import messageStore from "../lib/features/chat/mesagesStore";

const AllUser = () => {
  const { alluser, isgetallUserLoading, fetchgetallUsersData } =
    getallUserStore();
  const { isAddUserButtonClicked, toggleAddUserButton, setUserForChat } =
    addUserForChatStore();

  const { setActiveMenuIndex, setMenuName } = useSidebarStore();
  const { setMessages } = messageStore();
  useEffect(() => {
    if (isAddUserButtonClicked) {
      fetchgetallUsersData();
    }
  }, [isAddUserButtonClicked]);
  //   console.log(alluser);

  return (
    <div
      className={`h-screen bg-white border-r shadow-sm transition-all duration-100  w-[45%]`}
    >
      <div className="flex flex-col h-full p-4 ">
        <div className="flex gap-x-5 items-center ">
          <ArrowLeft onClick={() => toggleAddUserButton()} />
          <p className="font-bold text-xl">All user</p>
        </div>

        <SearchBar />
        {isgetallUserLoading && (
          <div className="mt-20 flex justify-center items-center">
            Loading..
          </div>
        )}
        {/* usercard */}
        {alluser && alluser.length > 0
          ? alluser.map((user: any) => (
              <div
                key={user.id} // Assuming each user has a unique `id`
                className="flex items-center border-b border-blue-700 p-2 shadow-lg mb-3"
                onClick={() => {
                  setUserForChat(user);
                  setMenuName("Message");
                  setActiveMenuIndex(1);
                  setMessages(null);
                }}
              >
                <Avatar seed={user.avatar} isSelected={false} />
                <div className="flex flex-col w-[75%] px-2">
                  <p className="font-bold">{user.name}</p> {/* User's name */}
                  <p className="text-xs">
                    {user.phone || "No phone available"}
                  </p>{" "}
                  {/* User's phone */}
                </div>
              </div>
            ))
          : !isgetallUserLoading && (
              <EmptyState
                icon={<UserRoundX size={60} fontWeight={400} color="#374151" />}
                message="No friends, no drama. Enjoy the peace! ...or add some friends."
              />
            )}
      </div>
    </div>
  );
};

export default AllUser;
