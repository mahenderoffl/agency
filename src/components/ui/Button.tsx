import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  className = "",
  ...props
}) => {
  let sizeClasses = "px-4 py-2 text-base";
  if (size === "sm") sizeClasses = "px-3 py-1 text-sm";
  if (size === "lg") sizeClasses = "px-6 py-3 text-lg";

  return (
    <button
      className={`rounded-xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
