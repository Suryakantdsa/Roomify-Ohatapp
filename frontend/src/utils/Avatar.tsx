import { createAvatar } from "@dicebear/core";
import { micah } from "@dicebear/collection";

const Avatar = ({ seed }: { seed: string }) => {
  // Generate the avatar SVG
  const svg = createAvatar(micah, {
    seed,
    radius: 40,
    backgroundColor: ["f0f0f0"],
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: svg }}
      className="w-12 h-12 cursor-pointer rounded-full hover:bg-pink-400 p-1"
    />
  );
};

export default Avatar;
