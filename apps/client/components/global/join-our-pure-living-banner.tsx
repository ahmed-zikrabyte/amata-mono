import Image from "next/image";
import React from "react";
import banner from "../../assets/images/banners/join-our-pure-banner.png";
import { Input } from "@workspace/ui/components/input"
import { Button } from "../../../../packages/ui/src/components/button";

const JoinOurPureLivingCommunityBanner = () => {
  return (
    <div className="relative h-[420px] md:h-[380px] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src={banner}
        alt="banner"
        fill
        className="object-cover"
        priority
      />

      {/* Black overlay with opacity and blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Example content (centered text) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 space-y-3">
        <h2 className="text-2xl lg:text-4xl font-semibold">Join Our Pure Living Community</h2>
        <p className="text-sm lg:text-lg font-medium text-gray-200 max-w-xl">
          Get exclusive offers, health tips, and updates on new organic products.
        </p>
        <div className="flex flex-col md:flex-row items-center max-md:space-y-3 md:space-x-3">
          <Input placeholder="Enter your email address" className="bg-white h-12" />
          <Button className="h-12" size={"lg"}>Subscribe</Button>
        </div>
      </div>
    </div>
  );
};

export default JoinOurPureLivingCommunityBanner;
