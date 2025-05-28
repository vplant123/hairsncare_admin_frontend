// import React from 'react'
// import './Hero.css'
// function Hero() {
//   return (
//    <div className='wrapper'>
//     <div className='hero-container container'>
//         <div className='hero-heading'>
//             <span>WITNESS A REMARKABLE</span>
//             <h2>HAIR GROWTH IN</h2>
//             <h1 >JUST FEW MONTHS</h1>
//             <div className='hero-btn'>
//                 <button className='btn primary'>TAKE HAIR TEST</button>
//                 <button className='btn'>BOOK AN APPOINTMENT </button>
//             </div>
//         </div>
//         <div style={{height:"100%"}}><img alt='hair' className='hero-image' src='https://hairsncares.com/uploads/admprhero-banner.png'></img></div>
//     </div>
//    </div>
//   )
// }

// export default Hero
import React, { useEffect, useState } from 'react';
import 'animate.css';
import './Hero.css';
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import useDivInView from '../../hooks/useDivInView';
import { HashLink } from 'react-router-hash-link';


const HeroSection = ({ selectedHero, id, title, subtitle, imageSrc, navigate }) => {
  console.log("mskmeo", { selectedHero, id, title, subtitle, imageSrc, navigate }, selectedHero == id)

  const [ref1, control1] = useDivInView();
  const [headingRef, headingControl] = useDivInView();
  const [heroButtonRef, heroButtonControl] = useDivInView();
  const [heroImageRef, heroImageControl] = useDivInView();

  return (
    <motion.div
      className={`hero-section ${selectedHero == id ? 'active1' : ''}`}
      ref={ref1}
      variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
      initial="hidden"
      animate={control1}
      transition={{ duration: 0.8 }}
    >
      <div className='wrapper'>
        <div className='hero-container container' style={{ height: "600px" }}>
          <div className='hero-content' style={{ height: "100%" }}>
            <motion.div
              className='hero-heading'
              ref={headingRef}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              initial="hidden"
              animate={headingControl}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <span className={`hero-title-1 ${selectedHero == 2 ? "second-image-t1" : ""}`}>{title}</span>
              <h2  className={`hero-des-1 ${selectedHero == 2 ? "second-image-t2" : ""}`}>{subtitle}</h2>
              <motion.div
                ref={heroButtonRef}
                variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                className="hero-btn"
                initial="hidden"
                animate={heroButtonControl}
                transition={{ duration: 1, delay: 1 }}
              >
                <button onClick={() => navigate('/hair-test')} className="btn11 primary">TAKE HAIR TEST</button>
                <button className="btn"><HashLink smooth to='/book/#section3' style={{    textDecoration: "none",
    color: "black"}}> BOOK AN APPOINTMENT </HashLink></button>
              </motion.div>
            </motion.div>
            <motion.div
              className="hero-image-wrapper"
              ref={heroImageRef}
              variants={{ hidden: { opacity: 0, x: 100 }, visible: { opacity: 1, x: 0 } }}
              initial="hidden"
              animate={heroImageControl}
              transition={{ duration: 1, delay: 1.5 }}
            >
              
              <img alt='hair' className={`hero-image ${selectedHero == 2 ? "second-image" : ""}`} src={imageSrc} style={{ maxWidth: "80%" }} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


const Hero = () => {
  const navigate = useNavigate();
  const [selectedHero, setSelectedHero] = useState(1);

  const content = useSelector((state) => state.content.home);
  console.log("jojkeor", content?.section1?.data)

  // useEffect(() => {
  //   setSelectedHero(content?.section1?.data?.[0]?._id)
  // }, [content])


  useEffect(() => {
    let timeout = setTimeout(
      () =>
        setSelectedHero((prevIndex) =>
          prevIndex+1 == 3 ? 1 : prevIndex + 1,
        ),
      5000,
    );

    return () => {
      clearTimeout(timeout);
    };
  }, [selectedHero]);

  const heroSections = [
    {
      id: 1,
      title: "Witness a Remarkable",
      subtitle: "Hair Growth In Just Few Months",
      imageSrc: '/uploads/admprhero-banner.png'
    },
    {
      id: 2,
      title: "Unveil the power of Modern Medicine with AI-driven hair diagnostic tool to unlock effective Hair Growth secrets",
      subtitle: "Witness remarkable outcomes in just few months!",
      imageSrc: '/uploads/admprhero-banner-two.png'
    }
  ];

  return (
    <div className='icon-wrap'>
      <div className='main-hero'>
        {content?.section1?.data?.map((section,indx) => (
          <HeroSection
            key={indx+1}
            selectedHero={selectedHero}
            id={indx+1}
            title={section?.title}
            subtitle={section?.description}
            imageSrc={section?.image}
            navigate={navigate}
          />
        ))}
        <div className='radio-buttons3'>
          <ul className="slick-dots" role="tablist" style={{ marginTop: "30px" }}>
            {content?.section1?.data?.map((section,indx )=> (
              <li
                key={`${selectedHero}-${indx+1}`}
                className={selectedHero === indx+1 ? "slick-active" : ""}
                onClick={() => setSelectedHero(indx+1)}
              >
                <button type="button" role="button">{indx+1}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='icon-abs'>
        {content?.section1?.socialImg?.map((e, ind) => {
          return (
            <div onClick={() => {
              if (ind == 0) {
                window.open("https://www.facebook.com/profile.php?id=61558302628092")
              }
              if (ind == 1) {
                window.open("https://wa.link/pcousx")
              }
              if (ind == 2) {
                window.open("https://www.youtube.com/@Hairsncares")
              }
              if (ind == 3) {
                window.open("https://www.instagram.com/hairsncares/?hl=en")
              }
              if (ind == 4) {
                window.open("https://x.com/hairsncare")
              }
            }} style={{ cursor: "pointer" }}>
              <img src={e} style={{ width: "25px", height: "25px" }} />
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Hero;
