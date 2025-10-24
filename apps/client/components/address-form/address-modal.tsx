"use client";

import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import AddressAddForm from "./address-add-form";
import { useApi } from "../../hooks/useApi";
import { addressApi } from "../../lib/api/addressApi";
import { toast } from "sonner";

interface AddressDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  address: any;
  fetchAddresses: () => void;
}

const AddressDialogWithForm: React.FC<AddressDialogProps> = ({
  open,
  setOpen,
  address,
  fetchAddresses
}) => {
  const { execute } = useApi();
  const handleSubmit = async (values: any) => {
    console.log(values);
    console.log({ address });
    if (address) {
      try {
        const response = await execute(
          addressApi.updateAddress(address._id, values).then((res) => res.data)
        );
        console.log({ response });
        toast.success(response.message)
      } catch (error: any) {
        console.log(error.response.data.message);
      } finally {
        fetchAddresses()
      }
    } else {
      try {
        const response = await execute(
          addressApi.addAddress(values).then((res) => res.data)
        );
        console.log({ response });
      } catch (error: any) {
        console.log(error.response.data.message);
      } finally {
        fetchAddresses()
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Add New Address
          </DialogTitle>
        </DialogHeader>

        {/* Form */}
        <AddressAddForm
          setShowForm={setOpen}
          onSubmit={handleSubmit}
          initialData={address}
        />

        <DialogFooter>{/* Optional extra buttons if needed */}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddressDialogWithForm;
