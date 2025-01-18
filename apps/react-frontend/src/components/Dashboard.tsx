import { InstagramIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import Avatar from "../utils/Avatar";

const Dashboard = () => {
  return (
    <div className="w-full ">
      <div className="flex justify-center flex-col items-center mt-8">
        <img
          src="https://app.chitchat.gg/svgs/logo.svg"
          alt="logo"
          className="w-16 h-16"
        />
        <h1 className="text-3xl font-bold mt-4 ">
          Roomify<span className="text-pink-700">.com</span>
        </h1>
        <div className="flex p-2 gap-4">
          <span className="bg-slate-200 rounded-full p-2">
            <TwitterIcon size={16} />
          </span>
          <span className="bg-slate-200 rounded-full p-2">
            <LinkedinIcon size={16} />
          </span>
          <span className="bg-slate-200 rounded-full p-2">
            <InstagramIcon size={16} />
          </span>
        </div>
      </div>
      {/* user join form */}
      <div className="mt-4 flex flex-col items-center ">
        <form className=" shadow-md rounded-lg p-6 w-96 bg-slate-200">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Join Roomify
          </h2>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-700"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Phone (optional)
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-700"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="avatar" className="block text-sm font-medium mb-2">
              Choose an Avatar (optional)
            </label>
            <div className="flex gap-3">
              <Avatar seed="user1" />
              <Avatar seed="user2" />
              <Avatar seed="johndoe" />
              <Avatar seed="surya" />
              <Avatar seed="sashi" />
              {/*           
              <img
                src="https://via.placeholder.com/40"
                alt="avatar3"
                className="w-10 h-10 rounded-full cursor-pointer border border-gray-300 hover:border-pink-700"
              /> */}
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-pink-700 text-white font-semibold px-6 py-2 rounded-md hover:bg-pink-600 transition-all"
            >
              Join Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Dashboard;
