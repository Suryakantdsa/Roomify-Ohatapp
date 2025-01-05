import { InstagramIcon, LinkedinIcon, TwitterIcon } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="w-full ">
      <div className="flex justify-center flex-col items-center mt-20">
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

      <div></div>
    </div>
  );
};
export default Dashboard;
