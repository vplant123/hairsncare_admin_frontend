// import React, { useState } from 'react'
// import DoctorNavbar from './DoctorNavbar'
// import Test1 from './analysis/Test1'
// import './Analysis.css'
// import Test2 from './analysis/Test2'
// import Test3 from './analysis/Test3'
// import Test4 from './analysis/Test4'
// import Test5 from './analysis/Test5'
// import Test6 from './analysis/Test6'
// import { useParams } from 'react-router-dom'
// import {  useSelector } from 'react-redux';

// export default function Analysis() {
//   const { data1} = useSelector((state) => state.patientTestResult);

//     const [step,setStep]=useState(1)
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [selectedAnswers1, setSelectedAnswers1] = useState({
//     DietManagementGeneral: '',
//     DietManagementSpecific: '',
//     LifeStyleManagementGeneral: '',
//     LifeStyleManagementSpecific: '',
//     StressManagement: '',
//   });
//   const [selectedAnswers2, setSelectedAnswers2] = useState({
//     '1) Acute Telogen Effluvium – Male': '',
//     '2) Chronic Telogen Effluvium – Male': '',
//     '3) Acute Telogen Effluvium – Female': '',
//     '4) Chronic Telogen Effluvium – Female': '',
//     '5) Androgenetic Alopecia Male – Grade 1 to Grade 7': '',
//     '6) Androgenetic Alopecia Female – Grade 1 to Grade 3': '',
//   });
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [selectedOptions1, setSelectedOptions1] = useState({});
//   const [inputValue,setInputValue]=useState('')
//   const params=useParams()
//   const [userId, appointmentId] = params.id.split(',');

// console.log(userId,appointmentId);
//     const nextStep = () => setStep(step + 1);
//   const prevStep = () => setStep(step - 1);

//     let stepContent
//     switch (step) {
//         case 1:
//             stepContent=<Test1 data1={data1} selectedAnswers={selectedAnswers} setSelectedAnswers={setSelectedAnswers} nextStep={nextStep}/>
//             break;
//             case 2:
//                 stepContent=<Test2 selectedAnswers={selectedAnswers1} setSelectedAnswers={setSelectedAnswers1} nextStep={nextStep} prevStep={prevStep}/>
//                 break;
//                 case 3:
//                   stepContent=<Test3 selectedAnswers={selectedAnswers2} setSelectedAnswers={setSelectedAnswers2} nextStep={nextStep} prevStep={prevStep}/>
//                   break;
//                   case 4:
//                     stepContent=<Test4 inputValue={inputValue} setInputValue={setInputValue} selectedOptions={selectedOptions1} setSelectedOptions={setSelectedOptions1} nextStep={nextStep} prevStep={prevStep}/>
//                     break;
//                     case 5:
//                       stepContent=<Test5 selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} nextStep={nextStep} prevStep={prevStep}/>
//                       break;
//                       case 6:
//                         stepContent=<Test6 data1={data1} userId={userId} appointmentId={appointmentId} test1={selectedAnswers} test2={selectedAnswers1}test3={selectedAnswers2} test4={selectedOptions1} test5={selectedOptions} nextStep={nextStep} prevStep={prevStep}/>
//                         break;
//             default:
//                 stepContent=null
//     }
//   return (
//     <DoctorNavbar>{stepContent}</DoctorNavbar>
//   )
// }

import React, { useEffect, useState } from "react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import BASE_URL from "../../Config";
// import BASE_URL from '../../../Config';
import { useParams } from "react-router-dom";
import "./Analysis.css";
import Test1 from "./analysis/Test1";
import Test2 from "./analysis/Test2";
import Test3 from "./analysis/Test3";
import Test4 from "./analysis/Test4";
import Test5 from "./analysis/Test5";
import Test6 from "./analysis/Test6";
import Test7 from "./analysis/Test7";
import Test8 from "./analysis/Test8";
import Test9 from "./analysis/Test9";



import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import PrescriptionUser from "../user-profile/PrescriptionUser";
// import { textAlign } from "html2canvas/dist/types/css/property-descriptors/text-align";

export default function Analysis() {
  // const [data, setData] = useState({});
  const { data1 } = useSelector((state) => state.patientTestResult);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [scalp, setScalp] = useState("");
  const [hairQuality, setHairQuality] = useState("");
  const [hairDensity, setHairDensity] = useState("");
  const [colorVibrancy, setColorVibrancy] = useState("");
  const [moisture, setMoisture] = useState("");
  const [hairBreakage, setHairBreakage] = useState("");
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const [selectedOptions4, setSelectedOptions4] = useState({ medicine: null });
  const [selectedOptions5, setSelectedOptions5] = useState({
    Nutrition: [],
    LifeStyle: [],
    Stress: [],
  });
  const [circleColor, setCircleColor] = useState("#ccc");
  const [ExaminationColor, setExaminationColor] = useState("#ccc");
  const [DensityColor, setDensityColor] = useState("#ccc");
  const [MoistureColor, setMoistureColor] = useState("#ccc");
  const [qualityColor, setQualityColor] = useState("#ccc");
  const [vibrancy, setVibrancy] = useState("#ccc");
  const [breakageColor, setBreakageColor] = useState("#ccc");
  const [currentStep, setCurrentStep] = useState(1); 
const [showPreview,setShowPreview]=useState(false)
  const [selectedTests, setSelectedTests] = useState({
    mainTests: [],
    subTests: {
      "Blood Sugar": []
    }
  });
  const params = useParams();

  const [userId, appointmentId,haiTestId] = params.id.split(',');
  const navigate = useNavigate();



  const handleColorChange = (color) => {
    setCircleColor(color);
  };

  const [statisficaion,setStatisfication] = useState(false)

  const nextStep = () => {
    let hairScalpAna =
      scalp?.length > 0 &&
      hairQuality?.length > 0 &&
      hairDensity?.length > 0 &&
      colorVibrancy && colorVibrancy != "" &&
      moisture && moisture != "" &&
      hairBreakage && hairBreakage != "" ;

    let hairHealth = selectedOption ? true : false;
    let statisficaionCond = statisficaion;

    let test2Q = selectedOptions5?.Nutrition?.length > 0 && selectedOptions5?.LifeStyle?.length>0 && selectedOptions5?.Stress?.length>0;
    console.log("ineirjh",test2Q)
    if(currentStep===1 && (hairScalpAna && hairHealth && statisficaionCond && selectedOption1 && selectedOption2 && selectedOption3) )
    setCurrentStep(currentStep + 1)
    else if(currentStep===2 && test2Q) setCurrentStep(currentStep + 1)
    else toast.success("Please fill all details")
  
  };
  const prevStep = () => setCurrentStep(currentStep - 1);

  const handleExamination = (color) => {
    setStatisfication(true);
    console.log("jeirj",color)
    setExaminationColor(color);
  };

  const handleDensity = (color) => {
    setStatisfication(true);
    setDensityColor(color);
  };

  const handleMoisture = (color) => {
    setStatisfication(true);
    setMoistureColor(color);
  };

  const handleQuality = (color) => {
    setStatisfication(true);
    setQualityColor(color);
  };
  const handleVibrancy = (color) => {
    setStatisfication(true);
    setVibrancy(color);
  };
  const handleBreakage = (color) => {
    setStatisfication(true);
    setBreakageColor(color);
  };
  console.log("mkmnrkm",data1,{
    scalp,
    hairQuality,
    hairDensity,
    colorVibrancy,
    moisture,
    hairBreakage,selectedOptions
  });
  let personal = {
    name: data1?.personal?.name,
    age: data1?.personal? data1?.personal["Select your age group"] : "",
    phone: data1?.personal?.phoneNumber,
    email: data1?.personal?.email,
    sex:
      data1?.personal?.Gender?.src === "/assets/img/question/female.svg"
        ? "Female"
        : "Male",
  };
  const handleSubmit = async () => {
  
    let dd = {
      scalp,
      hairQuality,
      hairDensity,
      colorVibrancy,
      moisture,
      hairBreakage,
    };
    let overall = {
      ExaminationColor,
      DensityColor,
      MoistureColor,
      circleColor,
      qualityColor,
      vibrancy,
      breakageColor,
    };
    try {
      console.log("jkjseie",selectedOptions4)
      const response = await fetch(
        `${BASE_URL}/doctor/prescription-detail-form?userId=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            appointmentId,
            personal,
            dianosis: selectedOptions,
            hairScalp: { selectedOption, data: dd },
            overall,
            nutrition: selectedOption1,
            lifeStyle: selectedOption2,
            stress: selectedOption3,
            test6: selectedOptions4,
            management: selectedOptions5,
            bloodTest:selectedTests,
            medicines:selectedOptions4?.medicines ? Object.keys(selectedOptions4?.medicines[0]) : ""
          }),
        }
      );
console.log({
  userId,
  appointmentId,
  personal,
  dianosis: selectedOptions,
  hairScalp: { selectedOption, data: dd },
  overall,
  nutrition: selectedOption1,
  lifeStyle: selectedOption2,
  stress: selectedOption3,
  test6: selectedOptions4,
  management: selectedOptions5,
})

      if (!response.ok) {
        throw new Error("Failed to assign doctor");
      }
      toast.success("successful");
      const data = await response.json();
      navigate("/appointment");

      console.log(data, "successfully");
    } catch (error) {
      console.error("Error assigning doctor:", error);
    }
  };
  console.log(selectedOptions, "tuselectedOptionstu");

  return (
    <div
      style={{
        padding: "10px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
        fontSize: "12px",
      }}
      className="checkbox-container11"
    >
      {/* <h1 style={{ fontSize: '16px', margin: '10px 0' }}>Doctor Analyse Report</h1> */}
      <div
        id="report"
        className="report-container1"
        style={{ padding: "10px", boxSizing: "border-box" }}
      >
       {currentStep===1&&<>
        <Test1
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />

      
          <Test2
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            scalp={scalp}
            setScalp={setScalp}
            hairQuality={hairQuality}
            setHairQuality={setHairQuality}
            hairDensity={hairDensity}
            setHairDensity={setHairDensity}
            colorVibrancy={colorVibrancy}
            setColorVibrancy={setColorVibrancy}
            moisture={moisture}
            setMoisture={setMoisture}
            hairBreakage={hairBreakage}
            setHairBreakage={setHairBreakage}
          />
          <div className="custom-container">
            <div className="custom-side-panel custom-left-panel">
              <div
                style={{ backgroundColor: ExaminationColor }}
                className="color-diva"
              >
                <img src="\scalp-examination.png" />
                <h2 style={{fontSize : "16px"}}>Scalp Examination</h2>
              </div>
              <div className="custom-color-buttons">
                <button
                  className="custom-color-btn custom-green-btn"
                  onClick={() => handleExamination("#72e972")}
                ></button>
                <button
                  className="custom-color-btn custom-yellow-btn"
                  onClick={() => handleExamination("#eeee68")}
                ></button>
              </div>
              <div
                style={{ backgroundColor: DensityColor }}
                className="color-diva"
              >
                <img src="\Hair-Density.png" /> <h2 style={{fontSize : "16px"}}>Hair Density</h2>
              </div>
              <div className="custom-color-buttons">
                <button
                  className="custom-color-btn custom-green-btn"
                  onClick={() => handleDensity("#72e972")}
                ></button>
                <button
                  className="custom-color-btn custom-yellow-btn"
                  onClick={() => handleDensity("#eeee68")}
                ></button>
              </div>
              <div
                style={{ backgroundColor: MoistureColor }}
                className="color-diva"
              >
                <img src="\moisture-&-hydration-of-hair.png" />
                <h2 style={{fontSize : "16px"}}>Moisture & Hydration of Hair</h2>
              </div>
              <div className="custom-color-buttons">
                <button
                  className="custom-color-btn custom-green-btn"
                  onClick={() => handleMoisture("#72e972")}
                ></button>
                <button
                  className="custom-color-btn custom-yellow-btn"
                  onClick={() => handleMoisture("#eeee68")}
                ></button>
              </div>
            </div>
            <div className="custom-center-panel">
              <div
                className="custom-color-circle"
                style={{ backgroundColor: circleColor }}
              >
                <h1 style={{fontSize : "16px"}}>Overall health</h1>
              </div>
              <div className="custom-color-buttons">
                <button
                  className="custom-color-btn custom-green-btn"
                  onClick={() => handleColorChange("#72e972")}
                ></button>
                <button
                  className="custom-color-btn custom-yellow-btn"
                  onClick={() => handleColorChange("#eeee68")}
                ></button>
              </div>
            </div>
            <div className="custom-side-panel custom-right-panel">
              <div
                style={{ backgroundColor: qualityColor }}
                className="color-diva"
              >
                {" "}
                <img src="\Hair-Quality.png" />
                <h2 style={{fontSize : "16px"}}>Hair Quality Texture</h2>
              </div>
              <div className="custom-color-buttons">
                <button
                  className="custom-color-btn custom-green-btn"
                  onClick={() => handleQuality("#72e972")}
                ></button>
                <button
                  className="custom-color-btn custom-yellow-btn"
                  onClick={() => handleQuality("#eeee68")}
                ></button>
              </div>
              <div style={{ backgroundColor: vibrancy }} className="color-diva">
                <img src="\color-vibrancy.png" />
                <h2 style={{fontSize : "16px"}}>Color Vibrancy</h2>
              </div>
              <div className="custom-color-buttons">
                <button
                  className="custom-color-btn custom-green-btn"
                  onClick={() => handleVibrancy("#72e972")}
                ></button>
                <button
                  className="custom-color-btn custom-yellow-btn"
                  onClick={() => handleVibrancy("#eeee68")}
                ></button>
              </div>
              <div
                style={{ backgroundColor: breakageColor }}
                className="color-diva"
              >
                <img src="/Hair-Breakage.png" />
                <h2 style={{fontSize : "16px"}}>Hair Breakage</h2>
              </div>
              <div className="custom-color-buttons">
                <button
                  className="custom-color-btn custom-green-btn"
                  onClick={() => handleBreakage("#72e972")}
                ></button>
                <button
                  className="custom-color-btn custom-yellow-btn"
                  onClick={() => handleBreakage("#eeee68")}
                ></button>
              </div>
            </div>
          </div>
          <Test3
            selectedOption={selectedOption1}
            setSelectedOption={setSelectedOption1}
          />
          <Test4
            selectedOption={selectedOption2}
            setSelectedOption={setSelectedOption2}
          />

          <Test5
            selectedOption={selectedOption3}
            setSelectedOption={setSelectedOption3}
            nextStep={nextStep}
          />
       </>}
          {currentStep===3&&<Test6
            selectedOptions={selectedOptions4}
            setSelectedOptions={setSelectedOptions4}
            selectedTests={selectedTests}
             setSelectedTests={setSelectedTests}
          />}
         {currentStep===2&& <div>
          <Test9
           selectedOptions={selectedOptions}
           setSelectedOptions={setSelectedOptions}
          />
          <Test8
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            scalp={scalp}
            setScalp={setScalp}
            hairQuality={hairQuality}
            setHairQuality={setHairQuality}
            hairDensity={hairDensity}
            setHairDensity={setHairDensity}
            colorVibrancy={colorVibrancy}
            setColorVibrancy={setColorVibrancy}
            moisture={moisture}
            setMoisture={setMoisture}
            hairBreakage={hairBreakage}
            setHairBreakage={setHairBreakage}
          />
          <Test7
            selectedOptions={selectedOptions5}
            setSelectedOptions={setSelectedOptions5}
            prevStep={prevStep}
            nextStep={nextStep}
          />
          </div>}
      

        
      </div>
      {showPreview?currentStep===3&&<PrescriptionUser data={{preview:"preview",personal,dianosis: selectedOptions,bloodTest:selectedTests, test6: selectedOptions4,}}/>:null}
      {/* onClick={generatePDF} */}
   {  currentStep===3&&
   
<div>  
<div style={{textAlign:"center"}}><button style={showPreview?{backgroundColor:'red'}:null} className='pdf' onClick={()=>setShowPreview(!showPreview)}>{showPreview?"Close Preview":"Preview"}</button></div>
 <div className="test-btnn">
   <button onClick={()=>prevStep()}>Back</button>
   <button
        onClick={handleSubmit}
        // style={{ padding: "10px 20px", fontSize: "14px", marginTop: "10px" }}
      >
        Submit
      </button>

 </div></div>

  }
            <ToastContainer  position="bottom-right"/>

    </div>
  );
}
