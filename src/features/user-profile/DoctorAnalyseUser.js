import React, { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import BASE_URL from "../../Config";
import { useParams } from "react-router-dom";
// import "./DoctorAnalysisReport.css";
import HairReport from "../admin-dashboard/doctor-analyse/HairReport";
import SpeedoMeter from "../admin-dashboard/doctor-analyse/SpeedoMeter";
import html2pdf from 'html2pdf.js';
import { toast, ToastContainer } from "react-toastify";


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
export default function DoctorAnalyseReport({data}) {
//   const [data, setData] = useState({});
const [loading, setLoading] = useState(false);

  const [scalp, setScalp] = useState("");
  const [hairQuality, setHairQuality] = useState("");
  const [hairDensity, setHairDensity] = useState("");
  const [colorVibrancy, setColorVibrancy] = useState("");
  const [moisture, setMoisture] = useState("");
  const [hairBreakage, setHairBreakage] = useState("");

  const handleScalpChange = (event) => setScalp(event.target.value);
  const handleHairQualityChange = (event) => setHairQuality(event.target.value);
  const handleHairDensityChange = (event) => setHairDensity(event.target.value);
  const handleColorVibrancyChange = (event) =>
    setColorVibrancy(event.target.value);
  const handleMoistureChange = (event) => setMoisture(event.target.value);
  const handleHairBreakageChange = (event) =>
    setHairBreakage(event.target.value);

//   const params = useParams();
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `${BASE_URL}/doctor/getPrescription?userId=${params.id}`
//         );
//         if (!response.ok) {
//           throw new Error(`Error: ${response.status}`);
//         }
//         const result = await response.json();
//         setData(result.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);
//   console.log(data);

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

  // const generatePDF = () => {
  //   setLoading(true)
  //   const input = document.getElementById("report");
  //   html2canvas(input, { scale: 2 })
  //     .then((canvas) => {
  //       const imgData = canvas.toDataURL("image/png");
  //       const pdf = new jsPDF("p", "mm", "a4",true);
  //       const imgWidth = 210;
  //       const pageHeight = 295;
  //       const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //       let heightLeft = imgHeight;
  //       let position = 0;

  //       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight;

  //       while (heightLeft >= 0) {
  //         position = heightLeft - imgHeight;
  //         pdf.addPage();
  //         pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  //         heightLeft -= pageHeight;
  //       }

  //       pdf.save("DoctorAnalyseReport.pdf");
  //       setLoading(false)

  //     })
  //     .catch((error) => {
  //       setLoading(true)
  //       console.error("Error generating PDF:", error)
  //     });
  // };

  const contentRef = useRef();



  const generatePDF = () => {
    setLoading(true);

    const element = contentRef.current;
    const opt = {
      margin: 0.5, // Top, left, bottom, right margins
      filename: `${data?.personal?.name}-Assessment Report.pdf`,
      image: { type: 'jpeg', quality: 0.7 },
      html2canvas: { scale: 1.5, useCORS: true }, // Use high scale for better quality
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    };

    html2pdf().from(element).set(opt).save();
    setLoading(false);
    toast.success('PDF generated successfully');
  };
  

  return (
    <div
      style={{
        padding: "10px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
        fontSize: "12px",
      }}
    >
          <div style={{ justifyContent: "center" }} className='d-flex'>
        {!data?.preview && (
          <button className="pdf" onClick={generatePDF}>
            {loading
              ? "Please wait, download will start"
              : "Download PDF"}
          </button>
        )}

      </div>
      {/* <h1 style={{ fontSize: '16px', margin: '10px 0' }}>Doctor Analyse Report</h1> */}
      <div
        id="report"
        className="report-container1"
        style={{ padding: "10px", boxSizing: "border-box" }}
        ref={contentRef}
      >
        <div className="heading-container2">
          <div className="image-container" style={{    width: "30%"}}>
            {/* <img className="rx-logo" src="/medical-prescription-pharmaceutical-drug-pharmacy-symbol-clip-art-rx-logo-image-b7b1ba0f952be8c1872ae92a48af3874.png" alt="RX Logo" /> */}
            <img
              className="logo-main"
              src="/assets/img/logo.png"
              alt="Main Logo"
              style={{maxWidth : "100%"}}
            />
          </div>
          <div style={{    width: "70%",textAlign: "end"}}>
            <h2>Dr Amit Agarkar</h2>
            <p>MBBS, MD, FCPS,DDV</p>
            <p>Fellowship in Hair Transplant</p>
            <p>Reg. No,- 06/07/2868</p>
          </div>
        </div>
        <div className="mobile-ui-img-div" style={{textAlign : "center"}}>
          <img src = "/assets/img/Report Image (1).png" className="mobile-ui-img" style={{maxWidth : "60%"}}/>
        </div>
        <div className="intro-report">
          <h1 style={{color:"#008bff"}}>Welcome to the hairsncares.com – YOUR HAIR EXPERT!</h1>
          <p>
            Dear {data?.personal?.sex === "Male" ? "Mr" : "Miss"}.{" "}
            {data?.personal?.name},
          </p>
          <p>
            We appreciate your interest in taking part in this detailed hair
            assessment.
          </p>
          <p>
            Your willingness to participate will greatly contribute to our
            research and understanding of the subject matter. Thank you for your
            time and effort in completing this test.
          </p>
          <p>
            We assure you that your responses will be treated with utmost
            confidentiality and will be utilized solely for research purposes.
            Your contribution is immensely valuable, and we are grateful for
            your cooperation.
          </p>
          <p className="report-p1">
            Your involvement plays a pivotal role in the success of hair growth
            journey
          </p>
          <p className="report-p2">
            Thank you for being an essential part of this assessment.
          </p>
        </div>
        <div className="page-break-1">
          <h1 className='diag'>1) Diagnosis </h1>
          <h4>Introduction</h4>
          <p className="intro-p">
            The significance of diagnosis in managing hair loss lies in its
            capacity to precisely identify the root cause of hair loss,
            directing focused treatment approaches. This helps doctors choose
            the best ways to fix the problem. When the cause is known,
            treatments can target the real issue, like not getting enough
            nutrients, hormones being off, health problems, or how you live.
            This makes treatments work better and stops unnecessary ones. Having
            a clear understanding of the problem can also provide emotional
            relief as it reduces feelings of uncertainty. Plus, it helps find
            out if there are other health problems that need to be taken care
            of. So, diagnosis helps doctors treat hair loss in the best way and
            look at overall health too.
          </p>
          <div style={{ textAlign: "center" }}>
            <h4>Findings & Conclusion:</h4>
            <h1>Your Provisional Diagnosis is,</h1>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src="\2.png" />
              
              <div className='diag'>
                {data?.dianosis?.map((item)=>{
                  return <>
                  <h2><a href={data11?.[item.option]}>{item.option}</a></h2>
<h2><a href={item?.option == "Androgenetic Alopecia (M)" ? subOptionM?.[item.subOption] : subOptionF?.[item.subOption]}>{item.subOption&&item.subOption}</a></h2>
                  </>
                })}
              </div>
            </div>
          </div>
          <h4>
            • For further information for your condition refer to this video
            (Link to Youtube Video / Article)
          </h4>
          <p className="legal-dec">
            <strong>Legal Disclaimer:</strong> This communication aims to ensure
            your comprehensive understanding of the diagnosis's nature. (Read
            more.. Please be cognizant that, as of this juncture, the diagnosis
            is regarded as provisional, signifying its preliminary status. It is
            derived solely from the data and photos (if provided) obtained
            through the online hair test furnished by you. Nevertheless, it is
            imperative to accentuate that the precision of this diagnosis may
            exhibit incongruities across individuals. Various determinants,
            encompassing distinctive health conditions, genetic makeup, and
            external influences, can contribute to disparities in accuracy.
            While our utmost endeavor is directed towards accuracy, we hereby
            acknowledge the potential divergence in individual cases, thus
            warranting judicious discretion during the interpretation of
            outcomes.)
          </p>
          <h4>Diagnosis & Details</h4>
        </div>
        <HairReport data1={data.overall} data={data.hairScalp} />
        <div className="page-break-1">
          <h1 className='diag tab-2'>3) Nutritional Assessment</h1>
          <p>
            <strong>Introduction:</strong> It's important to note that hair loss
            and thinning can be caused by various factors, and nutritional and
            dietary deficiencies are just one of the aspects.
          </p>
          <p>
            Hair loss can result from insufficient vital nutrients essential for
            robust hair growth, including iron, zinc, biotin, vitamins D, A, E,
            and C, protein, and omega-3 fatty acids. For example, iron
            deficiency can weaken follicles and lead to shedding, while
            inadequate zinc compromises cell growth, causing hair thinning and
            loss. Biotin scarcity inhibits keratin production, resulting in
            brittle hair, and low vitamin D levels are linked to thinning.
            Imbalanced vitamin A intake affects hair health, protein shortage
            weakens strands, omega-3 deficiency leads to brittle hair, vitamin E
            supports growth and acts as an antioxidant, and vitamin C deficiency
            hampers structural protein production.
          </p>
          <h4>
            Findings: Our expert dermatologists have carefully assessed your
            inputs. Accordingly, below is the expert nutritional assessment
          </h4>
          <h1 className='diag tab-2'>Conclusion:</h1>
          <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >

          <img src={data?.nutrition?.src} />
          <h2>{data?.nutrition?.value}</h2>
            </div>

          <p>
           {data?.nutrition?.description}
          </p>
        </div>
        <div className="page-break-1">
          <h1 className='tab-3 diag'>4) Lifestyle Assessment</h1>
          <p>
            <strong>Introduction:</strong> Lifestyle assessment is important for
            hair loss because our daily habits, routines, and choices can
            significantly impact the health of our hair. Unhealthy lifestyle
            choices can lead to hair loss due to their impact on hair follicles
            and overall hair health. Factors such as poor circulation, nutrient
            deficiencies, hormonal imbalances, inflammation, and stress play a
            role. These include insufficient nutrition, chronic stress
            disrupting the hair growth cycle, reduced blood flow from smoking,
            hairdehydrating effects of alcohol, compromised circulation from
            limited exercise, hormone imbalances due to inadequate sleep,
            accumulation caused by poor hygiene, hair damage from harsh styling
            and treatments, environmental stressors, disruption of growth cycles
            from crash dieting, sun exposure without protection, and
            hair-weakening dehydration. Addressing this hair loss involves
            adopting healthier lifestyle practices.
          </p>
          <h4>
            Findings: Our expert dermatologists have carefully assessed your
            inputs. Accordingly, below is the expert nutritional assessment.{" "}
          </h4>
          <h1 className='tab-3 diag'>Conclusion:</h1>
          <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >

          <img src={data?.lifeStyle?.src} />
          <h2>{data?.lifeStyle?.value}</h2>
            </div>
          <p>
           {data?.lifeStyle?.description}
          </p>
        </div>
        <div className="page-break-1">
          <h1 className='tab-4 diag'>5) Stress Analysis</h1>
          <p>
            <strong>Introduction:</strong> Hair loss due to stress, is caused by
            the disruption of the hair growth cycle. When the body experiences
            significant emotional or physical stress, it can shift a large
            number of hair follicles from their active growth phase (anagen)
            into the resting phase (telogen). This results in increased shedding
            and thinning of the hair. Stress triggers the release of hormones
            like cortisol, which can interfere with the normal functioning of
            hair follicles. Additionally, stress can constrict blood vessels,
            limiting the delivery of nutrients and oxygen to the scalp, further
            compromising hair health. Over time, as the body's stress response
            continues, this can lead to noticeable hair loss. It's important to
            manage stress through relaxation techniques, exercise, and seeking
            support, as reducing stress levels can help mitigate its impact on
            hair health.
          </p>
          <p>
            <strong>Finding:</strong> As per our{" "}
            <strong>Stress Indicator</strong>, your score is <strong>21</strong>
          </p>
          <h1 className='tab-4 diag'>Conclusion:</h1>
          <p>As per your score your provisional stress category is: </p>
          <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
          <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
 <img src={data?.stress?.src} />
 <h2>{data?.stress?.value}</h2>
            </div>

          
         
          <SpeedoMeter data={data?.stress?.value}/>
          </div>
          <p>
{data?.stress?.description}
          </p>
        </div>

        <div >
<div className="heading-container item2559">
          <div className="dec-container">
            <p>Disclaimer</p>
          </div>
          <div>
            <img className="img-sign" src="/Amit-Sir---Signature.png" alt="Doctor's Image" style={{maxWidth : "60%"}} />
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
      <ToastContainer position="bottom-right"/>

    </div>
  );
}
