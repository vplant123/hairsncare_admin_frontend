import React, { useState, useEffect, useRef } from "react";
import Page1 from "./Components/Page1";

import "./index.css";
import html2pdf from 'html2pdf.js';
import { toast, ToastContainer } from "react-toastify";
import Page2 from "./Components/page2";
import Page3 from "./Components/page3";
import { useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import BASE_URL from "../../../Config";

export default function DoctorAnalysis(props) {
 
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    if(props?.setTitle) props?.setTitle(window.location.pathname)
  },[])

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
  const [data, setData] = useState({});
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
  console.log("njwiejir",data)

  const isLargeScreen = useMediaQuery("(min-width:1200px)");
  
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
      margin: 0, // Top, left, bottom, right margins
      filename: `${data?.personal?.name}-Assessment Report.pdf`,
      image: { type: 'jpeg', quality: `` },
      html2canvas: { scale: 3, useCORS: true }, // Use high scale for better quality
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
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
  <div 
    className=""
    // ref={contentRef}
    style={{ padding: "10px", boxSizing: "border-box",width  :"50%",display : "flex",flexDirection: "column", justifyContent : "center",alignItems : "center",margin : "0 25%" }}>
      {/* <div style={{pageBreakAfter: 'always'}}> */}
      <div style={{display : !isLargeScreen ? "none" : ""}}>
      <div ref={contentRef} id="report" >
      <Page1 data={data} />

{/* </div> */}
{/* <div style={{pageBreakAfter: 'always'}}> */}
{/* <div style={{pageBreakAfter: 'always'}}> */}
<Page3 data={data} />
<Page2 data={data} />

{/* </div> */}

      </div>
      </div>



      {/* </div> */}



    </div>
    <ToastContainer position="bottom-right" />
    <a id="scrollUp" href="#managementReport" style={{position: "fixed", zIndex: "2147483647"}} onClick={scrollToTop}><i class="fa fa-angle-up"></i></a>

  </div>
  
  );
}
