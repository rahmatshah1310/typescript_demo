import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReactNode, ReactElement } from "react";

interface ShadcnPopoverProps {
  triggerContent: ReactElement;
  children: ReactNode;
}

const ShadcnPopover: React.FC<ShadcnPopoverProps> = ({ triggerContent, children }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{triggerContent}</PopoverTrigger>
      <PopoverContent
        align="start"
        side="top"
        sideOffset={8}
        className="w-64 bg-gray-700 text-black border border-gray-300 shadow-lg z-[900]"
      >
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default ShadcnPopover;
