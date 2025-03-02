import { LogOutIcon, LucideHome, MessageCircle, Users } from "lucide-react";
import useSidebarStore from "../lib/features/sidebar/sidebarStore";
import LogoutButton from "../app/ui/LogoutButton";

const Sidebar = () => {
  const {
    isCollapsed,
    activeMenuIndex,
    setActiveMenuIndex,
    toggleSideBar,
    setMenuName,
  } = useSidebarStore();

  const menuItems = [
    { id: 0, icon: <LucideHome />, label: "Home" },
    { id: 1, icon: <MessageCircle />, label: "Messages" },
    { id: 2, icon: <Users />, label: "Rooms" },
  ];
  let user = localStorage.getItem("user") as any;
  if (!user) {
    user = JSON.parse(user);
  }

  return (
    <aside
      className={`h-screen bg-white border-r shadow-sm transition-all duration-200 ${
        isCollapsed ? "w-[5%]" : "w-[20%]"
      }`}
    >
      <nav className="flex flex-col h-full">
        {/* Header Section */}
        <div className="border-b">
          <div
            className="flex justify-start gap-x-4 items-center p-4 cursor-pointer"
            onClick={() => toggleSideBar()}
          >
            <img
              src="https://app.chitchat.gg/svgs/logo.svg"
              alt="Roomify Logo"
              className="w-10 h-10"
            />
            {!isCollapsed && <span>RoomiFy</span>}
          </div>
        </div>

        {/* Menu Section */}
        <ul className="flex-1 p-4 space-y-3">
          {menuItems.map((item) => (
            <li key={item.id} className="relative group flex justify-center">
              <a
                href="#"
                onClick={() => {
                  setActiveMenuIndex(item.id);
                  setMenuName(item.label);
                }}
                className={`flex items-center gap-3 p-3  text-gray-700 transition

                ${
                  isCollapsed
                    ? "w-12 h-12 rounded-full"
                    : "w-full rounded-lg justify-start"
                }
                ${
                  activeMenuIndex === item.id
                    ? "bg-pink-200 text-pink-700 "
                    : ""
                }`}
              >
                <span
                  className={`w-10 h-10 flex justify-center items-center ${
                    !isCollapsed && activeMenuIndex === item.id
                      ? "bg-pink-100 rounded-full"
                      : "rounded-full"
                  }`}
                >
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </a>
              {/* Tooltip */}
              {isCollapsed && (
                <span className="absolute left-[120%] top-1/2 transform -translate-y-1/2 bg-gray-700 text-white text-xs py-1 px-2 rounded shadow-md opacity-0 group-hover:opacity-100 transition">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ul>

        {/* User Info Section */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-400 text-white flex justify-center items-center rounded-md">
              JD
            </div>
            {!isCollapsed && (
              <div>
                <h4 className="font-semibold">{user?.name}</h4>
                <span className="text-sm text-gray-500">{user?.email}</span>
              </div>
            )}
          </div>
          {/* <button
            className="flex items-center gap-3 mt-4 text-gray-700"
            onClick={handleLogOut}
          >
            <LogOutIcon />
            {!isCollapsed && <span>Logout</span>}
          </button> */}
          <LogoutButton />
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
