"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProfileSection from "./profile-section";
import OrderSection from "./orders-section";

const Profile = () => {
  const [currentTab, setCurrentTab] = useState<
    "profile" | "orders"
  >("profile");

  const searchParams = useSearchParams();

  useEffect(() => {
    setCurrentTab(
      (searchParams.get("tab") as "profile" | "orders") ||
        "profile"
    );
  }, [searchParams.get("tab")]);

  return (
    <div>
      {/* <ProfileSidebar currentTab={currentTab} /> */}
      {currentTab === "profile" ? (
        <ProfileSection />
      ) : (
        <OrderSection />
      )}
    </div>
  );
};

export default Profile;
