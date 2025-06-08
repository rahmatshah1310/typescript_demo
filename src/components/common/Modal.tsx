import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

const Modal = ({ children, isOpen, onClose, className }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${className}`}>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
