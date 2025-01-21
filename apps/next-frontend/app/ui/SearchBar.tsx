"use client";
import { Search, ArrowDown } from "lucide-react";
import React, { useState } from "react";

const SearchBar = () => {
  const [isSearching, SetSearching] = useState(true);
  return (
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
  );
};

export default SearchBar;
