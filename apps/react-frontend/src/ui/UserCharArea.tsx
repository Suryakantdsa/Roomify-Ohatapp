const UserChatArea = () => {
  const messages = [
    { id: 1, sender: "User", text: "Hello!", time: "10:00 AM" },
    { id: 2, sender: "You", text: "Hi, how are you?", time: "10:01 AM" },
    {
      id: 3,
      sender: "User",
      text: "I’m good, thanks for asking.",
      time: "10:02 AM",
    },
    { id: 4, sender: "You", text: "Great to hear that!", time: "10:03 AM" },
    { id: 1, sender: "User", text: "Hello!", time: "10:00 AM" },
    { id: 2, sender: "You", text: "Hi, how are you?", time: "10:01 AM" },
    {
      id: 3,
      sender: "User",
      text: "I’m good, thanks for asking.",
      time: "10:02 AM",
    },
    { id: 4, sender: "You", text: "Great to hear that!", time: "10:03 AM" },
    { id: 1, sender: "User", text: "Hello!", time: "10:00 AM" },
    { id: 2, sender: "You", text: "Hi, how are you?", time: "10:01 AM" },
    {
      id: 3,
      sender: "User",
      text: "I’m good, thanks for asking.",
      time: "10:02 AM",
    },
    { id: 4, sender: "You", text: "Great to hear that!", time: "10:03 AM" },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 custom-scrollbar">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "You" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.sender === "You"
                  ? "bg-[#6C61C6] text-white"
                  : "bg-gray-200"
              }`}
            >
              <p>{message.text}</p>
              <span className="text-xs text-gray-900">{message.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserChatArea;
