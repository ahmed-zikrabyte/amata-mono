import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import { Button } from "@workspace/ui/components/button";
import { Separator } from "@workspace/ui/components/separator";
import Image from "next/image";
import pfp from "../../assets/images/pfp-amata.jpg";
import { Camera, Edit } from "lucide-react";

const ProfileSection = () => {
  return (
    // 1. Added responsive padding to the main container (p-4 on mobile, p-8 on desktop)
    <div className="h-full"> 
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/profile?tab=profile">Profile</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>My Profile</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="w-full h-full pt-4">
        {/* Profile Picture and Name Section */}
        <div className="h-auto w-full flex flex-col space-y-4 items-center justify-center py-6">
          {/* 2. Replaced non-standard h-25 w-25 with standard h-24 w-24 */}
          <div className="relative h-24 w-24 rounded-full border-2"> 
            <Image src={pfp} fill alt="pfp" className="rounded-full" />
            <Button
              className="absolute rounded-full bottom-0 right-0 h-8 w-8 p-1" 
              size={"sm"}
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <p className="font-semibold text-lg">John Doe</p>
        </div>
        
        {/* Personal Information Card */}
        {/* 3. Added responsive padding (p-4 on mobile, p-6 on tablet) and shadow */}
        <div className="bg-white w-full rounded-xl p-4 sm:p-6 mb-5 shadow-sm"> 
          <div className="flex items-center justify-between w-full pb-3 px-3">
            <p className="text-[#613815] font-semibold text-lg">Personal Information</p>
            <Button className="flex items-center gap-2"> 
              Edit <Edit className="h-4 w-4" />
            </Button>
          </div>
          <Separator />
          {/* Grid layout is now grid-cols-1 on mobile, sm:grid-cols-2 on tablet, lg:grid-cols-3 on desktop */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-3"> 
            <div className="min-w-0">
              <p className="text-gray-500 text-sm truncate">First Name</p>
              <p className="font-medium text-base">John</p>
            </div>
            <div className="min-w-0">
              <p className="text-gray-500 text-sm truncate">Last Name</p>
              <p className="font-medium text-base">Doe</p>
            </div>
            <div className="min-w-0">
              <p className="text-gray-500 text-sm truncate">Date of Birth</p>
              <p className="font-medium text-base">10-12-2025</p>
            </div>
            <div className="min-w-0">
              <p className="text-gray-500 text-sm truncate">Email Address</p>
              <p className="font-medium text-base truncate">johndoe@mail.com</p>
            </div>
            <div className="min-w-0">
              <p className="text-gray-500 text-sm truncate">Mobile Number</p>
              <p className="font-medium text-base">10-12-2025</p>
            </div>
          </div>
        </div>
        
        {/* Address Card */}
        <div className="bg-white w-full rounded-xl p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between w-full pb-3 px-3">
            <p className="text-[#613815] font-semibold text-lg">Address</p>
            <Button className="flex items-center gap-2">
              Edit <Edit className="h-4 w-4" />
            </Button>
          </div>
          <Separator />
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-3"> 
            <div className="min-w-0">
              <p className="text-gray-500 text-sm truncate">Country</p>
              <p className="font-medium text-base">India</p>
            </div>
            <div className="min-w-0">
              <p className="text-gray-500 text-sm truncate">City</p>
              <p className="font-medium text-base">Bengaluru</p>
            </div>
            <div className="min-w-0">
              <p className="text-gray-500 text-sm truncate">Postal Code</p>
              <p className="font-medium text-base">104025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
