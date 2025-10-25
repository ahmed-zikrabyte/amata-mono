import React from "react";
import bgSec7 from "../../../assets/homeBgSec7.png";
import homeSecLogo1 from "../../../assets/homeSecLogo1.png";
import homeSecLogo2 from "../../../assets/homeSecLogo2.png";
import homeSecLogo3 from "../../../assets/homeSecLogo3.png";
import homeSecLogo4 from "../../../assets/homeSecLogo4.png";
import homeSecLogo5 from "../../../assets/homeSecLogo5.png";
import homeSecLogo6 from "../../../assets/homeSecLogo6.png";

const Banner7 = () => {
  const benefits = [
    {
      id: 1,
      icon: homeSecLogo1,
      title: "Supports Digestion Naturally",
      description:
        "The butyric acid in ghee helps maintain gut health and reduces inflammation",
    },
    {
      id: 2,
      icon: homeSecLogo2,
      title: "Boosts Immunity",
      description:
        "Rich in fat-soluble vitamins A, D, E, and K, which are essential for overall well-being.",
    },
    {
      id: 3,
      icon: homeSecLogo3,
      title: "Promotes Heart Health",
      description:
        "When consumed in moderation, its healthy fats can support cholesterol balance.",
    },
    {
      id: 4,
      icon: homeSecLogo4,
      title: "Enhances Brain Function",
      description:
        "Ghee is a natural source of Omega-3 fatty acids, known to improve memory and cognitive function.",
    },
    {
      id: 5,
      icon: homeSecLogo5,
      title: "Detoxifies the Body",
      description:
        "Acts as a carrier for Ayurvedic medicines, helping them reach deeper tissues.",
    },
    {
      id: 6,
      icon: homeSecLogo6,
      title: "Natural Skin Nourishment",
      description: "Keeps skin soft and radiant when consumed or applied.",
    },
  ];

  return (
    <div>
      <div
        className="relative w-full z-0 min-h-[250px] sm:min-h-[350px] lg:min-h-[450px]"
        style={{
          backgroundImage: `url(${bgSec7.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative z-20 h-full">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-20 h-full flex items-center pt-10">
            <div className="w-full max-w-2xl lg:max-w-6xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <h1 className="text-black font-semibold text-xl sm:text-2xl lg:text-3xl mb-2">
                  Why is A2 Gir Cow Ghee Important?
                </h1>
                <p className="text-black font-medium text-xs sm:text-sm lg:text-base max-w-2xl mx-auto">
                  In Ayurveda, ghee is not just a cooking ingredient - it's
                  medicinal food. <br /> A2 Gir Cow Ghee is valued because it.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {benefits.slice(0, 4).map((benefit) => (
                  <div
                    key={benefit.id}
                    className="bg-white border border-amber-400 rounded-lg p-3 sm:p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex flex-col">
                      {/* Icon */}
                      <div className="mb-1 sm:mb-2 lg:mb-2">
                        <img
                          src={benefit.icon.src}
                          alt={benefit.title}
                          className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 object-contain"
                        />
                      </div>

                      {/* Title */}
                      <h3 className="text-[10px] sm:text-xs lg:text-sm font-semibold text-gray-800 mb-1 sm:mb-2 leading-tight">
                        {benefit.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[8px] sm:text-[10px] lg:text-xs text-gray-600 leading-tight">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-3 sm:mt-4 lg:mt-6 mb-8">
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 lg:max-w-[540px] sm:max-w-2xl">
                  {benefits.slice(4, 6).map((benefit) => (
                    <div
                      key={benefit.id}
                      className="bg-white border border-amber-400 rounded-lg p-3.5 sm:p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="flex flex-col">
                        <div className="mb-1 sm:mb-2 lg:mb-2">
                          <img
                            src={benefit.icon.src}
                            alt={benefit.title}
                            className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 object-contain"
                          />
                        </div>
                        <h3 className="text-[10px] sm:text-xs lg:text-sm font-semibold text-gray-800 mb-1 sm:mb-2 leading-tight">
                          {benefit.title}
                        </h3>
                        <p className="text-[8px] sm:text-[10px] lg:text-xs text-gray-600 leading-tight">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner7;
