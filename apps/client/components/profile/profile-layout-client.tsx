"use client";

import React, { ReactNode, useEffect, useState } from "react";
import ProfileSidebar from "./profile-sidebar";
import { useSearchParams, usePathname } from "next/navigation";

const ProfileLayoutClient = ({ children }: { children: ReactNode }) => {
  const [currentTab, setCurrentTab] = useState<
    "profile" | "orders" | "payments"
  >("profile");

  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("/order/details")) {
      setCurrentTab("orders");
      return;
    }

    const tab =
      (searchParams.get("tab") as "profile" | "orders" | "payments") ||
      "profile";
    setCurrentTab(tab);
  }, [searchParams, pathname]);

  return (
    <div className="flex">
      <ProfileSidebar currentTab={currentTab} />
      <div className="p-5 w-full mt-18 md:mt-0 md:ml-10 md:pl-60 lg:pl-80">
        {children}
      </div>
    </div>
  );
};

export default ProfileLayoutClient;
