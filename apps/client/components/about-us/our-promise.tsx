import Image from "next/image";
import React from "react";
import Gheejar from "../../assets/images/about-us/ghee-jar.png";
import BackgroundImg from "../../assets/images/background/background-img.png"

const OurPromise = () => {
  return (
    <div
      className="h-[500px] w-full bg-amber-200 flex flex-col items-center justify-center space-y-5"
      style={{ backgroundImage: `url(${BackgroundImg.src})`, backgroundPosition: "center", backgroundSize: "cover" }}
    >
      <div className="h-1.5 w-40 rounded-full bg-[#DABF93]" />
      <h4 className="text-3xl font-medium text-amber-950">Our Promise</h4>
      <p className="md:w-[550px] text-center px-4">
        Every jar of Amata Ghee carries our commitment to purity, health, and
        authenticity — made with care, love, and generations of tradition.
      </p>

      <div className="relative h-50 w-50">
        <Image src={Gheejar.src} fill alt="ghee jar" className="rounded-full" />
      </div>
    </div>
  );
};

export default OurPromise;
