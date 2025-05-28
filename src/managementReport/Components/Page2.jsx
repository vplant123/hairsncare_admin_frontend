import React from 'react';
import "./Page2.css"

export default function Page2({data}) {
  console.log("jojerofre",data?.personal)


  let data11 = {
    "Acute Telogen Effluvium (M)" : "https://youtu.be/BA1wG-8lXuk",
    "Chronic Telogen Effluvium (M)" : "https://youtu.be/2xda_Sh7Z2U",
    "Acute Telogen Effluvium (F)" : "https://youtu.be/BA1wG-8lXuk",
    "Chronic Telogen Effluvium (F)" : "https://youtu.be/2xda_Sh7Z2U",
    "Alopecia Areata (M)": "https://youtu.be/wXF3SbR3Iy0",
    "Alopecia Areata (F)" : "https://youtu.be/wXF3SbR3Iy0",
    "PCOD"  : "https://youtu.be/BkNQYKi1i0g",
    "Thyroid" : "https://youtu.be/3KGnCvm0APw",
    "Anemia"  : "https://youtu.be/nunkm9j2jPE",
    "Dandruff" : "https://youtu.be/njRC7pNyCUQ",
    "Grey Hair" : "https://youtu.be/NclRjMYKf5I",
  }
  
  let subOptionM = {
    "Grade 1": "https://youtu.be/NA-mO09CuGc",
    "Grade 2 & Grade 3": "https://youtu.be/NA-mO09CuGc",
    "Grade 4 & Grade 5": "https://youtu.be/NA-mO09CuGc",
    "Grade 6 & Grade 7": "https://youtu.be/NA-mO09CuGc"
  }
  
  let subOptionF = {
    "Grade 1" : "https://youtu.be/h882V3P_mXw",
    "Grade 2" : "https://youtu.be/h882V3P_mXw",
    "Grade 3" : "https://youtu.be/h882V3P_mXw"
  }



  return (
    <div className='page-break-1'>

      <div className='d-flex flex-column' style={{justifyContent : "space-between"}}>
      <div
      className="head-managereport d-flex"
      style={{ justifyContent: "space-between" }}
    >
      <img src="/assets/img/logo.png" className="head-managereport-logo" />
      <div className="head-managereport-text1">Treatment Plan </div>
      <div
        className="text-flex-line-center-veritcal"
        style={{ color: "rgba(84, 84, 84, 1)" }}
      >
        Smart Report
      </div>
    </div>

    <div className='d-flex flex-column' style={{position : "relative",padding : "20px"}}>
      <div style={{fontSize : "28px",fontWeight : "700",width : "60%",lineHeight : "40px",marginTop : "10px"}}>
      Importance of Modern Medicine in hairloss & thinning
      </div>
      <div style={{width : "60%",lineHeight : "28px",fontSize : "18px"}} className='mt-2'>
      Modern medicine stands out in treating hair loss due to its 
evidence-based methods and scientifically backed treatments. 
      </div>
      <div  style={{width : "60%",lineHeight : "28px",fontSize : "18px"}}>
      While Ayurveda and homeopathy can help with certain issues, modern medicine has clear advantages like proven treatments, FDA approved options, advanced diagnostics, personalized care, expert guidance, high safety standards and 
      ongoing innovation
      </div>
      <br/>
      <div  style={{width : "60%",lineHeight : "28px",fontSize : "18px"}}>
      While Ayurveda and homeopathy lack robust scientific evidence for treating hair loss, they may provide relief for some. A complementary approach combining these with modern medicine should be done under professional guidance to ensure safety.

      </div>
      <br/>
      <div  style={{width : "60%",lineHeight : "28px",fontSize : "18px"}}>
      In conclusion, modern medicine offers reliable, evidence-based treatments for hair loss, making it a preferable option for many seeking effective solutions.
      </div>

      <div>
        <img src="/assets/img/reports/management/page2/modernmedicine1339-x8a3-800w.png" className='page2-sec-1-img'/>
      </div>

    </div>



    <div
      className="head-managereport"
      style={{fontSize : "8px",height : "100%",color : "#FFFFFF",background: "rgba(0, 160, 227, 1)",marginTop : "21%"}}
    ><span style={{fontWeight:  "700"}}>Legal Disclaimer</span>: This communication aims to ensure your comprehensive understanding of the diagnosis's nature. (Read more.. Please be cognizant that, as of this juncture, the diagnosis is regarded as provisional, signifying its preliminary status. It is derived solely from the data and photos (if provided) obtained through the online hair test furnished by you. Nevertheless, it is imperative to accentuate that the precision of this diagnosis may exhibit incongruities across individuals. Various determinants, encompassing distinctive health conditions, genetic makeup, and external influences, can contribute to disparities in accuracy. While our utmost endeavor is directed towards accuracy, we hereby acknowledge the potential divergence in individual cases, thus warranting judicious discretion during the interpretation of outcomes.) Diagnosis & Details
    </div>
      </div>





      <div className='d-flex flex-column' style={{justifyContent : "space-between"}}>
      <div
      className="head-managereport d-flex"
      style={{ justifyContent: "space-between" }}
    >
      <img src="/assets/img/logo.png" className="head-managereport-logo" />
      <div className="head-managereport-text1">Treatment Plan </div>
      <div
        className="text-flex-line-center-veritcal"
        style={{ color: "rgba(84, 84, 84, 1)" }}
      >
        Smart Report
      </div>
    </div>

    <div className='page-break-2' style={{marginTop : "10px"}}>
    <div className='page2-sec-2-head '>
    Diagnosis Synopsis

    </div> 

    <div className='d-flex' style={{height : "250px"}}>
      <div style={{width : "25%",display:"flex",alignItems :"center"}}>
        <div style={{background : "rgba(0, 160, 227, 1)",height : "60px",width : "100%"}}>

        </div>
      </div>
      <div style={{width :"50%"}}>
        <img src="/assets/img/reports/management/page2/diagnosissynopsis1340-zch-700h.png" style={{width : "100%",height : "100%"}}/>
      </div>
      <div style={{width : "25%",display:"flex",alignItems :"center"}}>
      <div style={{background : "rgba(0, 160, 227, 1)",height : "60px",width : "100%"}}>

</div>
</div>
    </div>
    </div>

    {
      data?.dianosis?.length > 0 && 
      <div className='d-flex flex-column mt-5' style={{justifyContent: "space-between",alignItems : "center",gap : "20px",position : "relative",}}>
      {/* <div class="round-box1">
        <div class="round-img" >
          <div class="number-box">
            <div class="number">1</div>
          </div>
        </div>
        <div class="box1-txt" style={{width : "78%"}}>
          <div class="blue-box"></div>
          <span class="management-report-pg2-treatment-plan-text40">
            <span class="management-report-pg2-treatment-plan-text37" style={{    fontSize: "24px",
      fontWeight: "700"}}>
              Acute Telogen Effluvium (M)
            </span>
            <br/>
            <div class="round-content" style={{    fontSize: "14px",lineHeight: "24px"}}>
              Your Prescription of medications for Acute Telogen Effluvium will
              be provided in the Prescription in Your My Reports section Check
              Below for the detailed management report for your condition.
            </div>
            <br />
          </span>
        </div>
      </div>
    <div class="round-box2">
      <div class="round-img2">
        <div class="number-box2">
          <div class="number2">2</div>
        </div>
      </div>
      <div class="box1-txt2" style={{width : "78%"}}>
        <div class="blue-box2"></div>
        <span class="management-report-pg2-treatment-plan-text44">
          <span class="management-report-pg2-treatment-plan-text39" style={{    fontSize: "24px",
      fontWeight: "700"}}>
            Chronic Telogen Effluvium (M)
          </span>
          <br/>
          <span class="round-content2">
            <div style={{    fontSize: "14px",lineHeight: "24px"}}>
              Your Prescription of medications for Chronic Telogen Effluvium
              will be provided in the Prescription in Your My Reports section
              <br />
              <div style={{    fontSize: "14px",lineHeight: "24px"}}>
                Check Below for the detailed management report for your condition.
              </div>
            </div>
          </span>
          <br />
        </span>
      </div>
    </div>
    <div class="round-box3">
      <div class="round-img3">
        <div class="number-box3">
          <div class="number3">3</div>
        </div>
      </div>
      <div class="box1-txt3" style={{width : "78%"}}>
        <div class="blue-box3"></div>
        <span class="management-report-pg2-treatment-plan-text44">
          <span class="management-report-pg2-treatment-plan-text38" style={{    fontSize: "24px",
      fontWeight: "700"}}>
            Androgenetic Alopecia (M) - Grade 4 &amp; Grade 5
          </span>
          <br/>
          <span class="round-content3">
            <div style={{    fontSize: "14px",lineHeight: "24px"}}>
              Click this link to know more.
            </div>
          </span>
          <br />
        </span>
      </div>
    </div> */}
  
    {data?.dianosis?.slice(0,3)?.map((item,it)=>{
                    return <>
    <div class="round-box3" onClick={() => {
                                  window.open(data11?.[item.option])
                                }}>
      <div class="round-img3">
        <div class="number-box3">
          <div class="number3">{it + 1}</div>
        </div>
      </div>
      <div class="box1-txt3" style={{width : "78%"}}>
        <div class="blue-box3"></div>
        <span class="management-report-pg2-treatment-plan-text44">
          <span class="management-report-pg2-treatment-plan-text38" style={{    fontSize: "24px",
      fontWeight: "700"}}>
            {item.option + " - " + (item.subOption ? item.subOption : "")}
          </span>
          <br/>
          <span class="round-content3">
            <div style={{    fontSize: "14px",lineHeight: "24px"}}>
            Your Prescription of medications for Acute Telogen Effluvium will
            be provided in the Prescription in Your My Reports sectio.
            </div>
          </span>
          <br />
        </span>
      </div>
    </div>
                    </>
                  })}

  
  
                  
      </div>
  
    }

<div
      className="head-managereport"
      style={{fontSize : "8px",height : "100%",color : "#FFFFFF",background: "rgba(0, 160, 227, 1)",marginTop : "2%"}}
    ><span style={{fontWeight:  "700"}}>Legal Disclaimer</span>: This communication aims to ensure your comprehensive understanding of the diagnosis's nature. (Read more.. Please be cognizant that, as of this juncture, the diagnosis is regarded as provisional, signifying its preliminary status. It is derived solely from the data and photos (if provided) obtained through the online hair test furnished by you. Nevertheless, it is imperative to accentuate that the precision of this diagnosis may exhibit incongruities across individuals. Various determinants, encompassing distinctive health conditions, genetic makeup, and external influences, can contribute to disparities in accuracy. While our utmost endeavor is directed towards accuracy, we hereby acknowledge the potential divergence in individual cases, thus warranting judicious discretion during the interpretation of outcomes.) Diagnosis & Details
    </div>

    
      </div>




























{/* 
          <div class="management-report-pg2-treatment-plan-container" style={{marginTop : "200px"}}>
    <div class="management-report-pg2-treatment-plan-rectangle34624510">
      <div class="management-report-pg2-treatment-plan-rectangle34624522">
        <img src="/assets/img/reports/management/page2/hairsn111336-te9g-200h.png" alt="HAIRSN111336"
          class="management-report-pg2-treatment-plan-hairsn11" />
      </div>
      <div class="treat-txt"><span class="management-report-pg2-treatment-plan-text36">Treatment Plan</span></div>
      <div class="header-txt"><span class="management-report-pg2-treatment-plan-text10">Smart Report </span></div>
    </div>
  </div>
  <div class="middle-txt">
    <div class="flex1">
      <span class="management-report-pg2-treatment-plan-text28">
        <span class="management-report-pg2-treatment-plan-text29">
          Importance of
        </span>
        <span class="management-report-pg2-treatment-plan-text30">
          Modern Medicine
        </span>
        <span>in hairloss &amp; thinning</span>
        <br />
      </span>
      <span class="management-report-pg2-treatment-plan-text11">
        <span>
          Modern medicine stands out in treating hair loss due to its
        </span>
        <br />
        <span>
          evidence-based methods and scientifically backed treatments.
        </span>
        <br />
        <span>
          While Ayurveda and homeopathy can help with certain issues, modern
          medicine has clear advantages like proven treatments, FDA approved
          options, advanced diagnostics, personalized care, expert guidance,
          high safety standards and
        </span>
        <br />
        <span>ongoing innovation</span>
        <br />
        <span></span>
        <br />
        <span>
          While Ayurveda and homeopathy lack robust scientific evidence for
          treating hair loss, they may provide relief for some. A
          complementary approach combining these with modern medicine should
          be done under professional guidance to ensure safety.
        </span>
        <br />
        <span></span>
        <br />
        <span>
          In conclusion, modern medicine offers reliable, evidence-based
          treatments for hair loss, making it a preferable option for many
          seeking effective solutions.
        </span>
        <br />
      </span>
    </div>
    <div class="flex2">
      <img src="/assets/img/reports/management/page2/modernmedicine1339-x8a3-800w.png" alt=""
        class="management-report-pg2-treatment-plan-modernmedicine" />
      <div class="background"></div>
    </div>
  </div>

  <div class="diagnosis">
    <div class="management-report-pg2-treatment-plan-text33">
      <span>Diagnosis Synopsis</span>
      <br />
    </div>
    <div class="management-report-pg2-treatment-plan-rectangle34624511">
      <img src="/assets/img/reports/management/page2/diagnosissynopsis1340-zch-700h.png" alt=""
        class="management-report-pg2-treatment-plan-diagnosissynopsis" style={{display : "flex"}} />
      <div class="background1"></div>
    </div>
  </div>
  <div class="last-section">
    <div class="round-box1">
      <div class="round-img">
        <div class="number-box">
          <div class="number">1</div>
        </div>
      </div>
      <div class="box1-txt">
        <div class="blue-box"></div>
        <span class="management-report-pg2-treatment-plan-text40">
          <span class="management-report-pg2-treatment-plan-text37">
            Acute Telogen Effluvium (M)
          </span>
          <br/>
          <span class="round-content">
            Your Prescription of medications for Acute Telogen Effluvium will
            be provided in the Prescription in Your My Reports section Check
            Below for the detailed management report for your condition.
          </span>
          <br />
        </span>
      </div>
    </div>
  </div>
  <div class="round-box2">
    <div class="round-img2">
      <div class="number-box2">
        <div class="number2">2</div>
      </div>
    </div>
    <div class="box1-txt2">
      <div class="blue-box2"></div>
      <span class="management-report-pg2-treatment-plan-text44">
        <span class="management-report-pg2-treatment-plan-text39">
          Chronic Telogen Effluvium (M)
        </span>
        <br/>
        <span class="round-content2">
          <span>
            Your Prescription of medications for Chronic Telogen Effluvium
            will be provided in the Prescription in Your My Reports section
            <br />
            <span>
              Check Below for the detailed management report for your condition.
            </span>
          </span>
        </span>
        <br />
      </span>
    </div>
  </div>
  <div class="round-box3">
    <div class="round-img3">
      <div class="number-box3">
        <div class="number3">3</div>
      </div>
    </div>
    <div class="box1-txt3">
      <div class="blue-box3"></div>
      <span class="management-report-pg2-treatment-plan-text44">
        <span class="management-report-pg2-treatment-plan-text38">
          Androgenetic Alopecia (M) - Grade 4 &amp; Grade 5
        </span>
        <br/>
        <span class="round-content3">
          <span>
            Click this link to know more.
          </span>
        </span>
        <br />
      </span>
    </div>
  </div> */}

    </div>
    
  );
}
