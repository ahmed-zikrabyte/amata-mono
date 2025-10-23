"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useApi } from "../../hooks/useApi";
import { authApi } from "../../lib/api/authApi";
import { toast } from "sonner";
import OtpModal from "./otp-modal";

// ✅ Validation Schema
const signupSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters long" }),
  phone: z
    .string()
    .min(10, { message: "Please enter a valid phone number" })
    .max(10, { message: "Please enter a valid phone number" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  // password: z
  //   .string()
  //   .min(6, { message: "Password must be at least 6 characters long" }),
  // confirmPassword: z.string(),
});
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"],
// });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      // password: "",
      // confirmPassword: "",
    },
  });

  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { execute, data, loading } = useApi();
  const [showOtpModal, setShowOtpModal] = useState<boolean>(false);
  const [signupData, setSignupData] = useState<SignupFormValues>()

  console.log({ data });

  const onSubmit = async (values: SignupFormValues) => {
    console.log("Signup data:", values);
    try {
      const response = await execute(
        authApi.register(values).then((res) => res.data)
      );
      console.log({ response });
      setSignupData(values)
      setShowOtpModal(true)
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
  };

  return (
    <div className="w-full md:w-2/3 mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center md:text-start">
        Create Account
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    className="h-12 bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your phone no."
                    className="h-12 bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="h-12 bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          {/* <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="h-12 bg-white"
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* Confirm Password */}
          {/* <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="h-12 bg-white"
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <Button type="submit" className="w-full h-12">
            Sign Up
          </Button>
        </form>
      </Form>
      <p className="text-center mt-5">
        Already have an account?{" "}
        <Link href={"/login"} className="text-amber-950">
          Login
        </Link>
      </p>
      <OtpModal values={signupData} type="signup" open={showOtpModal} setOpen={setShowOtpModal} />
    </div>
  );
}
