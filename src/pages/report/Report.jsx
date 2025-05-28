import React, { useState, useEffect, useRef } from "react";
import "./Report.css";
import BASE_URL from "../../Config";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast, Toaster } from "react-hot-toast";
import html2pdf from "html2pdf.js";

export default function Report(props) {
  useEffect(() => {
    if (props?.setTitle) props?.setTitle(window.location.pathname);
  }, []);

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const contentRef = useRef();

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
        console.log("ojiejwije", result.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [params.id]);

  const [prescriptionM, setPrescriptionM] = useState({});

  useEffect(() => {
    console.log("koejgt", data.test6?.medicines?.[0]?.medicines);
    setPrescriptionM(data.test6?.medicines?.[0]?.medicines);
  }, [data.test6?.medicines?.[0]?.medicines]);

  if (!data) {
    return <h2>Error</h2>;
  }

  const formatDate = () => {
    const date = new Date();
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return date.toLocaleString("en-GB", options).replace(",", "");
  };

  const generatePDF = () => {
    setLoading(true);

    const element = contentRef.current;
    const opt = {
      // margin: 1, // Top, left, bottom, right margins
      filename: `${data.personal?.name}-Prescription.pdf`,
      image: { type: "jpeg", quality: 0.7 },
      html2canvas: { scale: 1.5, useCORS: true }, // Use high scale for better quality
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      // pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    };

    html2pdf().from(element).set(opt).save();
    setLoading(false);
    toast.success("PDF generated successfully");
  };

  let medData = data.test6?.medicines?.[0]?.medicines || {};
  let p = 7;

  return (
    <div>
      <div style={{ justifyContent: "center" }} className="d-flex">
        {!data?.preview && (
          <button className="pdf" onClick={generatePDF}>
            {loading
              ? "Please wait, download will start"
              : "Generate and Download PDF"}
          </button>
        )}
      </div>
      <div
        id="report"
        className="report-container page-break-2"
        ref={contentRef}
      >
        <div className="heading-container">
          <div className="image-container">
            <img className="rx-logo" src="/RX.png" alt="RX Logo" />
            <img
              className="logo-main"
              src="/assets/img/logo.png"
              alt="Main Logo"
            />
          </div>
          <div className="time-detail">
            <div style={{ fontSize: "16px", fontWeight: "600" }}>
              Ref no: <span>EFA3E6F55</span>
            </div>
            <div style={{ fontSize: "16px", fontWeight: "600" }}>
              Date and Time: <span>{formatDate()}</span>
            </div>
          </div>
          {/* <div>
            <h2 className='color-head-blue'>Dr Amit Agarkar</h2>
            <p>MBBS, MD, FCPS,DDV</p>
            <p>Fellowship in Hair Transplant</p>
            <p>Reg. No,- 06/07/2868</p>
          </div> */}
        </div>
        <div className="patient-detail-container">
          <div className="d-flex flex-column">
            <div className="d-flex">
              <h5 style={{ fontWeight: "600" }}>Patient details:</h5>
              <div
                className="d-flex"
                style={{ margin: "2px 0 0 9px", fontSize: "15px", gap: "10px" }}
              >
                <div>{data.personal?.name}</div>
                <div>{data.personal?.sex}</div>
              </div>
            </div>
            <div className="d-flex">
              <h5 style={{ fontWeight: "600" }}>Phone:</h5>
              <div
                style={{ margin: "2px 0 0 9px", fontSize: "15px", gap: "10px" }}
              >
                {data.personal?.phone}
              </div>
            </div>
          </div>
          {/* <div className="time-detail">
            <p>Ref no: <span>EFA3E6F55</span></p>
            <p>Date and Time: <span>{formatDate()}</span></p>
          </div> */}
        </div>
        <div className="">
          <h5 className="color-head-blue" style={{ fontWeight: "600" }}>
            Doctor's Note/ Provisional Diagnosis
          </h5>
          {data?.dianosis?.map((item, index) => (
            <div key={index} style={{ fontSize: "14px", fontWeight: "600" }}>
              <div>
                {index + 1}) {item.option}
              </div>
              {item.subOption && (
                <div>
                  <li>{item.subOption}</li>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="medicine-container" style={{ height: "63%" }}>
          <div className="labs">
            <div style={{ textAlign: "center", fontWeight: "600" }}>
              <h4 className="med-heading">Lab Tests</h4>
            </div>
            {data.bloodTest?.mainTests.length > 0 ? (
              data.bloodTest.mainTests.map((test, index) => (
                <div key={index} className="input-med-1">
                  <input type="checkbox" checked={true} readOnly />
                  <p className="lab-test-1">{test}</p>

                  {test === "Blood Sugar" && (
                    <div className="sub-input-med">
                      {data.bloodTest.subTests["Blood Sugar"].map(
                        (subTest, subIndex) => (
                          <div key={subIndex} className="input-med-1">
                            <input type="checkbox" checked={true} readOnly />
                            <p className="lab-test-1">{subTest}</p>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No test prescribed.</p>
            )}
          </div>
          <div className="medicine">
            <div style={{ textAlign: "center", fontWeight: "600" }}>
              <h4 className="med-heading">Medicines</h4>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <div className="presc">
                <div style={{ fontSize: "18px", fontWeight: "600" }}>
                  Prescription
                </div>
                <div>
                  <div>
                    {Object.keys(prescriptionM || {}).map((it, ind) => {
                      return (
                        <div
                          className={`d-flex flex-column ${ind + 1 == p || ind + 1 == 10 + p || ind + 1 == 20 + p ? "page-break-1" : ""}`}
                        >
                          <div
                            className="d-flex"
                            style={{ fontSize: "16px", fontWeight: "600" }}
                          >
                            <div>{ind + 1}.</div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                margin: "0 0 0 7px",
                              }}
                            >
                              {it} X {prescriptionM[it].quantity}
                            </div>
                          </div>
                          <div
                            style={{
                              margin: "0 0 6px 25px",
                              ontSize: "13px",
                              fontWeight: "600",
                            }}
                          >{`${
                            prescriptionM[it].dosage
                          } ${prescriptionM[it].route} ${prescriptionM[it].frequency}  ${
                            prescriptionM[it].route === "Oral"
                              ? prescriptionM[it].when
                              : ""
                          } ${prescriptionM[it].duration} ${
                            prescriptionM[it].instructions
                          }`}</div>
                        </div>
                      );
                    })}
                  </div>
                  {/* <div>{data?.test6?.medicine?.option?.split('\n').map((line, index) => <h2 key={index}>{line}</h2>)}</div> */}
                </div>
              </div>
              <div
                className="heading-container item2559"
                style={{ display: "flex", justifyContent: "end" }}
              >
                <div sty>
                  <img
                    className="img-sign"
                    src="/Amit-Sir---Signature.png"
                    alt="Doctor's Image"
                  />
                  <h4 style={{ color: "#008CD7", fontWeight: "600" }}>
                    Dr Amit Agarkar
                  </h4>
                  <div style={{ fontSize: "17px", fontWeight: "600" }}>
                    MBBS, MD, FCPS,DDV
                  </div>
                  <div style={{ fontSize: "17px", fontWeight: "600" }}>
                    Fellowship in Hair Transplant
                  </div>
                  <div style={{ fontSize: "17px", fontWeight: "600" }}>
                    Reg. No,- 06/07/2868
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dec-container" style={{ margin: "50px 0 0 0" }}>
          <p>Disclaimer</p>
        </div>
        <div className="disclaimer">
          <div>
            1. The information and advice provided here is provisional in nature
            as it is based on the limited information made available by the
            patient.
          </div>
          <div>
            2. The information is confidential in nature and for recipients use
            only.
          </div>
          <div>3.The Prescription is generated on a Teleconsultation.</div>
          <div>4. Not Valid for Medico-legal purpose.</div>
        </div>
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
}
