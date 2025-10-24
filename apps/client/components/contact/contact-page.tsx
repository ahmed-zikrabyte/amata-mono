import React from "react";
import BannerImg from "../../assets/images/banners/contact-banner.png";
import InstaLogo from "../../assets/instaLogo.png";
import FacebookLogo from "../../assets/fbLogo.png";
import Image from "next/image";
import { Label } from "../../../../packages/ui/src/components/label";
import { Input } from "../../../../packages/ui/src/components/input";
import { Textarea } from "../../../../packages/ui/src/components/textarea";
import { Button } from "../../../../packages/ui/src/components/button";
import FaqSection from "./faq-section";

const ContactPage = () => {
  return (
    <div>
      <div
        className="flex items-center justify-center h-96"
        style={{
          backgroundImage: `url(${BannerImg.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="w-1/3 text-center space-y-3">
          <p className="text-3xl text-amber-900 font-semibold">
            Let's Stay Connected
          </p>
          <p className="text-white">
            Whether you want to know more about our ghee, your order, or our
            process — we’re just a message away. We love connecting with people
            who care about purity as much as we do.
          </p>
        </div>
      </div>

      <div className="px-6 lg:px-20 xl:px-24 py-6 lg:py-18">
        <div>
          <h3 className="text-5xl font-semibold text-amber-950">
            Get in touch
          </h3>
        </div>
        <div className="min-h-[560px] w-full flex flex-col md:flex-row">
          {/* Left section: form */}
          <div className="w-full md:w-1/2 lg:w-2/3 flex justify-center md:pl-10 md:pr-15">
            <form className="w-full max-w-2xl flex flex-col space-y-3 py-6 md:py-10">
              {/* Full Name */}
              <div className="flex flex-col lg:flex-row space-y-3 lg:space-x-3">
                <div className="flex flex-col w-full space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    className="h-11 md:h-12"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col w-full space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="h-11 md:h-12"
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row space-y-3 lg:space-x-3">
                {/* Phone */}
                <div className="flex flex-col w-full space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="h-11 md:h-12"
                  />
                </div>

                {/* Subject */}
                <div className="flex flex-col w-full space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Enter subject"
                    className="h-11 md:h-12"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col w-full space-y-2 md:col-span-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Write your message here..."
                  className="min-h-[120px] md:min-h-[150px]"
                />
              </div>

              <Button className="col-span-2 md:h-12">Submit the Request</Button>
            </form>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-auto w-0.5 bg-gradient-to-b from-white via-gray-600 to-white" />

          {/* Right section */}
          <div className="w-full md:w-1/2 lg:w-1/3 h-full p-5 md:py-18 md:px-20 space-y-10 flex flex-col justify-between">
            <div className="space-y-5">
              <p className="text-2xl font-medium text-amber-950">Visit Us:</p>
              <p>
                Amata Farms (Manufacturing Unit), Jamadoba, Dhanbad, Jharkhand,
                India
              </p>
            </div>

            <div className="space-y-5">
              <p className="text-2xl font-medium text-amber-950">
                Customer Support:
              </p>
              <div>
                <p>Call/Whatsapp: +91 9XXXXXXXXX</p>
                <p>Email: support@amatafarms.in</p>
                <p>Available: Mon-Sat | 9AM - 6PM</p>
              </div>
            </div>

            <div className="space-y-5">
              <p className="text-2xl font-medium text-amber-950">Follow us:</p>
              <div className="flex items-center justify-between w-20">
                <div className="relative size-6">
                  <Image src={InstaLogo.src} fill alt="insta" />
                </div>
                <div className="relative size-6">
                  <Image src={FacebookLogo.src} fill alt="fb" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[500px] rounded-2xl overflow-hidden px-6 py-10 lg:px-20 xl:px-24">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497699.83978388057!2d77.0077556054053!3d12.953926603275141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1761310993924!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      
      <FaqSection />
    </div>
  );
};

export default ContactPage;
