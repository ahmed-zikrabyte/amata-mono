import React from "react";
import AboutusBanner from "./aboutus-banner";
import TraditionalMethodSection from "./traditional-method-section";
import OurStorySection from "./our-story-section";
import OurProcessSection from "./our-process-section";
import OurPromise from "./our-promise";
import WhyChoose from "./why-choose";

const AboutusPage = () => {
  return (
    <div className="w-full">
      <AboutusBanner />
      <TraditionalMethodSection />
      <OurStorySection />
      <OurProcessSection />
      <OurPromise />
      <WhyChoose />
    </div>
  );
};

export default AboutusPage;
