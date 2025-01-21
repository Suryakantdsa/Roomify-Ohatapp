import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen flex-col gap-y-2">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500">
        {/* Roomify.com */}
      </div>
      <div className=" flex gap-x-2 justify-center items-center  h-16">
        <img
          src="https://app.chitchat.gg/svgs/logo.svg"
          alt="logo"
          className="w-10 h-10"
        />
        <h1 className="text-2xl font-semibold  ">
          Roomify<span className="text-pink-700">.com</span>
        </h1>
      </div>
    </div>
  );
};

export default Loading;
