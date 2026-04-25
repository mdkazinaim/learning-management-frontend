import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

export interface ButtonProps {
  title?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: () => void;
  type:string,
  className?: string;
  disabled?: boolean;
}

const PrimaryButton: React.FC<ButtonProps> = ({
  title,
  leftIcon,
  rightIcon,
  onClick,
  type,
  className = "",
  disabled = false,
}) => {
  return (
    <Button
      onClick={onClick}
      className={`flex items-center justify-center gap-1 px-5 py-6 font-medium  capitalize rounded-xl focus:outline-none cursor-pointer ${
        type === "Primary"
          ? "bg-light-blue text-primary-white"
          : type === "Secondary"
          ? "text-light-blue bg-primary-white"
          : type === "Badge"
          ? "text-dark-Blue bg-light-Gray text-sm  px-4 py-1 rounded-bl-full rounded-tl-full rounded-tr-full rounded-br-full md:text-lg"
          : type === "Icon"
          ? " text-light-Gray size-12 rounded-full border border-light-Gray p-3"  
          : ""
      }  ${className}`}
      disabled={disabled}
    >
      {leftIcon && <span className="flex items-center">{leftIcon}</span>}
      {title && <span className="">{title}</span>}
      {rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </Button>
  );
};

export default PrimaryButton;