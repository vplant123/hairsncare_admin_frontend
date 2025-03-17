
// import React, { useState } from "react";

// export default function Test1({ data1,nextStep,selectedAnswers, setSelectedAnswers }) {

//   const handleSelection = (section, question, option) => {
//     setSelectedAnswers((prev) => ({
//       ...prev,
//       [section]: { question, option },
//     }));
//   };

//   const handleNext = () => {
//     console.log(selectedAnswers, "analysis");
//     nextStep(selectedAnswers);
//   };

//   const allSections = [
//     "Nutritional",
//     "LifeStyle",
//     "Stress",
//     "Assessment",
//     "AnalysisScalp",
//     "AnalysisHair",
//     "Conclusion",
//   ];
// console.log(data1.personal)
//   const allSelected = allSections.every((section) =>
//     Object.keys(selectedAnswers).includes(section)
//   );

//   return (
//     <div style={{ marginBottom: "2rem", padding: "1rem", fontFamily: "Arial, sans-serif" }}>
//       <div className="ana-pers">
//         <h2>Name: {data1.personal.name}</h2>
//         <h2>Age Group: {data1.personal['Select your age group']}</h2>
//         <div className="ana-per">
//           <h2>Mobile: {data1.personal.phoneNumber}</h2>
//           <h2>Email: {data1.personal.email}</h2>
//           <h2>Sex: {data1.personal.Gender.src=="/assets/img/question/female.svg"?'Female':'Male'}</h2>
//         </div>
//       </div>
//       <div className="ana-test">
//         <div className="ana-t">
//           <h1>Nutritional</h1>
//           <div className="ana-ques">
//             <p>
//               <label>
//                 <input
//                   type="radio"
//                   name="Nutritional"
//                   checked={selectedAnswers.Nutritional?.option === "Adequate Nutritional Condition"}
//                   onChange={() => handleSelection("Nutritional", "Nutritional Condition", "Adequate Nutritional Condition")}
//                 />{" "}
//                 a) Adequate Nutritional Condition
//               </label>
//             </p>
//             <p>
//               <label>
//                 <input
//                   type="radio"
//                   name="Nutritional"
//                   checked={selectedAnswers.Nutritional?.option === "Adequate Nutritional Condition but needs improvement"}
//                   onChange={() => handleSelection("Nutritional", "Nutritional Condition", "Adequate Nutritional Condition but needs improvement")}
//                 />{" "}
//                 b) Adequate Nutritional Condition but needs improvement
//               </label>
//             </p>
//             <p>
//               <label>
//                 <input
//                   type="radio"
//                   name="Nutritional"
//                   checked={selectedAnswers.Nutritional?.option === "Inadequate nutritional condition. Requires improvement"}
//                   onChange={() => handleSelection("Nutritional", "Nutritional Condition", "Inadequate nutritional condition. Requires improvement")}
//                 />{" "}
//                 c) Inadequate nutritional condition. Requires improvement
//               </label>
//             </p>
//           </div>
//         </div>
//         <div className="ana-t">
//           <h1>LifeStyle</h1>
//           <div className="ana-ques">
//             <p>
//               <label>
//                 <input
//                   type="radio"
//                   name="LifeStyle"
//                   checked={selectedAnswers.LifeStyle?.option === "Good Lifestyle condition"}
//                   onChange={() => handleSelection("LifeStyle", "Lifestyle Condition", "Good Lifestyle condition")}
//                 />{" "}
//                 a) Good Lifestyle condition
//               </label>
//             </p>
//             <p>
//               <label>
//                 <input
//                   type="radio"
//                   name="LifeStyle"
//                   checked={selectedAnswers.LifeStyle?.option === "Good Lifestyle condition but needs improvement"}
//                   onChange={() => handleSelection("LifeStyle", "Lifestyle Condition", "Good Lifestyle condition but needs improvement")}
//                 />{" "}
//                 b) Good Lifestyle condition but needs improvement
//               </label>
//             </p>
//             <p>
//               <label>
//                 <input
//                   type="radio"
//                   name="LifeStyle"
//                   checked={selectedAnswers.LifeStyle?.option === "Unhealthy Lifestyle and needs improvement"}
//                   onChange={() => handleSelection("LifeStyle", "Lifestyle Condition", "Unhealthy Lifestyle and needs improvement")}
//                 />{" "}
//                 c) Unhealthy Lifestyle and needs improvement
//               </label>
//             </p>
//           </div>
//         </div>
//         <div className="ana-t">
//           <h1>Stress</h1>
//           <div className="ana-ques">
//             <p>
//               <label>
//                 <input
//                   type="radio"
//                   name="Stress"
//                   checked={selectedAnswers.Stress?.option === "No stress"}
//                   onChange={() => handleSelection("Stress", "Stress Level", "No stress")}
//                 />{" "}
//                 a) No stress
//               </label>
//             </p>
//             <p>
//               <label>
//                 <input
//                   type="radio"
//                   name="Stress"
//                   checked={selectedAnswers.Stress?.option === "Mild to Moderate Level"}
//                   onChange={() => handleSelection("Stress", "Stress Level", "Mild to Moderate Level")}
//                 />{" "}
//                 b) Mild to Moderate Level
//               </label>
//             </p>
//             <p>
//               <label>
//                 <input
//                   type="radio"
//                   name="Stress"
//                   checked={selectedAnswers.Stress?.option === "Moderate to Severe Level"}
//                   onChange={() => handleSelection("Stress", "Stress Level", "Moderate to Severe Level")}
//                 />{" "}
//                 c) Moderate to Severe Level
//               </label>
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="ana-hairscalp">
//         <h1>Hair And Scalp</h1>
//         <h2>1) Assessment - Diagnosis</h2>
//         <div className="ana-ques">
//           <p>
//             <label>
//               <input
//                 type="radio"
//                 name="Assessment"
//                 checked={selectedAnswers.Assessment?.option === "Acute Telogen Effluvium - Male"}
//                 onChange={() => handleSelection("Assessment", "Diagnosis", "Acute Telogen Effluvium - Male")}
//               />{" "}
//               1) Acute Telogen Effluvium - Male
//             </label>
//           </p>
//           <p>
//             <label>
//               <input
//                 type="radio"
//                 name="Assessment"
//                 checked={selectedAnswers.Assessment?.option === "Chronic Effluvium – Male"}
//                 onChange={() => handleSelection("Assessment", "Diagnosis", "Chronic Effluvium – Male")}
//               />{" "}
//               2) Chronic Effluvium – Male
//             </label>
//           </p>
//           <p>
//             <label>
//               <input
//                 type="radio"
//                 name="Assessment"
//                 checked={selectedAnswers.Assessment?.option === "Acute TelTelogen ogen Effluvium - Female"}
//                 onChange={() => handleSelection("Assessment", "Diagnosis", "Acute TelTelogen ogen Effluvium - Female")}
//               />{" "}
//               3) Acute TelTelogen ogen Effluvium - Female
//             </label>
//           </p>
//           <p>
//             <label>
//               <input
//                 type="radio"
//                 name="Assessment"
//                 checked={selectedAnswers.Assessment?.option === "Chronic Telogen Effluvium – Female"}
//                 onChange={() => handleSelection("Assessment", "Diagnosis", "Chronic Telogen Effluvium – Female")}
//               />{" "}
//               4) Chronic Telogen Effluvium – Female
//             </label>
//           </p>
//         </div>
//         <h2>2) Hair & Scalp Analysis</h2>
//         <div className="ana-ques">
//           <h3>Scalp examination:</h3>
//           <p>
//             <label>
//               <input
//                 type="radio"
//                 name="AnalysisScalp"
//                 checked={selectedAnswers.AnalysisScalp?.option === "Normal Scalp"}
//                 onChange={() => handleSelection("AnalysisScalp", "Scalp Condition", "Normal Scalp")}
//               />{" "}
//               a) Normal Scalp
//             </label>
//           </p>
//           <p>
//             <label>
//               <input
//                 type="radio"
//                 name="AnalysisScalp"
//                 checked={selectedAnswers.AnalysisScalp?.option === "Oily Scalp"}
//                 onChange={() => handleSelection("AnalysisScalp", "Scalp Condition", "Oily Scalp")}
//               />{" "}
//               b) Oily Scalp
//             </label>
//           </p>
//           <p>
//             <label>
//               <input
//                 type="radio"
//                 name="AnalysisScalp"
//                 checked={selectedAnswers.AnalysisScalp?.option === "Dry"}
//                 onChange={() => handleSelection("AnalysisScalp", "Scalp Condition", "Dry")}
//               />{" "}
//               c) Dry
//             </label>
//           </p>
//           <p>
//             <label>
//               <input
//                 type="radio"
//                 name="AnalysisScalp"
//                 checked={selectedAnswers.AnalysisScalp?.option === "Dry & Flaky Scalp"}
//                 onChange={() => handleSelection("AnalysisScalp", "Scalp Condition", "Dry & Flaky Scalp")}
//               />{" "}
//               d) Dry & Flaky Scalp
//             </label>
//           </p>
//           <p>
//             <label>
//               <input
//                 type="radio"
//                 name="AnalysisScalp"
//                 checked={selectedAnswers.AnalysisScalp?.option === "Dandruff"}
//                 onChange={() => handleSelection("AnalysisScalp", "Scalp Condition", "Dandruff")}
//               />{" "}
//               e) Dandruff
//             </label>
//           </p>
//         </div>
//         <div className="ana-ques">
//           <h3>Hair Examination:</h3>
//           <p>
//             <label>
//               <input
//                 type="radio"
//                 name="AnalysisHair"
//                 checked={selectedAnswers.AnalysisHair?.option === "Normal"}
//                 onChange={() => handleSelection("AnalysisHair", "Hair Condition", "Normal")}
//               />{" "}
//               a) Normal
//             </label>
//           </p>
//           <p>
//             <label>
//               <input
//                 type="radio"
//                 name="AnalysisHair"
//                 checked={selectedAnswers.AnalysisHair?.option === "Oily Hair"}
//                 onChange={() => handleSelection("AnalysisHair", "Hair Condition", "Oily Hair")}
//               />{" "}
//               b) Oily Hair
//             </label>
//           </p>
//           <p>
//             <label>
//               <input
//                 type="radio"
//                 name="AnalysisHair"
//                 checked={selectedAnswers.AnalysisHair?.option === "Dry"}
//                 onChange={() => handleSelection("AnalysisHair", "Hair Condition", "Dry")}
//               />{" "}
//               c) Dry
//             </label>
//           </p>
//           <p>
//             <label>
//               <input
//                 type="radio"
//                 name="AnalysisHair"
//                 checked={selectedAnswers.AnalysisHair?.option === "Frizzy"}
//                 onChange={() => handleSelection("AnalysisHair", "Hair Condition", "Frizzy")}
//               />{" "}
//               d) Frizzy
//             </label>
//           </p>
//           <p>
//             <label>
//               <input
//                 type="radio"
//                 name="AnalysisHair"
//                 checked={selectedAnswers.AnalysisHair?.option === "Thin"}
//                 onChange={() => handleSelection("AnalysisHair", "Hair Condition", "Thin")}
//               />{" "}
//               e) Thin
//             </label>
//           </p>
//         </div>
//         <h2>3) Conclusion</h2>
//         <div className="ana-ques">
//           <p>
//             <label>
//               <input
//                 type="radio"
//                 name="Conclusion"
//                 checked={selectedAnswers.Conclusion?.option === "Your Overall hair health is deemed to be good"}
//                 onChange={() => handleSelection("Conclusion", "Conclusion", "Your Overall hair health is deemed to be good")}
//               />{" "}
//               a) Your Overall hair health is deemed to be good
//             </label>
//           </p>
//           <p>
//             <label>
//               <input
//                 type="radio"
//                 name="Conclusion"
//                 checked={selectedAnswers.Conclusion?.option === "Your Overall hair health is deemed to be moderate"}
//                 onChange={() => handleSelection("Conclusion", "Conclusion", "Your Overall hair health is deemed to be moderate")}
//               />{" "}
//               b) Your Overall hair health is deemed to be moderate
//             </label>
//           </p>
//           <p>
//             <label>
//               <input
//                 type="radio"
//                 name="Conclusion"
//                 checked={selectedAnswers.Conclusion?.option === "Your Overall hair health is deemed to be poor"}
//                 onChange={() => handleSelection("Conclusion", "Conclusion", "Your Overall hair health is deemed to be poor")}
//               />{" "}
//               c) Your Overall hair health is deemed to be poor
//             </label>
//           </p>
//         </div>
//       </div>
//       <div style={{ textAlign: "center" }}>
//         <button
//           onClick={handleNext}
//           disabled={!allSelected}
//           style={{
//             padding: "0.5rem 1rem",
//             fontSize: "1rem",
//             backgroundColor: allSelected ? "#4CAF50" : "#f0f0f0",
//             color: allSelected ? "#fff" : "#ccc",
//             border: "none",
//             borderRadius: "5px",
//             cursor: allSelected ? "pointer" : "not-allowed",
//           }}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }
// import React,{useState} from 'react'

