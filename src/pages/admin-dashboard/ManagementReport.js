import React, { useState, useEffect, useRef } from "react";
import "./ManagementReport.css";
import Page1 from "./management-report/Page1";
import Page2 from "./management-report/Page2";
import Page3 from "./management-report/Page3";
import { useParams } from "react-router-dom";
import BASE_URL from "../../Config";
import Page4 from "./management-report/Page4";
import Page5 from "./management-report/Page5";
import Page6 from "./management-report/Page6";
import Page7 from "./management-report/Page7";
import Page8 from "./management-report/Page8";
import Page9 from "./management-report/Page9";
import Page10 from "./management-report/Page10";
import Page11 from "./management-report/Page11";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { setLevelRef } from "@testing-library/user-event/dist/cjs/utils/index.js";
import { toast, ToastContainer } from "react-toastify";
import html2pdf from 'html2pdf.js';

export default function ManagementReport(props) {

  useEffect(() => {
    if(props?.setTitle) props?.setTitle(window.location.pathname)
  },[])



  const [data, setData] = useState({});
  const [loader, setLoader] = useState(false);
  console.log("data?.hairScalp?.data",data?.hairScalp?.data)
  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/doctor/getPrescription?appointmentId=${params.id}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  console.log(data);
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
  //   setLoader(true)
  //   console.log("kmfojeroj",format)
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

  //       pdf.addImage(imgData, format?.toUpperCase(), 0, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight;
  
  //       while (heightLeft >= 0) {
  //         position = heightLeft - imgHeight;
  //         pdf.addPage();
  //         pdf.addImage(imgData, format?.toUpperCase(), 0, position, imgWidth, imgHeight);
  //         heightLeft -= pageHeight;
  //       }
  //       pdf.save(`${data?.personal?.name}-Diagnosis Report.pdf`);
  //       toast.success("Report download successfully")
  //       setLoader(false)
  //     })
  //     .catch((error) => {
  //       setLoader(false)
  //       console.error("Error generating PDF:", error)}
  //     );
  // };

  const contentRef = useRef();

  const handleDownloadPdf = () => {
    setLoader(true)
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
    setLoader(false)
    toast.success("Report download successfully")
  };
  
  return (
    <>   
    {/* <button
    onClick={() => handleDownloadPdf()}
    style={{ padding: "10px 20px", fontSize: "10px", marginTop: "10px" }}
  >
    {loader ? "Downloading"  : "Download PDF"}
   
  </button> */}

  <div style={{ textAlign: 'center' }}>
        <button className='pdf' onClick={handleDownloadPdf}>
          {loader ? "Please wait, download will start" : 'Download PDF'}
        </button>
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

    
  </>
  
  );
}
