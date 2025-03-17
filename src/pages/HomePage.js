import React, { useEffect, useState } from 'react'
import Navbar from '../features/nav/Navbar'
// import { Counter } from '../features/counter/Counter'
import Hero from '../features/hero-section/Hero'
import Trust from '../features/trust-section/Trust'
import Review from '../features/review-section/Review'
import CorePrincipleSection from '../features/core-principle-section/CorePrincipleSection'
import RxBlueprint from '../features/rx-section/RxBlueprint'
import Product from '../features/product-list/Product'
import GrowthTransition from '../features/growth-transition/GrowthTransition'
import ShoppingFeature from '../features/shopping-feature/ShoppingFeature'
import BeforeAfter from '../features/before-after/BeforeAfter'
import Media from '../features/media/Media'
// import WhyTrust from '../features/why-trust/WhyTrust'
import Slider from '../features/video-slider/SliderImage'
import Footer from '../features/footer/Footer'
import WhyTrustHairCare from '../features/why-trust-hair-care/WhyTrustHairCare'
import HairAnalysis from '../features/hair-analysis/HairAnalysis'
import HairTestPage from '../pages/HairTestPage'
// import Login from '../features/login/Login'
// import SignUp from '../features/signup/SignUp'
// import ProductPage from './ProductPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AboutUsEdit from '../features/admin-dashboard/manage-website/AboutUsEdit'
import OurSpecialistEdit from '../features/admin-dashboard/manage-website/OurSpecialistEdit'
import Analysis from '../features/doctor-dashboard/Analysis'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import DoctorHomepage from '../features/DoctorHomePage'
function HomePage(props) {

  let {cart,
    setCart} = props;

  useEffect(() => {
    if (props?.setTitle) props?.setTitle(window.location.pathname)
  }, [])

  const content = useSelector((state) => state.content.home);

  useEffect(() => {
    console.log("ojwoejorf")
    // Check if the script is already present
    console.log('AiSensy Widget loaded',document.getElementById('aisensy-wa-widget'));
    if (!document.getElementById('aisensy-wa-widget')) {
      // Create the script element
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = "https://d3mkw6s8thqya7.cloudfront.net/integration-plugin.js"; // Replace with the actual script URL
      script.id = 'aisensy-wa-widget';
      script.async = true;

      // Add the widget-id as an attribute if necessary
      script.setAttribute('widget-id', 'F19ELA'); // Replace with the actual widget ID

      // Append the script to the document body or head
      document.body.appendChild(script);

      // Optional: Initialize the widget or handle any additional setup
      script.onload = () => {
        console.log('AiSensy Widget loaded');
        // You can initialize or configure the widget here if needed
      };
    }
  }, []);

  

  return (

    <Navbar>
           <Helmet>
        <link rel="canonical" href="https://www.hairsncares.com" />
      </Helmet>
      {content ? <>
        <Hero />
        <Trust />
        <Review />
        <WhyTrustHairCare />
        <Media />
        {/* <DoctorHomepage /> */}
        <CorePrincipleSection />
        <HairAnalysis />
        <GrowthTransition />
        <RxBlueprint />
        <Product cart={cart} setCart={setCart}/>
        <ShoppingFeature />
        <BeforeAfter />

        <Slider />
        {/* <HairTestPage/> */}

        {/* <SignUp/> */}
        <Footer />
        {/* <AboutUsEdit/> */}
        {/* <OurSpecialistEdit/> */}
        <ToastContainer position="bottom-right" />
        {/* <Login/> */}
        {/* <WhyTrust/> */}

      </> : <></>}

    </Navbar>
  )
}

export default HomePage