// export default function Test1() {
//   const [selectedDiagnosis, setSelectedDiagnosis] = useState('');

//   const handleChange = (event) => {
//     setSelectedDiagnosis(event.target.value);
//   };
//   return (
//     <div className='doc-testp'>
//   <h1 className='diag'>1) Diagnosis</h1>
//   <form>
//     <h4>Diagnosis & Details</h4>
//     <div className='optionss'>
//       <input type="checkbox" name="diagnosis" value="acute_telogen_effluvium_m" onChange={handleChange} />
//       Acute Telogen Effluvium (M)
//     </div><br />
//     <div className='optionss'>
//       <input type="checkbox" name="diagnosis" value="chronic_telogen_effluvium_m" onChange={handleChange} />
//       Chronic Telogen Effluvium (M)
//     </div><br />
//     <div className='optionss'>
//       <input type="checkbox" name="diagnosis" value="acute_telogen_effluvium_f" onChange={handleChange} />
//       Acute Telogen Effluvium (F)
//     </div><br />
//     <div className='optionss'>
//       <input type="checkbox" name="diagnosis" value="chronic_telogen_effluvium_f" onChange={handleChange} />
//       Chronic Telogen Effluvium (F)
//     </div><br />
//     <div className='sub-optionss'>
//       <h4>Androgenetic Alopecia (M)</h4>
//       <div className='optionss'>
//         <input type="checkbox" name="diagnosis" value="androgenetic_alopecia_m_grade_1" onChange={handleChange} />
//         Grade 1
//       </div><br />
//       <div className='optionss'>
//         <input type="checkbox" name="diagnosis" value="androgenetic_alopecia_m_grade_2_3" onChange={handleChange} />
//         Grade 2 & Grade 3
//       </div><br />
//       <div className='optionss'>
//         <input type="checkbox" name="diagnosis" value="androgenetic_alopecia_m_grade_4_5" onChange={handleChange} />
//         Grade 4 & Grade 5
//       </div><br />
//       <div className='optionss'>
//         <input type="checkbox" name="diagnosis" value="androgenetic_alopecia_m_grade_6_7" onChange={handleChange} />
//         Grade 6 & Grade 7
//       </div><br />
//     </div>
//     <div className='sub-optionss'>
//       <h4>Androgenetic Alopecia (F)</h4>
//       <div className='optionss'>
//         <input type="checkbox" name="diagnosis" value="androgenetic_alopecia_f_grade_1" onChange={handleChange} />
//         Grade 1
//       </div><br />
//       <div className='optionss'>
//         <input type="checkbox" name="diagnosis" value="androgenetic_alopecia_f_grade_2" onChange={handleChange} />
//         Grade 2
//       </div><br />
//       <div className='optionss'>
//         <input type="checkbox" name="diagnosis" value="androgenetic_alopecia_f_grade_3" onChange={handleChange} />
//         Grade 3
//       </div><br />
//     </div>
//     <div className='optionss'>
//       <input type="checkbox" name="diagnosis" value="alopecia_areata_m" onChange={handleChange} />
//       Alopecia Areata (M)
//     </div><br />
//     <div className='optionss'>
//       <input type="checkbox" name="diagnosis" value="alopecia_areata_f" onChange={handleChange} />
//       Alopecia Areata (F)
//     </div><br />
//     <div className='optionss'>
//       <input type="checkbox" name="diagnosis" value="pcod" onChange={handleChange} />
//       PCOD
//     </div><br />
//     <div className='optionss'>
//       <input type="checkbox" name="diagnosis" value="thyroid" onChange={handleChange} />
//       Thyroid
//     </div><br />
//     <div className='optionss'>
//       <input type="checkbox" name="diagnosis" value="anemia" onChange={handleChange} />
//       Anemia
//     </div><br />
//     <div className='optionss'>
//       <input type="checkbox" name="diagnosis" value="dandruff" onChange={handleChange} />
//       Dandruff
//     </div><br />
//     <div className='optionss'>
//       <input type="checkbox" name="diagnosis" value="grey_hair" onChange={handleChange} />
//       Grey Hair
//     </div>
//   </form>
// </div>
//   )
// }
// import React, { useState } from 'react';

