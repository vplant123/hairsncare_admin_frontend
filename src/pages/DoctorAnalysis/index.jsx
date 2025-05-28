import React, { useState, useEffect, useRef } from "react";
import Page1 from "./Components/Page1";
import styles from "./index.module.css";
import html2pdf from "html2pdf.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Page2 from "./Components/page2";
import Page3 from "./Components/page3";
import { useParams } from "react-router-dom";
// import BASE_URL from "../../../Config";

// Custom hook for media queries
const useMediaQuery = query => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

export default function DoctorAnalysis(props) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props?.setTitle) props?.setTitle(window.location.pathname);
  }, []);

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
    format = format === "jpg" || format === "jpeg" ? "image/jpeg" : "image/png";
    return canvas.toDataURL(format);
  }
  const [data, setData] = useState({});
  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/doctor/getPrescription?appointmentId=${params.id}`
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
  console.log("njwiejir", data);

  const isLargeScreen = useMediaQuery("(min-width:1200px)");

  const contentRef = useRef();

  const generatePDF = () => {
    setLoading(true);
    const element = contentRef.current;
    const opt = {
      margin: 0, // Top, left, bottom, right margins
      filename: `${data?.personal?.name}-Assessment Report.pdf`,
      image: { type: "jpeg", quality: `` },
      html2canvas: { scale: 3, useCORS: true }, // Use high scale for better quality
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };
    html2pdf().from(element).set(opt).save();
    setLoading(false);
    toast.success("Report download successfully");
  };
  const scrollToTop = () => {
    console.log("kerojojso");
    contentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="managementReport">
      <div style={{ justifyContent: "center" }} className="d-flex">
        {!data?.preview && (
          <button className="pdf" onClick={generatePDF}>
            {loading ? "Please wait, download will start" : "Download PDF"}
          </button>
        )}
      </div>
      <div
        className=""
        style={{
          padding: "10px",
          boxSizing: "border-box",
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 25%",
        }}
      >
        <div style={{ display: !isLargeScreen ? "none" : "" }}>
          <div ref={contentRef} id="report">
            <Page1 data={data} />
            <Page3 data={data} />
            <Page2 data={data} />
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
      <a
        id="scrollUp"
        href="#managementReport"
        style={{ position: "fixed", zIndex: "2147483647" }}
        onClick={scrollToTop}
      >
        <i className="fa fa-angle-up"></i>
      </a>
    </div>
  );
}
