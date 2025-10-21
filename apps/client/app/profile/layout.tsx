"use client"

import React, { ReactNode, useEffect, useState } from "react";
import ProfileSidebar from "../../components/profile/profile-sidebar";
import { useSearchParams, usePathname } from "next/navigation"; 

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  const [currentTab, setCurrentTab] = useState<
    "profile" | "orders" | "payments"
  >("profile");

  const searchParams = useSearchParams();
  // Get the current pathname
  const pathname = usePathname(); 

  useEffect(() => {
    // 1. Check if the pathname includes "/order/details/"
    console.log({pathname})
    if (pathname.includes("/order/details")) {
      setCurrentTab("orders");
      return; // Exit the effect early
    }

    // 2. Otherwise, use the 'tab' search parameter logic
    setCurrentTab(
      (searchParams.get("tab") as "profile" | "orders" | "payments") ||
        "profile"
    );
  // Include pathname in the dependency array
  }, [searchParams.get("tab"), pathname]); 

  return (
    <div className="flex">
      <ProfileSidebar currentTab={currentTab} />
      <div className="p-5 w-full mt-18 md:mt-0 md:ml-10 md:pl-60 lg:pl-80">
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;