// export default function Test1({selectedOptions,setSelectedOptions}) {
//   // const [selectedOptions, setSelectedOptions] = useState([]);

//   const optionMapping = {
//     "acute_telogen_effluvium_m": "Acute Telogen Effluvium (M)",
//     "chronic_telogen_effluvium_m": "Chronic Telogen Effluvium (M)",
//     "acute_telogen_effluvium_f": "Acute Telogen Effluvium (F)",
//     "chronic_telogen_effluvium_f": "Chronic Telogen Effluvium (F)",
//     "androgenetic_alopecia_m": "Androgenetic Alopecia (M)",
//     "androgenetic_alopecia_f": "Androgenetic Alopecia (F)",
//     "alopecia_areata_m": "Alopecia Areata (M)",
//     "alopecia_areata_f": "Alopecia Areata (F)",
//     "pcod": "PCOD",
//     "thyroid": "Thyroid",
//     "anemia": "Anemia",
//     "dandruff": "Dandruff",
//     "grey_hair": "Grey Hair",
//     "androgenetic_alopecia_m,Grade 1": "Grade 1",
//     "androgenetic_alopecia_m,Grade 2 & Grade 3": "Grade 2 & Grade 3",
//     "androgenetic_alopecia_m,Grade 4 & Grade 5": "Grade 4 & Grade 5",
//     "androgenetic_alopecia_m,Grade 6 & Grade 7": "Grade 6 & Grade 7",
//     "androgenetic_alopecia_f,Grade 1": "Grade 1",
//     "androgenetic_alopecia_f,Grade 2": "Grade 2",
//     "androgenetic_alopecia_f,Grade 3": "Grade 3"
//   };

