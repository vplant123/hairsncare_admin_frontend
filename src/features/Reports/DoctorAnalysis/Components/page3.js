import React from "react";
import "./page3.css"

export default function Page3({ data }) {
  console.log("jojerofre", data?.personal);

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
    <div className="page-avoid-1" style={{padding : "10px"}}>

<div
      className="head-managereport d-flex"
      style={{ justifyContent: "space-between" }}
    >
      <img src="/assets/img/logo.png" className="head-managereport-logo" />
      <div className="head-managereport-text1">Doctors  Analysis Report</div>
      <div
        className="text-flex-line-center-veritcal"
        style={{ color: "rgba(84, 84, 84, 1)" }}
      >
        Smart Report
      </div>
    </div>

    <div style={{display : "flex",justifyContent : "center",margin : "10px 0"}}>
        <div className="page-2-sec-1-main" style={{fontSize : "16px",fontWeight : "600",background : "rgba(2, 161, 229, 1)"}}>
        Diagnosis

        </div>
    </div>

    <div style={{display : "flex",justifyContent : "center",alignItems : "center"}}>
        <div style={{width: "50%",fontSize : "16px",fontWeight:"700",color : "rgba(71, 71, 71, 1)",textAlign : "center"}}>
        Your Provisional Diagnosis is
        </div>
    </div>


    <div className="d-flex" style={{gap : "3%"}}>
        <div style={{width:"30%"}}>
        <img
        src="/assets/img/reports/doctorAnalysis/page3/hairdiagnosishighres11369-rgaw-400h.png"
        style={{width : "100%",height : "100%"}}
      />
        </div>

        <div style={{fontSize:  "10px",    width: "15%",
    display: "flex",
    alignItems: "center",
    padding: "29px 0",height: "100%"}}>
        <img
        src="/assets/img/reports/doctorAnalysis/page3/whatsappimage20241007at62119pm11219-g2ga-200h.png"
        style={{height : "100%",width : "100%"}}
      />        </div>
        <div className="page-3-sec-2" style={{width:"40%",display:"flex",flexDirection : "column",justifyContent : "center",alignItems: "center",gap : "10px"}}>


        {data?.dianosis?.map((item)=>{
                  return <>
                              <div className="page-3-sec-3 d-flex" style={{padding : "10px",width : "90%",gap : "8px",cursor : "pointer"}} onClick={() => {
                                window.open(data11?.[item.option])
                              }}>
                <div className="page-3-sec-3-sec-1">
                </div>
                <div style={{fontSize : "10px"}}>
                {item.option + " " + (item.subOption ? item.subOption : "")}
                </div>
            </div>
                  </>
                })}


{/* 
            <div className="page-3-sec-3 d-flex" style={{padding : "10px",width : "90%",gap : "8px"}}>
                <div className="page-3-sec-3-sec-1">
                </div>
                <div style={{fontSize : "10px"}}>
                Androgenetic Alopecia (M) Grade 1
                </div>
            </div>
            <div className="page-3-sec-3 d-flex" style={{padding : "10px",width : "90%",gap : "8px"}}>
                <div className="page-3-sec-3-sec-1">
                </div>
                <div style={{fontSize : "10px"}}>
                Androgenetic Alopecia (F) Grade 2 PCOD
                </div>
            </div> */}
        </div>
    </div>

    <div className="d-flex mt-2" style={{justifyContent : "center", alignItems : "center"}}>
        <div style={{width : "70%",fontSize : "10px",textAlign : "center"}}> 
        Identifying the cause of hair loss through diagnosis ensures precise treatments, minimizes ineffective solutions, and uncovers potential health concerns. This approach enhances both treatment success and overall well-being. 
        </div>
    </div>

    <div className="d-flex" style={{justifyContent : "center", alignItems : "center"}}>
        <div style={{width : "50%",fontSize : "10px",textAlign : "center"}}> 
        For further information for your condition click on the diagnosis.        </div>
    </div>

    <div style={{display : "flex",justifyContent : "center",margin : "5px 0"}}>
        <div className="page-2-sec-1-main" style={{fontSize : "16px",fontWeight : "600",background : "rgba(159, 239, 248, 1)"}}>
        Hair & Scalp Analysis

        </div>
    </div>

    <div className="d-flex mt-2" style={{justifyContent : "center", alignItems : "center"}}>
        <div style={{width : "70%",fontSize : "10px",textAlign : "center"}}> 
        This report evaluates your hair health to identify concerns and provide recommendations, analyzing hair quality, scalp condition, density, color, breakage, and hydration based on your online test data.        </div>
    </div>
    
{/* 
    <div className="" style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }}>
        <img src = "/assets/img/reports/doctorAnalysis/page3/Screenshot 2024-11-15 at 12.47.37 AM.png" style={{width  : "400px",height : "200px"}} />
    </div> */}



    <div className="" style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }}>
      <div style={{width : "80%",  display: "flex",
        justifyContent: "center",
        alignItems: "center",padding : "20px 0 ",position : "relative",flexDirection:"column",gap : "18px"}} className="man-page-3-color-main">
        <div style={{width : "35%"}} >
        <img src = "/assets/img/reports/doctorAnalysis/page3/image.png" style={{width : "100%",height : "100%"}} />
        </div>
        <div className="man-page-3-color-text" style={{    position: "absolute",
    left: "8%", 
    top: "7%",background :data?.overall?.["ExaminationColor"] || "#28EB28"}}>
          <div style={{width : "30%",display :"flex",justifyContent : "center",alignItems :"center"}}>
            <div style={{borderRadius: "69px",background : "#FFFFFF",height: "85%",padding : "5px"}}>
            <img src="/assets/img/reports/doctorAnalysis/page3/isolationmode1258-injk.svg" style={{width : "100%",height : "100%"}}/> 
            </div>
          </div>
          <div className="man-page-3-color-text-sec">
          Scalp Examination
          </div>
        </div>



        <div className="man-page-3-color-text" style={{    position: "absolute",
    left: "4%", 
    top: "33%",background :data?.overall?.["DensityColor"] || "#28EB28"}}>
          <div style={{width : "30%",display :"flex",justifyContent : "center",alignItems :"center"}}>
            <div style={{borderRadius: "69px",background : "#FFFFFF",height: "85%",padding : "5px"}}>
            <img           src="/assets/img/reports/doctorAnalysis/page3/objects1279-291a.svg"
 style={{width : "100%",height : "100%"}}/> 
            </div>
          </div>
          <div className="man-page-3-color-text-sec">
          Hair Density 
          </div>
        </div>

        <div className="man-page-3-color-text" style={{    position: "absolute",
    left: "8%", 
    bottom: "24%",background :data?.overall?.["MoistureColor"] || "#28EB28"}}>
          <div style={{width : "30%",display :"flex",justifyContent : "center",alignItems :"center"}}>
            <div style={{borderRadius: "69px",background : "#FFFFFF",height: "85%",padding : "5px"}}>
            <img src="/assets/img/reports/doctorAnalysis/page3/objects1299-bec2.svg" style={{width : "100%",height : "100%"}}/> 
            </div>
          </div>
          <div className="man-page-3-color-text-sec">
          Moisture & Hydration of Hair 
          </div>

        </div>


        <div className="man-page-3-color-text" style={{    position: "absolute",
    right: "8%", 
    bottom: "24%",background :data?.overall?.["breakageColor"] || "#28EB28"}}>
          <div style={{width : "30%",display :"flex",justifyContent : "center",alignItems :"center"}}>
            <div style={{borderRadius: "69px",background : "#FFFFFF",height: "85%",padding : "5px"}}>
            <img src="/assets/img/reports/doctorAnalysis/page3/isolationmode1287-w6ih.svg" style={{width : "100%",height : "100%"}}/> 
            </div>
          </div>
          <div className="man-page-3-color-text-sec">
          
          Hair Breakage
          </div>
        </div>

        <div className="man-page-3-color-text" style={{    position: "absolute",
    right: "4%", 
    top: "33%",background :data?.overall?.["vibrancy"] || "#28EB28"}}>
          <div style={{width : "30%",display :"flex",justifyContent : "center",alignItems :"center"}}>
            <div style={{borderRadius: "69px",background : "#FFFFFF",height: "85%",padding : "5px"}}>
            <img src="/assets/img/reports/doctorAnalysis/page3/isolationmode1292-uqpj.svg" style={{width : "100%",height : "100%"}}/> 
            </div>
          </div>
          <div className="man-page-3-color-text-sec">
          Color Vibrancy
          </div>
        </div>

        <div className="man-page-3-color-text" style={{    position: "absolute",
    right: "8%", 
    top: "7%",background :data?.overall?.["qualityColor"] || "#28EB28"}}>
          <div style={{width : "30%",display :"flex",justifyContent : "center",alignItems :"center"}}>
            <div style={{borderRadius: "69px",background : "#FFFFFF",height: "85%",padding : "5px"}}>
            <img src="/assets/img/reports/doctorAnalysis/page3/objects1294-96jg.svg" style={{width : "100%",height : "100%"}}/> 
            </div>
          </div>
          <div className="man-page-3-color-text-sec">
          Hair Quality Texture 
          </div>
        </div>

        <div>
        In above chart green is normal and yellow needs improvement.
        </div>

        



      </div>
    </div>















    <div className="d-flex page-break-2" style={{gap : "5%",marginTop : "1%"}}>
        <div style={{width : "50%"}}>
        <img src = "/assets/img/reports/doctorAnalysis/page3/Screenshot 2024-11-15 at 12.50.37 AM.png" style={{width  : "100%",height : "100%"}} />
        </div>

        <div style={{width : "45%",gap : "5%"}} className="d-flex flex-column">
            <div style={{fontSize : "18px",fontWeight : "700"}}>
            Conclusion
            </div>
            <div style={{fontSize : "12px",fontWeight  :"600"}}>
            Your Overall hair health is deemed to be 
            </div>
            <div className="page-3-sec-4" style={{display:"flex",justifyContent : "center",alignItems: "center",gap : "10px"}}>
                <div style={{width : "40%",        display: "flex",
        justifyContent: "center",
        alignItems: "center"}}>
                <img
        src="/assets/img/reports/doctorAnalysis/page3/image59627111367-5sgk-200w.png"
        style={{width : "65%",height : "100%"}}
      />
                </div>
      <div style={{fontSize : "12px"}}>
      {data?.hairScalp?.selectedOption?.value} 
      </div>
                </div>
                <div style={{fontSize : "12px",}}>
                {data?.hairScalp?.selectedOption?.description}
                </div>
        </div>
    </div>


    <footer
      className="head-managereport"
      style={{fontSize : "8px",height : "100%",color : "#FFFFFF",background: "rgba(0, 160, 227, 1)",marginTop : "0.5%"}}
    ><span style={{fontWeight:  "700"}}>Legal Disclaimer</span>: This communication aims to ensure your comprehensive understanding of the diagnosis's nature. (Read more.. Please be cognizant that, as of this juncture, the diagnosis is regarded as provisional, signifying its preliminary status. It is derived solely from the data and photos (if provided) obtained through the online hair test furnished by you. Nevertheless, it is imperative to accentuate that the precision of this diagnosis may exhibit incongruities across individuals. Various determinants, encompassing distinctive health conditions, genetic makeup, and external influences, can contribute to disparities in accuracy. While our utmost endeavor is directed towards accuracy, we hereby acknowledge the potential divergence in individual cases, thus warranting judicious discretion during the interpretation of outcomes.) Diagnosis & Details
    </footer>












    </div>

  );
}
