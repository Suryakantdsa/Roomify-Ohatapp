import { createAvatar } from "@dicebear/core";
import { micah } from "@dicebear/collection";

const Avatar = ({ seed }: { seed: string }) => {
  // Generate the avatar SVG
  const svg = createAvatar(micah, {
    seed, // Use a unique identifier like a username or ID
    radius: 50, // Add rounded corners
    backgroundColor: ["f0f0f0"], // Optional: Light gray background
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: svg }}
      className="w-12 h-12 cursor-pointer"
    />
  );
};

export default Avatar;
