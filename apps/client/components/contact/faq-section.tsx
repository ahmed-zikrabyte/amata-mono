import React from "react";
import { Button } from "../../../../packages/ui/src/components/button";
import Link from "next/link";
import Image from "next/image";
import FreshImg from "../../assets/images/contact-us/fresh-img.png";

const FaqSection = () => {
  return (
    <div className="h-70 flex items-center justify-between px-6 lg:px-20 xl:px-26 md:px-10">
      <div className="w-2/3 space-y-3">
        <p className="text-3xl font-semibold text-amber-950">Purity Has a Voice. And it's Yours.</p>
        <p className="text-sm text-gray-600 w-[600px]">
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
      <div className="h-full">
        <div className="relative h-full aspect-square">
          <Image src={FreshImg.src} fill alt="" className="object-contain" />
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
