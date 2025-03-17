// import React, { useState, useEffect } from 'react';
// // import './Report.css';
// import BASE_URL from '../../Config';
// import { useParams } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import { toast } from 'react-toastify';

// export default function PrescriptionUser({data}) {
// //   const [data, setData] = useState({});
//   const [loading,setLoading]=useState(false)
//   const params = useParams();

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const response = await fetch(`${BASE_URL}/doctor/getPrescription?userId=${params.id}`);
// //         if (!response.ok) {
// //           throw new Error(`Error: ${response.status}`);
// //         }
// //         const result = await response.json();
// //         setData(result.data);
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     };

// //     fetchData();
// //   }, [params.id]);
// // console.log(data)
// if(!data){
//   return <h2>Error</h2>
// }
//   const formatDate = () => {
//     const date = new Date();
//     const options = {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//       hour12: false
//     };
//     return date.toLocaleString('en-GB', options).replace(',', '');
//   };

//   const generatePDF = () => {
//     setLoading(true)
//     const input = document.getElementById('report');
//     html2canvas(input).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//       pdf.save('report.pdf');
//       setLoading(false)
//       toast.success('pdf generated successfully')
//     });
//   };

//   return (
//     <div>
//       <div style={{textAlign:'center'}}><button className='pdf' onClick={generatePDF}>{loading?"Please wait download will start":'Generate and Download PDF'}</button></div>
//       <div id="report" className="report-container">
//         <div className="heading-container">
//           <div className="image-container">
//             <img className="rx-logo" src="/medical-prescription-pharmaceutical-drug-pharmacy-symbol-clip-art-rx-logo-image-b7b1ba0f952be8c1872ae92a48af3874.png" alt="RX Logo" />
//             <img className="logo-main" src="/assets/img/logo.png" alt="Main Logo" />
//           </div>
//           <div>
//             <h2>Dr Amit Agarkar</h2>
//             <p>MBBS, MD, FCPS,DDV</p>
//             <p>Fellowship in Hair Transplant</p>
//             <p>Reg. No,- 06/07/2868</p>
//           </div>
//         </div>
//         <div className="patient-detail-container">
//           <div>
//             <p>Patient details</p>
//             <h3>{data.personal?.name}</h3>
//             <h3>{data.personal?.age} years, {data.personal?.sex}</h3>
//             <p className="phone-detail">Phone: <span>{data.personal?.phone}</span></p>
//           </div>
//           <div className="time-detail">
//             <p>Ref no: <span>EFA3E6F55</span></p>
//             <p>Date and Time: <span>{formatDate()}</span></p>
//           </div>
//         </div>
//         <div className="doctor-notes-container">
//           <h2>Doctor's Note/ Provisional Diagnosis</h2>
//           {/* <p>1. Androgenetic Alopecia</p>
//           <p>2. PCOD</p> */}
//           {data?.dianosis?.map((item,index)=>{
//                   return <>
//                   <p>{index+1}) {item.option}</p>

// {item.subOption&&<p><li>{item.subOption}</li></p>}
//                   </>
//                 })}
//         </div>
//         <div className="medicine-container">
//           <div className="labs">
//             <div style={{ textAlign: 'center' }}><h2 className="med-heading">Lab Tests</h2></div>
//             <p>No test prescribed.</p>
//             <div className="input-med"><input type="checkbox" /><p>CBC</p></div>
//             <div className="input-med"><input type="checkbox" /><p>Blood Sugar</p></div>
//             <div className="sub-input-med">
//               <div className="input-med"><input type="checkbox" /><p>F</p></div>
//               <div className="input-med"><input type="checkbox" /><p>PP</p></div>
//               <div className="input-med"><input type="checkbox" /><p>Random</p></div>
//             </div>
//           </div>
//           <div className="medicine">
//             <div style={{ textAlign: 'center' }}><h2 className="med-heading">Medicines</h2></div>
//             <div className="presc">
//               <p>Prescription</p>
//              <div>
//               <div>{data?.test6?.medicine?.option?.split('\n').map((line, index) => <h2 key={index}>{line}</h2>)}</div>
//              </div>
//             </div>
//           </div>
//         </div>
//         <div className="heading-container item2559">
//           <div className="dec-container">
//             <p>Disclaimer</p>
//           </div>
//           <div>
//             <img className="img-sign" src="/pngwing.com.png" alt="Doctor's Image" />
//             <h2>Dr Amit Agarkar</h2>
//             <p>MBBS, MD, FCPS,DDV</p>
//             <p>Fellowship in Hair Transplant</p>
//             <p>Reg. No,- 06/07/2868</p>
//           </div>
//         </div>
//         <div className="disclaimer">
//           <p>1. lorem s/anchor-is-valid.md jsx-a11y/anchor-is-valid</p>
//           <p>2. lorem s/anchor-is-valid.md jsx-a11y/anchor-is-valid</p>
//           <p>3. lorem s/anchor-is-valid.md jsx-a11y/anchor-is-valid</p>
//           <p>4. lorem s/anchor-is-valid.md jsx-a11y/anchor-is-valid</p>
//           <p>5. lorem s/anchor-is-valid.md jsx-a11y/anchor-is-valid</p>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems } from '../products/CartSlice';
import html2pdf from 'html2pdf.js';
import BASE_URL from '../../Config';
import "./PrescriptionUser.css"

