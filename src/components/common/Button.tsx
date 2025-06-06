import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset"; // Add this
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  onClick,
  type = "button", 
}) => {
  return (
    <button
      type={type}
      className={`hover:cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
