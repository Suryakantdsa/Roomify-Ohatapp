import React, { useState } from "react";
import { Send, Smile } from "lucide-react";

const UserChatBar = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      //alert(message);
      console.log("Message sent:", message); // Replace with actual send logic
      setMessage(""); // Clear the input after sending
    }
  };

  return (
    <div className=" w-full bg-gray-300 border-t border-gray-300 p-4 flex items-center gap-4">
      <button className="text-gray-500">
        <Smile size={24} />
      </button>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        className="flex-1 p-2 bg-white border border-gray-300 rounded-md outline-none"
      />
      <button
        className={`p-2 rounded-full ${
          message.trim() === "" ? "bg-gray-400" : "bg-pink-500"
        }`}
        onClick={handleSendMessage}
        disabled={message.trim() === ""}
      >
        <Send size={20} className="text-white" />
      </button>
    </div>
  );
};

export default UserChatBar;
