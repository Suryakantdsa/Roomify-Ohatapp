import React, { ReactNode } from "react";

interface EmptyStateProbs {
  icon?: ReactNode;
  message?: string;
  additionalStyle?: string;
  children?: ReactNode;
}

const EmptyState: React.FC<EmptyStateProbs> = ({
  icon,
  message,
  additionalStyle,
  children,
}) => {
  return (
    <div
      className={`flex flex-col mt-28 gap-y-4 justify-center w-full items-center ${additionalStyle}`}
    >
      {icon && <div>{icon}</div>}
      {message && <div className="text-center">{message}</div>}
      {children && <div>{children}</div>}
    </div>
  );
};

export default EmptyState;
