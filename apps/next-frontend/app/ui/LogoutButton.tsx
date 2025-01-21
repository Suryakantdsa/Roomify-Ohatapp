"use client";
import React from "react";
import useSidebarStore from "../../lib/features/sidebar/sidebarStore";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const baseUrl = "http://localhost:8002/api/v1";
  const router = useRouter();
  const { isCollapsed } = useSidebarStore();
  const handleLogOut = async () => {
    await fetch(`${baseUrl}/logout `, {
      method: "GET",
    }).catch((e) => {
      console.log(e.Messages);
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    router.push("/signin");
  };

  return (
    <button
      className="flex items-center gap-3 mt-4 text-gray-700"
      onClick={handleLogOut}
    >
      <LogOutIcon />
      {!isCollapsed && <span>Logout</span>}
    </button>
  );
};

export default LogoutButton;
