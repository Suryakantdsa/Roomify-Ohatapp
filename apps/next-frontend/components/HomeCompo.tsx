import React from "react";

const HomeCompo = () => {
  return (
    <div className="w-full h-screen ">
      <div className="flex flex-col justify-center items-center gap-y-3 h-full font-sans">
        <img
          // src="https://app.chitchat.gg/svgs/logo.svg"
          src="/homecompo.jpeg"
          alt="homeLogo"
          className="w-80 h-48 "
        />
        <h1 className=" text-2xl font-bold">Download Roomify for Windows</h1>
        <h3 className="">
          Make calls, share your screen and get a faster experience when you
          download the Windows app.
        </h3>
        <button className="bg-pink-500 rounded-3xl px-5 py-2 font-semibold text-white">
          Get from microsoft store
        </button>
      </div>
    </div>
  );
};

export default HomeCompo;
