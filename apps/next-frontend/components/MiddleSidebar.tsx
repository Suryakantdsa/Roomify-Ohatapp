import {
  ArrowDown,
  EllipsisVertical,
  MessageCirclePlus,
  Search,
} from "lucide-react";
import { useState } from "react";
import Chats from "../app/ui/Chats";

const MiddleSidebar = () => {
  const [isSearching, SetSearching] = useState(true);

  return (
    <aside
      className={`h-screen bg-white border-r shadow-sm transition-all duration-100  w-[45%]`}
    >
      <nav className="flex flex-col h-full p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Chats</h1>
          <div className="flex justify-between items-center w-14">
            <MessageCirclePlus size={20} />
            <EllipsisVertical size={20} />
          </div>
        </div>

        {/* search bar */}
        <div className="flex items-center px-4 gap-x-6 rounded-md bg-gray-200 w-full h-12 mt-6 mb-2 ">
          {isSearching ? (
            <Search size={15} />
          ) : (
            <div
              className={`transform transition-transform duration-[5000ms] delay-[1000ms] ${
                isSearching ? "rotate-0" : "rotate-[90deg]"
              } cursor-pointer`}
            >
              <ArrowDown
                size={20}
                color="#be185d"
                fontWeight={700}
                onClick={() => SetSearching(true)}
              />
            </div>
          )}
          <input
            type="text"
            placeholder={`${isSearching ? "Search" : ""}`}
            className="h-full bg-gray-200 text-black outline-none border-none"
            onFocus={() => {
              SetSearching(false);
            }}
          />
        </div>

        {/* chat user */}
        {/* <div className="h-screen overflow-y-auto custom-scrollbar ">
          <div className="p-2 flex justify-between w-full items-center bg-gray-300  border-pink-500 border-b  shadow-lg ">
            <Avatar seed="add" />
            <div className="w-[80%]">
              <div className="flex justify-between items-center ">
                <span className="font-bold text-xl">Name</span>
                <span className="text-sm font-semibold">25/02/2025</span>
              </div>
              <div className="text-xs w-full">
                Lorem ipsum dolor sit amesdjkbfbjndt !...
              </div>
            </div>
          </div>
        </div> */}
        <Chats />
      </nav>
    </aside>
  );
};

export default MiddleSidebar;