export default function PrescriptionUser({data}) {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();

  let storedUserData = JSON.parse(localStorage?.getItem("User343"));
  const userId = storedUserData?.logedInUser?.user._id;
  const [prescriptionM,setPrescriptionM] = useState({});

  useEffect(() => {
    console.log("koejgt",data.test6?.medicines?.[0]?.medicines)
    setPrescriptionM(data.test6?.medicines?.[0]?.medicines)
  },[data.test6?.medicines?.[0]?.medicines])

  const [cartItemsNew, setCartItemsNew] = useState([]);

  const cartItems = useSelector((state) => state.cart.items);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCartItems(storedUserData?.logedInUser?.user?._id));
  },[])


  useEffect(() => {
     setCartItemsNew(cartItems)
  },[cartItems])
  const contentRef = useRef();


  if (!data) {
    return <h2>Error</h2>;
  }
  




  const handleAddToCart = async () => {
    let data = cartItemsNew?.map((e) => {
      return {
        item  : e?.item,
        quantity : e?.quantity,
      };
    });
    try {
      setLoader(true)
      const response = await fetch(`${BASE_URL}/cart/update-cart?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': storedUserData.logedInUser.accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartItemsNew),
      });
      setLoader(false)
      if (response.ok) {
        const result = await response.json();
        // toast.success("review created successfully");
        console.log('review created successfully:', result);
        navigate("/create-order")
      } else {
        console.error('Failed to create review:', response.statusText);
      }
    } catch (error) {
      setLoader(false)
      console.error('Error:', error);
    }
  };
  const formatDate = () => {
    const date = new Date();
    const options = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    return date.toLocaleString('en-GB', options).replace(',', '');
  };

// let medData=data.test6.medicines[0].medicines
let medData = data.test6?.medicines?.[0]?.medicines || {};
console.log("koejgt",medData)

  // const generatePDF = () => {
  //   setLoading(true);
  //   const input = document.getElementById('report');
  //   html2canvas(input).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF('p', 'mm', 'a4',true);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  //     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //     pdf.save('report.pdf');
  //     setLoading(false);
  //     toast.success('PDF generated successfully');
  //   });
  // };


  const generatePDF = () => {
    setLoading(true);

    const element = contentRef.current;
    const opt = {
      margin: 0.5, // Top, left, bottom, right margins
      filename: `Prescription.pdf`,
      image: { type: 'jpeg', quality: 0.7 },
      html2canvas: { scale: 1.5, useCORS: true }, // Use high scale for better quality
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      // pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    };

    html2pdf().from(element).set(opt).save();
    setLoading(false);
    toast.success('PDF generated successfully');
  };

  let p = 7;
  

  return (
    <div>
      <div style={{ justifyContent: "center" }} className='d-flex'>
        {!data?.preview && (
          <button className="pdf" onClick={generatePDF}>
            {loading
              ? "Please wait, download will start"
              : "Generate and Download PDF"}
          </button>
        )}
        <div style={{    display: "flex",
    margin:"0 0 0 10px",
    }}>
                      {!data?.preview && (
          <button className="pdf-1" style={{backgroundColor: "#c7c74d"}} onClick={handleAddToCart}>
            {loading
              ? "Please wait"
              : "Buy"}
          </button>
        )}
        </div>

      </div>
      <div id="report" className="report-container page-break-2"  ref={contentRef}>
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
          <div style={{fontSize : "16px",fontWeight : "600"}}>Ref no: <span>EFA3E6F55</span></div>
          <div  style={{fontSize : "16px",fontWeight : "600"}}>Date and Time: <span>{formatDate()}</span></div>
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
            <div key={index} style={{fontSize : "14px",fontWeight:"600"}}>
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
                  <p className='lab-test-1'>{test}</p>

                  {test === "Blood Sugar" && (
                    <div className="sub-input-med">
                      {data.bloodTest.subTests["Blood Sugar"].map(
                        (subTest, subIndex) => (
                          <div key={subIndex} className="input-med-1">
                            <input type="checkbox" checked={true} readOnly />
                            <p className='lab-test-1'>{subTest}</p>
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
                    {Object.keys(prescriptionM || {}).map((it,ind) => {
                      return (
                        <div className={`d-flex flex-column ${ind+1 == p || ind+1 == (10+p) || ind+1 == (20+p) ? "page-break-1" : ""}`}>
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
                          <div style={{ margin: "0 0 6px 25px",ontSize: "13px", fontWeight: "600" }}>{`${
                            prescriptionM[it].dosage
                          } ${prescriptionM[it].route} ${prescriptionM[it].frequency}  ${
                            prescriptionM[it].route === "Oral" ? prescriptionM[it].when : ""
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
      <div style={{    display: "flex",
    justifyContent: "end"}}>
      <button className="pdf-1" style={{backgroundColor: "#c7c74d"}} onClick={handleAddToCart}>
            {loading
              ? "Please wait"
              : "Buy"}
          </button>
      </div>
      <ToastContainer position="bottom-right"/>

    </div>
  );
}
