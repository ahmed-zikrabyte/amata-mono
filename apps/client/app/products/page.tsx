"use client";
import React, { useState } from "react";
import AmtRefund from "../../assets/AmtRefund.png";
import Box from "../../assets/Box.png";
import Box2 from "../../assets/Box2.png";
import Cook from "../../assets/Cook.png";
import Cow from "../../assets/cow.png";
import DiscountLogo from "../../assets/DiscountLogo.png";
import Drop from "../../assets/Drop.png";
import ProductCor1 from "../../assets/ProductCorsoul1.png";
import ProductCor2 from "../../assets/ProductCorsoul2.png";
import ProductCor3 from "../../assets/ProductCorsoul3.png";
import ProductHero from "../../assets/ProductHeroSection.png";
import Tag from "../../assets/Tag.png";
import Image from "next/image";
import TestAyu1 from "../../assets/TestmonialsAyu1.png";
import TestAyu2 from "../../assets/TestmonialsAyu2.png";
import TestAyu3 from "../../assets/TestmonialsAyu3.png";
import TestAyu4 from "../../assets/TestmonialsAyu4.png";
import topView from "../../assets/Soup-bowl.png";
import fav1 from "../../assets/Vector.png";
import fav2 from "../../assets/bowllogo.png";
import fav3 from "../../assets/muscle.png";
import fav4 from "../../assets/Grouplogo.png";
import rich1 from "../../assets/rich1.png";
import rich2 from "../../assets/rich2.png";
import rich3 from "../../assets/rich3.png";
import rich4 from "../../assets/rich4.png";
import colorful from "../../assets/colorful.png";
import bgSecCover from "../../assets/bgSecCover.png";
import bgSec from "../../assets/bgSecImg.png";
import check from "../../assets/check.png";
import Sec2Bnr1 from "../../assets/Sec2Banner1.png";
import Sec2Bnr2 from "../../assets/Sec2Banner2.png";
import Frequent from "../../assets/FAQs.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@workspace/ui/components/carousel";

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@workspace/ui/components/accordion";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Star, Minus, Plus, SquarePen, Circle } from "lucide-react";

