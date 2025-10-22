"use client";

import { CreditCard, LogOut, Package, Settings, User } from "lucide-react";
import Link from "next/link";

const ProfileSidebar = ({ currentTab }: { currentTab: string }) => {
  return (
    <div className="fixed w-full z-50 bg-white">
      <div className="hidden fixed top-20 bottom-0 md:w-60 lg:w-80 md:flex flex-col justify-between items-center border-r-2 border-r-gray-300">
        <div className="w-full">
          <Link href={"/profile?tab=profile"}>
            <div
              className={`h-16 w-full md:pl-10 lg:pl-20 flex items-center justify-start px-4 ${currentTab === "profile" ? "bg-amber-800 text-white" : " text-black"}`}
            >
              <User />
              <span className="font-medium ml-2">My Profile</span>
            </div>
          </Link>
          <Link href={"/profile?tab=orders"}>
            <div
              className={`h-16 w-full md:pl-10 lg:pl-20 flex items-center justify-start px-4 ${currentTab === "orders" ? "bg-amber-800 text-white" : "text-black"} `}
            >
              <Package />
              <span className="font-medium ml-2">My Orders</span>
            </div>
          </Link>
          <Link href={"/profile?tab=payments"}>
            <div
              className={`h-16 w-full md:pl-10 lg:pl-20 flex items-center justify-start px-4 ${currentTab === "payments" ? "bg-amber-800 text-white" : "text-black"}`}
            >
              <CreditCard />
              <span className="font-medium ml-2">Payment Details</span>
            </div>
          </Link>
        </div>
        <div className="w-full">
          <div className="h-16 w-full md:pl-10 lg:pl-20 hover:bg-gray-300 duration-150 flex items-center justify-start px-4 cursor-pointer">
            <Settings />
            <span className="font-medium ml-2">Settings</span>
          </div>
          <div className="h-16 w-full md:pl-10 lg:pl-20 hover:bg-gray-300 flex items-center justify-start px-4 cursor-pointer">
            <LogOut />
            <span className="font-medium ml-2">Logout</span>
          </div>
        </div>
      </div>
      <div className=" flex md:hidden items-center justify-evenly w-full p-3">
        <Link href={"/profile?tab=profile"}>
          <div
            className={`h-16 w-full flex items-center justify-start rounded-xl px-4 ${currentTab === "profile" ? "bg-amber-800 text-white" : " text-black"}`}
          >
            <span className="font-medium ml-2">My Profile</span>
          </div>
        </Link>
        <Link href={"/profile?tab=orders"}>
          <div
            className={`h-16 w-full flex items-center justify-start rounded-xl px-4 ${currentTab === "orders" ? "bg-amber-800 text-white" : "text-black"} `}
          >
            <span className="font-medium ml-2">My Orders</span>
          </div>
        </Link>
        <Link href={"/profile?tab=payments"}>
          <div
            className={`h-16 w-full flex items-center justify-start rounded-xl px-4 ${currentTab === "payments" ? "bg-amber-800 text-white" : "text-black"}`}
          >
            <span className="font-medium ml-2">Payment Details</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProfileSidebar;
