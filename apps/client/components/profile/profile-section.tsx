"use client";

import React, { useEffect, useState } from "react";
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
import { useApi } from "../../hooks/useApi";
import { addressApi } from "../../lib/api/addressApi";
import { toast } from "sonner";
import { Badge } from "../../../../packages/ui/src/components/badge";
import AddressDialogWithForm from "../address-form/address-modal";
import { profileApi } from "../../lib/api/profileApi";
import { IUser } from "../../lib/types/user";

const ProfileSection = () => {
  const { execute } = useApi();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState<any | null>(null);
  const [userData, setUserData] = useState<IUser | null>(null)

  const fetchAddresses = async () => {
    try {
      const response = await execute(
        addressApi.getAddress().then((res) => res.data)
      );
      console.log({ response });
      setAddresses(response.data as any);
    } catch (error: any) {
      toast.error("error?.response.data.message");
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await execute(
        profileApi.getData().then(res => res.data)
      )
      console.log('user-data', {response})
      setUserData(response.data as IUser)
    } catch (error: any) {
      toast.error('error')
    }
  }

  useEffect(() => {
    fetchAddresses();
    fetchUserData()
  }, []);

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
            <Image src={pfp.src} fill alt="pfp" className="rounded-full" />
            <Button
              className="absolute rounded-full bottom-0 right-0 h-8 w-8 p-1"
              size={"sm"}
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <p className="font-semibold text-lg">{userData?.name}</p>
        </div>

        {/* Personal Information Card */}
        {/* 3. Added responsive padding (p-4 on mobile, p-6 on tablet) and shadow */}
        <div className="bg-white w-full rounded-xl p-4 sm:p-6 mb-5 shadow-sm">
          <div className="flex items-center justify-between w-full pb-3 px-3">
            <p className="text-[#613815] font-semibold text-lg">
              Personal Information
            </p>
            <Button className="flex items-center gap-2">
              Edit <Edit className="h-4 w-4" />
            </Button>
          </div>
          <Separator />
          {/* Grid layout is now grid-cols-1 on mobile, sm:grid-cols-2 on tablet, lg:grid-cols-3 on desktop */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-3">
            <div className="min-w-0">
              <p className="text-gray-500 text-sm truncate">Name</p>
              <p className="font-medium text-base">{userData?.name}</p>
            </div>
            <div className="min-w-0">
              <p className="text-gray-500 text-sm truncate">Email Address</p>
              <p className="font-medium text-base truncate">{userData?.email}</p>
            </div>
            <div className="min-w-0">
              <p className="text-gray-500 text-sm truncate">Mobile Number</p>
              <p className="font-medium text-base">{userData?.phone}</p>
            </div>
          </div>
        </div>

        {/* Address Card */}
        <div className="bg-white w-full rounded-2xl p-4 sm:p-6 shadow-md border border-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between w-full pb-3 px-3">
            <p className="text-[#613815] font-semibold text-lg">
              Saved Addresses
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setShowAddressModal(true);
                setAddressToEdit(null);
              }}
            >
              + Add New
            </Button>
          </div>

          <Separator />

          {/* Addresses */}
          <div className="space-y-6 mt-4">
            {addresses.map((address, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-gray-100 hover:shadow-sm transition-shadow duration-200 p-4 sm:p-5"
              >
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                  <Badge variant="outline" className="rounded-full capitalize">
                    {address.addressType}
                  </Badge>

                  <div className="flex gap-2">
                    {address.isDefault ? (
                      <Badge className="bg-[#613815] text-white rounded-full">
                        Default
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-[#613815] border-[#613815] hover:bg-[#613815] hover:text-white"
                      >
                        Set Default
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-700 hover:text-[#613815]"
                      onClick={() => {
                        setShowAddressModal(true);
                        setAddressToEdit(address);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                  </div>
                </div>

                {/* Address Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-800">
                      {address.fullName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Phone Number</p>
                    <p className="font-medium text-gray-800">
                      {address.phoneNumber}
                    </p>
                  </div>
                  <div className="sm:col-span-2 lg:col-span-3">
                    <p className="text-gray-500">Address</p>
                    <p className="font-medium text-gray-800">
                      {address.addressLine1}
                      {address.addressLine2 && `, ${address.addressLine2}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">City</p>
                    <p className="font-medium text-gray-800">{address.city}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">State</p>
                    <p className="font-medium text-gray-800">{address.state}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Postal Code</p>
                    <p className="font-medium text-gray-800">
                      {address.postalCode}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AddressDialogWithForm
        open={showAddressModal}
        setOpen={setShowAddressModal}
        address={addressToEdit}
        fetchAddresses={fetchAddresses}
      />
    </div>
  );
};

export default ProfileSection;
