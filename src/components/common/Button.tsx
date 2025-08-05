import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  type?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, className = "", onClick, disabled }) => {
  return (
    <button className={`hover:cursor-pointer ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
