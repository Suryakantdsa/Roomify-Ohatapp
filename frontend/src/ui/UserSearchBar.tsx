import React from "react";
import { Search } from "lucide-react";

const UserSearchBar = () => {
  return (
    <div className="w-full bg-gray-100 p-4 flex items-center gap-2 rounded-md shadow-md">
      <Search className="text-gray-500" size={20} />
      <input
        type="text"
        placeholder="Search for a user..."
        className="flex-1 bg-transparent text-sm placeholder-gray-500 text-gray-700 outline-none"
      />
    </div>
  );
};

export default UserSearchBar;
