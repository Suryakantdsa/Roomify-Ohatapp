"use client";
import React from "react";
import Sidebar from "../../components/Sidebar";
import MiddleSidebar from "../../components/MiddleSidebar";
import useSidebarStore from "../../lib/features/sidebar/sidebarStore";
import JoinRoom from "../../components/JoinRoom";
import UserChat from "../../components/UserChat";
import HomeCompo from "../../components/HomeCompo";
import userAuthStore from "../../lib/features/userAuth/userAuthStore";
import Loading from "../../components/Loading";
import addUserForChatStore from "../../lib/features/chat/addUserforChat";
import AllUser from "../../components/AllUser";

const home = () => {
  const { menuName } = useSidebarStore();
  const { loading } = userAuthStore();
  const { isAddUserButtonClicked } = addUserForChatStore();
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-screen flex font-mono ">
      <Sidebar />
      {isAddUserButtonClicked ? <AllUser /> : <MiddleSidebar />}
      {menuName === "Rooms" ? (
        <JoinRoom />
      ) : menuName === "Home" ? (
        <HomeCompo />
      ) : (
        <UserChat />
      )}
    </div>
  );
};

export default home;
