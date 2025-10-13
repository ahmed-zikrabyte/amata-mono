"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";

interface IContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: {
    name: string;
    email: string;
    message: string;
  };
}

const ContactModal = ({ open, onOpenChange, data }: IContactModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Details</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <p>
            <strong>Name:</strong> {data.name}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Message:</strong> {data.message}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
