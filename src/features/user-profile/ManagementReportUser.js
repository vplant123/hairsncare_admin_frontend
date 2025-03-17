import React, { useState, useEffect, useRef } from "react";
// import "./ManagementReport.css";
import Page1 from "../admin-dashboard/management-report/Page1";
import Page2 from "../admin-dashboard/management-report/Page2";
import Page3 from "../admin-dashboard/management-report/Page3";
import { useParams } from "react-router-dom";
import BASE_URL from "../../Config";
import Page4 from "../admin-dashboard/management-report/Page4";
import Page5 from "../admin-dashboard/management-report/Page5";
import Page6 from "../admin-dashboard/management-report/Page6";
import Page7 from "../admin-dashboard/management-report/Page7";
import Page8 from "../admin-dashboard/management-report/Page8";
import Page9 from "../admin-dashboard/management-report/Page9";
import Page10 from "../admin-dashboard/management-report/Page10";

import html2pdf from 'html2pdf.js';
import { toast, ToastContainer } from "react-toastify";
import Page11 from "../admin-dashboard/management-report/Page11";

export default function ManagementReportUser({data}) {
 
  const [loading, setLoading] = useState(false);
  console.log("njwiejir",data)
 
  const renderSection = (title, content) => (
    <div style={{ marginBottom: "10px" }}>
      <h3 style={{ fontSize: "14px", margin: "5px 0" }}>{title}</h3>
      {Object.entries(content).map(([key, value]) => (
        <div key={key} style={{ marginBottom: "5px" }}>
          <strong style={{ fontSize: "12px" }}>{value.question}: </strong>
          <span style={{ fontSize: "12px" }}>{value.option}</span>
        </div>
      ))}
    </div>
  );
  function getCanvasDataURL(canvas, format) {
    format = format === 'jpg' || format === 'jpeg' ? 'image/jpeg' : 'image/png';
    return canvas.toDataURL(format);
  }
  
  // const generatePDF = (format = 'png') => {
  //   setLoading(true)
  //   const input = document.getElementById("report");
  //   html2canvas(input, { scale: 2 })
  //     .then((canvas) => {
  //       const imgData = getCanvasDataURL(canvas, format);
  //       const pdf = new jsPDF("p", "mm", "a4",true);
  //       const imgWidth = 210;
  //       const pageHeight = 295;
  //       const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //       let heightLeft = imgHeight;
  //       let position = 0;
  
  //       pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight;
  
  //       while (heightLeft >= 0) {
  //         position = heightLeft - imgHeight;
  //         pdf.addPage();
  //         pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  //         heightLeft -= pageHeight;
  //       }
  
  //       pdf.save("DoctorAnalyseReport.pdf");
  //       setLoading(false)

  //     })
  //     .catch((error) => {
  //       setLoading(false)
  //       console.error("Error generating PDF:", error)
  //     });
  // };

  const contentRef = useRef();

  const generatePDF = () => {
    setLoading(true)
    const element = contentRef.current;
    const opt = {
      margin: 1, // Top, left, bottom, right margins
      filename: `${data?.personal?.name}-Management Report.pdf`,
      image: { type: 'jpeg', quality: 0.7 },
      html2canvas: { scale: 1.5, useCORS: true }, // Use high scale for better quality
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    };
    html2pdf().from(element).set(opt).save();
    setLoading(false)
    toast.success("Report download successfully")
  };
  const scrollToTop = () =>{ 
    console.log("kerojojso")
    contentRef.current.scrollIntoView({ behavior: "smooth" });
  }; 
  
  return (
    <div id="managementReport">   
    
    <div style={{ justifyContent: "center" }} className='d-flex'>
        {!data?.preview && (
          <button className="pdf" onClick={generatePDF}>
            {loading
              ? "Please wait, download will start"
              : "Download PDF"}
          </button>
        )}

      </div>
  <div  id="report"
    className="report-container1"
    ref={contentRef}
    style={{ padding: "10px", boxSizing: "border-box" }}>
      <Page1 data={data} />
      <Page11 data1={data?.dianosis} />
      <Page2 />
      <Page3 />
      {data?.hairScalp?.data?.scalp?.length > 0 ? data?.hairScalp?.data?.scalp?.map((item) => {
        return <Page4 data={item} />;
      }) : <></>}
      { data?.hairScalp?.data?.hairQuality?.length>0 ?  data?.hairScalp?.data?.hairQuality?.map((item) => {
        return <Page4 data={item} />;
      }) : <></>}
      <Page4
        data={
          data?.hairScalp?.data?.hairDensity === "Good"
            ? "hairdensity good"
            : data?.hairScalp?.data?.hairDensity
        }
      />
      <Page4 data={data?.hairScalp?.data?.colorVibrancy} />
      <Page4 data={data?.hairScalp?.data?.moisture} />
      <Page4 data={data?.hairScalp?.data?.hairBreakage} />

      {data?.management?.Nutrition?.map((item) => {
        return item === "Diet for Thyroid" ? (
          <>
            {" "}
            <Page5 value={item} />
            <Page8 value={item} />
            <Page6 value={item} />
            <Page7 value={item} />
          </>
        ) : (
          <>
            <Page5 value={item} />
            <Page6 value={item} />
            <Page7 value={item} />
          </>
        );
      })}

      {data?.management?.LifeStyle?.map((item) => (
        <Page9 value={item} />
      ))}
      {data?.management?.Stress?.map((item) => (
        <Page10 value={item} />
      ))}
      <div className="a4-page">
<div className="heading-container item2559">
          <div className="dec-container">
            <p>Disclaimer</p>
          </div>
          <div>
            <img className="img-sign" src="/Amit-Sir---Signature.png" alt="Doctor's Image" style={{maxWidth : "55%"}} />
            <h2>Dr Amit Agarkar</h2>
            <p>MBBS, MD, FCPS,DDV</p>
            <p>Fellowship in Hair Transplant</p>
            <p>Reg. No,- 06/07/2868</p>
          </div>
        </div>
        <div className="disclaimer">
        <p>1. The information and advice provided here is provisional in nature as it is based on the limited information made available by the patient.</p>
          <p>2. The information in confidential in nature and for recipients use only.</p>
          <p>3. The Prescription is generated on a Teleconsultation.</p>
          <p>4. Not Valid for Medico-legal purpose.</p>
        </div>
</div>

    </div>
    <ToastContainer position="bottom-right" />
    <a id="scrollUp" href="#managementReport" style={{position: "fixed", zIndex: "2147483647"}} onClick={scrollToTop}><i class="fa fa-angle-up"></i></a>

  </div>
  
  );
}
