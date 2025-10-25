"use client"

import React from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@workspace/ui/components/accordion"

const FaqSection = () => {
  return (
    <section className="w-full bg-gray-50 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-10 md:gap-16">
        {/* Left Section */}
        <div className="md:w-1/3">
          <p className="text-sm font-medium text-gray-500 mb-3">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight">
            Frequently <br /> Asked <br /> Questions.
          </h2>
        </div>

        {/* Right Section */}
        <div className="flex-1">
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="item-1" className="border-b border-gray-300">
              <AccordionTrigger className="text-left py-5 text-gray-900 text-base font-medium hover:no-underline">
                How can I place an order?
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-gray-600 text-sm leading-relaxed">
                You can place an order through our website by adding your desired products to the cart and proceeding to checkout.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-b border-gray-300">
              <AccordionTrigger className="text-left py-5 text-gray-900 text-base font-medium hover:no-underline">
                Do you deliver across India?
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-gray-600 text-sm leading-relaxed">
                Yes, we deliver our products to most locations across India through our trusted courier partners.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-b border-gray-300">
              <AccordionTrigger className="text-left py-5 text-gray-900 text-base font-medium hover:no-underline">
                How long does delivery take?
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-gray-600 text-sm leading-relaxed">
                Delivery usually takes 3–7 business days depending on your location.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-b border-gray-300">
              <AccordionTrigger className="text-left py-5 text-gray-900 text-base font-medium hover:no-underline">
                What if I receive a damaged product?
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-gray-600 text-sm leading-relaxed">
                If your product arrives damaged, please contact our support team within 24 hours for a replacement or refund.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-b border-gray-300">
              <AccordionTrigger className="text-left py-5 text-gray-900 text-base font-medium hover:no-underline">
                Are your products 100% organic?
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-gray-600 text-sm leading-relaxed">
                Yes, all our products are made from 100% organic and natural ingredients.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}

export default FaqSection
