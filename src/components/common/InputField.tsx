import {
  useState,
  type InputHTMLAttributes,
} from "react";

import type { UseFormRegisterReturn } from "react-hook-form";
import type { IconType } from "react-icons";
// import { ICONS } from "constants"; // Make sure this is correct
import {ErrorMessage,Button} from "@components";

interface InputFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  inputClassname?: string;
  name?: string;
  icon?: IconType;
  size?: number;
  color?: string;
  error?: string;
  register?: UseFormRegisterReturn;
  isPassword?: boolean;
}

const InputField: React.FC<InputFieldProps> = (
  (
    {
      label,
      placeholder,
      inputClassname,
      name,
      type = "text",
      icon: Icon,
      size = 18,
      color = "#555",
      error,
      register,
      isPassword = false,
      ...rest
    },
  ) => {
    const [selectedType, setSelectedType] = useState<string>(type);

    return (
      <div className="space-y-2">
        <div className="relative w-full">
          <input
            {...register}
            {...rest}
            type={selectedType}
            id={name}
            name={name}
            placeholder={placeholder ?? ""}
            className={`peer block py-2 w-full appearance-none border bg-transparent text-sm text-white border-[#555555] focus:outline-none focus:ring-0 focus:border-[#555555] ${inputClassname}`}
          />
          {Icon && (
            <Icon
              className="absolute top-1/2 -translate-y-1/2 left-3"
              size={size}
              color={color}
            />
          )}
          {isPassword && (
            <Button
              onClick={() =>
                setSelectedType(
                  selectedType === "password" ? "text" : "password"
                )
              }
              className="absolute top-1/2 -translate-y-1/2 right-3"
            >
              {selectedType === "password" ? "Show" : "Hide"}
            </Button>
          )}
          <label
            htmlFor={name}
            className="absolute top-2 left-2.5 z-10 origin-[0] transform text-base text-[#F5F5F5] transition-all duration-300
          peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100
          peer-focus:-translate-y-3 peer-focus:scale-75
          peer-not-placeholder-shown:-translate-y-3 peer-not-placeholder-shown:scale-75"
          >
            {label}
          </label>
        </div>
        {error && <ErrorMessage error={error} />}
      </div>
    );
  }
);

export default InputField;
