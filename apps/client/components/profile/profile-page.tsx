"use client"

import React, { useEffect, useState } from "react";
import ProfileSidebar from "./profile-sidebar";
import { useSearchParams } from "next/navigation";
import ProfileSection from "./profile-section";
import OrderSection from "./orders-section";
import PaymentSection from "./payments-section";

const Profile = () => {
  const [currentTab, setCurrentTab] = useState<
    "profile" | "orders" | "payments"
  >("profile");

  const searchParams = useSearchParams();

  useEffect(() => {
    setCurrentTab(
      (searchParams.get("tab") as "profile" | "orders" | "payments") ||
        "profile"
    );
  }, [searchParams.get("tab")]);

  return (
    <div className="flex pr-20">
      <ProfileSidebar currentTab={currentTab} />
      <div className="p-5 w-full">
        {currentTab === "profile" ? 
        <ProfileSection /> :
        currentTab === "orders" ?
        <OrderSection /> : 
        <PaymentSection />
        }
      </div>
    </div>
  );
};

export default Profile;
