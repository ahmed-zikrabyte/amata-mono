"use client";

import { CreditCard, LogOut, Package, Settings, User } from "lucide-react";
import Link from "next/link";

const ProfileSidebar = ({ currentTab }: { currentTab: string }) => {
  return (
    <div className="w-80 h-[90vh] flex flex-col justify-between items-center border-r-2 border-r-gray-300">
      <div className="w-full">
        <Link href={"/profile?tab=profile"}>
          <div
            className={`h-16 w-full pl-20 flex items-center justify-start px-4 ${currentTab === "profile" ? "bg-amber-800 text-white" : " text-black"}`}
          >
            <User />
            <span className="font-medium ml-2">My Profile</span>
          </div>
        </Link>
        <Link href={"/profile?tab=orders"}>
          <div
            className={`h-16 w-full pl-20 flex items-center justify-start px-4 ${currentTab === "orders" ? "bg-amber-800 text-white" : "text-black"} `}
          >
            <Package />
            <span className="font-medium ml-2">My Orders</span>
          </div>
        </Link>
        <Link href={"/profile?tab=payments"}>
          <div
            className={`h-16 w-full pl-20 flex items-center justify-start px-4 ${currentTab === "payments" ? "bg-amber-800 text-white" : "text-black"}`}
          >
            <CreditCard />
            <span className="font-medium ml-2">Payment Details</span>
          </div>
        </Link>
      </div>
      <div className="w-full">
        <div className="h-16 w-full pl-20 bg-amber-200 flex items-center justify-start px-4">
          <Settings />
          <span className="font-medium ml-2">Settings</span>
        </div>
        <div className="h-16 w-full pl-20 bg-amber-200 flex items-center justify-start px-4">
          <LogOut />
          <span className="font-medium ml-2">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
