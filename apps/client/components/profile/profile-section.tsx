import React, { useEffect } from "react";
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
import axiosInstance from "../../lib/axios";

const ProfileSection = () => {


  return (
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

      <div className="w-full h-full">
        <div className="h-50 w-full flex flex-col space-y-4 items-center justify-center">
          <div className="relative h-25 w-25 rounded-full border-2">
            <Image src={pfp} fill alt="pfp" className="rounded-full" />
            <Button
              className="absolute rounded-full bottom-0 right-0 h-8 w-8"
              size={"sm"}
            >
              <Camera />
            </Button>
          </div>
          <p>John Doe</p>
        </div>
        <div className="bg-amber-50 h-50 w-full rounded-xl p-5">
          <div className="flex items-center justify-between w-full pb-2">
            <p>Personal Information</p>
            <Button>
              Edit <Edit />
            </Button>
          </div>
          <Separator />

        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ProfileSection;
