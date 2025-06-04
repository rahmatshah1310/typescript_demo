import React, { ReactNode } from "react";

// Define prop types
interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, className = "", onClick }) => {
  return (
    <button className={`hover:cursor-pointer ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