//   const handleChange = (event) => {
//     const { value, checked } = event.target;
//     const [mainOption, subOption] = value.split(',');

//     const mainOptionText = optionMapping[mainOption];
//     const subOptionText = subOption ? optionMapping[value] : null;

//     setSelectedOptions(prevOptions => {
//       if (checked) {
//         if (subOption) {
//           // Deselect all other sub-options for this main option
//           const updatedOptions = prevOptions.filter(opt => opt.option !== mainOptionText || opt.subOption === null);
//           // Add the new sub-option
//           return [...updatedOptions, { option: mainOptionText, subOption: subOptionText }];
//         } else {
//           return [...prevOptions, { option: mainOptionText, subOption: null }];
//         }
//       } else {
//         if (subOption) {
//           return prevOptions.filter(opt => !(opt.option === mainOptionText && opt.subOption === subOptionText));
//         } else {
//           return prevOptions.filter(opt => opt.option !== mainOptionText);
//         }
//       }
//     });
//   };

//   const isChecked = (mainOption, subOption = null) => {
//     return selectedOptions.some(opt => opt.option === mainOption && opt.subOption === subOption);
//   };
// console.log(selectedOptions,'tt')
//   return (
//     <div className='doc-testp'>
//       <h1 className='diag'>1) Diagnosis</h1>
//       <form>
//         <h4>Diagnosis & Details</h4>
//         <div className='optionss'>
//           <input
//             type="checkbox"
//             name="diagnosis"
//             value="acute_telogen_effluvium_m"
//             onChange={handleChange}
//             checked={isChecked("Acute Telogen Effluvium (M)")}
//           />
//           Acute Telogen Effluvium (M)
//         </div><br />
//         <div className='optionss'>
//           <input
//             type="checkbox"
//             name="diagnosis"
//             value="chronic_telogen_effluvium_m"
//             onChange={handleChange}
//             checked={isChecked("Chronic Telogen Effluvium (M)")}
//           />
//           Chronic Telogen Effluvium (M)
//         </div><br />
//         <div className='optionss'>
//           <input
//             type="checkbox"
//             name="diagnosis"
//             value="acute_telogen_effluvium_f"
//             onChange={handleChange}
//             checked={isChecked("Acute Telogen Effluvium (F)")}
//           />
//           Acute Telogen Effluvium (F)
//         </div><br />
//         <div className='optionss'>
//           <input
//             type="checkbox"
//             name="diagnosis"
//             value="chronic_telogen_effluvium_f"
//             onChange={handleChange}
//             checked={isChecked("Chronic Telogen Effluvium (F)")}
//           />
//           Chronic Telogen Effluvium (F)
//         </div><br />
//         <div className='sub-optionss'>
//           <h4>Androgenetic Alopecia (M)</h4>
//           <div className='optionss'>
//             <input
//               type="checkbox"
//               name="diagnosis"
//               value="androgenetic_alopecia_m,Grade 1"
//               onChange={handleChange}
//               checked={isChecked("Androgenetic Alopecia (M)", "Grade 1")}
//             />
//             Grade 1
//           </div><br />
//           <div className='optionss'>
//             <input
//               type="checkbox"
//               name="diagnosis"
//               value="androgenetic_alopecia_m,Grade 2 & Grade 3"
//               onChange={handleChange}
//               checked={isChecked("Androgenetic Alopecia (M)", "Grade 2 & Grade 3")}
//             />
//             Grade 2 & Grade 3
//           </div><br />
//           <div className='optionss'>
//             <input
//               type="checkbox"
//               name="diagnosis"
//               value="androgenetic_alopecia_m,Grade 4 & Grade 5"
//               onChange={handleChange}
//               checked={isChecked("Androgenetic Alopecia (M)", "Grade 4 & Grade 5")}
//             />
//             Grade 4 & Grade 5
//           </div><br />
//           <div className='optionss'>
//             <input
//               type="checkbox"
//               name="diagnosis"
//               value="androgenetic_alopecia_m,Grade 6 & Grade 7"
//               onChange={handleChange}
//               checked={isChecked("Androgenetic Alopecia (M)", "Grade 6 & Grade 7")}
//             />
//             Grade 6 & Grade 7
//           </div><br />
//         </div>
//         <div className='sub-optionss'>
//           <h4>Androgenetic Alopecia (F)</h4>
//           <div className='optionss'>
//             <input
//               type="checkbox"
//               name="diagnosis"
//               value="androgenetic_alopecia_f,Grade 1"
//               onChange={handleChange}
//               checked={isChecked("Androgenetic Alopecia (F)", "Grade 1")}
//             />
//             Grade 1
//           </div><br />
//           <div className='optionss'>
//             <input
//               type="checkbox"
//               name="diagnosis"
//               value="androgenetic_alopecia_f,Grade 2"
//               onChange={handleChange}
//               checked={isChecked("Androgenetic Alopecia (F)", "Grade 2")}
//             />
//             Grade 2
//           </div><br />
//           <div className='optionss'>
//             <input
//               type="checkbox"
//               name="diagnosis"
//               value="androgenetic_alopecia_f,Grade 3"
//               onChange={handleChange}
//               checked={isChecked("Androgenetic Alopecia (F)", "Grade 3")}
//             />
//             Grade 3
//           </div><br />
//         </div>
//         <div className='optionss'>
//           <input
//             type="checkbox"
//             name="diagnosis"
//             value="alopecia_areata_m"
//             onChange={handleChange}
//             checked={isChecked("Alopecia Areata (M)")}
//           />
//           Alopecia Areata (M)
//         </div><br />
//         <div className='optionss'>
//           <input
//             type="checkbox"
//             name="diagnosis"
//             value="alopecia_areata_f"
//             onChange={handleChange}
//             checked={isChecked("Alopecia Areata (F)")}
//           />
//           Alopecia Areata (F)
//         </div><br />
//         <div className='optionss'>
//           <input
//             type="checkbox"
//             name="diagnosis"
//             value="pcod"
//             onChange={handleChange}
//             checked={isChecked("PCOD")}
//           />
//           PCOD
//         </div><br />
//         <div className='optionss'>
//           <input
//             type="checkbox"
//             name="diagnosis"
//             value="thyroid"
//             onChange={handleChange}
//             checked={isChecked("Thyroid")}
//           />
//           Thyroid
//         </div><br />
//         <div className='optionss'>
//           <input
//             type="checkbox"
//             name="diagnosis"
//             value="anemia"
//             onChange={handleChange}
//             checked={isChecked("Anemia")}
//           />
//           Anemia
//         </div><br />
//         <div className='optionss'>
//           <input
//             type="checkbox"
//             name="diagnosis"
//             value="dandruff"
//             onChange={handleChange}
//             checked={isChecked("Dandruff")}
//           />
//           Dandruff
//         </div><br />
//         <div className='optionss'>
//           <input
//             type="checkbox"
//             name="diagnosis"
//             value="grey_hair"
//             onChange={handleChange}
//             checked={isChecked("Grey Hair")}
//           />
//           Grey Hair
//         </div>
//         <br/>
//         <div className='optionss'>
        
