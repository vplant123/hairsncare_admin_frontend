import React from 'react';
import "./Page1.css"
import { color } from 'framer-motion';

export default function Page1({data}) {
  console.log("jojerofre",data?.personal)

  const content = [{
    text : "Treatment Plan",
    color : "rgba(2, 161, 229, 1)",
    img : "/assets/img/reports/management/page1/grade2baldnesspatienttreatmentplan1427-3wi-300h.png",
  },
  {
    text : "Treatment Plan Hair & Scalp Treatment Management",
    color : "rgba(159, 239, 248, 1)",
    img : "/assets/img/reports/management/page1/hairandscalpanalysis11428-9whh-300h.png",
  },
  {
    text : " Nutritional Management",
    color : "rgba(190, 206, 55, 1)",
    img : "/assets/img/reports/management/page1/nutritional11429-nkz-300h.png",
  },
  {
    text : " Lifestyle Management",
    color : "rgba(248, 180, 115, 1)",
    img : "/assets/img/reports/management/page1/lifestyle41430-5azi-300h.png",
  },
  {
    text : "Stress Management",
    color : "rgba(230, 146, 208, 1)",
    img : "/assets/img/reports/management/page1/doctorstressmanagementposter21431-vnz-300w.png",
  }
]
  return (

    <div className="avoid-break" style={{padding : "20px",position: "relative"}}>
    <div
      className="head-managereport d-flex"
      style={{ justifyContent: "space-between" }}
    >
      <img src="/assets/img/logo.png" className="head-managereport-logo" />
      <div className="head-managereport-text1">Management Report </div>
      <div
        className="text-flex-line-center-veritcal"
        style={{ color: "rgba(84, 84, 84, 1)" }}
      >
        Smart Report
      </div>
    </div>

    <div className="d-flex" style={{ gap: "6%" }}>
      <div
        className="head-managereport-page1-sec-1 d-flex flex-column mt-5"
        style={{ gap: "12px" }}
      >
        <div
          className="head-managereport-r-page1-sec-1-left"
          style={{ background: "#02A1E5" }}
        >
          Treatment Plan
        </div>
        <div
          className="head-managereport-r-page1-sec-1-left"
          style={{ background: "rgba(159, 239, 248, 1)" }}
        >
          Hair &amp; Scalp Treatment Recommendation
        </div>
        <div
          className="head-managereport-r-page1-sec-1-left"
          style={{ background: "rgba(190, 206, 55, 1)" }}
        >
          Nutritional Management
        </div>
        <div
          className="head-managereport-r-page1-sec-1-left"
          style={{ background: "rgba(248, 180, 115, 1)" }}
        >
          Lifestyle Management
        </div>
        <div
          className="head-managereport-r-page1-sec-1-left"
          style={{ background: "rgba(230, 146, 208, 1)" }}
        >
          Stress Management
        </div>
      </div>
      <div
        className="head-managereport-page1-sec-1 d-flex flex-column"
        style={{ justifyContent: "space-between", position: "relative" }}
      >
        <div
          style={{ width: "100%", display: "flex", justifyContent: "end" }}
        >
          <div className="head-managereport-page1-sec-1-right-top">
            {data?.personal?.name}
          </div>
        </div>

        <div className="head-managereport-page1-sec-1-right-bottom d-flex flex-column">
          <div className="head-managereport-page1-sec-1-right-bottom-text-1">
            Dr Amit Agarkar
          </div>
          <div className="head-managereport-page1-sec-1-right-bottom-text-2">
            MBBS, MD, FCPS,DDV
          </div>
          <div className="head-managereport-page1-sec-1-right-bottom-text-2">
            Fellowship in Hair Transplant
          </div>
          <div className="head-managereport-page1-sec-1-right-bottom-text-2">
            Reg. No,- 06/07/2868
          </div>
        </div>
        <img
          className="doctor-img"
          src="https://res.cloudinary.com/drkpwvnun/image/upload/v1731256157/hair-assessment/a6jo0qrxvq61phbr9ywt.png"
        />
      </div>
    </div>

    <div className="d-flex mt-5" style={{ gap: "5%" }}>
      <div className="d-flex flex-column" style={{ width: "100%" }}>
        <div className="sec-2-text-1">Welcome to the hairsncares.com</div>
        <div style={{ fontSize: "28px" }}>YOUR <span style={{color : "rgba(0, 160, 227, 1)"}}>HAIR EXPERT!
          </span></div>
          <div className='d-flex flex-column' style={{gap : "10px"}}>
          <div style={{fontSize : "12px"}}>
        Dear {data?.personal?.sex == "Male" ? "Mr" : "Miss"}. {data?.personal?.name}, 

        </div>
        <div style={{fontSize : "12px"}}>
        After careful consideration of the hair test you provided, here is a customized recommendation report to address your concerns. 


        </div>
        <div style={{fontSize : "12px"}}>
        Following a comprehensive assessment by the dermatologist, please find your detailed treatment plan below

        </div>
          </div>

      </div>

    </div>

    <div className='d-flex mt-5' style={{gap : "1%"}}>
      {content?.map((e) => {
        return (
          <div style={{width: "19%",height : "250px",border :"0.87px solid rgba(0, 0, 0, 1)",gap : "5%",background : e?.color}} className='d-flex flex-column'>
            <div style={{height : "30%"}} className='page1-sec-3-text'>
              {e?.text}
            </div>
            <div style={{height : "65%",padding :"10px"}}>
              <img src = {e?.img} style={{width : "100%",height : "100%"}}/>
              </div>
          </div>
        )
      })}
    </div>

    <div
      className="head-managereport"
      style={{fontSize : "8px",height : "100%",color : "#FFFFFF",background: "rgba(0, 160, 227, 1)",marginTop : "13%"}}
    ><span style={{fontWeight:  "700"}}>Legal Disclaimer</span>: This communication aims to ensure your comprehensive understanding of the diagnosis's nature. (Read more.. Please be cognizant that, as of this juncture, the diagnosis is regarded as provisional, signifying its preliminary status. It is derived solely from the data and photos (if provided) obtained through the online hair test furnished by you. Nevertheless, it is imperative to accentuate that the precision of this diagnosis may exhibit incongruities across individuals. Various determinants, encompassing distinctive health conditions, genetic makeup, and external influences, can contribute to disparities in accuracy. While our utmost endeavor is directed towards accuracy, we hereby acknowledge the potential divergence in individual cases, thus warranting judicious discretion during the interpretation of outcomes.) Diagnosis & Details
    </div>
      









  </div> 










  //   <div class="management-report1ignore-container" >
  //   <div class="management-report1ignore-management-report1ignore">
  //     <div class="management-report1ignore-rectangle34624510">
  //       <div class="management-report1ignore-rectangle34624522">
  //         <img src="/assets/img/reports/management/page1/hairsn111425-5y7-200h.png" alt="" class="management-report1ignore-hairsn11" />
  //       </div>
  //       <span class="management-report1ignore-text11">Management Report</span>
  //       <div class="header-text"> <span class="management-report1ignore-text10">Smart Report</span></div>
  //     </div>
  //   </div>
  //   <div class="management-report1ignore-group2147223852">
  //     <div class="management-report1ignore-frame1261153112">
  //       <div class="management-report1ignore-frame1261153113">
  //         <span class="management-report1ignore-text12">
  //           Treatment Plan
  //         </span>
  //       </div>
  //       <div class="management-report1ignore-frame1261153114">
  //         <span class="management-report1ignore-text13">
  //           <span>Hair &amp; Scalp Treatment Recommendation</span>
  //           <br />
  //         </span>
  //       </div>
  //       <div class="management-report1ignore-frame1261153115">
  //         <span class="management-report1ignore-text16">
  //           Nutritional Management
  //         </span>
  //       </div>
  //       <div class="management-report1ignore-frame1261153116">
  //         <span class="management-report1ignore-text17">
  //           Lifestyle Management
  //         </span>
  //       </div>
  //       <div class="management-report1ignore-frame1261153117">
  //         <span class="management-report1ignore-text18">
  //           Stress Management
  //         </span>
  //       </div>
  //     </div>
  //     <div class="management-report1ignore-group1707485965">
  //       <img src="/assets/img/reports/management/page1/rectangle59441412-owg8-1400w.png" alt="Rectangle59441412"
  //         class="management-report1ignore-rectangle5944" />

  //       <img src="/assets/img/reports/management/page1/image45dramit111417-7o3f-300w.png" alt="IMAGE45drAmit111417"
  //         class="management-report1ignore-image45dr-amit11" />
  //       <div class="management-report1ignore-frame1000004465">
  //         <span class="management-report1ignore-text33">
  //           Dr Amit Agarka
  //         </span>
  //         <span class="management-report1ignore-text34">
  //           MBBS, MD, FCPS,DDV
  //         </span>
  //         <span class="management-report1ignore-text35">
  //           Fellowship in Hair Transplant
  //         </span>
  //         <span class="management-report1ignore-text36">
  //           Reg. No,- 06/07/2868
  //         </span>
  //       </div>
  //     </div>
  //   </div>
  //   <div class="welcome-txt">
  //     <span class="management-report1ignore-text29">
  //       Welcome to the hairsncares.com
  //     </span>
  //     <span class="management-report1ignore-text30">
  //       <span class="management-report1ignore-text31">YOUR</span>
  //       <span class="management-report1ignore-text32">HAIR EXPERT!</span>
  //     </span>
  //     <div class="management-report1ignore-text19">
  //       <span class="welcome-span">Dear Mr. XYZ,</span>
  //       <br />
  //       <span></span>
  //       <br />
  //       <span>
  //         After careful consideration of the hair test you provided, here
  //         is a customized recommendation report to address your concerns.
  //       </span>
  //       <br />
  //       <span></span>
  //       <br />
  //       <span>
  //         Following a comprehensive assessment by the dermatologist,
  //         please find your detailed treatment plan below
  //       </span>
  //     </div>
  //   </div>
  //   <div class="grid">
  //     <div class="box1">
  //       <div class="management-report1ignore-text37">
  //         <p>Treatment Plan</p>
  //       </div>
  //       <img src="/assets/img/reports/management/page1/grade2baldnesspatienttreatmentplan1427-3wi-300h.png"
  //         alt="grade2baldnesspatienttreatmentplan1427"
  //         class="management-report1ignore-grade2baldnesspatienttreatmentplan" />
  //     </div>
  //     <div class="box2">
  //       <div class="management-report1ignore-text38">
  //         <p>Treatment Plan Hair &amp; Scalp Treatment Management</p>
  //       </div>
  //       <img src="/assets/img/reports/management/page1/hairandscalpanalysis11428-9whh-300h.png" alt="HairandScalpanalysis11428"
  //         class="management-report1ignore-hairand-scalpanalysis1" />
  //     </div>
  //     <div class="box3">
  //       <div class="management-report1ignore-text39">
  //         <p>Nutritional Management</p>
  //       </div>
  //       <img src="/assets/img/reports/management/page1/nutritional11429-nkz-300h.png" alt="nutritional11429"
  //         class="management-report1ignore-nutritional1" />
  //     </div>
  //     <div class="box4">
  //       <div class="management-report1ignore-text40">
  //         <p>Lifestyle Management</p>
  //       </div>
  //       <img src="/assets/img/reports/management/page1/lifestyle41430-5azi-300h.png" alt="lifestyle41430"
  //         class="management-report1ignore-lifestyle4" />
  //     </div>
  //     <div class="box5">
  //       <div class="management-report1ignore-text41">
  //         <p>Stress Management</p>
  //       </div>
  //       <span class="management-report1ignore-text41">

  //       </span>
  //       <img src="/assets/img/reports/management/page1/doctorstressmanagementposter21431-vnz-300w.png"
  //         alt="doctorstressmanagementposter21431" class="management-report1ignore-doctorstressmanagementposter2" />
  //     </div>

  //   </div>
  // </div>
  );
}
