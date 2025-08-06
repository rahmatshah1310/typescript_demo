import { Dialog, DialogContent } from "@components";

const Modal = ({ children, isOpen, onClose, className, title }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} title={title}>
      <DialogContent className={className}>
        <h2>{title}</h2>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
