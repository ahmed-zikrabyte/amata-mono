import React, { Suspense } from "react";
import ProfileLayoutClient from "../../components/profile/profile-layout-client";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileLayoutClient>{children}</ProfileLayoutClient>
    </Suspense>
  );
}
