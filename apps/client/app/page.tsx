import React from 'react'
import HeroSection from '../components/home/HeroSection'
import Banner4 from '../components/home/Banners/Banner4'
import Banner5 from '../components/home/Banners/Banner5'
import Banner6 from '../components/home/Banners/Banner6'
import Banner7 from '../components/home/Banners/Banner7'
import Banner8 from '../components/home/Banners/Banner8'
import Banner9 from '../components/home/Banners/Banner9'
import Banner10 from '../components/home/Banners/Banner10'
import Banner11 from '../components/home/Banners/Banner11'
import TestimonialCustomers from '../components/global/testimonial-customers'
const page = () => {
  return (
    <div>
      <HeroSection/>
      <Banner4 />
      <Banner5 />
      <Banner6 />
      <Banner7 />
      <Banner8 />
      <Banner9 />
      <Banner10 />
      <Banner11 />
      <div className="px-5 md:px-20 lg:px-24 py-8">
        <TestimonialCustomers />
      </div>
    </div>
  )
}

export default page