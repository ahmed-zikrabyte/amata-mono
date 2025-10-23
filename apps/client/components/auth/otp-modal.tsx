"use client";

import React, { useState, useRef, Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { toast } from "sonner";
import { useApi } from "../../hooks/useApi";
import { authApi } from "../../lib/api/authApi";
import { useRouter } from "next/navigation";

const OtpModal = ({
  values,
  type,
  open,
  setOpen,
}: {
  values: any;
  type: "login" | "signup";
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { execute, loading } = useApi();
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus automatically
      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const code = otp.join("");
    if (code.length === 4) {
      console.log("Submitted OTP:", code);
      try {
        const response = await execute(
          (type === "login"
            ? authApi.loginVerify({ ...values, otp: code })
            : authApi.registerVerify({ ...values, otp: code })
          ).then((res) => res.data)
        );

        console.log({ response });
        const respAny = response as any;
        if (respAny?.data?.token) {
          localStorage.setItem("token", respAny.data.token);
        }
        toast.success(respAny?.message ?? "Verified successfully");
        setOpen(false);
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } catch (error: any) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      }
      setOpen(false);
    } else {
      alert("Please enter a 4-digit OTP");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value: boolean) => {
        setOpen(value);
        setOtp(["", "", "", ""]);
      }}
    >
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Enter OTP</DialogTitle>
          <DialogDescription>
            Please enter the 4-digit code sent to your registered number.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-evenly mt-6 space-x-2">
          {otp.map((digit, i) => (
            <Input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-12 h-12 text-center text-lg font-semibold border rounded-md focus-visible:ring-2 focus-visible:ring-primary"
            />
          ))}
        </div>

        <div className="flex justify-end mt-6 space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false);
              setOtp(["", "", "", ""]);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Verify</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OtpModal;
