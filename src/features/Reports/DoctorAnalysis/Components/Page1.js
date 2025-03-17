import React from "react";
import "./page1.css";

export default function Page1({ data }) {
  console.log("jojerofre", data);
  return (
    <div className="" style={{padding : "0 20px",pageBreakBefore : "avoid"}}>


      <div className="" style={{padding : "20px"}}>
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

      <div className="d-flex" style={{ gap: "6%" }}>
        <div
          className="head-managereport-page1-sec-1 d-flex flex-column mt-5"
          style={{ gap: "12px" }}
        >
          <div
            className="head-managereport-page1-sec-1-left"
            style={{ background: "#02A1E5" }}
          >
            Diagnosis
          </div>
          <div
            className="head-managereport-page1-sec-1-left"
            style={{ background: "rgba(159, 239, 248, 1)" }}
          >
            Hair & Scalp Analysis
          </div>
          <div
            className="head-managereport-page1-sec-1-left"
            style={{ background: "rgba(190, 206, 55, 1)" }}
          >
            Nutritional Assessment
          </div>
          <div
            className="head-managereport-page1-sec-1-left"
            style={{ background: "rgba(248, 180, 115, 1)" }}
          >
            Lifestyle Assessment
          </div>
          <div
            className="head-managereport-page1-sec-1-left"
            style={{ background: "rgba(230, 146, 208, 1)" }}
          >
            Stress Analysis
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
        <div className="d-flex flex-column" style={{ width: "50%" }}>
          <div className="sec-2-text-1">Welcome to the hairsncares.com</div>
          <div style={{ fontSize: "28px" }}>YOUR <span style={{color : "rgba(0, 160, 227, 1)"}}>HAIR EXPERT!
            </span></div>
          <div style={{fontSize : "12px"}}>
            Dear {data?.personal?.sex == "Male" ? "Mr" : "Miss"}. {data?.personal?.name}, We appreciate your interest in taking part in
            this detailed hair assessment. Your willingness to participate will
            greatly contribute to our research and understanding of the subject
            matter. Thank you for your time and effort in completing this test.
            We assure you that your responses will be treated with utmost
            confidentiality and will be utilized solely for research purposes.
            Your contribution is immensely valuable, and we are grateful for
            your cooperation. Your involvement plays a pivotal role in the
            success of hair growth journey
          </div>
        </div>
        <div className="row sec-2-right" style={{width : "45%"}}>
          <div
            className="col-4 d-flex flex-column"
            style={{ padding: "10px", height: "70px", alignItems: "center",textAlign : "center",gap : "7px" }}
          >
            <img
              src="/assets/img/reports/doctorAnalysis/page1/isolationmode167-alsy.svg"
              alt="IsolationMode167"
              style={{ height: "100%" }}
            />
            <span style={{fontSize: "10px",color  :"white",fontWeight : "700"}}>Expert Dermats</span>
          </div>

          <div
            className="col-4 d-flex flex-column"
            style={{ padding: "10px", height: "70px", alignItems: "center",textAlign : "center",gap : "7px" }}
          >
            <img
                    src="/assets/img/reports/doctorAnalysis/page1/isolationmode178-0ogs.svg"
              style={{ height: "100%" }}
            />
            <span style={{fontSize: "10px",color  :"white",fontWeight : "700"}}>Total Care Approach</span>
            </div>

          <div
            className="col-4 d-flex flex-column"
            style={{ padding: "10px", height: "70px", alignItems: "center",textAlign : "center",gap : "7px" }}
          >
            <img
                  src="/assets/img/reports/doctorAnalysis/page1/layer11117-b27.svg"
                  alt="IsolationMode167"
              style={{ height: "100%" }}
            />
            <span style={{fontSize: "10px",color  :"white",fontWeight : "700"}}>Reliability</span>

          </div>

          <div
            className="col-4 d-flex flex-column"
            style={{ padding: "10px", height: "70px", alignItems: "center",textAlign : "center",gap : "7px" }}
          >
            <img
                    src="/assets/img/reports/doctorAnalysis/page1/isolationmode167-alsy.svg"
                    alt="IsolationMode167"
              style={{ height: "100%" }}
            />
            <span style={{fontSize: "10px",color  :"white",fontWeight : "700"}}> E-monitoring and Support</span>

          </div>

          <div
            className="col-4 d-flex flex-column"
            style={{ padding: "10px", height: "70px", alignItems: "center",textAlign : "center",gap : "7px" }}
          >
            <img
                    src="/assets/img/reports/doctorAnalysis/page1/isolationmode153-p23.svg"
                    alt="IsolationMode167"
              style={{ height: "100%" }}
            />
            <span style={{fontSize: "10px",color  :"white",fontWeight : "700"}}>Proven Therapies</span>

          </div>

          <div
            className="col-4 d-flex flex-column"
            style={{ padding: "10px", height: "70px", alignItems: "center",textAlign : "center",gap : "7px" }}
          >
            <img
                    src="/assets/img/reports/doctorAnalysis/page1/isolationmode187-pw16.svg"
                    alt="IsolationMode167"
              style={{ height: "100%" }}
            />
            <span style={{fontSize: "10px",color  :"white",fontWeight : "700"}}>FDA Appproved Medications</span>

          </div>
        </div>
      </div>
 
      <div className="" style={{marginTop : "70px"}}>
      <div className="sec-3-pos-1" style={{position : "relative"}}>
        <div className="row" style={{padding : 0}}>
          <div className="col-3"  style={{padding : "0 40px",position : "relative"}}>
            <div className="sec-3-pos-2" style={{
                  position: "absolute",
                  top: "-15px",
                  width: "100%"
            }}>
              View Report
            </div>
          </div>
          <div className="col-3 offset-1"  style={{padding : "0 40px",position : "relative"}}>
            <div className="sec-3-pos-2" style={{
                  position: "absolute",
                  top: "-15px",
                  width: "100%"
            }}>
              View Card & Order Medicines
            </div>
          </div>
          <div className="col-3 offset-1"  style={{padding : "0 40px",position : "relative"}}>
            <div className="sec-3-pos-2" style={{
                  position: "absolute",
                  top: "-15px",
                  width: "100%"
            }}>
              Medicines at Doorstep
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-4" style={{padding : "0 30px"}}>
          <div className="sec-4-main row">
          <div className="col-4" style={{marginTop: "5%",position: "relative"}}>
            <img
            src="/assets/img/reports/doctorAnalysis/page1/isolationmode1137-n7jv.svg"
            style={{width : "100%"}}
          />
          <div className="" style={{fontSize: "8px",
    position: "absolute",
    top: "20px",
    left: "17px",
    fontWeight: "700"}}>
          Analysis Report
          </div>
            </div>
            <div className="col-4" style={{marginTop: "30%",position: "relative"}}>
            <img
            src="/assets/img/reports/doctorAnalysis/page1/isolationmode1137-n7jv.svg"
            style={{width : "100%"}}

          />
                    <div className="" style={{fontSize: "5px",
    position: "absolute",
    top: "26px",
    left: "17px",
    fontWeight: "700"}}>
          Management Report
          </div>
            </div>
            <div className="col-4" style={{marginTop: "15%",position: "relative"}}>
            <img
            src="/assets/img/reports/doctorAnalysis/page1/isolationmode1137-n7jv.svg"
            style={{width : "100%"}}

          />
                    <div className="" style={{fontSize: "5px",
    position: "absolute",
    top: "30px",
    left: "19px",
    fontWeight: "700"}}>
          Prescription
          </div>
            </div>
          </div>
        </div>

        <div className="col-4" style={{padding : "0 30px"}}>
          <div className="sec-4-main" style={{    display: "flex",
    justifyContent: "center",alignItems : "center"}}>
          <img
            src="/assets/img/reports/doctorAnalysis/page1/image2361165-7n1-300w.png"
            style={{height : "85%"}}
          />
          </div>
        </div>

        <div className="col-4" style={{padding : "0 30px"}}>
          <div className="sec-4-main row" style={{    display: "flex",
    justifyContent: "center",alignItems : "center"}}>
          <img
            src="/assets/img/reports/doctorAnalysis/page1/image2351164-ija-400w.png"
            style={{height : "85%",width : "75%"}}
          />
          </div>
        </div>
        
      </div>
      </div>








      <div
      className="head-managereport mt-2"
      style={{fontSize : "8px",height : "100%",color : "#FFFFFF",background: "rgba(0, 160, 227, 1)"}}
    ><span style={{fontWeight:  "700"}}>Legal Disclaimer</span>: This communication aims to ensure your comprehensive understanding of the diagnosis's nature. (Read more.. Please be cognizant that, as of this juncture, the diagnosis is regarded as provisional, signifying its preliminary status. It is derived solely from the data and photos (if provided) obtained through the online hair test furnished by you. Nevertheless, it is imperative to accentuate that the precision of this diagnosis may exhibit incongruities across individuals. Various determinants, encompassing distinctive health conditions, genetic makeup, and external influences, can contribute to disparities in accuracy. While our utmost endeavor is directed towards accuracy, we hereby acknowledge the potential divergence in individual cases, thus warranting judicious discretion during the interpretation of outcomes.) Diagnosis & Details
    </div>
 
    </div> 
    </div>
  );
}
