import React from "react";
import { Button } from "../../../../packages/ui/src/components/button";
import Link from "next/link";
import Image from "next/image";
import FreshImg from "../../assets/images/contact-us/fresh-img.png";

const LastSection = () => {
  return (
    <div className="h-70 flex flex-col md:flex-row items-center justify-between px-6 lg:px-20 xl:px-26 md:px-10">
      <div className="w-full md:w-2/3 space-y-3">
        <p className="text-3xl font-semibold text-amber-950">
          Purity Has a Voice. And it's Yours.
        </p>
        <p className="text-sm text-gray-600 lg:w-[600px]">
          Your feedback helps us stay true to our promise — to keep bringing you
          the purest ghee, made the traditional way.
        </p>
        <div className="space-x-3">
          <Link href={"/products"}>
            <Button>Shop now</Button>
          </Link>
          <Button variant={"outline"}>Know your story</Button>
        </div>
      </div>
      <div className="hidden h-full md:flex items-center justify-center">
        <div className="relative h-2/3 md:h-full  max-md:w-2/3 aspect-square">
          <Image src={FreshImg.src} fill alt="" className="object-contain" />
        </div>
      </div>
    </div>
  );
};

export default LastSection;
