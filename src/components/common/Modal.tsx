import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import type { ReactNode } from "react";

interface ModalProps{
  children:ReactNode,
  isOpen:boolean,
  onClose:(open:boolean)=>void,
  className?:string,
}

const Modal:React.FC<ModalProps> = ({ children, isOpen, onClose, className }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${className}`}>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
