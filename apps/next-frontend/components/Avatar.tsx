import { createAvatar } from "@dicebear/core";
import { micah } from "@dicebear/collection";

const Avatar = ({
  seed,
  isSelected,
  onSelect,
}: {
  seed: string;
  onSelect: (seed: string) => void;
  isSelected: Boolean;
}) => {
  // Generate the avatar SVG
  const svg = createAvatar(micah, {
    seed,
    radius: 40,
    backgroundColor: ["f0f0f0"],
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: svg }}
      className={`w-12 h-12 cursor-pointer rounded-full p-1 ${isSelected ? "bg-pink-600 scale-110" : ""}`}
      onClick={() => onSelect(seed)}
    />
  );
};

export default Avatar;