//           Other
//           <input
//             type="text"
           
//           />
//         </div>
//       </form>
//     </div>
//   );
// }
import React from 'react';

export default function Test1({ selectedOptions, setSelectedOptions }) {

  const optionMapping = {
    "acute_telogen_effluvium_m": "Acute Telogen Effluvium (M)",
    "chronic_telogen_effluvium_m": "Chronic Telogen Effluvium (M)",
    "acute_telogen_effluvium_f": "Acute Telogen Effluvium (F)",
    "chronic_telogen_effluvium_f": "Chronic Telogen Effluvium (F)",
    "androgenetic_alopecia_m": "Androgenetic Alopecia (M)",
    "androgenetic_alopecia_f": "Androgenetic Alopecia (F)",
    "alopecia_areata_m": "Alopecia Areata (M)",
    "alopecia_areata_f": "Alopecia Areata (F)",
    "pcod": "PCOD",
    "thyroid": "Thyroid",
    "anemia": "Anemia",
    "dandruff": "Dandruff",
    "grey_hair": "Grey Hair",
    "androgenetic_alopecia_m,Grade 1": "Grade 1",
    "androgenetic_alopecia_m,Grade 2 & Grade 3": "Grade 2 & Grade 3",
    "androgenetic_alopecia_m,Grade 4 & Grade 5": "Grade 4 & Grade 5",
    "androgenetic_alopecia_m,Grade 6 & Grade 7": "Grade 6 & Grade 7",
    "androgenetic_alopecia_f,Grade 1": "Grade 1",
    "androgenetic_alopecia_f,Grade 2": "Grade 2",
    "androgenetic_alopecia_f,Grade 3": "Grade 3"
  };
console.log(selectedOptions,"other")
  const handleChange = (event) => {
    const { value, checked } = event.target;
    const [mainOption, subOption] = value.split(',');

    const mainOptionText = optionMapping[mainOption];
    const subOptionText = subOption ? optionMapping[value] : null;

    setSelectedOptions(prevOptions => {
      if (checked) {
        if (subOption) {
          const updatedOptions = prevOptions.filter(opt => opt.option !== mainOptionText || opt.subOption === null);
          return [...updatedOptions, { option: mainOptionText, subOption: subOptionText }];
        } else {
          return [...prevOptions, { option: mainOptionText, subOption: null }];
        }
      } else {
        if (subOption) {
          return prevOptions.filter(opt => !(opt.option === mainOptionText && opt.subOption === subOptionText));
        } else {
          return prevOptions.filter(opt => opt.option !== mainOptionText);
        }
      }
    });
  };

  const isChecked = (mainOption, subOption = null) => {
    return selectedOptions.some(opt => opt.option === mainOption && opt.subOption === subOption);
  };

  return (
    <div className='doc-testp'>
      <h1 className='diag'>1) Diagnosis</h1>
      <form>
        <h4>Diagnosis & Details</h4>
        <div className='optionss'>
          <input
            type="checkbox"
            name="diagnosis"
            value="acute_telogen_effluvium_m"
            onChange={handleChange}
            disabled={selectedOptions?.length > 2 && !isChecked("Acute Telogen Effluvium (M)")}
            checked={isChecked("Acute Telogen Effluvium (M)")}
          />
          Acute Telogen Effluvium (M)
        </div><br />
        <div className='optionss'>
          <input
            type="checkbox"
            name="diagnosis"
            value="chronic_telogen_effluvium_m"
            onChange={handleChange}
            disabled={selectedOptions?.length > 2 && !isChecked("Chronic Telogen Effluvium (M)")}
            checked={isChecked("Chronic Telogen Effluvium (M)")}
          />
          Chronic Telogen Effluvium (M)
        </div><br />
        <div className='optionss'>
          <input
            type="checkbox"
            name="diagnosis"
            value="acute_telogen_effluvium_f"
            onChange={handleChange}
            disabled={selectedOptions?.length > 2 && !isChecked("Acute Telogen Effluvium (F)")}
            checked={isChecked("Acute Telogen Effluvium (F)")}
          />
          Acute Telogen Effluvium (F)
        </div><br />
        <div className='optionss'>
          <input
            type="checkbox"
            name="diagnosis"
            value="chronic_telogen_effluvium_f"
            onChange={handleChange}
            disabled={selectedOptions?.length > 2 && !isChecked("Chronic Telogen Effluvium (F)")}
            checked={isChecked("Chronic Telogen Effluvium (F)")}
          />
          Chronic Telogen Effluvium (F)
        </div><br />
        <div className='sub-optionss'>
          <h4>Androgenetic Alopecia (M)</h4>
          <div className='optionss'>
            <input
              type="checkbox"
              name="diagnosis"
              value="androgenetic_alopecia_m,Grade 1"
              onChange={handleChange}
              disabled={selectedOptions?.length > 2 && !isChecked("Androgenetic Alopecia (M)", "Grade 1")}
              checked={isChecked("Androgenetic Alopecia (M)", "Grade 1")}
            />
            Grade 1
          </div><br />
          <div className='optionss'>
            <input
              type="checkbox"
              name="diagnosis"
              value="androgenetic_alopecia_m,Grade 2 & Grade 3"
              onChange={handleChange}
              disabled={selectedOptions?.length > 2 && !isChecked("Androgenetic Alopecia (M)", "Grade 2 & Grade 3")}
              checked={isChecked("Androgenetic Alopecia (M)", "Grade 2 & Grade 3")}
            />
            Grade 2 & Grade 3
          </div><br />
          <div className='optionss'>
            <input
              type="checkbox"
              name="diagnosis"
              value="androgenetic_alopecia_m,Grade 4 & Grade 5"
              onChange={handleChange}
              disabled={selectedOptions?.length > 2 && !isChecked("Androgenetic Alopecia (M)", "Grade 4 & Grade 5")}
              checked={isChecked("Androgenetic Alopecia (M)", "Grade 4 & Grade 5")}
            />
            Grade 4 & Grade 5
          </div><br />
          <div className='optionss'>
            <input
              type="checkbox"
              name="diagnosis"
              value="androgenetic_alopecia_m,Grade 6 & Grade 7"
              onChange={handleChange}
              disabled={selectedOptions?.length > 2 && !isChecked("Androgenetic Alopecia (M)", "Grade 6 & Grade 7")}
              checked={isChecked("Androgenetic Alopecia (M)", "Grade 6 & Grade 7")}
            />
            Grade 6 & Grade 7
          </div><br />
        </div>
        <div className='sub-optionss'>
          <h4>Androgenetic Alopecia (F)</h4>
          <div className='optionss'>
            <input
              type="checkbox"
              name="diagnosis"
              value="androgenetic_alopecia_f,Grade 1"
              onChange={handleChange}
              disabled={selectedOptions?.length > 2 && !isChecked("Androgenetic Alopecia (F)", "Grade 1")}
              checked={isChecked("Androgenetic Alopecia (F)", "Grade 1")}
            />
            Grade 1
          </div><br />
          <div className='optionss'>
            <input
              type="checkbox"
              name="diagnosis"
              value="androgenetic_alopecia_f,Grade 2"
              onChange={handleChange}
              disabled={selectedOptions?.length > 2 && !isChecked("Androgenetic Alopecia (F)", "Grade 2")}
              checked={isChecked("Androgenetic Alopecia (F)", "Grade 2")}
            />
            Grade 2
          </div><br />
          <div className='optionss'>
            <input
              type="checkbox"
              name="diagnosis"
              value="androgenetic_alopecia_f,Grade 3"
              onChange={handleChange}
              disabled={selectedOptions?.length > 2 && !isChecked("Androgenetic Alopecia (F)", "Grade 3")}
              checked={isChecked("Androgenetic Alopecia (F)", "Grade 3")}
            />
            Grade 3
          </div><br />
        </div>
        <div className='optionss'>
          <input
            type="checkbox"
            name="diagnosis"
            value="alopecia_areata_m"
            onChange={handleChange}
            disabled={selectedOptions?.length > 2 && !isChecked("Alopecia Areata (M)")}
            checked={isChecked("Alopecia Areata (M)")}
          />
          Alopecia Areata (M)
        </div><br />
        <div className='optionss'>
          <input
            type="checkbox"
            name="diagnosis"
            value="alopecia_areata_f"
            onChange={handleChange}
            disabled={selectedOptions?.length > 2 && !isChecked("Alopecia Areata (F)")}
            checked={isChecked("Alopecia Areata (F)")}
          />
          Alopecia Areata (F)
        </div><br />
        <div className='optionss'>
          <input
            type="checkbox"
            name="diagnosis"
            value="pcod"
            onChange={handleChange}
            disabled={selectedOptions?.length > 2 && !isChecked("PCOD")}
            checked={isChecked("PCOD")}
          />
          PCOD
        </div><br />
        <div className='optionss'>
          <input
            type="checkbox"
            name="diagnosis"
            value="thyroid"
            onChange={handleChange}
            disabled={selectedOptions?.length > 2 && !isChecked("Thyroid")}
            checked={isChecked("Thyroid")}
          />
          Thyroid
        </div><br />
        <div className='optionss'>
          <input
            type="checkbox"
            name="diagnosis"
            value="anemia"
            onChange={handleChange}
            disabled={selectedOptions?.length > 2 && !isChecked("Anemia")}
            checked={isChecked("Anemia")}
          />
          Anemia
        </div><br />
        <div className='optionss'>
          <input
            type="checkbox"
            name="diagnosis"
            value="dandruff"
            onChange={handleChange}
            disabled={selectedOptions?.length > 2 && !isChecked("Dandruff")}
            checked={isChecked("Dandruff")}
          />
          Dandruff
        </div><br />
        <div className='optionss'>
          <input
            type="checkbox"
            name="diagnosis"
            value="grey_hair"
            onChange={handleChange}
            disabled={selectedOptions?.length > 2 && !isChecked("Grey Hair")}
            checked={isChecked("Grey Hair")}
          />
          Grey Hair
        </div><br />
        {selectedOptions?.length < 3 && <div className='optionss'>
          Other
          <input
            type="text"
            name="other"
            onChange={(e) => setSelectedOptions(prevOptions => {
              const newOptions = prevOptions.filter(opt => opt.option !== 'Other');
              if (e.target.value.trim() !== '') {
                newOptions.push({ option: 'Other', subOption: e.target.value });
              }
              return newOptions;
            })}
          />
        </div>}
      </form>
    </div>
  );
}
