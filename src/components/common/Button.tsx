import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  type?: string;
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
