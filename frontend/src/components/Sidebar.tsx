import {
  ChevronFirst,
  GroupIcon,
  LogOutIcon,
  LucideHome,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={`h-screen bg-white border-r shadow-sm transition-all duration-100 border ${
        isCollapsed ? "w-[7%]" : "w-[23%]"
      }`}
    >
      <nav className="flex flex-col h-full">
        {/* Header Section */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <img
              //   src="roomify_logo.webp"
              src="https://app.chitchat.gg/svgs/logo.svg"
              alt="Roomify Logo"
              className="w-10 h-10 cursor-pointer "
              onClick={toggleSidebar}
            />
            {!isCollapsed && <h1 className="text-xl font-bold">Roomify</h1>}
          </div>

          <button
            onClick={toggleSidebar}
            className="p-2 rounded transition"
            aria-label="Toggle Sidebar"
          >
            {!isCollapsed && <ChevronFirst />}
          </button>
        </div>

        {/* Menu Section */}
        <ul className="flex-1 p-3 space-y-3">
          <li className="group ">
            <a
              href="#"
              className="flex items-start  gap-3 p-3 rounded-lg text-gray-700 transition"
            >
              <span className=" w-10 h-10 rounded-full">
                <LucideHome />
              </span>
              {!isCollapsed && <span>Home</span>}
            </a>
          </li>
          <li className="group">
            <a
              href="#"
              className="flex items-start  gap-3 p-3 rounded-lg text-gray-700 transition"
            >
              <span className=" w-10 h-10 ">
                <MessageCircle />
              </span>
              {!isCollapsed && <span>Chat</span>}
            </a>
          </li>
          <li className="group">
            <a
              href="#"
              className="flex items-start  gap-3 p-3 rounded-lg text-gray-700 transition"
            >
              <span className=" w-10 h-10 rounded-full">
                <GroupIcon />
              </span>
              {!isCollapsed && <span>Rooms</span>}
            </a>
          </li>

          {/* <li className="group ">
            <a
              href="#"
              className="flex items-start gap-3 p-3 rounded-lg text-gray-700 transition"
            >
              <span className=" w-10 h-10 ">
                <Settings />
              </span>
              {!isCollapsed && <span>Settings</span>}
            </a>
          </li> */}
        </ul>

        {/* User Info Section */}

        <div className="p-4 border-b">
          {isCollapsed && (
            <div className="flex items-start gap-3 p-3">
              <span>
                <LogOutIcon />
              </span>
            </div>
          )}
          <div
            className={`leading-tight flex items-center ${
              !isCollapsed ? "justify-between" : "justify-start"
            } `}
          >
            <div className="bg-pink-400 rounded-md p-3">JD</div>

            {!isCollapsed && (
              <div>
                <h4 className="font-semibold">John Doe</h4>
                <span className="text-sm text-gray-500">johndoe@gmail.com</span>
              </div>
            )}
            <div className="text-gray-900 transition">
              {!isCollapsed && (
                <span>
                  <LogOutIcon />
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer Section */}
        {!isCollapsed && (
          <div className="p-4 border-t text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Roomify. All rights reserved.
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
