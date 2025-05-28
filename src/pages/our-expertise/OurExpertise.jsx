import React, { useState } from 'react'
import './OurExpertise.css'
import BeforeAfter from '../before-after/BeforeAfter'
import Footer from '../footer/Footer'
import Faq from '../our-specialist/faq/Faq'
import { useSelector } from 'react-redux'
import { LeftAnimatedDiv, RightAnimatedDiv, ZoomInDiv } from '../../componet/Animation'
import ShoppingFeature from '../shopping-feature/ShoppingFeature'
export default function OurExpertise() {
  const [read1, setRead1] = useState(false)
  const [read2, setRead2] = useState(false)
  const [read3, setRead3] = useState(false)
  const [read4, setRead4] = useState(false)
  const [read5, setRead5] = useState(false)
  const [read6, setRead6] = useState(false)
  const [read7, setRead7] = useState(false)
  const [read8, setRead8] = useState(false)
  const [read9, setRead9] = useState(false)
  const [read10, setRead10] = useState(false)

  const content = useSelector((state) => state.content.expertise);
  console.log("jojkrgreor", content)


  let text1 = content?.section3?.data?.[0]?.desc
  let text2 = content?.section3?.data?.[1]?.desc
  let text3 = content?.section4?.data?.[0]?.desc
  let text4 = content?.section4?.data?.[1]?.desc
  let text5 = content?.section4?.data?.[2]?.desc
  let text6 = content?.section4?.data?.[3]?.desc
  let text7 = content?.section4?.data?.[4]?.desc
  let text8 = content?.section4?.data?.[5]?.desc
  let text9 = content?.section5?.data?.[0]?.desc
  let text10 = content?.section5?.data?.[1]?.desc



  const home = useSelector((state) => state.content.home);





  return (
    <>
          {/* <div style={{background: "#e6dfdd"}}> */}

      <div className="about-us" style={{fontFamily: '"Poppins", sans-serif'}}>
        <div className="container">
          <div className="our-expertise-container">
            <LeftAnimatedDiv style={{ width: "33%"}}>
              <h1 className="contect-us-heading left_animation" style={{fontWeight : "600"}}>{content?.section1?.title}</h1>
            </LeftAnimatedDiv>
            <ZoomInDiv className="iman" style={{height : "100%",width: "35%",    display: "flex",
    alignItems: "end"}}>
              <img
                className="m-c animate__animated zoomIn_animation"
                style={{ animationDelay: "1s",height : "65%" }}
                alt="hair"
                src={content?.section1?.image}
              />
            </ZoomInDiv>
            <RightAnimatedDiv className="tes-alig ">
              <h4 className="sub-had-2" style={{ fontSize: "2.25rem",fontWeight : "600" }}>{content?.section1?.description}</h4>
            </RightAnimatedDiv>
          </div>
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
      <div style={{ background: `url(/assets/img/Leaf-Background-520X1600.png) center bottom repeat-x`,height: "100%" }}>
      <LeftAnimatedDiv className="trust-head d-flex flex-column " style={{ gap: "8px", fontWeight: "600", fontSize: "16px",padding: "70px 0 0px 0px" }} >
        <div style={{ margin: 0, width: "100%" }}>
          {content?.section2?.num1}
        </div>
        <div style={{ margin: 0, width: "100%" }}>
          {content?.section2?.num2}

        </div>
      </LeftAnimatedDiv>
      <RightAnimatedDiv className="trust-head">
        <h1 style={{marginBottom : 0}}>Our Services</h1>
      </RightAnimatedDiv>
      </div>


      <div className="trust-head1  " style={{marginTop : 0}}>
        <h1>        {content?.section3?.title}        </h1>
        <div className="our-expertise-section container">
          <LeftAnimatedDiv className="item-2 ">
            <div className="item-21-1">
              <img alt="hair" src={content?.section3?.data?.[0]?.img} />
              <h1 className="item-h1">{content?.section3?.data?.[0]?.title}</h1>
              <p
                style={{
                  padding: "1rem 3rem 0rem 3rem !important",
                  marginBottom: 0,
                  height: "150px",
                  maxHeight: "150px",
                  overflowY: "scroll",
                }}
              >
                              <div
                className="hilight2 item-21-1-1"
                dangerouslySetInnerHTML={{ __html: read1
                  ? text1
                  : text1?.length > 150
                    ? text1?.substring(0, 150)
                    : text1 }} 
              />
                
              </p>
              <h5
                  onClick={() => setRead1(true)}
                  style={{ cursor: "pointer",height: "25px" }}
                >
                  {" "}
                  {text1?.length > 150 && !read1 ? "Read More" : ""}
                </h5>
            </div>
          </LeftAnimatedDiv>
          <RightAnimatedDiv className="item-2  ">
            <div className="item-21-1">
              {" "}
              <img alt="hair" src={content?.section3?.data?.[1]?.img} />
              <h1 className="item-h1">{content?.section3?.data?.[1]?.title}</h1>
              <p
                style={{
                  padding: "1rem 3rem 0rem 3rem !important",
                  marginBottom: 0,
                  height: "150px",
                  maxHeight: "150px",
                  overflowY: "scroll",
                }}
              >
                                              <div
                className="hilight2 item-21-1-1"
                dangerouslySetInnerHTML={{ __html: read2
                  ? text2
                  : text2?.length > 150
                    ? text2?.substring(0, 150)
                    : text2}} 
              />

              </p>
              <h5 onClick={() => setRead2(true)} style={{ cursor: "pointer",    height: "25px"}}>
                {" "}
                {text2?.length > 150 && !read2 ? "Read More" : ""}
              </h5>
            </div>
          </RightAnimatedDiv>
        </div>
      </div>
      <div className="trust-head2">
        <h1>{content?.section4?.title}</h1>
        <div className="our-expertise-section container">
          <LeftAnimatedDiv className="item-2 ">
            <div className="item-21-1">
              <img alt="hair" src={content?.section4?.data?.[0]?.img} />
              <h1 className="item-h1">{content?.section4?.data?.[0]?.title} </h1>
              <p style={{                  height: "150px",
                  maxHeight: "150px",
                  overflowY: "scroll",}}>
                                                                 <div
                className="hilight2 item-21-1-1"
                dangerouslySetInnerHTML={{ __html: read3
                  ? text3
                  : text3?.length > 100
                    ? text3?.substring(0, 100)
                    : text3}} 
              />
              </p>
              <h5 onClick={() => setRead3(true)} style={{ cursor: "pointer",  height: "25px" }}>
                {" "}
                {text3?.length > 100 && !read3 ? "Read More" : ""}
              </h5>
            </div>
          </LeftAnimatedDiv>
          <div className="item-2">
            <RightAnimatedDiv className="item-21-1 ">
              {" "}
              <img alt="hair" src={content?.section4?.data?.[1]?.img} />
              <h1 className="item-h1">{content?.section4?.data?.[1]?.title}</h1>
              <p style={{                  height: "150px",
                  maxHeight: "150px",
                  overflowY: "scroll",}}>
                                                                                     <div
                className="hilight2 item-21-1-1"
                dangerouslySetInnerHTML={{ __html: read4
                  ? text4
                  : text4?.length > 100
                    ? text4?.substring(0, 100)
                    : text4}} 
              />
              </p>
              <h5 onClick={() => setRead4(true)} style={{ cursor: "pointer",  height: "25px" }}>
                {" "}
                {text4?.length > 100 && !read4 ? "Read More" : ""}
              </h5>
            </RightAnimatedDiv>
          </div>
        </div>
        <div className="our-expertise-section container">
          <LeftAnimatedDiv className="item-2 ">
            <div className="item-21-1">
              <img alt="hair" src={content?.section4?.data?.[2]?.img} />
              <h1 className="item-h1">{content?.section4?.data?.[2]?.title} </h1>
              <p style={{                  height: "150px",
                  maxHeight: "150px",
                  overflowY: "scroll",}}>
                                                                                                         
                <div
                className="hilight2 item-21-1-1"
                dangerouslySetInnerHTML={{ __html: read5
                  ? text5
                  : text5?.length > 100
                    ? text5?.substring(0, 100)
                    : text5}} 
              />
              </p>
              <h5 onClick={() => setRead5(true)} style={{ cursor: "pointer",  height: "25px" }}>
                {" "}
                {text5?.length > 100 && !read5 ? "Read More" : ""}
              </h5>
            </div>
          </LeftAnimatedDiv>
          <div className="item-2">
            <RightAnimatedDiv className="item-21-1 ">
              {" "}
              <img
                alt="hair"
                src={content?.section4?.data?.[3]?.img}
              />
              <h1 className="item-h1">{content?.section4?.data?.[3]?.title}</h1>
              <p style={{                  height: "150px",
                  maxHeight: "150px",
                  overflowY: "scroll",}}>
                                    <div
                className="hilight2 item-21-1-1"
                dangerouslySetInnerHTML={{ __html: read6
                  ? text6
                  : text6?.length > 100
                    ? text6?.substring(0, 100)
                    : text6}} 
              />
              </p>
              <h5 onClick={() => setRead6(true)} style={{ cursor: "pointer",  height: "25px" }}>
                {" "}
                {text6?.length > 100 && !read6 ? "Read More" : ""}
              </h5>
            </RightAnimatedDiv>
          </div>
        </div>
        <div className="our-expertise-section container">
          <div className="item-2">
            <LeftAnimatedDiv className="item-21-1 ">
              <img alt="hair" src={content?.section4?.data?.[4]?.img} />
              <h1 className="item-h1">{content?.section4?.data?.[4]?.title} </h1>
              <p style={{                  height: "150px",
                  maxHeight: "150px",
                  overflowY: "scroll",}}>
                    <div
                className="hilight2 item-21-1-1"
                dangerouslySetInnerHTML={{ __html: read7
                  ? text7
                  : text7?.length > 100
                    ? text7?.substring(0, 100)
                    : text7}} 
              />
              </p>
              <h5 onClick={() => setRead7(true)} style={{ cursor: "pointer",  height: "25px" }}>
                {" "}
                {text7?.length > 100 && !read7 ? "Read More" : ""}
              </h5>
            </LeftAnimatedDiv>
          </div>
          <div className="item-2">
            <RightAnimatedDiv className="item-21-1 ">
              {" "}
              <img alt="hair" src={content?.section4?.data?.[5]?.img} />
              <h1 className="item-h1">{content?.section4?.data?.[5]?.title}</h1>
              <p style={{                  height: "150px",
                  maxHeight: "150px",
                  overflowY: "scroll",}}>
                    <div
                className="hilight2 item-21-1-1"
                dangerouslySetInnerHTML={{ __html: read8
                  ? text8
                  : text8?.length > 100
                    ? text8?.substring(0, 100)
                    : text8}} 
              />
              </p>
              <h5 onClick={() => setRead8(true)} style={{ cursor: "pointer",  height: "25px" }}>
                {" "}
                {text8?.length > 100 && !read8 ? "Read More" : ""}
              </h5>
            </RightAnimatedDiv>
          </div>
        </div>
      </div>
      <div className="trust-head1">
        <h1>{content?.section5?.title}</h1>
        <div className="our-expertise-section container">
          <LeftAnimatedDiv className="item-2 ">
            <div className="item-21">
              <img alt="hair" src={content?.section5?.data?.[0]?.img} />
              <h1 className="item-h1">{content?.section5?.data?.[0]?.title}</h1>
              <p style={{                  height: "150px",
                  maxHeight: "150px",
                  overflowY: "scroll",}}>
                    <div
                className="hilight2 item-21-1-1"
                dangerouslySetInnerHTML={{ __html: read9
                  ? text9
                  : text9?.length > 150
                    ? text9?.substring(0, 150)
                    : text9}} 
              />
              </p>
              <h5 onClick={() => setRead9(true)} style={{ cursor: "pointer",  height: "25px" }}>
                {" "}
                {text9?.length > 150 && !read9 ? "Read More" : ""}
              </h5>
            </div>
          </LeftAnimatedDiv>
          <div className="item-2">
            <RightAnimatedDiv className="item-21 ">
              {" "}
              <img alt="hair" src={content?.section5?.data?.[1]?.img} />
              <h1 className="item-h1">{content?.section5?.data?.[1]?.title}</h1>
              <p style={{                  height: "150px",
                  maxHeight: "150px",
                  overflowY: "scroll",}}>
                    <div
                className="hilight2 item-21-1-1"
                dangerouslySetInnerHTML={{ __html: read10
                  ? text10
                  : text10?.length > 150
                    ? text10?.substring(0, 150)
                    : text10}} 
              />
              </p>
              <h5 onClick={() => setRead10(true)} style={{ cursor: "pointer",  height: "25px" }}>
                {" "}
                {text10?.length > 150 && !read10 ? "Read More" : ""}
              </h5>
            </RightAnimatedDiv>
          </div>
        </div>
      </div>
      <ZoomInDiv className="image-coverr">
        <img alt="hair" src={content?.section6?.img} />
</ZoomInDiv>
{/* </div> */}

      <BeforeAfter />
      <Faq content = {content} />
      <ShoppingFeature col = {"1"}/>
      <Footer />
    </>
  );
}