const Page = () => {
  const productImages = [
    ProductCor1,
    ProductCor2,
    ProductCor3,
    ProductCor2,
    ProductCor1,
    ProductCor3,
  ];
  const features = [
    {
      icon: Cow,
      description:
        "Made from fresh A2 cow milk using the traditional Bilona method for a rich, golden, and aromatic ghee",
    },
    {
      icon: Cook,
      description:
        "Hand-churned with care – pure, natural, and full of traditional goodness in every spoon.",
    },
    {
      icon: Drop,
      description:
        "Slow-cooked from cultured butter to preserve the authentic taste and natural aroma of pure cow ghee.",
    },
    {
      icon: Box2,
      description:
        "A spoonful of purity – traditional Bilona ghee crafted from grass-fed cow's milk.",
    },
    {
      icon: Box,
      description:
        "Experience the golden richness of handcrafted cow ghee, made the old-fashioned way for pure perfection",
    },
  ];

  const sizes = [
    {
      size: "5 Ltr",
      discount: "25",
      original: "Rs. 10,308.00",
      discounted: "Rs. 4,673.00",
    },
    {
      size: "2 Ltr",
      discount: "15",
      original: "Rs. 5,498.00",
      discounted: "Rs. 2,474.00",
    },
    {
      size: "5 Ltr",
      discount: "25",
      original: "Rs. 2,749.00",
      discounted: "Rs. 2,474.00",
    },
    {
      size: "500 Ml",
      discount: "25",
      original: "Rs. 10,308.00",
      discounted: "Rs. 10,308.00",
    },
    {
      size: "250 Ml",
      discount: "",
      original: "Rs. 10,308.00",
      discounted: "",
    },
  ];

  interface ButtonData {
    id: number;
    title: string;
    icon: any;
    image: any;
  }
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is Gir Cow A2 Bilona Ghee?",
      answer:
        "Gir Cow A2 Bilona Ghee is a traditional, hand-churned ghee made from the milk of indigenous Gir cows. It contains the A2 beta-casein protein, known for better digestion and multiple health benefits.",
    },
    {
      question: "How is it different from regular ghee?",
      answer:
        "Unlike commercially processed ghee, Bilona ghee is prepared using the ancient Vedic 'Bilona' method -- curd is churned to extract butter, which is then slowly simmered to produce pure ghee. This process retains essential nutrients and rich aroma.",
    },
    {
      question: "Is your ghee 100% pure and free from additives?",
      answer:
        "Yes, our Gir Cow A2 Bilona Ghee is made using 100% pure milk with no preservativesc, chemicals, or adulteration -- ensuring authentic quanlity in every jar.",
    },
    {
      question: "Can lactose-intolerant individuals consume it?",
      answer:
        "In most cases, Yes, A2 Bilona Ghee has minimal lactose and casein, making it suitable for people  who are mildly lactose intolerant. However, it's always best to consult your healthcare provider.",
    },
    {
      question: "What is the shelf life of Gir Cow A2 Bilona Ghee?",
      answer:
        "It typically lasts up to 9-12 months if stored properly under recommended conditions",
    },
  ];
  const [activeImage, setActiveImage] = useState<number>(0);

  const buttonData: ButtonData[] = [
    {
      id: 0,
      title: "Rich Flavour & Aroma",
      icon: fav1,
      image: rich1,
    },
    {
      id: 1,
      title: "Traditional Bilona Method",
      icon: fav2,
      image: rich2,
    },
    {
      id: 2,
      title: "Support Easy Digestion",
      icon: fav4,
      image: rich3,
    },
    {
      id: 3,
      title: "Full Body Nourishment",
      icon: fav3,
      image: rich4,
    },
  ];

  return (
    <div>
      <div className="container mx-auto px-26 py-4">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6">Home &gt; Cow Ghee</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
          {/* Left side section */}
          <div className="relative">
            {/* Hero Section - Main Product Image */}
            <div className="top-0 sticky space-y-6">
              <Image
                src={ProductHero}
                alt="Cow Ghee Hero"
                className="w-full h-full object-cover rounded-md"
              />
              {/* Carousel Section */}
              <div className="w-full">
                <Carousel className="w-full">
                  <CarouselContent>
                    {productImages.map((img, idx) => (
                      <CarouselItem key={idx} className="basis-1/4 pl-1 ">
                        <div className="pl-1">
                          <div className="flex aspect-square items-center justify-center rounded-md">
                            <Image src={img} alt={`Cow Ghee ${idx + 1}`} />
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              </div>
            </div>
          </div>

          {/* Right Side Section */}
          <div className="relative">
            <div className="pl-5">
              <h1 className="text-3xl font-bold text-red-700 mb-4">Cow Ghee</h1>
              <div className="flex items-center space-x-2 pb-2">
                {[...Array(5)].map((item, index) => (
                  <Star
                    key={index}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="text-xl pl-5">12 Reviews</span>
              </div>
              <hr />
              <div className="space-y-4 bg-gray-100 rounded-2xl p-6 mt-4 mb-4">
                {features.map((feat, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={feat.icon}
                        alt="features-icons"
                        className="h-8 w-8"
                      />
                    </div>
                    <p className="text-sm text-gray-700 flex-1">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
              <hr />

              {/* Size Section */}
              <div className="space-y-4 mt-4 mb-4">
                <h1 className="text-sm text-gray-400 font-semibold">Size</h1>
                <div className="grid grid-cols-3 gap-4">
                  {sizes.map((item, index) => (
                    <div
                      key={index}
                      className="border border-gray-300 bg-gray-300 rounded-2xl p-3 text-center hover:bg-amber-50 cursor-pointer transition-colors"
                    >
                      <div className="relative mb-2 space-x-6">
                        <div className="font-semibold text-gray-900 text-sm text-center">
                          {item.size}
                        </div>
                        {item.discount && (
                          <div className="absolute top-0 right-0 text-[10px] text-white px-2 py-1 font-medium bg-red-600 rounded-bl-2xl rounded-tr-2xl">
                            {item.discount}% off
                          </div>
                        )}
                      </div>
                      <div className="space-y-1 mt-5">
                        {item.discounted &&
                        item.discounted !== item.original ? (
                          <div className="border p-1 rounded-xl bg-white">
                            <div className="text-sm font-bold text-gray-900">
                              {item.discounted}
                            </div>
                            <div className="text-xs text-gray-500 line-through">
                              {item.original}
                            </div>
                          </div>
                        ) : (
                          <div className="border px-3 py-1 rounded-xl bg-white">
                            <div className="text-sm font-bold text-gray-900">
                              {item.original}
                            </div>
                            <div className="text-xs text-gray-500 line-through">
                              {item.original}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <hr />
              <div className="space-y-4 mt-4 mb-3">
                <h2 className="text-sm text-gray-700">
                  Tax included.Shopping is calculated at checkout
                </h2>
                <div className="border bg-amber-100 outline-none font-light px-5 py-2 rounded-xl">
                  Only a few left in stock for: 5 Ltr - order soon!
                </div>
              </div>

              <div>
                <h2 className="text-base font-medium mb-2">Quantity</h2>
                <div className="grid grid-cols-3 gap-4">
                  {/* Quantity Selector */}
                  <div className="border border-green-900 rounded-sm">
                    <div className="flex justify-between items-center px-2 py-1 h-12">
                      <button className="border border-green-900 w-7 h-7 flex items-center justify-center hover:bg-[#613815] hover:text-white transition-colors rounded">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="mx-2">1</span>
                      <button className="border border-green-900 w-7 h-7 flex items-center justify-center hover:bg-[#613815] hover:text-white transition-colors rounded">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button className="w-full h-12 border border-green-900 text-green-900 hover:bg-[#613815] hover:text-white rounded-md transition-colors font-medium">
                    Add to Cart
                  </button>

                  {/* Check out Button */}
                  <button className="w-full h-12 border border-green-900 bg-[#613815] text-white hover:bg-green-700 rounded-md transition-colors font-medium">
                    Check out
                  </button>
                </div>
              </div>

              <div className="flex justify-center items-center gap-8 py-6 border-gray-200">
                <div className="flex flex-col items-center text-center">
                  <Image src={Tag} alt="Tag" className="w-8 h-8 mb-2" />
                  <p className="text-sm font-medium text-gray-700">
                    Extra 2% Off on Prepaid
                  </p>
                </div>

                <div className="h-20 w-px bg-gray-300" />

                <div className="flex flex-col items-center text-center">
                  <Image
                    src={DiscountLogo}
                    alt="Discount"
                    className="w-8 h-8 mb-2"
                  />
                  <p className="text-sm font-medium text-gray-700">
                    5% Off on First Order
                  </p>
                </div>

                <div className="h-20 w-px bg-gray-300" />

                <div className="flex flex-col items-center text-center">
                  <Image src={AmtRefund} alt="Cash" className="w-8 h-8 mb-2" />
                  <p className="text-sm font-extrabold text-gray-700">
                    Cash on delivery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ayurvedic Superfood Banner */}
      <div className="sticky top-0 h-80 shadow-lg transition-all duration-500 bg-gradient-to-r from-yellow-950 via-amber-800 to-orange-950 text-white">
        <h2 className="text-2xl font-bold mb-16 pt-5 text-center">
          The Golden Ayurvedic Superfood
        </h2>
        <div className="flex justify-evenly items-center">
          <div className="text-center">
            <Image
              src={TestAyu1}
              alt="Nutritional Benefits"
              className="w-28 h-28 mx-auto"
            />
            <div className="text-lg font-semibold mt-2">
              Nutritional Benefits
            </div>
          </div>
          <div className="text-center">
            <Image
              src={TestAyu4}
              alt="Ancient Tradition"
              className="w-28 h-28 mx-auto"
            />
            <div className="text-lg font-semibold mt-2">Ancient Tradition</div>
          </div>
          <div className="text-center">
            <Image
              src={TestAyu3}
              alt="Pure & Natural"
              className="w-28 h-28 mx-auto"
            />
            <div className="text-lg font-semibold mt-2">Pure & Natural</div>
          </div>
          <div className="text-center">
            <Image
              src={TestAyu2}
              alt="Culinary Versatility"
              className="w-28 h-28 mx-auto"
            />
            <div className="text-lg font-semibold mt-2">
              Culinary Versatility
            </div>
          </div>
        </div>
        {/* Cow Ghee Banner */}
        <div className="mt-14">
          <Image src={topView} alt="second banner" className="m-0" />
        </div>
        <div className="mt-8 text-center">
          <h1 className="uppercase text-2xl font-bold text-red-900">
            Why use a2 gir cow ghee?
          </h1>
          <p className="text-black font-semibold tracking-tight text-[10px]">
            A2 Gir Cow Ghee is more than just a cooking ingredient -- it's a
            natural source of nourishment and wellness. Made from the <br />{" "}
            mlik of native Gir cows using the traditional Bilona method, this
            ghee retains its authentic aroma, grainy texture, and rich <br />
            nutrients
          </p>
        </div>

        {/* Flavour Changes */}
        <div className="mt-5 w-full bg-[#613815]">
          <div className="flex justify-between items-center gap-2">
            {/* Buttons on the left side */}
            <div className="w-1/3 py-20">
              <div className="space-y-6 px-40 bg-red-950/30 rounded-tr-xl rounded-br-xl p-10">
                {buttonData.map((btn, index) => (
                  <button
                    key={btn.id}
                    onClick={() => setActiveImage(index)}
                    className={`w-60 py-2 rounded-full bg-amber-800 hover:bg-amber-700 transition-colors border border-none ${activeImage === index ? "bg-amber-700" : "bg-amber-800 hover:bg-amber-700"}`}
                  >
                    <div className="flex items-center space-x-6">
                      <Image
                        src={btn.icon}
                        alt={btn.title}
                        className="h-10 w-10 pl-5 object-contain rounded-full"
                      />
                      <h4 className="font-xl text-sm">{btn.title}</h4>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            {/* Image Section */}
            <div className="flex justify-center items-center p-5">
              <Image
                src={buttonData[activeImage]?.image}
                alt={buttonData[activeImage]?.image}
                className="object-contain w-full space-y-6"
              />
            </div>
          </div>
        </div>

        <div className="relative">
          <div>
            <Image src={colorful} alt="banner_section" className="w-full" />
            <h1 className="absolute top-40 z-50 text-white text-4xl p-20 font-bold">
              What Makes Amata <br />
              Organic Farms Ghee <br /> Unique?
            </h1>
          </div>

          <div className="absolute top-40 right-20 w-160 bg-black/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl opacity-50 bg-origin-padding-16">
            <div className="space-y-6">
              <p className="text-white text-sm leading-relaxed">
                Amata A sources milk from A2 Gir (and other native) cows. The
                milk is grass-fed, free-grazing, without hormones or artificial
                enhancers. Their ghee is made using the Bilona method (curd
                &#8594; hand-churned butter &#8594; slow cooking). This method
                is considered more authentic, giing better texture, aroma and
                preserving nutrients.
              </p>

              <br />
              <p className="text-white text-sm leading-relaxed">
                The texture is "danerdar" or grainy, rich and aromatric. This is
                desirable in desi cow ghee, reflecting traditional processing
                and good quality milk. The ghee is packaged in glass bottles,
                free from preservatives, artificial enhancers. This helps
                preserve flavor, health benefits, and avoid unwanted chemicals.
              </p>
            </div>
          </div>
        </div>
        <div
          className="relative h-96 w-full z-0"
          style={{
            backgroundImage: `url(${bgSecCover.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="relative z-40 flex h-full items-center space-x-10">
            <Image
              src={bgSec}
              alt="hero-section"
              width={600}
              height={400}
              className="w-1/2 h-72 object-contain mt-10 pl-20"
            />

            <div className="flex flex-col space-y-4 w-96 mt-10">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-white hover:bg-gray-100 hover:text-red-700 text-black py-5 px-12 w-full border-black"
                  >
                    Nutrition Information
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-md bg-white p-0 overflow-hidden">
                  <DialogHeader className="p-0 sticky top-0 z-10">
                    <DialogTitle className="text-white bg-red-800 px-6 py-4 w-full text-lg font-semibold">
                      Nutrition Information
                    </DialogTitle>
                  </DialogHeader>

                  <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
                    {/* Nutrition Table */}
                    <div className="mb-6">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-red-800">
                            <th className="text-left py-4 px-4 font-semibold text-white text-sm uppercase tracking-wide rounded-tl-lg">
                              Nutrient
                            </th>
                            <th className="text-right py-4 px-4 font-semibold text-white text-sm uppercase tracking-wide rounded-tr-lg">
                              Value
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
                            <td className="py-3 px-4 text-gray-700 font-light">
                              Energy
                            </td>
                            <td className="py-3 px-4 text-right font-light text-gray-900">
                              897 kcal
                            </td>
                          </tr>
                          <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
                            <td className="py-3 px-4 text-gray-700 font-light">
                              Total Fat
                            </td>
                            <td className="py-3 px-4 text-right font-light text-gray-900">
                              99.7 g
                            </td>
                          </tr>
                          <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
                            <td className="py-3 px-4 text-gray-700 font-light">
                              Cholesterol
                            </td>
                            <td className="py-3 px-4 text-right font-light text-gray-900">
                              256 mg
                            </td>
                          </tr>
                          <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
                            <td className="py-3 px-4 text-gray-700 font-light">
                              Protein
                            </td>
                            <td className="py-3 px-4 text-right font-light text-gray-900">
                              0 g
                            </td>
                          </tr>
                          <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
                            <td className="py-3 px-4 text-gray-700 font-light">
                              Carbohydrates
                            </td>
                            <td className="py-3 px-4 text-right font-light text-gray-900">
                              0 g
                            </td>
                          </tr>
                          <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
                            <td className="py-3 px-4 text-gray-700 font-light">
                              Sugar
                            </td>
                            <td className="py-3 px-4 text-right font-light text-gray-900">
                              0 g
                            </td>
                          </tr>
                          <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
                            <td className="py-3 px-4 text-gray-700 font-light">
                              Trans Fat
                            </td>
                            <td className="py-3 px-4 text-right font-light text-gray-900">
                              0 g
                            </td>
                          </tr>
                          <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
                            <td className="py-3 px-4 text-gray-700 font-light">
                              Vitamin A
                            </td>
                            <td className="py-3 px-4 text-right font-light text-gray-900">
                              840 µg
                            </td>
                          </tr>
                          <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
                            <td className="py-3 px-4 text-gray-700 font-light">
                              Vitamin D
                            </td>
                            <td className="py-3 px-4 text-right font-light text-gray-900">
                              13 µg
                            </td>
                          </tr>
                          <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
                            <td className="py-3 px-4 text-gray-700 font-light">
                              Vitamin E
                            </td>
                            <td className="py-3 px-4 text-right font-light text-gray-900">
                              1.8 µg
                            </td>
                          </tr>
                          <tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
                            <td className="py-3 px-4 text-gray-700 font-light">
                              Vitamin K
                            </td>
                            <td className="py-3 px-4 text-right font-light text-gray-900">
                              8.6 µg
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-white hover:bg-gray-100 text-black hover:text-red-600 py-5 px-12 w-full border-black"
                  >
                    Ingredients
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-md bg-white p-0 overflow-hidden">
                  <DialogHeader className="p-0 sticky top-0 z-10">
                    <DialogTitle className="text-white bg-red-800 px-6 py-4 w-full text-lg font-semibold">
                      Ingredients
                    </DialogTitle>
                  </DialogHeader>

                  <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
                    {/* Nutrition Table */}
                    <div className="mb-6">
                      <div className="border p-4 rounded-xl bg-gray-100 w-full">
                        <p className="mb-2 text-[10px] font-medium text-black">
                          Made from 100% pure A2 Gir Cow milk using the
                          traditional Bilona method. Free from preservative,
                          additives, and artficial flavours for authentic
                          purity.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-center space-x-3">
                            <Image
                              src={check}
                              alt="check"
                              className="w-5 h-5"
                            />
                            <p className="text-[12px] font-medium text-black">
                              100% A2 Gir Cow Milk -- sourced from indigenous
                              Gir cows
                            </p>
                          </li>
                          <li className="flex items-center space-x-3">
                            <Image
                              src={check}
                              alt="check"
                              className="w-5 h-5"
                            />
                            <p className="text-[12px] font-medium text-black">
                              Cultured Curd -- prepared traditional for
                              hand-churning
                            </p>
                          </li>
                          <li className="flex items-center space-x-3">
                            <Image
                              src={check}
                              alt="check"
                              className="w-5 h-5"
                            />
                            <p className="text-[12px] font-medium text-black">
                              No Preservatives, Additives, or Artificial
                              Flavours
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-white hover:bg-gray-100 text-black hover:text-red-600 py-3 px-12 w-full border-black"
                  >
                    Suggested Use
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-md bg-white p-0 overflow-hidden">
                  <DialogHeader className="p-0 sticky top-0 z-10">
                    <DialogTitle className="text-white bg-red-800 px-6 py-4 w-full text-lg font-semibold">
                      Suggested Use
                    </DialogTitle>
                  </DialogHeader>

                  <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
                    {/* Nutrition Table */}
                    <div className="mb-6">
                      <div className="border p-6 rounded-xl bg-gray-100 w-full">
                        <p className="mb-2 text-[9px] font-semibold text-black">
                          It can also be used for skin care, hair nourishment,
                          and Ayurvedic rituals for holistic wellness. <br />{" "}
                          <br />
                          Enjoy AsmitA Organic farms' A2 Gir Cow Ghee as a
                          cooking medium, topping for rotis and rice, or a
                          natural booster in milk and herbal drinks.
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-white hover:bg-gray-100 text-black hover:text-red-600 py-3 px-12 w-full border-black"
                  >
                    Storage Information
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-md bg-white p-0 overflow-hidden">
                  <DialogHeader className="p-0 sticky top-0 z-10">
                    <DialogTitle className="text-white bg-red-800 px-6 py-4 w-full text-lg font-semibold">
                      Storage Information
                    </DialogTitle>
                  </DialogHeader>

                  <div className="p-6">
                    <div className="border p-6 rounded-xl bg-gray-100 w-full">
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <Circle className="w-2 h-2 fill-black mt-2" />
                          <p className="text-[13px] font-normal text-black">
                            Store in a cool, dry place, away from direct
                            sunlight and moisture.
                          </p>
                        </li>
                        <li className="flex items-start gap-3">
                          <Circle className="w-2 h-2 fill-black mt-2" />
                          <p className="text-[13px] font-normal text-black">
                            Always use a clean, dry spoon to maintain purity and
                            freshness.
                          </p>
                        </li>
                        <li className="flex items-start gap-3">
                          <Circle className="w-2 h-2 fill-black mt-2" />
                          <p className="text-[13px] font-normal text-black">
                            No refrigeration required -- the ghee stays fresh
                            naturally.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-white hover:bg-gray-100 hover:text-red-600 text-black py-3 px-12 w-full border-black"
                  >
                    Who Should Use this ?
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-md bg-white p-0 overflow-hidden">
                  <DialogHeader className="p-0 sticky top-0 z-10">
                    <DialogTitle className="text-white bg-red-800 px-6 py-4 w-full text-lg font-semibold">
                      Who Should Use this ?
                    </DialogTitle>
                  </DialogHeader>

                  <div className="p-6">
                    <div className="border p-6 rounded-xl bg-gray-100 w-full">
                      <p className="text-[10px] font-medium text-black">
                        A2 Gir Cow Ghee is ideal for everyone looking for pure,
                        nutritious, and traditional goodness in their daily
                        routine. <br /> <br />
                        Perfect for families, health-conscious individuals,
                        fitness enthusiasts, children, and the elderly--anyone
                        who wants to support better digestion, immunity, and
                        overall wellness naturallt.
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div
          className="relative min-h-96 w-full z-0 py-16"
          style={{
            backgroundColor: "#f2f2f2",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="container mx-auto px-4">
            {/* Heading */}
            <div className="relative z-40 flex h-full items-center justify-center mb-8">
              <h1 className="text-[#613815] uppercase text-3xl font-bold text-center">
                Not All Ghee Is Created Equal
              </h1>
            </div>

            {/* Comparison Table */}
            <div className="relative z-40 bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#613815]">
                    <th className="w-2/5"></th>
                    <th className="w-1/5 py-4 px-4 text-white font-semibold text-center border-l border-white/20">
                      AOF A2 Gir Cow Ghee
                    </th>
                    <th className="w-1/5 py-4 px-4 text-white font-semibold text-center border-l border-white/20">
                      Regular Ghee (A1 Milk)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">
                      Made from Indigenous Gir Cow Milk
                    </td>
                    <td className="py-4 px-4 text-center border-l bg-red-800">
                      <div className="flex justify-center">
                        <span className="text-white font-bold text-xl">✓</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center border-gray-200">
                      <div className="flex justify-center">
                        <span className="text-red-600 font-bold text-xl">
                          ✗
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">
                      Prepared Using Traditional Bilona Method
                    </td>
                    <td className="py-4 px-4 text-center border-l bg-red-800">
                      <div className="flex justify-center">
                        <span className="text-white font-bold text-xl">✓</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center border-l border-gray-200">
                      <div className="flex justify-center">
                        <span className="text-red-600 font-bold text-xl">
                          ✗
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">
                      Easier to Digest (A2 Beta-Casein)
                    </td>
                    <td className="py-4 px-4 text-center border-l bg-red-800">
                      <div className="flex justify-center">
                        <span className="text-white font-bold text-xl">✓</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center border-l border-gray-200">
                      <div className="flex justify-center">
                        <span className="text-red-600 font-bold text-xl">
                          ✗
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">
                      Made from curd, not cream
                    </td>
                    <td className="py-4 px-4 text-center border-l bg-red-800">
                      <div className="flex justify-center">
                        <span className="text-white font-bold text-xl">✓</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center border-l border-gray-200">
                      <div className="flex justify-center">
                        <span className="text-red-600 font-bold text-xl">
                          ✗
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">
                      Naturally Aromatic & Flavourful
                    </td>
                    <td className="py-4 px-4 text-center border-l bg-red-800">
                      <div className="flex justify-center">
                        <span className="text-white font-bold text-xl">✓</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center border-l border-gray-200">
                      <div className="flex justify-center">
                        <span className="text-red-600 font-bold text-xl">
                          ✗
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-700 font-medium">
                      No Additives or Preservatives
                    </td>
                    <td className="py-4 px-4 text-center border-l bg-red-800">
                      <div className="flex justify-center">
                        <span className="text-white font-bold text-xl">✓</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center border-l border-gray-200">
                      <div className="flex justify-center">
                        <span className="text-red-600 font-bold text-xl">
                          ✗
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div
          className="relative min-h-96 w-full z-0 py-24"
          style={{
            backgroundColor: "#ffffff",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="relative z-40 flex h-full items-center justify-center mb-10">
            <Image
              src={Sec2Bnr2}
              alt="Banner-SEction"
              className="w-full max-w-lg ml-100 z-50"
            />
            <Image
              src={Sec2Bnr1}
              alt="Banner-Section"
              className="w-full max-w-2xl mr-90 absolute z-20"
            />
          </div>
        </div>

        <div
          className="relative max-h-2xl w-full z-0 py-24"
          style={{
            backgroundImage: `url(${Frequent.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="relative z-40 flex h-full items-start justify-between px-20 space-x-10">
            {/* Left side */}
            <div className="ml-20 flex-shrink-0">
              <h1 className="text-5xl font-semibold tracking-wide text-white">
                Frequently Asked
              </h1>
              <h1 className="text-5xl font-semibold tracking-wide text-white">
                Questions About
              </h1>
              <h1 className="text-5xl font-semibold tracking-wide text-white">
                Product
              </h1>

              <button className="border-none py-3 px-10 text-sm font-normal mt-8 cursor-pointer bg-white text-green-900 hover:bg-green-800 hover:text-white transition-colors rounded-md">
                View all
              </button>
            </div>

            {/* Right Side - FAQ Dropdowns */}
            <div className="w-1/2 flex-grow">
              <div className="max-h-[700px] overflow-y-auto space-y-3 pr-2">
                {faqs.map((feq, index) => (
                  <div
                    key={index}
                    className="rounded-xl bg-white/20 backdrop-blur-sm border-none"
                  >
                    <div
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-white/10 transition-colors w-full"
                      onClick={() =>
                        setOpenIndex(openIndex === index ? -1 : index)
                      }
                    >
                      <span className="font-medium text-white text-[12px] text-left">
                        {feq.question}
                      </span>
                      <span
                        className={`text-white transition-transform duration-300 ${openIndex === index ? "rotate-90" : ""}`}
                      >
                        ▼
                      </span>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-32" : "max-h-0"}`}
                    >
                      <div className="p-4">
                        <p className="text-white/90 text-[13px] leading-relaxed">
                          {feq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="relative min-h-96 w-full z-0 py-20 px-20"
          style={{
            backgroundColor: "#fffff6",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }} 
        >
          <div className="relative">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl text-black font-bold">
                Customer Reviews
              </h1>
              <div className="flex justify-center items-center gap-3">
                <SquarePen className="w-5 h-5 text-black cursor-pointer"/>
                <span className="text-sm text-black">Write a Review</span>
              </div>
              
            </div>
            <br />
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
