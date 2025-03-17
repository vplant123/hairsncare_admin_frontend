import React from "react";
import "./About.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LeftAnimatedDiv, RightAnimatedDiv, ZoomInDiv } from "../../componet/Animation";

export default function About() {
  const navigate = useNavigate();
  const home = useSelector((state) => state.content.home);

  const content = useSelector((state) => state.content.aboutUs);

  return (
    <>
      <div className="about-us">
        <div className="container">
          <div className="about-us-container">
            <LeftAnimatedDiv className="">
              <h1 className="contect-us-heading " >{content?.section1?.title}</h1>
            </LeftAnimatedDiv>
            <ZoomInDiv>
              <img alt='hair' src={content?.section1?.image} />
            </ZoomInDiv>
            <RightAnimatedDiv>
              {/* <h4 className="sub-had-2">{content?.section1?.image}</h4> */}
              <h2 className="cont-head-2">{content?.section1?.description}</h2>
              
            </RightAnimatedDiv>
            
          </div>
          <div className='icon-abs' style={{top : "35%"}}>
        {home?.section1?.socialImg?.map((e, ind) => {
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
        
        
      </div>
      <div className="about-section-2 container">
        <LeftAnimatedDiv className="item-2">
          <h1>
            {content?.section2?.title}
          </h1>
          <span>
            {content?.section2?.shortDesc}
          </span>
          <p>
            {content?.section2?.longDesc}
          </p>
        </LeftAnimatedDiv>
        <RightAnimatedDiv className="image-2 ">
          <img alt='hair' src={content?.section2?.img} />
        </RightAnimatedDiv>
      </div>
      <div className="section-3-wrapper">
        <div className="container">
          <div>
            <h1 className="content-3-heading">{content?.section3?.title}</h1>
          </div>
          <div className="content-3">
            <ZoomInDiv className="content-container ">
              <img alt='hair' src={content?.section3?.img} />
            </ZoomInDiv>
            <RightAnimatedDiv className="content-container-2 ">

              {content?.section3?.data?.map((e, ind) => {
                return (
                  <div className="content-item">
                    <span>0{ind + 1}</span>
                    <div>
                      <p className="content-sub-item">
                        {e?.title}
                      </p>
                      <p>
                        {e?.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </RightAnimatedDiv>
          </div>
        </div>
      </div>
      <div className="about-container-3 container">
        <LeftAnimatedDiv className="container-3-item ">
          <img alt='hair' src={content?.section4?.img} />
        </LeftAnimatedDiv>
        <LeftAnimatedDiv className="container-3-item">
          <h1>{content?.section4?.title}</h1>
          <p>
            {content?.section4?.desc}
          </p>
        </LeftAnimatedDiv>
      </div>
      <div className="about-container-4 container">
        <div className="head-2-container">
          <h1 className="contect-us-heading-2">
            {content?.section5?.title}
          </h1>
        </div>
        <div className="about-4-items">

          {content?.section5?.data?.map((e) => {
            return (
              <RightAnimatedDiv className="items-con">
                <div className="circle-4">
                  <img alt='hair' src={e?.img} />
                </div>
                <div className="circle-conta">
                  <button className="circle-4">{e?.title}</button>
                </div>
                <p>
                  {e?.desc}
                </p>
              </RightAnimatedDiv>
            )
          })}

        </div>
        <div className="hero-btn-about">
          <button
            onClick={() => navigate("/hair-test")}
            className="btn primary"
          >
            TAKE AN ONLINE HAIR TEST
          </button>
        </div>
      </div>
      <div className="our-commitment-container">
        <div className="container">
          <h1>{content?.section6?.title}</h1>
          <ZoomInDiv>
            {content?.section6?.desc}
          </ZoomInDiv>
          {/* <p>
            We are inspired by the success stories of our clients who have
            regained their confidence and transformed their lives through our
            comprehensive hair care programs. Hairsncares is dedicated to being
            the trusted companion on your path to healthier, fuller hair.
          </p>
          <p>
            Welcome to Hairsncares, where your hair health is our top priority.
            Together, let's unlock the secrets to radiant, thriving hair and
            embrace a life filled with confidence and vitality.
          </p> */}
          <div className="commit-con">

            {
              content?.section6?.data?.map((e) => {
                return (
                  <LeftAnimatedDiv className="commit-item">
                    <div>
                      <div className="commit-sub">
                        <img alt='hair' src={e?.icon} />
                        <h2>{e?.title}</h2>
                      </div>
                      <p>
                        {e?.desc}
                      </p>
                    </div>
                  </LeftAnimatedDiv>
                )
              })
            }

          </div>
          <div className="hero-btn-about">
            <button
              onClick={() => navigate("/shop")}
              className="btn primary"
            >
              VIEW PRODUCT RANGE
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
