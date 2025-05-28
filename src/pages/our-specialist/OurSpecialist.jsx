import React, { useEffect, useState } from "react";
import "./OurSpecialist.css";
import Faq from "./faq/Faq";
import { MdClose } from "react-icons/md";
import BASE_URL from "../../Config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  LeftAnimatedDiv,
  RightAnimatedDiv,
  ZoomInDiv,
} from "../../componet/Animation";
import { TRANSITION } from "../../hooks/useDivInView";

export default function OurSpecialist() {
  const [data, setData] = useState(false);
  const [doctors, setDoctors] = useState([]);

  const content = useSelector((state) => state.content.specialist);

  // let doctors = [
  //   {
  //     src: "/uploads/admprteam-pic1.png",
  //     name: "Dr. Sudhir Singh",
  //     degree: "MBBS, MD",
  //     decrip:
  //       "Dr. Sudhir is a member of IADVL (Indian Association of Dermatologists, Venereologists)",
  //     subDeg: "Trichologist, Dermatologist",
  //     exp: "15 Years",
  //     lang  : "English, Hindi, Marathi",
  //     expertise: [
  //       "Trichology",
  //       "Skin & Laser",
  //       "Cosmetology",
  //       "Trichology",
  //       "Dermato surgery",
  //       "Dermatology",
  //     ],
  //     qualification:
  //       "MBBS from Government Medical College and Hospital, Nagpur MD from RIMS, Ranchi",
  //   },
  //   {
  //     src: "/uploads/admprteam-pic2.png",
  //     name: "Dr. Ram Tainwala",
  //     degree: "MBBS",
  //     decrip:
  //       "Dr. Ram is a member of IIADVL (Indian Association of Dermatologists, Venereologists)",
  //       subDeg : "Dermatologist, Cosmetologist & Trichologist",
  //       exp : "15 Years",
  //       lang  : "English, Hindi, Marathi",
  //       expertise : ["Skin Cosmetolgy & Laser",
  //         "Trichology",
  //         "Dermatology",
  //         "Dermato Surgery",
  //         ],
  //       qualification : "MBBS from Terna Medical College in 2004 MD from D. Y Patil Medical College, Pune in 2010"
  //   },
  //   {
  //     src: "/uploads/team-pic3.png",
  //     name: "Dr. Jyoti Agarkar",
  //     degree: "MBBS, MD, DDV, PGDHA, D.N.Y.S",
  //     decrip:
  //       "Dr. Jyoti Agarkar is a member of IIADVL (Indian Association of Dermatologists, Venereologists)",
  //       subDeg : "Dermatologist, Cosmetologist & Trichologist",
  //       lang  : "English, Hindi, Marathi",
  //       exp : "15 Years",
  //       expertise : ["Skin Cosmetolgy & Laser",
  //         "Trichology",
  //         "Dermatology",
  //         "Dermato Surgery",
  //         ],
  //       qualification : "MBBS from D. Y Patil Medical College, Pune in 2005 DDV from K J Somaiyya Medical College, Mumbai in 2009 MD from K J Somaiyya Medical College, Mumbai in 2010."
  //   },
  //   {
  //     src: "/uploads/team-pic4.png",
  //     name: "Dr. Sunita Patel",
  //     degree: "MBBS, MD, DDV",
  //     decrip:
  //       "Dr. Sunita is a member of IADVL (Indian Association of Dermatologists, Venereologists)",
  //       subDeg : "Dermatologist, Cosmetologist & Trichologist",
  //       lang  : "English, Hindi, Marathi",
  //       exp : "15 Years",
  //       expertise : ["Trichology",
  //         "Skin Cosmetology & Laser ",
  //         "Dermato surgery",
  //         "Dermatology",
  //         ],
  //       qualification : "MBBS from Terna Medical College in 2006  DDV from K J Somaiyya Medical College, Mumbai in 2010 MD USAIM  2011."
  //   },
  //   {
  //     src: "/uploads/team-pic5.png",
  //     name: "Dr. Poorti Kolge",
  //     lang  : "English, Hindi, Marathi",
  //     degree: "MBBS, DDV",
  //     decrip:
  //       "Dr. Poorti is a member of IADVL (Indian Association of Dermatologists, Venereologists)",
  //       subDeg : "Trichologist, Dermatologist",
  //       exp : "15 Years",
  //       expertise : ["Trichology",
  //         "Skin & Laser",
  //         "Trichology",
  //         "Dermato surgery",
  //         "Dermatology",
  //         ],
  //       qualification : "MBBS from GSMC College & KEM Hospital, Mumbai DDV from Grant Medical College & J.J. Hospital, Mumbai"
  //   },
  //   {
  //     src: "/uploads/team-pic6.png",
  //     name: "Dr. Pradeep Mishra",
  //     lang  : "English, Hindi",
  //     degree: "BAMS, FCAS",
  //     decrip:
  //       "Dr. Pradeep is a member of IADVL (Indian Association of Dermatologists & Venreologists in India)",
  //       subDeg : "Trichologist, Hair Transplant Surgeon",
  //       exp : "5 Years",
  //       expertise : ["Hair Transplant Surgeon",
  //         "Trichology",
  //         "Dermato Surgery",
  //         "TricholoSkin & Cosmetologygy",
  //         "Dermato surgery",
  //         "Dermatology",
  //         ],
  //       qualification : "BAMS from KGMP Medical College and Hospital, Mumbai in 2018 FCAS from Indian Institute of Cosmetology and Hair Transplant, Mumbai in 2019."
  //   },
  //   {
  //     src: "/uploads/team-pic7.png",
  //     name: "Dr. Sagar Vyas",
  //     degree: "BHMS, FCAS",
  //     lang  : " English, Hindi, Gujarati, Marathi",
  //     decrip:
  //       "Dr. Sagar Vyas is a member of IADVL (Indian Association of Dermatologists & Venreologists in India)",
  //       subDeg : "Trichologist, Hair Transplant Surgeon",
  //       exp : "15 Years",
  //       expertise : ["Trichology",
  //         "Hair Transplant Surgeon",
  //         "Dermato Surgery",
  //         "Cosmetology",
  //         ],
  //       qualification : "BHMS from VHMC Medical College, Mumbai in 2016 FCAS from Indian Institute of Cosmetology and Hair Transplant, Mumbai in 2019"
  //   },
  //   {
  //     src: "/uploads/team-pic9.png",
  //     name: "Dr. Trupti K",
  //     lang  : "English, Hindi, Marathi",
  //     degree: "",
  //     decrip:
  //       "Life member if IDA",
  //       subDeg : "Nutritionalist, Dietician",
  //       exp : "15 Years",
  //       expertise : ["Weight Loss / Weight Gain",
  //         "Fitness Diet",
  //         "Therapeutic Diet",
  //         "Fertility Diet",
  //         "Detox (Cleansing) Diet",
  //         "CDE",
  //         "Certified Nutrigenomics Counsellor",
  //         "Onco Nutritionist",
  //         ],
  //       qualification : " Post-Graduation Diploma in Dietetics (2000)"
  //   },
  //   {
  //     src: "/uploads/team-pic10.png",
  //     name: "Dr. Anjali Dinarajan",
  //     degree: "BAMS, FCAS",
  //     lang  : " Malayalam, English, Hindi",
  //     decrip: "Dr. Anjali is a member of Indian Ayurvedic Medical Association Of India Association (AMAI) Kerala.",
  //     subDeg : "Trichologist, Cosmetologist",
  //     exp : "10 Years",
  //     expertise : ["Trichology",
  //       "Cosmetology & Laser",
  //       "Dermatology",
  //       ],
  //     qualification : "BAMS from Ashwini Ayurvedic Medical College and Research Centre Tumkuru , Karnataka in 2014 CME from Himalaya Drugs & Research Centre Bangalore"
  //   },
  //   {
  //     src: "/uploads/team-pic11.png",
  //     name: "Dr. Suvarnna Uday",
  //     degree: "BDS, FCAS",
  //     decrip:
  //       "Dr. Suvarnna is a member of Indian Ayurvedic Medical Association of India Association (AMAI) Kerala. Past member of Indian Dental Association (IDA) Palakkad",
  //       lang  : "Malayalam, English, Hindi",
  //       subDeg : "Trichologist, Cosmetologist",
  //       exp : "9 Years",
  //       expertise : ["Trichology",
  //         "Dermato Surgery",
  //         "Cosmetology",
  //         "Dermatology",
  //         ],
  //       qualification : "BDS from Vinayaka Mission Sankarachariyar Dental College, Salem in 2015"
  //   },
  // ];

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/admin/all-doctor-Data?isSpec=1`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      console.log("vejorj", jsonData);
      setDoctors(jsonData?.data);
    } catch (error) {
      toast.error("Please logout and login again with valid credentials. ");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const home = useSelector((state) => state.content.home);

  
  return (
    <>
      <LeftAnimatedDiv
        className="our-specialist "
        style={{ background: `url(${content?.section1?.image})` }}
      >
        <div className="our-specialist-container container">
          <div>
            <h1 className="contect-us-heading">{content?.section1?.title}</h1>
          </div>
        </div>
      </LeftAnimatedDiv>
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
      <div className="specialist-section-2 container">
        {content?.section2?.map((e) => {
          return (
            <ZoomInDiv className="section-item">
              <img alt="hair" src="/uploads/admprsp-icon1.png" />
              <div className="sec-item">
                <h2>{e?.title}</h2>
                <p>{e?.desc}</p>
              </div>
            </ZoomInDiv>
          );
        })}
      </div>
      <div className="specialist-section-3 container">
        <ZoomInDiv className="sec-3 ">
          <img alt="hair" src={content?.section3?.img} />
        </ZoomInDiv>
        <RightAnimatedDiv className="sec-3 sec-pad ">
          <h3>{content?.section3?.name}</h3>
          <p>
            {content?.section3?.experitise}
            <br />
            Experience: {content?.section3?.experience}
          </p>
        </RightAnimatedDiv>
        <RightAnimatedDiv className="sec-3 sec-pad1">
          {content?.section3?.experitise?.map((e) => {
            return <div>{e}</div>;
          })}
        </RightAnimatedDiv>
      </div>
      <div className="specialist-section-4 container">
        <div className="section-4-first">
          <div class="col-lg-8 col-md-8">
            <LeftAnimatedDiv class="row mb-20">
              <div class="col-lg-3">
                <h6>Qualification:</h6>
              </div>
              <div class="col-lg-9">
                <p>{content?.section3?.qualification}</p>
              </div>
            </LeftAnimatedDiv>
            <LeftAnimatedDiv class="row">
              <div class="col-lg-3">
                <h6>Association:</h6>
              </div>
              <div class="col-lg-9">
                <p>{content?.section3?.association}</p>
              </div>
            </LeftAnimatedDiv>
          </div>
        </div>
        <RightAnimatedDiv className="section-4-second">
          <div className="col-lg-3">
            <h6>Awards</h6>
          </div>
          <img alt="hair" src={content?.section3?.awards} />
        </RightAnimatedDiv>
      </div>
      <div className=" container">
        <div className="doc-head">
          <h1>{content?.section4?.title}</h1>
          <p>{content?.section4?.desc}</p>
        </div>
        <div className="doc-container">
          {doctors.map((item, index) => (
            <LeftAnimatedDiv
              className="doctors "
              onClick={() => setData(item)}
              style={{ cursor: "pointer" }}
            >
              <div className="doc-image">
                <img alt="hair" src={item?.image} className="doc-img-1" />
              </div>
              <div className="doc-detail">
                <h2>{item?.name}</h2>
                <h2>{item?.degree}</h2>
                <p>{item?.description}</p>
              </div>
            </LeftAnimatedDiv>
          ))}
        </div>
      </div>
      <div className="councellor-container ">
        <div className="container">
          <h1>{content?.section5?.title}</h1>
          <p>{content?.section5?.desc}</p>
          <div className="councellor-item animate__backInLeft">
            {content?.section5?.data?.map((e, index) => {
              return (
                <RightAnimatedDiv className="coun-item" transition={{
                  ...TRANSITION,
                  delay: 0.2 * parseInt(index),
                }}>
                  <img alt="hair" src={e?.img} />
                  <p>{e?.desc}</p>
                </RightAnimatedDiv>
              );
            })}
          </div>
        </div>

        {data ? (
          <div className="overlay">
            <div className="popup scroll-doc">
              <button
                className="close-btn"
                onClick={() => setData(false)}
                style={{ top: "-3px", right: "-4px" }}
              >
                <MdClose size={20} />
              </button>
              <div className="specialist-section-3 container">
                <div className="sec-3">
                  <img alt="hair" src={data?.image} />
                </div>
                <div className="sec-3 sec-pad">
                  <h3>{data?.name}</h3>
                  <p>
                    {data?.degree}
                    <br />
                    {data?.specialist}
                    {/* MBBS, MD FCPS, DDV Hair <br />
            Transplant Surgeon, Trichologist Medical Director */}
                    <br />
                    <div>Experience: {data?.experience}</div>
                    <br />
                    <div>Language: {data?.language}</div>
                    {/* Experience: 15 Years */}
                  </p>
                </div>
                <div className="sec-3 sec-pad1">
                  {data?.expertise?.map((e) => {
                    return <div>{e}</div>;
                  })}
                  {/* <div>Trichology</div>
          <div>Hair Transplant Surgeon</div>
          <div>Dermato Surgery</div>
          <div>Skin & Cosmetology</div> */}
                </div>
              </div>
              <div
                className="specialist-section-4 container"
                style={{ color: "black" }}
              >
                <div className="section-4-first">
                  <div class="col-lg-8 col-md-8">
                    <div class="row mb-20" style={{ gap: 0 }}>
                      <div class="col-lg-3">
                        <h6>Qualification:</h6>
                      </div>
                      <div class="col-lg-9">
                        <p>{data?.qualification}</p>
                      </div>
                    </div>
                    <div class="row" style={{ gap: 0 }}>
                      <div class="col-lg-3">
                        <h6>Association:</h6>
                      </div>
                      <div class="col-lg-9">
                        <p>{data?.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="section-4-second">
                  <div className="col-lg-3">
                    <h6>Awards</h6>
                  </div>
                  <img alt="hair" src="/assets/img/specialists/award.png" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      {/* <div className=" faq-wraper-container">
        <h1>Role of Hair Counsellor</h1>
        <Faq/>
      </div> */}
    </>
  );
}
