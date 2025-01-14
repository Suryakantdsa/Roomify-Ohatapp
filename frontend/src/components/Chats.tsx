import React, { useState } from "react";
import Avatar from "../utils/Avatar";

const Chats = () => {
  const chatData = [
    {
      id: 1,
      name: "John Doe",
      date: "25/02/2025",
      message: "Hello, how are you?",
      avatarSeed: "john",
    },
    {
      id: 2,
      name: "Jane Smith",
      date: "24/02/2025",
      message: "Can we schedule a meeting?",
      avatarSeed: "jane",
    },
    {
      id: 3,
      name: "Mike Johnson",
      date: "23/02/2025",
      message: "Here's the update on the project...",
      avatarSeed: "mike",
    },
    {
      id: 4,
      name: "Emily Davis",
      date: "22/02/2025",
      message: "Let me know your thoughts on this.",
      avatarSeed: "emily",
    },
    {
      id: 5,
      name: "Robert Brown",
      date: "21/02/2025",
      message: "I'll review it by tomorrow.",
      avatarSeed: "robert",
    },
    {
      id: 6,
      name: "Sophia Wilson",
      date: "20/02/2025",
      message: "Great work on the last task!",
      avatarSeed: "sophia",
    },
    {
      id: 7,
      name: "William Moore",
      date: "19/02/2025",
      message: "Can you share the document?",
      avatarSeed: "william",
    },
    {
      id: 8,
      name: "Isabella Taylor",
      date: "18/02/2025",
      message: "Looking forward to the meeting.",
      avatarSeed: "isabella",
    },
    {
      id: 9,
      name: "James Anderson",
      date: "17/02/2025",
      message: "Any updates on the report?",
      avatarSeed: "james",
    },
    {
      id: 10,
      name: "Mia Thomas",
      date: "16/02/2025",
      message: "Thanks for the quick response!",
      avatarSeed: "mia",
    },
    {
      id: 11,
      name: "Liam Martinez",
      date: "15/02/2025",
      message: "I'll send it by evening.",
      avatarSeed: "liam",
    },
    {
      id: 12,
      name: "Charlotte Lee",
      date: "14/02/2025",
      message: "Please check the attachment.",
      avatarSeed: "charlotte",
    },
    {
      id: 13,
      name: "Benjamin Perez",
      date: "13/02/2025",
      message: "Thanks for your feedback.",
      avatarSeed: "benjamin",
    },
    {
      id: 14,
      name: "Amelia White",
      date: "12/02/2025",
      message: "This looks good to me!",
      avatarSeed: "amelia",
    },
    {
      id: 15,
      name: "Elijah Harris",
      date: "11/02/2025",
      message: "Let's discuss this further.",
      avatarSeed: "elijah",
    },
    {
      id: 16,
      name: "Harper Martin",
      date: "10/02/2025",
      message: "Please let me know the details.",
      avatarSeed: "harper",
    },
    {
      id: 17,
      name: "Lucas Thompson",
      date: "09/02/2025",
      message: "I'll get back to you soon.",
      avatarSeed: "lucas",
    },
    {
      id: 18,
      name: "Ella Garcia",
      date: "08/02/2025",
      message: "Thanks for the reminder!",
      avatarSeed: "ella",
    },
    {
      id: 19,
      name: "Henry Rodriguez",
      date: "07/02/2025",
      message: "Can we postpone the call?",
      avatarSeed: "henry",
    },
    {
      id: 20,
      name: "Grace Martinez",
      date: "06/02/2025",
      message: "Looking forward to your input.",
      avatarSeed: "grace",
    },
  ];
  const [activeUserChatClicked, setActiveUserchatClicked] = useState(0);
  return (
    <div className="h-screen overflow-y-auto custom-scrollbar ">
      {chatData.map((chat) => (
        <div
          key={chat.id}
          onClick={() => setActiveUserchatClicked(chat.id)}
          className={`p-2 flex justify-between w-full items-center cursor-pointer border-pink-500 border-b  shadow-lg mt-3 
            ${activeUserChatClicked === chat.id ? "bg-pink-200" : "bg-gray-100"}
            `}
        >
          <Avatar seed={chat.avatarSeed} />
          <div className="w-[80%]">
            <div className="flex justify-between items-center ">
              <span className="font-bold text-lg">{chat.name}</span>
              <span className="text-sm font-semibold">{chat.date}</span>
            </div>
            <div className="text-xs w-full">{chat.message}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
