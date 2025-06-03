import React, { useState, useEffect, useRef } from "react";
import Page1 from "./Components/Page1";
import Page2 from "./Components/Page2";
import Page3 from "./Components/Page3";
import Page4 from "./Components/Page4";
import Page5 from "./Components/Page5";
import Page6 from "./Components/Page6";
import Page7 from "./Components/Page7";
import Page8 from "./Components/Page8";
import html2pdf from "html2pdf.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import styles from "./index.module.css";

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

export default function ManagementReport(props) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props?.setTitle) props?.setTitle(window.location.pathname);
  }, []);

  const renderSection = (title, content) => (
    <div className="mb-2.5">
      <h3 className="text-sm my-1">{title}</h3>
      {Object.entries(content).map(([key, value]) => (
        <div key={key} className="mb-1">
          <strong className="text-xs">{value.question}: </strong>
          <span className="text-xs">{value.option}</span>
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
          `https://apihair.txogavideo.in/api/v1/doctor/getPrescription?appointmentId=${params.id}`
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

  const isLargeScreen = useMediaQuery("(min-width:1200px)");

  const contentRef = useRef();

  const generatePDF = () => {
    setLoading(true);
    const element = contentRef.current;
    const opt = {
      margin: 0,
      filename: `${data?.personal?.name}-Assessment Report.pdf`,
      image: { type: "jpeg", quality: `` },
      html2canvas: { scale: 3, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };
    html2pdf().from(element).set(opt).save();
    setLoading(false);
    toast.success("Report download successfully");
  };

  const scrollToTop = () => {
    contentRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="managementReport" className={styles.container}>
      <div className={styles.buttonContainer}>
        {!data?.preview && (
          <button className={styles.downloadButton} onClick={generatePDF}>
            {loading ? "Please wait, download will start" : "Download PDF"}
          </button>
        )}
      </div>
      <div className={styles.contentContainer}>
        <div className={!isLargeScreen ? styles.hidden : ""}>
          <div ref={contentRef} id="report">
            <Page1 data={data} />
            <Page2 data={data} />
            <Page3 data={data} />
            <Page4 data={data} />
            <Page5 data={data} />
            <Page6 data={data} />
            <Page7 data={data} />
            <Page8 data={data} />
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
      <a
        id="scrollUp"
        href="#managementReport"
        className={styles.scrollUp}
        onClick={scrollToTop}
      >
        <i className="fa fa-angle-up"></i>
      </a>
    </div>
  );
}
