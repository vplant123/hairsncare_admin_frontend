// import React, { useEffect, useState } from 'react';

// export default function HairAndScalp({ data, selectedOptions3, setSelectedOptions3, currentQuestionIndex, setCurrentQuestionIndex, setBanner, nextStep, prevStep }) {
//   const [currentStep, setCurrentStep] = useState(0);

//   useEffect(() => {
//     setBanner(data.steps[currentStep].banner);
//   }, [currentStep, setBanner, data]);

//   const handleNextStep = () => {
//     if (currentStep < data.steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       nextStep();
//     }
//   };

//   const handlePrevStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     } else {
//       prevStep();
//     }
//   };

//   const handleOptionSelect = (option, question) => {
//     const updatedSelectedOptions = [...selectedOptions3];

//     // If options for the current step are not initialized, initialize them
//     if (!updatedSelectedOptions[currentStep]) {
//       updatedSelectedOptions[currentStep] = [];
//     }

//     // Find the index of the question in the current step's selected options
//     const questionIndex = updatedSelectedOptions[currentStep].findIndex(
//       (item) => item.question === question
//     );

//     // If the question is not found in the current step's selected options, add it
//     if (questionIndex === -1) {
//       updatedSelectedOptions[currentStep].push({ option, question });
//     } else {
//       // If the question is found, update the option
//       updatedSelectedOptions[currentStep][questionIndex].option = option;
//     }

//     setSelectedOptions3(updatedSelectedOptions);
//   };

// console.log(selectedOptions3);
//   return (
//     <div className='hair-scalp'>
//       <div className="progress-indicator">
//         {data.steps.map((_, index) => (
//           <span
//             key={index}
//             className={index === currentStep ? "dot active" : "dot"}
//           />
//         ))}
//       </div>
//       {data.steps[currentStep].questions.map((question, index) => (
//   <div key={index}>
//     <h3>{question.ques}</h3>
//     <div className="options-container">
//       {question.options.map((option, optionIndex) => {
//         const isSelected = selectedOptions3[currentStep]?.some(
//           (selectedOption) =>
//             selectedOption.question === question.ques &&
//             selectedOption.option ===
//               (typeof option === 'string' ? option : option)
//         );

//         return (
//           <div
//             key={optionIndex}
//             className={`option ${typeof option === 'string' ? 'circle' : ''} ${
//               isSelected ? 'selected' : ''
//             }`}
//             onClick={() => handleOptionSelect(option, question.ques)}
//           >
//             {typeof option === 'string' ? (
//               <div className="circle">{option}</div>
//             ) : (
//               <label >
//                 {option.src ? (
//                   <img alt='hair' src={option.src} alt={option.name} />
//                 ) : (
//                   <div className="circle no-image option">{option.name}</div>
//                 )}
//                 <p>{option.name}</p>
//               </label>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   </div>
// ))}

//       <div className='test-btnn'>
//         <button onClick={handlePrevStep}>Prev</button>
//         <button onClick={handleNextStep}>Next</button>
//       </div>
//     </div>
//   );
// }

//////////////workable///////////////////code//////////

// import React, { useEffect, useState } from 'react';

// export default function HairAndScalp({ data, selectedOptions3, setSelectedOptions3, currentQuestionIndex, setCurrentQuestionIndex, setBanner, nextStep, prevStep }) {
//   const [currentStep, setCurrentStep] = useState(0);

//   useEffect(() => {
//     setBanner(data.steps[currentStep].banner);
//   }, [currentStep, setBanner, data]);

//   const handleNextStep = () => {
//     if (currentStep < data.steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       nextStep();
//     }
//   };

//   const handlePrevStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     } else {
//       prevStep();
//     }
//   };

//   const handleOptionSelect = (option, question) => {
//     const updatedSelectedOptions = [...selectedOptions3];

//     // If options for the current step are not initialized, initialize them
//     if (!updatedSelectedOptions[currentStep]) {
//       updatedSelectedOptions[currentStep] = [];
//     }

//     // Find the index of the question in the current step's selected options
//     const questionIndex = updatedSelectedOptions[currentStep].findIndex(
//       (item) => item.question === question
//     );

//     // If the question is not found in the current step's selected options, add it
//     if (questionIndex === -1) {
//       updatedSelectedOptions[currentStep].push({ option, question });
//     } else {
//       // If the question is found, update the option
//       updatedSelectedOptions[currentStep][questionIndex].option = option;
//     }

//     setSelectedOptions3(updatedSelectedOptions);
//   };

//   return (
//     <div className='hair-scalp'>
//       <div className="progress-indicator">
//         {data.steps.map((_, index) => (
//           <span
//             key={index}
//             className={index === currentStep ? "dot active" : "dot"}
//           />
//         ))}
//       </div>
//       {data.steps[currentStep].questions.map((question, index) => (
//   <div key={index}>
//     <h3>{question.ques}</h3>
//     <div className="options-container">
//       {question.options.map((option, optionIndex) => {
//         const isSelected = selectedOptions3[currentStep]?.some(
//           (selectedOption) =>
//             selectedOption.question === question.ques &&
//             selectedOption.option ===
//               // (typeof option === 'string' ? option : option.name || option)
//               (typeof option === 'string' ? option :  option)

//         );

//         return (
//           <div key={optionIndex} className="option-container">
//             <div
//               className={`option ${
//                 typeof option === 'string' ? 'circle' : ''
//               } ${isSelected ? 'selected' : ''}`}
//               onClick={() => handleOptionSelect(option, question.ques)}
//             >
//               {typeof option === 'string' ? (
//                 <div className="circle">{option}</div>
//               ) : (
//                 <label>
//                   {option.src ? (
//                     <img alt='hair' src={option.src} alt={option.name} />
//                   ) : (
//                     <div className="circle no-image option">{option.name}</div>
//                   )}
//                   <p>{option.name}</p>
//                 </label>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//     {/* Render sub-questions */}
//     {question.options.map((option, optionIndex) => {
//       const isSelected = selectedOptions3[currentStep]?.some(
//         (selectedOption) =>
//           selectedOption.question === question.ques &&
//           selectedOption.option ===
//             (typeof option === 'string' ? option : option.name && option)
//       );

//       const subQuestions = question.subQuestions
//         ? question.subQuestions.find(
//             (subQuestion) =>
//               subQuestion[option.name || option]
//           )
//         : null;

//       return (
//         isSelected &&
//         subQuestions && (
//           <div key={optionIndex} className="sub-questions">
//             {Object.entries(subQuestions).map(([key, subQuestionGroup], subIndex) => (
//               <div key={subIndex} className="sub-question">
//                 <h4>{key}</h4>
//                 {subQuestionGroup.map((subQuestion, subQIndex) => (
//                   <div key={subQIndex} className="sub-option">
//                     <p>{subQuestion.ques}</p>
//                     {/* Render sub-options */}
//                     {subQuestion.options === 'input' ? (
//                       <input
//                         type="text"
//                         placeholder="Enter your answer"
//                         // value={inputValue} // Assuming you manage inputValue state
//                         // onChange={(e) => handleSubOptionSelect(e.target.value, option, subQuestion)}
//                       />
//                     ) : (
//                       subQuestion.options.map((subOption, subOptionIndex) => (
//                         <div key={subOptionIndex} className="sub-option-container">
//                           <div
//                             className={`option ${isSelected ? 'selected' : ''}`}
//                             onClick={() => handleOptionSelect(subOption, subQuestion.ques)}
//                           >
//                             {typeof subOption === 'string' ? (
//                               <div className="circle">{subOption}</div>
//                             ) : (
//                               <label>
//                                 {subOption.src ? (
//                                   <img alt='hair' src={subOption.src} alt={subOption.name} />
//                                 ) : (
//                                   <div className="circle no-image option">{subOption.name}</div>
//                                 )}
//                                 <p>{subOption.name}</p>
//                               </label>
//                             )}
//                           </div>
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         )
//       );
//     })}
//   </div>
// ))}

//       <div className='test-btnn'>
//         <button onClick={handlePrevStep}>Prev</button>
//         <button onClick={handleNextStep}>Next</button>
//       </div>
//     </div>
//   );
// }

////////////////////////////this is perfect need to add multi and save data////////
// import React, { useEffect, useState } from 'react';

// export default function HairAndScalp({ data, selectedOptions3, setSelectedOptions3, currentQuestionIndex, setCurrentQuestionIndex, setBanner, nextStep, prevStep }) {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [selectedSubOptions, setSelectedSubOptions] = useState({});
// const[mainQuestion,setMainQuestion]=useState('')
//   useEffect(() => {
//     setBanner(data.steps[currentStep].banner);
//   }, [currentStep, setBanner, data]);

//   const handleNextStep = () => {
//     if (currentStep < data.steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       nextStep();
//     }
//   };

//   const handlePrevStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     } else {
//       prevStep();
//     }
//   };

//   const handleOptionSelect = (option, question) => {
//     setMainQuestion(question)
//     const updatedSelectedOptions = [...selectedOptions3];

//     // If options for the current step are not initialized, initialize them
//     if (!updatedSelectedOptions[currentStep]) {
//       updatedSelectedOptions[currentStep] = [];
//     }

//     // Find the index of the question in the current step's selected options
//     const questionIndex = updatedSelectedOptions[currentStep].findIndex(
//       (item) => item.question === question
//     );

//     // If the question is not found in the current step's selected options, add it
//     if (questionIndex === -1) {
//       updatedSelectedOptions[currentStep].push({ option, question });
//     } else {
//       // If the question is found, update the option
//       updatedSelectedOptions[currentStep][questionIndex].option = option;
//     }
//   console.log(question,"quesmain");
//     setSelectedOptions3(updatedSelectedOptions);
//   };

//   // const handleSubOptionSelect = (option, question,mainquestion) => {
//   //   setSelectedSubOptions({
//   //     ...selectedSubOptions,
//   //     [currentStep]: {
//   //       ...selectedSubOptions[currentStep],
//   //       [question]: option
//   //     }
//   //   });
//   //   const updatedSelectedOptions = [...selectedOptions3];
//   //   const questionIndex = updatedSelectedOptions[currentStep].findIndex(
//   //     (item) => item.question === mainquestion
//   //   );
//   //   if (questionIndex === 1) {

//   //     // If the question is found, update the option
//   //     updatedSelectedOptions[currentStep][questionIndex].suboption = option;
//   //   }

//   //   setSelectedOptions3(updatedSelectedOptions);
//   // };

//   const handleSubOptionSelect = (option, subQuestion) => {
//     setSelectedSubOptions({
//       ...selectedSubOptions,
//       [currentStep]: {
//         ...selectedSubOptions[currentStep],
//         [subQuestion]: option
//       }
//     });
//     const updatedSelectedOptions = [...selectedOptions3];
//     const questionIndex = updatedSelectedOptions[currentStep].findIndex(
//       (item) => item.question === mainQuestion
//     );
//     if (questionIndex !== -1) {

//       let subdata=[{subQuestion,option}]
//       if(updatedSelectedOptions[currentStep][questionIndex].subquestions){
//         updatedSelectedOptions[currentStep][questionIndex].subquestions.push({subQuestion,option})
//       }else{
//       updatedSelectedOptions[currentStep][questionIndex].subquestions=subdata
//       }
//       // updatedSelectedOptions[currentStep][questionIndex].suboption = option;

//     }
//   console.log(mainQuestion,'index');
//     setSelectedOptions3(updatedSelectedOptions);
//   };

// console.log(selectedOptions3,"fskj",selectedSubOptions);
//   return (
//     <div className='hair-scalp'>
//       <div className="progress-indicator">
//         {data.steps.map((_, index) => (
//           <span
//             key={index}
//             className={index === currentStep ? "dot active" : "dot-per"}
//           />
//         ))}
//       </div>
//       {data.steps[currentStep].questions.map((question, index) => (
//         <div key={index}>
//           {question.h4&&<h2 className='h4'>{question.h4}</h2>}
//           <h3>{question.ques}</h3>
//           <div className="options-container">
//             {question.options.map((option, optionIndex) => {
//               const isSelected = selectedOptions3[currentStep]?.some(
//                 (selectedOption) =>
//                   selectedOption.question === question.ques &&
//                   selectedOption.option ===
//                     (typeof option === 'string' ? option : option)
//               );

//               return (
//                 <div key={optionIndex} className="option-container">
//                   <div
//                     className={`option ${
//                       typeof option === 'string' ? 'circle-01' : ''
//                     } ${isSelected ? 'selected-personal' : ''}`}
//                     onClick={() => handleOptionSelect(option, question.ques)}
//                   >
//                     {typeof option === 'string' ? (
//                       <div className="circle-01">{option}</div>
//                     ) : (
//                       <label >
//                         {option.src ? (
//                           <img className='circle-01'  src={option.src} alt={option.name} />
//                         ) : (
//                           <div className="circle-01 no-image option">{option.name}</div>
//                         )}
//                         <p>{option.name}</p>
//                       </label>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           {/* Render sub-questions */}
//           {question.options.map((option, optionIndex) => {
//             const isSelected = selectedOptions3[currentStep]?.some(
//               (selectedOption) =>
//                 selectedOption.question === question.ques &&
//                 selectedOption.option ===
//                   (typeof option === 'string' ? option : option.name && option)
//             );

//             const subQuestions = question.subQuestions
//               ? question.subQuestions.find(
//                   (subQuestion) =>
//                     subQuestion[option.name || option]
//               )
//               : null;

//             return (
//               isSelected &&
//               subQuestions && (
//                 <div key={optionIndex} className="sub-questions">
//                   {Object.entries(subQuestions).map(([key, subQuestionGroup], subIndex) => (
//                     <div key={subIndex} className="sub-question">

//                      {subQuestionGroup.map((subQuestion, subQIndex) => (
//   <div key={subQIndex}>
//     <h3>{subQuestion.ques}</h3>
//     <div className="options-container">
//       {/* Render sub-options */}
//       {subQuestion.options === 'input' ? (
//         <input
//           type="text"
//           className='specify-input'
//           placeholder="Enter your answer"
//           value={selectedSubOptions[currentStep]?.[subQuestion.ques] || ''}
//           onChange={(e) => handleSubOptionSelect(e.target.value, subQuestion.ques,question)}
//         />
//       ) : (
//         subQuestion.options.map((subOption, subOptionIndex) => (
//           <div
//             key={subOptionIndex}
//             className={`option ${typeof subOption === 'string' ? 'circle-01' : ''} ${selectedSubOptions[currentStep]?.[subQuestion.ques] === subOption ? 'selected-personal' : ''}`}
//             onClick={() => handleSubOptionSelect(subOption, subQuestion.ques)}
//           >
//             {typeof subOption === 'string' ? (
//               <div className="circle-01">{subOption}</div>
//             ) : (
//               <label>
//                 {subOption.src ? (
//                   <img className='circle-01' src={subOption.src} alt={subOption.name} />
//                 ) : (
//                   <div className="circle no-image option">{subOption.name}</div>
//                 )}
//                 <p>{subOption.name}</p>
//               </label>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   </div>
// ))}

//                     </div>
//                   ))}
//                 </div>
//               )
//             );
//           })}
//         </div>
//       ))}
//       <div className='test-btnn'>
//         <button onClick={handlePrevStep}>Prev</button>
//         <button onClick={handleNextStep}>Next</button>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from 'react';

// export default function HairAndScalp({ data, selectedOptions3, setSelectedOptions3, currentQuestionIndex, setCurrentQuestionIndex, setBanner, nextStep, prevStep }) {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [selectedSubOptions, setSelectedSubOptions] = useState({});
//   const [mainQuestion, setMainQuestion] = useState('');

//   useEffect(() => {
//     setBanner(data.steps[currentStep].banner);
//   }, [currentStep, setBanner, data]);

//   const handleNextStep = () => {
//     if (currentStep < data.steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       nextStep();
//     }
//   };

//   const handlePrevStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     } else {
//       prevStep();
//     }
//   };

//   const handleOptionSelect = (option, question, isMulti) => {
//     setMainQuestion(question);
//     const updatedSelectedOptions = [...selectedOptions3];

//     // If options for the current step are not initialized, initialize them
//     if (!updatedSelectedOptions[currentStep]) {
//       updatedSelectedOptions[currentStep] = [];
//     }

//     // Find the index of the question in the current step's selected options
//     const questionIndex = updatedSelectedOptions[currentStep].findIndex(
//       (item) => item.question === question
//     );

//     // If the question is not found in the current step's selected options, add it
//     if (questionIndex === -1) {
//       updatedSelectedOptions[currentStep].push({ option, question });
//     } else {
//       if (isMulti) {
//         const options = updatedSelectedOptions[currentStep][questionIndex].option || [];
//         if (options.includes(option)) {
//           updatedSelectedOptions[currentStep][questionIndex].option = options.filter(o => o !== option);
//         } else {
//           updatedSelectedOptions[currentStep][questionIndex].option = [...options, option];
//         }
//       } else {
//         updatedSelectedOptions[currentStep][questionIndex].option = option;
//       }
//     }
//     setSelectedOptions3(updatedSelectedOptions);
//   };

//   const handleSubOptionSelect = (option, subQuestion) => {
//     setSelectedSubOptions({
//       ...selectedSubOptions,
//       [currentStep]: {
//         ...selectedSubOptions[currentStep],
//         [subQuestion]: option
//       }
//     });
//     const updatedSelectedOptions = [...selectedOptions3];
//     const questionIndex = updatedSelectedOptions[currentStep].findIndex(
//       (item) => item.question === mainQuestion
//     );
//     if (questionIndex !== -1) {
//       let subdata = [{ subQuestion, option }];
//       if (updatedSelectedOptions[currentStep][questionIndex].subquestions) {
//         updatedSelectedOptions[currentStep][questionIndex].subquestions.push({ subQuestion, option });
//       } else {
//         updatedSelectedOptions[currentStep][questionIndex].subquestions = subdata;
//       }
//     }
//     setSelectedOptions3(updatedSelectedOptions);
//   };

//   console.log(selectedOptions3, "fskj", selectedSubOptions);
//   return (
//     <div className='hair-scalp'>
//       <div className="progress-indicator">
//         {data.steps.map((_, index) => (
//           <span
//             key={index}
//             className={index === currentStep ? "dot active" : "dot-per"}
//           />
//         ))}
//       </div>
//       {data.steps[currentStep].questions.map((question, index) => (
//         <div key={index}>
//           {question.h4 && <h2 className='h4'>{question.h4}</h2>}
//           <h3>{question.ques}</h3>
//           <div className="options-container">
//             {question.options.map((option, optionIndex) => {
//               const isSelected = selectedOptions3[currentStep]?.some(
//                 (selectedOption) =>
//                   selectedOption.question === question.ques &&
//                   (
//                     question.multi ?
//                       selectedOption.option?.includes(option) :
//                       selectedOption.option === option
//                   )
//               );

//               return (
//                 <div key={optionIndex} className="option-container">
//                   <div
//                     className={`option ${
//                       typeof option === 'string' ? 'circle-01' : ''
//                     } ${isSelected ? 'selected-personal' : ''}`}
//                     onClick={() => handleOptionSelect(option, question.ques, question.multi)}
//                   >
//                     {typeof option === 'string' ? (
//                       <div className="circle-01">{option}</div>
//                     ) : (
//                       <label>
//                         {option.src ? (
//                           <img className='circle-01' src={option.src} alt={option.name} />
//                         ) : (
//                           <div className="circle-01 no-image option">{option.name}</div>
//                         )}
//                         <p>{option.name}</p>
//                       </label>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           {question.options.map((option, optionIndex) => {
//             const isSelected = selectedOptions3[currentStep]?.some(
//               (selectedOption) =>
//                 selectedOption.question === question.ques &&
//                 selectedOption.option ===
//                 (typeof option === 'string' ? option : option.name && option)
//             );

//             const subQuestions = question.subQuestions
//               ? question.subQuestions.find(
//                 (subQuestion) =>
//                   subQuestion[option.name || option]
//               )
//               : null;

//             return (
//               isSelected &&
//               subQuestions && (
//                 <div key={optionIndex} className="sub-questions">
//                   {Object.entries(subQuestions).map(([key, subQuestionGroup], subIndex) => (
//                     <div key={subIndex} className="sub-question">

//                       {subQuestionGroup.map((subQuestion, subQIndex) => (
//                         <div key={subQIndex}>
//                           <h3>{subQuestion.ques}</h3>
//                           <div className="options-container">
//                             {subQuestion.options === 'input' ? (
//                               <input
//                                 type="text"
//                                 className='specify-input'
//                                 placeholder="Enter your answer"
//                                 value={selectedSubOptions[currentStep]?.[subQuestion.ques] || ''}
//                                 onChange={(e) => handleSubOptionSelect(e.target.value, subQuestion.ques, question)}
//                               />
//                             ) : (
//                               subQuestion.options.map((subOption, subOptionIndex) => (
//                                 <div
//                                   key={subOptionIndex}
//                                   className={`option ${typeof subOption === 'string' ? 'circle-01' : ''} ${selectedSubOptions[currentStep]?.[subQuestion.ques] === subOption ? 'selected-personal' : ''}`}
//                                   onClick={() => handleSubOptionSelect(subOption, subQuestion.ques)}
//                                 >
//                                   {typeof subOption === 'string' ? (
//                                     <div className="circle-01">{subOption}</div>
//                                   ) : (
//                                     <label>
//                                       {subOption.src ? (
//                                         <img className='circle-01' src={subOption.src} alt={subOption.name} />
//                                       ) : (
//                                         <div className="circle no-image option">{subOption.name}</div>
//                                       )}
//                                       <p>{subOption.name}</p>
//                                     </label>
//                                   )}
//                                 </div>
//                               ))
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ))}
//                 </div>
//               )
//             );
//           })}
//         </div>
//       ))}
//       <div className='test-btnn'>
//         <button onClick={handlePrevStep}>Prev</button>
//         <button onClick={handleNextStep}>Next</button>
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from 'react';

// export default function HairAndScalp({ data, selectedOptions3, setSelectedOptions3, currentQuestionIndex, setCurrentQuestionIndex, setBanner, nextStep, prevStep }) {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [selectedSubOptions, setSelectedSubOptions] = useState({});
//   const [mainQuestion, setMainQuestion] = useState('');

//   useEffect(() => {
//     setBanner(data.steps[currentStep].banner);
//   }, [currentStep, setBanner, data]);

//   const handleNextStep = () => {
//     if (currentStep < data.steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       nextStep();
//     }
//   };

//   const handlePrevStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     } else {
//       prevStep();
//     }
//   };

//   const handleOptionSelect = (option, question, isMulti) => {
//     setMainQuestion(question);
//     const updatedSelectedOptions = [...selectedOptions3];

//     if (!updatedSelectedOptions[currentStep]) {
//       updatedSelectedOptions[currentStep] = [];
//     }

//     const questionIndex = updatedSelectedOptions[currentStep].findIndex(
//       (item) => item.question === question
//     );

//     if (questionIndex === -1) {
//       updatedSelectedOptions[currentStep].push({ option: isMulti ? [option] : option, question });
//     } else {
//       if (isMulti) {
//         let options = updatedSelectedOptions[currentStep][questionIndex].option || [];
//         if (option.name === 'None' || option.name === 'Normal') {
//           options = [option];
//         } else {
//           options = options.includes(option) ? options.filter(o => o !== option) : [...options, option];
//           options = options.filter(o => o.name !== 'None' && o.name !== 'Normal');
//         }
//         updatedSelectedOptions[currentStep][questionIndex].option = options;
//       } else {
//         updatedSelectedOptions[currentStep][questionIndex].option = option;
//       }
//     }
//     setSelectedOptions3(updatedSelectedOptions);
//   };

//   const handleSubOptionSelect = (option, subQuestion, isMulti) => {
//     setSelectedSubOptions({
//       ...selectedSubOptions,
//       [currentStep]: {
//         ...selectedSubOptions[currentStep],
//         [subQuestion]: isMulti
//           ? (selectedSubOptions[currentStep]?.[subQuestion] || []).includes(option)
//             ? selectedSubOptions[currentStep][subQuestion].filter(o => o !== option)
//             : [...(selectedSubOptions[currentStep]?.[subQuestion] || []), option]
//           : option
//       }
//     });

//     const updatedSelectedOptions = [...selectedOptions3];
//     const questionIndex = updatedSelectedOptions[currentStep].findIndex(
//       (item) => item.question === mainQuestion
//     );

//     if (questionIndex !== -1) {
//       if (!updatedSelectedOptions[currentStep][questionIndex].subquestions) {
//         updatedSelectedOptions[currentStep][questionIndex].subquestions = [];
//       }

//       const subQuestionIndex = updatedSelectedOptions[currentStep][questionIndex].subquestions.findIndex(
//         (sub) => sub.subQuestion === subQuestion
//       );

//       if (subQuestionIndex === -1) {
//         updatedSelectedOptions[currentStep][questionIndex].subquestions.push({
//           subQuestion,
//           option: isMulti ? [option] : option
//         });
//       } else {
//         if (isMulti) {
//           let options = updatedSelectedOptions[currentStep][questionIndex].subquestions[subQuestionIndex].option || [];
//           options = options.includes(option) ? options.filter(o => o !== option) : [...options, option];
//           updatedSelectedOptions[currentStep][questionIndex].subquestions[subQuestionIndex].option = options;
//         } else {
//           updatedSelectedOptions[currentStep][questionIndex].subquestions[subQuestionIndex].option = option;
//         }
//       }
//     }
//     setSelectedOptions3(updatedSelectedOptions);
//   };
// console.log(selectedOptions3,'scalp')
//   return (
//     <div className='hair-scalp'>
//       <div className="progress-indicator">
//         {data.steps.map((_, index) => (
//           <span
//             key={index}
//             className={index === currentStep ? "dot active" : "dot-per"}
//           />
//         ))}
//       </div>
//       {data.steps[currentStep].questions.map((question, index) => (
//         <div key={index}>
//           {question.h4 && <h2 className='h4'>{question.h4}</h2>}
//           <h3>{question.ques}</h3>
//           <div className="options-container">
//             {question.options.map((option, optionIndex) => {
//               const isSelected = selectedOptions3[currentStep]?.some(
//                 (selectedOption) =>
//                   selectedOption.question === question.ques &&
//                   (
//                     question.multi ?
//                       selectedOption.option?.includes(option) :
//                       selectedOption.option === option
//                   )
//               );

//               return (
//                 <div key={optionIndex} className="option-container">
//                   <div
//                     className={`option ${
//                       typeof option === 'string' ? 'circle-01' : ''
//                     } ${isSelected ? 'selected-personal' : ''}`}
//                     onClick={() => handleOptionSelect(option, question.ques, question.multi)}
//                   >
//                     {typeof option === 'string' ? (
//                       <div className="circle-01">{option}</div>
//                     ) : (
//                       <label>
//                         {option.src ? (
//                           <img className='circle-01' src={option.src} alt={option.name} />
//                         ) : (
//                           <div className="circle-01 no-image option">{option.name}</div>
//                         )}
//                         <p>{option.name}</p>
//                       </label>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           {question.options.map((option, optionIndex) => {
//             const isSelected = selectedOptions3[currentStep]?.some(
//               (selectedOption) =>
//                 selectedOption.question === question.ques &&
//                 selectedOption.option ===
//                 (typeof option === 'string' ? option : option.name && option)
//             );

//             const subQuestions = question.subQuestions
//               ? question.subQuestions.find(
//                 (subQuestion) =>
//                   subQuestion[option.name || option]
//               )
//               : null;

//             return (
//               isSelected &&
//               subQuestions && (
//                 <div key={optionIndex} className="sub-questions">
//                   {Object.entries(subQuestions).map(([key, subQuestionGroup], subIndex) => (
//                     <div key={subIndex} className="sub-question">
//                       {subQuestionGroup.map((subQuestion, subQIndex) => (
//                         <div key={subQIndex}>
//                           <h3>{subQuestion.ques}</h3>
//                           <div className="options-container">
//                             {subQuestion.options === 'input' ? (
//                               <input
//                                 type="text"
//                                 className='specify-input'
//                                 placeholder="Enter your answer"
//                                 value={selectedSubOptions[currentStep]?.[subQuestion.ques] || ''}
//                                 onChange={(e) => handleSubOptionSelect(e.target.value, subQuestion.ques, subQuestion.multi)}
//                               />
//                             ) : (
//                               subQuestion.options.map((subOption, subOptionIndex) => {
//                                 const isSubSelected = subQuestion.multi
//                                   ? selectedSubOptions[currentStep]?.[subQuestion.ques]?.includes(subOption)
//                                   : selectedSubOptions[currentStep]?.[subQuestion.ques] === subOption;
//                                 return (
//                                   <div
//                                     key={subOptionIndex}
//                                     className={`option ${typeof subOption === 'string' ? 'circle-01' : ''} ${isSubSelected ? 'selected-personal' : ''}`}
//                                     onClick={() => handleSubOptionSelect(subOption, subQuestion.ques, subQuestion.multi)}
//                                   >
//                                     {typeof subOption === 'string' ? (
//                                       <div className="circle-01">{subOption}</div>
//                                     ) : (
//                                       <label>
//                                         {subOption.src ? (
//                                           <img className='circle-01' src={subOption.src} alt={subOption.name} />
//                                         ) : (
//                                           <div className="circle no-image option">{subOption.name}</div>
//                                         )}
//                                         <p>{subOption.name}</p>
//                                       </label>
//                                     )}
//                                   </div>
//                                 );
//                               })
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ))}
//                 </div>
//               )
//             );
//           })}
//         </div>
//       ))}
//       <div className='test-btnn'>
//         <button onClick={handlePrevStep}>Prev</button>
//         <button onClick={handleNextStep}>Next</button>
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from 'react';

// export default function HairAndScalp({ data, selectedOptions3, setSelectedOptions3, currentQuestionIndex, setCurrentQuestionIndex, setBanner, nextStep, prevStep }) {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [selectedSubOptions, setSelectedSubOptions] = useState({});
//   const [mainQuestion, setMainQuestion] = useState('');

//   useEffect(() => {
//     setBanner(data.steps[currentStep].banner);
//   }, [currentStep, setBanner, data]);

//   const handleNextStep = () => {
//     if (currentStep < data.steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       nextStep();
//     }
//   };

//   const handlePrevStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     } else {
//       prevStep();
//     }
//   };

//   const handleOptionSelect = (option, question, isMulti) => {
//     setMainQuestion(question);
//     const updatedSelectedOptions = [...selectedOptions3];

//     if (!updatedSelectedOptions[currentStep]) {
//       updatedSelectedOptions[currentStep] = [];
//     }

//     const questionIndex = updatedSelectedOptions[currentStep].findIndex(
//       (item) => item.question === question
//     );

//     if (questionIndex === -1) {
//       updatedSelectedOptions[currentStep].push({ option: isMulti ? [option] : option, question });
//     } else {
//       if (isMulti) {
//         let options = updatedSelectedOptions[currentStep][questionIndex].option || [];
//         if (option.name === 'None' || option.name === 'Normal') {
//           options = [option];
//         } else {
//           options = options.includes(option) ? options.filter(o => o !== option) : [...options, option];
//           options = options.filter(o => o.name !== 'None' && o.name !== 'Normal');
//         }
//         updatedSelectedOptions[currentStep][questionIndex].option = options;
//       } else {
//         updatedSelectedOptions[currentStep][questionIndex].option = option;
//       }
//     }
//     setSelectedOptions3(updatedSelectedOptions);
//   };

//   const handleSubOptionSelect = (option, subQuestion, isMulti) => {
//     const updatedSubOptions = { ...selectedSubOptions };
//     const currentSubOptions = updatedSubOptions[currentStep] || {};
//     const currentOptions = currentSubOptions[subQuestion] || [];

//     if (isMulti) {
//       let newOptions;
//       if (option === 'None') {
//         newOptions = ['None'];
//       } else {
//         newOptions = currentOptions.includes(option)
//           ? currentOptions.filter(o => o !== option)
//           : [...currentOptions.filter(o => o !== 'None'), option];
//       }
//       currentSubOptions[subQuestion] = newOptions;
//     } else {
//       currentSubOptions[subQuestion] = option;
//     }
//     updatedSubOptions[currentStep] = currentSubOptions;
//     setSelectedSubOptions(updatedSubOptions);

//     const updatedSelectedOptions = [...selectedOptions3];
//     const questionIndex = updatedSelectedOptions[currentStep].findIndex(
//       (item) => item.question === mainQuestion
//     );

//     if (questionIndex !== -1) {
//       if (!updatedSelectedOptions[currentStep][questionIndex].subquestions) {
//         updatedSelectedOptions[currentStep][questionIndex].subquestions = [];
//       }

//       const subQuestionIndex = updatedSelectedOptions[currentStep][questionIndex].subquestions.findIndex(
//         (sub) => sub.subQuestion === subQuestion
//       );

//       if (subQuestionIndex === -1) {
//         updatedSelectedOptions[currentStep][questionIndex].subquestions.push({
//           subQuestion,
//           option: isMulti ? [option] : option
//         });
//       } else {
//         if (isMulti) {
//           let options = updatedSelectedOptions[currentStep][questionIndex].subquestions[subQuestionIndex].option || [];
//           options = options.includes(option) ? options.filter(o => o !== option) : [...options, option];
//           updatedSelectedOptions[currentStep][questionIndex].subquestions[subQuestionIndex].option = options;
//         } else {
//           updatedSelectedOptions[currentStep][questionIndex].subquestions[subQuestionIndex].option = option;
//         }
//       }
//     }
//     setSelectedOptions3(updatedSelectedOptions);
//   };
// console.log(selectedOptions3,"scalp")
//   return (
//     <div className='hair-scalp'>
//       <div className="progress-indicator">
//         {data.steps.map((_, index) => (
//           <span
//             key={index}
//             className={index === currentStep ? "dot active" : "dot-per"}
//           />
//         ))}
//       </div>
//       {data.steps[currentStep].questions.map((question, index) => (
//         <div key={index}>
//           {question.h4 && <h2 className='h4'>{question.h4}</h2>}
//           <h3>{question.ques}</h3>
//           <div className="options-container">
//             {question.options.map((option, optionIndex) => {
//               const isSelected = selectedOptions3[currentStep]?.some(
//                 (selectedOption) =>
//                   selectedOption.question === question.ques &&
//                   (
//                     question.multi ?
//                       selectedOption.option?.includes(option) :
//                       selectedOption.option === option
//                   )
//               );

//               return (
//                 <div key={optionIndex} className="option-container">
//                   <div
//                     className={`option ${
//                       typeof option === 'string' ? 'circle-01' : ''
//                     } ${isSelected ? 'selected-personal' : ''}`}
//                     onClick={() => handleOptionSelect(option, question.ques, question.multi)}
//                   >
//                     {typeof option === 'string' ? (
//                       <div className="circle-01">{option}</div>
//                     ) : (
//                       <label>
//                         {option.src ? (
//                           <img className='circle-01' src={option.src} alt={option.name} />
//                         ) : (
//                           <div className="circle-01 no-image option">{option.name}</div>
//                         )}
//                         <p>{option.name}</p>
//                       </label>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           {question.options.map((option, optionIndex) => {
//             const isSelected = selectedOptions3[currentStep]?.some(
//               (selectedOption) =>
//                 selectedOption.question === question.ques &&
//                 selectedOption.option ===
//                 (typeof option === 'string' ? option : option.name && option)
//             );

//             const subQuestions = question.subQuestions
//               ? question.subQuestions.find(
//                 (subQuestion) =>
//                   subQuestion[option.name || option]
//               )
//               : null;

//             return (
//               isSelected &&
//               subQuestions && (
//                 <div key={optionIndex} className="sub-questions">
//                   {Object.entries(subQuestions).map(([key, subQuestionGroup], subIndex) => (
//                     <div key={subIndex} className="sub-question">
//                       {subQuestionGroup.map((subQuestion, subQIndex) => (
//                         <div key={subQIndex}>
//                           <h3>{subQuestion.ques}</h3>
//                           <div className="options-container">
//                             {subQuestion.options === 'input' ? (
//                               <input
//                                 type="text"
//                                 className='specify-input'
//                                 placeholder="Enter your answer"
//                                 value={selectedSubOptions[currentStep]?.[subQuestion.ques] || ''}
//                                 onChange={(e) => handleSubOptionSelect(e.target.value, subQuestion.ques, subQuestion.multi)}
//                               />
//                             ) : (
//                               subQuestion.options.map((subOption, subOptionIndex) => {
//                                 const isSubSelected = subQuestion.multi
//                                   ? selectedSubOptions[currentStep]?.[subQuestion.ques]?.includes(subOption)
//                                   : selectedSubOptions[currentStep]?.[subQuestion.ques] === subOption;
//                                 return (
//                                   <div
//                                     key={subOptionIndex}
//                                     className={`option ${typeof subOption === 'string' ? 'circle-01' : ''} ${isSubSelected ? 'selected-personal' : ''}`}
//                                     onClick={() => handleSubOptionSelect(subOption, subQuestion.ques, subQuestion.multi)}
//                                   >
//                                     {typeof subOption === 'string' ? (
//                                       <div className="circle-01">{subOption}</div>
//                                     ) : (
//                                       <label>
//                                         {subOption.src ? (
//                                           <img className='circle-01' src={subOption.src} alt={subOption.name} />
//                                         ) : (
//                                           <div className="circle no-image option">{subOption.name}</div>
//                                         )}
//                                         <p>{subOption.name}</p>
//                                       </label>
//                                     )}
//                                   </div>
//                                 );
//                               })
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ))}
//                 </div>
//               )
//             );
//           })}
//         </div>
//       ))}
//       <div className='test-btnn'>
//         <button onClick={handlePrevStep}>Prev</button>
//         <button onClick={handleNextStep}>Next</button>
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from 'react';

// export default function HairAndScalp({ data, selectedOptions3, setSelectedOptions3, currentQuestionIndex, setCurrentQuestionIndex, setBanner, nextStep, prevStep }) {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [selectedSubOptions, setSelectedSubOptions] = useState({});
//   const [mainQuestion, setMainQuestion] = useState('');

//   useEffect(() => {
//     setBanner(data.steps[currentStep].banner);
//   }, [currentStep, setBanner, data]);

//   const handleNextStep = () => {
//     if (currentStep < data.steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       nextStep();
//     }
//   };

//   const handlePrevStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     } else {
//       prevStep();
//     }
//   };

//   const handleOptionSelect = (option, question, isMulti) => {
//     setMainQuestion(question);
//     const updatedSelectedOptions = [...selectedOptions3];

//     if (!updatedSelectedOptions[currentStep]) {
//       updatedSelectedOptions[currentStep] = [];
//     }

//     const questionIndex = updatedSelectedOptions[currentStep].findIndex(
//       (item) => item.question === question
//     );

//     if (questionIndex === -1) {
//       updatedSelectedOptions[currentStep].push({ option: isMulti ? [option] : option, question });
//     } else {
//       if (isMulti) {
//         let options = updatedSelectedOptions[currentStep][questionIndex].option || [];
//         if (option.name === 'None' || option.name === 'Normal') {
//           options = [option];
//         } else {
//           options = options.includes(option) ? options.filter(o => o !== option) : [...options, option];
//           options = options.filter(o => o.name !== 'None' && o.name !== 'Normal');
//         }
//         updatedSelectedOptions[currentStep][questionIndex].option = options;
//       } else {
//         updatedSelectedOptions[currentStep][questionIndex].option = option;
//       }
//     }
//     setSelectedOptions3(updatedSelectedOptions);
//   };

//   const handleSubOptionSelect = (option, subQuestion, isMulti) => {
//     const updatedSubOptions = { ...selectedSubOptions };
//     const currentSubOptions = updatedSubOptions[currentStep] || {};
//     let newOptions;

//     if (isMulti) {
//       if (option === 'None') {
//         newOptions = ['None'];
//       } else {
//         newOptions = currentSubOptions[subQuestion]?.includes(option)
//           ? currentSubOptions[subQuestion].filter(o => o !== option)
//           : [...(currentSubOptions[subQuestion] || []).filter(o => o !== 'None'), option];
//       }
//       currentSubOptions[subQuestion] = newOptions;
//     } else {
//       currentSubOptions[subQuestion] = option;
//     }

//     updatedSubOptions[currentStep] = currentSubOptions;
//     setSelectedSubOptions(updatedSubOptions);

//     const updatedSelectedOptions = [...selectedOptions3];
//     const questionIndex = updatedSelectedOptions[currentStep].findIndex(
//       (item) => item.question === mainQuestion
//     );

//     if (questionIndex !== -1) {
//       if (!updatedSelectedOptions[currentStep][questionIndex].subquestions) {
//         updatedSelectedOptions[currentStep][questionIndex].subquestions = [];
//       }

//       const subQuestionIndex = updatedSelectedOptions[currentStep][questionIndex].subquestions.findIndex(
//         (sub) => sub.subQuestion === subQuestion
//       );

//       if (subQuestionIndex === -1) {
//         updatedSelectedOptions[currentStep][questionIndex].subquestions.push({
//           subQuestion,
//           option: isMulti ? newOptions : option
//         });
//       } else {
//         if (isMulti) {
//           updatedSelectedOptions[currentStep][questionIndex].subquestions[subQuestionIndex].option = newOptions;
//         } else {
//           updatedSelectedOptions[currentStep][questionIndex].subquestions[subQuestionIndex].option = option;
//         }
//       }
//     }
//     setSelectedOptions3(updatedSelectedOptions);
//   };
// console.log(selectedOptions3,"scalp")
//   return (
//     <div className='hair-scalp'>
//       <div className="progress-indicator">
//         {data.steps.map((_, index) => (
//           <span
//             key={index}
//             className={index === currentStep ? "dot active" : "dot-per"}
//           />
//         ))}
//       </div>
//       {data.steps[currentStep].questions.map((question, index) => (
//         <div key={index}>
//           {question.h4 && <h2 className='h4'>{question.h4}</h2>}
//           <h3>{question.ques}</h3>
//           <div className="options-container">
//             {question.options.map((option, optionIndex) => {
//               const isSelected = selectedOptions3[currentStep]?.some(
//                 (selectedOption) =>
//                   selectedOption.question === question.ques &&
//                   (
//                     question.multi ?
//                       selectedOption.option?.includes(option) :
//                       selectedOption.option === option
//                   )
//               );

//               return (
//                 <div key={optionIndex} className="option-container">
//                   <div
//                     className={`option ${
//                       typeof option === 'string' ? 'circle-01' : ''
//                     } ${isSelected ? 'selected-personal' : ''}`}
//                     onClick={() => handleOptionSelect(option, question.ques, question.multi)}
//                   >
//                     {typeof option === 'string' ? (
//                       <div className="circle-01">{option}</div>
//                     ) : (
//                       <label>
//                         {option.src ? (
//                           <img className='circle-01' src={option.src} alt={option.name} />
//                         ) : (
//                           <div className="circle-01 no-image option">{option.name}</div>
//                         )}
//                         <p>{option.name}</p>
//                       </label>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           {question.options.map((option, optionIndex) => {
//             const isSelected = selectedOptions3[currentStep]?.some(
//               (selectedOption) =>
//                 selectedOption.question === question.ques &&
//                 selectedOption.option ===
//                 (typeof option === 'string' ? option : option.name && option)
//             );

//             const subQuestions = question.subQuestions
//               ? question.subQuestions.find(
//                 (subQuestion) =>
//                   subQuestion[option.name || option]
//               )
//               : null;

//             return (
//               isSelected &&
//               subQuestions && (
//                 <div key={optionIndex} className="sub-questions">
//                   {Object.entries(subQuestions).map(([key, subQuestionGroup], subIndex) => (
//                     <div key={subIndex} className="sub-question">
//                       {subQuestionGroup.map((subQuestion, subQIndex) => (
//                         <div key={subQIndex}>
//                           <h3>{subQuestion.ques}</h3>
//                           <div className="options-container">
//                             {subQuestion.options === 'input' ? (
//                               <input
//                                 type="text"
//                                 className='specify-input'
//                                 placeholder="Enter your answer"
//                                 value={selectedSubOptions[currentStep]?.[subQuestion.ques] || ''}
//                                 onChange={(e) => handleSubOptionSelect(e.target.value, subQuestion.ques, subQuestion.multi)}
//                               />
//                             ) : (
//                               subQuestion.options.map((subOption, subOptionIndex) => {
//                                 const isSubSelected = subQuestion.multi
//                                   ? selectedSubOptions[currentStep]?.[subQuestion.ques]?.includes(subOption)
//                                   : selectedSubOptions[currentStep]?.[subQuestion.ques] === subOption;
//                                 return (
//                                   <div
//                                     key={subOptionIndex}
//                                     className={`option ${typeof subOption === 'string' ? 'circle-01' : ''} ${isSubSelected ? 'selected-personal' : ''}`}
//                                     onClick={() => handleSubOptionSelect(subOption, subQuestion.ques, subQuestion.multi)}
//                                   >
//                                     {typeof subOption === 'string' ? (
//                                       <div className="circle-01">{subOption}</div>
//                                     ) : (
//                                       <label>
//                                         {subOption.src ? (
//                                           <img className='circle-01' src={subOption.src} alt={subOption.name} />
//                                         ) : (
//                                           <div className="circle no-image option">{subOption.name}</div>
//                                         )}
//                                         <p>{subOption.name}</p>
//                                       </label>
//                                     )}
//                                   </div>
//                                 );
//                               })
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ))}
//                 </div>
//               )
//             );
//           })}
//         </div>
//       ))}
//       <div className='test-btnn'>
//         <button onClick={handlePrevStep}>Prev</button>
//         <button onClick={handleNextStep}>Next</button>
//       </div>
//     </div>
//   );
// }

// up code is perfect....

// import React, { useEffect, useState } from 'react';

// export default function HairAndScalp({ data, selectedOptions3, setSelectedOptions3, currentQuestionIndex, setCurrentQuestionIndex, setBanner, nextStep, prevStep }) {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [selectedSubOptions, setSelectedSubOptions] = useState({});
//   const [mainQuestion, setMainQuestion] = useState('');

//   useEffect(() => {
//     setBanner(data.steps[currentStep].banner);
//   }, [currentStep, setBanner, data]);

//   const handleNextStep = () => {
//     if (currentStep < data.steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       nextStep();
//     }
//   };

//   const handlePrevStep = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     } else {
//       prevStep();
//     }
//   };

//   const handleOptionSelect = (option, question, isMulti) => {
//     setMainQuestion(question);
//     const updatedSelectedOptions = [...selectedOptions3];

//     if (!updatedSelectedOptions[currentStep]) {
//       updatedSelectedOptions[currentStep] = [];
//     }

//     const questionIndex = updatedSelectedOptions[currentStep].findIndex(
//       (item) => item.question === question
//     );

//     if (questionIndex === -1) {
//       updatedSelectedOptions[currentStep].push({ option: isMulti ? [option] : option, question });
//     } else {
//       if (isMulti) {
//         let options = updatedSelectedOptions[currentStep][questionIndex].option || [];
//         if (option.name === 'None' || option.name === 'Normal') {
//           options = [option];
//         } else {
//           options = options.includes(option) ? options.filter(o => o !== option) : [...options, option];
//           options = options.filter(o => o.name !== 'None' && o.name !== 'Normal');
//         }
//         updatedSelectedOptions[currentStep][questionIndex].option = options;
//       } else {
//         updatedSelectedOptions[currentStep][questionIndex].option = option;
//       }
//     }
//     setSelectedOptions3(updatedSelectedOptions);
//   };

//   const handleSubOptionSelect = (option, subQuestion, isMulti) => {
//     const updatedSubOptions = { ...selectedSubOptions };
//     const currentSubOptions = updatedSubOptions[currentStep] || {};
//     let newOptions;

//     if (isMulti) {
//       if (option === 'None') {
//         newOptions = ['None'];
//       } else {
//         newOptions = currentSubOptions[subQuestion]?.includes(option)
//           ? currentSubOptions[subQuestion].filter(o => o !== option)
//           : [...(currentSubOptions[subQuestion] || []).filter(o => o !== 'None'), option];
//       }
//       currentSubOptions[subQuestion] = newOptions;
//     } else {
//       currentSubOptions[subQuestion] = option;
//     }

//     updatedSubOptions[currentStep] = currentSubOptions;
//     setSelectedSubOptions(updatedSubOptions);

//     const updatedSelectedOptions = [...selectedOptions3];
//     const questionIndex = updatedSelectedOptions[currentStep].findIndex(
//       (item) => item.question === mainQuestion
//     );

//     if (questionIndex !== -1) {
//       if (!updatedSelectedOptions[currentStep][questionIndex].subquestions) {
//         updatedSelectedOptions[currentStep][questionIndex].subquestions = [];
//       }

//       const subQuestionIndex = updatedSelectedOptions[currentStep][questionIndex].subquestions.findIndex(
//         (sub) => sub.subQuestion === subQuestion
//       );

//       if (subQuestionIndex === -1) {
//         updatedSelectedOptions[currentStep][questionIndex].subquestions.push({
//           subQuestion,
//           option: isMulti ? newOptions : option
//         });
//       } else {
//         if (isMulti) {
//           updatedSelectedOptions[currentStep][questionIndex].subquestions[subQuestionIndex].option = newOptions;
//         } else {
//           updatedSelectedOptions[currentStep][questionIndex].subquestions[subQuestionIndex].option = option;
//         }
//       }
//     }
//     setSelectedOptions3(updatedSelectedOptions);
//   };

//   const isNextButtonDisabled = () => {
//     const currentStepQuestions = data.steps[currentStep].questions;
//     const answeredQuestions = selectedOptions3[currentStep] || [];

//     return currentStepQuestions.some(question => {
//       const answeredQuestion = answeredQuestions.find(q => q.question === question.ques);
//       return !answeredQuestion || !answeredQuestion.option || (Array.isArray(answeredQuestion.option) && answeredQuestion.option.length === 0);
//     });
//   };

//   return (
//     <div className='hair-scalp'>
//       <div className="progress-indicator">
//         {data.steps.map((_, index) => (
//           <span
//             key={index}
//             className={index === currentStep ? "dot active" : "dot-per"}
//           />
//         ))}
//       </div>
//       {data.steps[currentStep].questions.map((question, index) => (
//         <div key={index}>
//           {question.h4 && <h2 className='h4'>{question.h4}</h2>}
//           <h3>{question.ques}</h3>
//           <div className="options-container">
//             {question.options.map((option, optionIndex) => {
//               const isSelected = selectedOptions3[currentStep]?.some(
//                 (selectedOption) =>
//                   selectedOption.question === question.ques &&
//                   (
//                     question.multi ?
//                       selectedOption.option?.includes(option) :
//                       selectedOption.option === option
//                   )
//               );

//               return (
//                 <div key={optionIndex} className="option-container">
//                   <div
//                     className={`option ${
//                       typeof option === 'string' ? 'circle-01' : ''
//                     } ${isSelected ? 'selected-personal' : ''}`}
//                     onClick={() => handleOptionSelect(option, question.ques, question.multi)}
//                   >
//                     {typeof option === 'string' ? (
//                       <div className="circle-01">{option}</div>
//                     ) : (
//                       <label>
//                         {option.src ? (
//                           <img className='circle-01' src={option.src} alt={option.name} />
//                         ) : (
//                           <div className="circle-01 no-image option">{option.name}</div>
//                         )}
//                         <p>{option.name}</p>
//                       </label>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           {question.options.map((option, optionIndex) => {
//             const isSelected = selectedOptions3[currentStep]?.some(
//               (selectedOption) =>
//                 selectedOption.question === question.ques &&
//                 selectedOption.option ===
//                 (typeof option === 'string' ? option : option.name && option)
//             );

//             const subQuestions = question.subQuestions
//               ? question.subQuestions.find(
//                 (subQuestion) =>
//                   subQuestion[option.name || option]
//               )
//               : null;

//             return (
//               isSelected &&
//               subQuestions && (
//                 <div key={optionIndex} className="sub-questions">
//                   {Object.entries(subQuestions).map(([key, subQuestionGroup], subIndex) => (
//                     <div key={subIndex} className="sub-question">
//                       {subQuestionGroup.map((subQuestion, subQIndex) => (
//                         <div key={subQIndex}>
//                           <h3>{subQuestion.ques}</h3>
//                           <div className="options-container">
//                             {subQuestion.options === 'input' ? (
//                               <input
//                                 type="text"
//                                 className='specify-input'
//                                 placeholder="Enter your answer"
//                                 value={selectedSubOptions[currentStep]?.[subQuestion.ques] || ''}
//                                 onChange={(e) => handleSubOptionSelect(e.target.value, subQuestion.ques, subQuestion.multi)}
//                               />
//                             ) : (
//                               subQuestion.options.map((subOption, subOptionIndex) => {
//                                 const isSubSelected = subQuestion.multi
//                                   ? selectedSubOptions[currentStep]?.[subQuestion.ques]?.includes(subOption)
//                                   : selectedSubOptions[currentStep]?.[subQuestion.ques] === subOption;
//                                 return (
//                                   <div
//                                     key={subOptionIndex}
//                                     className={`option ${typeof subOption === 'string' ? 'circle-01' : ''} ${isSubSelected ? 'selected-personal' : ''}`}
//                                     onClick={() => handleSubOptionSelect(subOption, subQuestion.ques, subQuestion.multi)}
//                                   >
//                                     {typeof subOption === 'string' ? (
//                                       <div className="circle-01">{subOption}</div>
//                                     ) : (
//                                       <label>
//                                         {subOption.src ? (
//                                           <img className='circle-01' src={subOption.src} alt={subOption.name} />
//                                         ) : (
//                                           <div className="circle no-image option">{subOption.name}</div>
//                                         )}
//                                         <p>{subOption.name}</p>
//                                       </label>
//                                     )}
//                                   </div>
//                                 );
//                               })
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ))}
//                 </div>
//               )
//             );
//           })}
//         </div>
//       ))}
//       <div className='test-btnn'>
//         <button onClick={handlePrevStep}>Prev</button>
//         <button onClick={handleNextStep} disabled={isNextButtonDisabled()}>Next</button>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import BASE_URL from "../../../Config";
import Tooltip from "@mui/material/Tooltip";
import ShowPopupImages from "./ShowPopupImages";

export default function HairAndScalp({
  male,
  scrollToTop,
  data,
  testId,
  selectedOptions3,
  setSelectedOptions3,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  setBanner,
  nextStep,
  prevStep,
  hairTestExist,
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSubOptions, setSelectedSubOptions] = useState({});
  const [mainQuestion, setMainQuestion] = useState("");
  const [showGrayHairManagement, setShowGrayHairManagement] = useState(false);
  const [
    showGrayHairManagementSubquestions,
    setShowGrayHairManagementSubquestions,
  ] = useState(true);
  const [showImages, setShowImages] = useState(false);
  const [imagesData, setImagesData] = useState();

  let storedUserData = JSON.parse(localStorage.getItem("User343"));
  const token = storedUserData.logedInUser.accessToken;
  useEffect(() => {
    console.log("mkoeor", data);
    setBanner(data.steps[currentStep].banner);
  }, [currentStep, setBanner, data]);

  useEffect(() => {
    if (hairTestExist?.HairAndScalp) {
      console.log("erknker", hairTestExist?.HairAndScalp);
      setSelectedOptions3(hairTestExist?.HairAndScalp);
    }
  }, [hairTestExist]);

  useEffect(() => {
    scrollToTop();
  }, [currentStep]);

  const handleNextStep = async () => {
    if (currentStep < data.steps.length - 1) {
      console.log("jiejri");
      setCurrentStep(currentStep + 1);
    } else {
      try {
        const response = await fetch(
          `${BASE_URL}/hair-tests/createHairTestForUserStepWise`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify({
              id: testId,
              data: {
                HairAndScalp: selectedOptions3,
                userId: storedUserData.logedInUser.user._id,
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          const responseData = await response.json();

          nextStep();
          console.log(responseData, "huhuhuh");
        }

        // Handle the response data as needed
      } catch (error) {
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
      }
      nextStep();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      // scrollToTop()
      setCurrentStep(currentStep - 1);
    } else {
      prevStep();
    }
  };

  const handleOptionSelect = (option, question, isMulti, questionData) => {
    setMainQuestion(question);
    const updatedSelectedOptions = [...selectedOptions3];

    if (!updatedSelectedOptions[currentStep]) {
      updatedSelectedOptions[currentStep] = [];
    }

    const questionIndex = updatedSelectedOptions[currentStep].findIndex(
      item => item.question === question
    );

    if (questionIndex === -1) {
      updatedSelectedOptions[currentStep].push({
        option: isMulti ? [option] : option,
        question,
      });
    } else {
      if (isMulti) {
        let options =
          updatedSelectedOptions[currentStep][questionIndex].option || [];
        if (option.name === "None" || option.name === "Normal") {
          options = [option];
        } else {
          options = options.includes(option)
            ? options.filter(o => o !== option)
            : [...options, option];
          options = options.filter(
            o => o.name !== "None" && o.name !== "Normal"
          );
        }
        updatedSelectedOptions[currentStep][questionIndex].option = options;
      } else {
        updatedSelectedOptions[currentStep][questionIndex].option = option;
      }
    }
    setSelectedOptions3(updatedSelectedOptions);

    // Handle the specific case for gray hair
    if (question === "Do you have gray hair?" && option === "Yes") {
      setShowGrayHairManagementSubquestions(false);
      setShowGrayHairManagement(true);
    } else {
      setShowGrayHairManagement(false);
    }
    console.log("jmsijfojer", option);
    if (option?.name == "Bald Patches") {
      const subQuestions =
        questionData?.subQuestions?.length > 0
          ? question?.subQuestions?.find(
              subQuestion => subQuestion?.["Bald Patches"]
            )
          : null;
      console.log(
        "jsfdijr",
        questionData?.subQuestions?.[1]?.["Bald Patches"]?.[0]
      );
      setImagesData(questionData?.subQuestions?.[1]?.["Bald Patches"]?.[0]);
      setShowImages(true);
    }
  };

  const handleSubOptionSelect = (option, subQuestion, isMulti) => {
    console.log("sijeifjh", option, subQuestion, isMulti);
    const updatedSubOptions = { ...selectedSubOptions };
    const currentSubOptions = updatedSubOptions[currentStep] || {};
    let newOptions;

    if (isMulti) {
      if (option === "None") {
        newOptions = ["None"];
      } else {
        newOptions = currentSubOptions[subQuestion]?.includes(option)
          ? currentSubOptions[subQuestion].filter(o => o !== option)
          : [
              ...(currentSubOptions[subQuestion] || []).filter(
                o => o !== "None"
              ),
              option,
            ];
      }
      currentSubOptions[subQuestion] = newOptions;
    } else {
      currentSubOptions[subQuestion] = option;
    }

    updatedSubOptions[currentStep] = currentSubOptions;
    setSelectedSubOptions(updatedSubOptions);

    const updatedSelectedOptions = [...selectedOptions3];
    const questionIndex = updatedSelectedOptions[currentStep].findIndex(
      item => item.question === mainQuestion
    );

    if (questionIndex !== -1) {
      if (!updatedSelectedOptions[currentStep][questionIndex].subquestions) {
        updatedSelectedOptions[currentStep][questionIndex].subquestions = [];
      }

      const subQuestionIndex = updatedSelectedOptions[currentStep][
        questionIndex
      ].subquestions.findIndex(sub => sub.subQuestion === subQuestion);

      if (subQuestionIndex === -1) {
        updatedSelectedOptions[currentStep][questionIndex].subquestions.push({
          subQuestion,
          option: isMulti ? newOptions : option,
        });
      } else {
        if (isMulti) {
          updatedSelectedOptions[currentStep][questionIndex].subquestions[
            subQuestionIndex
          ].option = newOptions;
        } else {
          updatedSelectedOptions[currentStep][questionIndex].subquestions[
            subQuestionIndex
          ].option = option;
        }
      }
    }
    setSelectedOptions3(updatedSelectedOptions);
  };

  const isNextButtonDisabled = () => {
    const currentStepQuestions = data.steps[currentStep].questions;
    const answeredQuestions = selectedOptions3[currentStep] || [];

    return currentStepQuestions.some(question => {
      const answeredQuestion = answeredQuestions.find(
        q => q.question === question.ques
      );
      return (
        !answeredQuestion ||
        !answeredQuestion.option ||
        (Array.isArray(answeredQuestion.option) &&
          answeredQuestion.option.length === 0)
      );
    });
  };

  const handleGrayHairManagementClick = () => {
    setShowGrayHairManagementSubquestions(true);
    setShowGrayHairManagement(false);
  };

  return (
    <div className="hair-scalp" id="target-element">
      <h1 style={{ marginTop: "0" }}>Hair And Scalp Assessment</h1>
      <div className="progress-indicator">
        {data.steps.map((_, index) => (
          <span
            key={index}
            className={index === currentStep ? "dot active2" : "dot-per-1"}
          />
        ))}
      </div>
      {data.steps[currentStep].questions.map((question, index) => (
        <div key={index}>
          {question.h4 && <h2 className="h4">{question.h4}</h2>}
          <h3>{question.ques}</h3>
          <div className="options-container">
            {question.options.map((option, optionIndex) => {
              const isSelected = selectedOptions3[currentStep]?.some(
                selectedOption =>
                  selectedOption.question === question.ques &&
                  (question.multi
                    ? selectedOption.option?.includes(option)
                    : selectedOption.option == option)
              );
              console.log("jijewijre", isSelected, question, question.ques);

              return (
                <div key={optionIndex} className="option-container">
                  <div
                    className={`option ${
                      typeof option === "string"
                        ? `${
                            option?.name == "Not Sure" ||
                            option?.name == "None" ||
                            option?.name == "Other"
                              ? "circle-02"
                              : "circle-01"
                          }`
                        : ""
                    } ${isSelected ? "selected-personal" : ""}`}
                    onClick={() =>
                      handleOptionSelect(
                        option,
                        question.ques,
                        question.multi,
                        question
                      )
                    }
                  >
                    {typeof option === "string" ? (
                      <>
                        <Tooltip
                          title={
                            question?.title ? question?.title[optionIndex] : ""
                          }
                        >
                          <div
                            className={`${
                              option?.name == "Not Sure" ||
                              option?.name == "None" ||
                              option?.name == "Other"
                                ? "circle-02"
                                : "circle-01"
                            }`}
                          >
                            {option}
                          </div>
                        </Tooltip>

                        {/* <div className="hide">
                          {question?.title ? question?.title[optionIndex] : ""}
                        </div> */}
                      </>
                    ) : (
                      <label>
                        {option.src ? (
                          <>
                            <Tooltip
                              title={
                                question?.title
                                  ? question?.title[optionIndex]
                                  : ""
                              }
                            >
                              <img
                                className={`${
                                  option?.name == "Not Sure" ||
                                  option?.name == "None" ||
                                  option?.name == "Other"
                                    ? "circle-02"
                                    : "circle-01"
                                }`}
                                src={option.src}
                                alt={option.name}
                                style={{
                                  border:
                                    option.name == "Normal" ? "1px solid" : "",
                                }}
                              />
                            </Tooltip>

                            {/* <div className="hide">
                              {question?.title
                                ? question?.title[optionIndex]
                                : ""}
                            </div> */}
                          </>
                        ) : (
                          <div className="circle-01 no-image option">
                            {option.name}
                          </div>
                        )}
                        <div>{option.name}</div>
                      </label>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {question.ques === "Do you have gray hair?" &&
            showGrayHairManagement && (
              <div className="gray-hair-management">
                <p className="gray-hair">
                  Do you want grey hair management?{" "}
                  <span
                    className="clickable"
                    onClick={handleGrayHairManagementClick}
                  >
                    Click here
                  </span>
                </p>
              </div>
            )}
          {question.options.map((option, optionIndex) => {
            const isSelected = selectedOptions3[currentStep]?.some(
              selectedOption =>
                selectedOption.question == question.ques &&
                (selectedOption.option ==
                  (typeof option == "string"
                    ? option
                    : option.name && option) ||
                  (typeof selectedOption?.option == "object" &&
                    selectedOption?.option?.length > 0 &&
                    selectedOption?.option?.find(e => e?.name == option.name)))
            );

            for (
              let index = 0;
              index < selectedOptions3[currentStep]?.length;
              index++
            ) {
              const element = selectedOptions3[currentStep][index];
              console.log(
                "kjwnekr",
                question.ques,
                element.question,
                element.question == question.ques
              );
              console.log(
                "kjwnekr",
                option,
                element.option,
                element.option ==
                  (typeof option == "string" ? option : option.name && option),
                typeof element?.option == "object" &&
                  element?.option?.length > 0 &&
                  element?.option?.find(e => e?.name == option.name)
              );
            }
            const subQuestions =
              question?.subQuestions?.length > 0
                ? question?.subQuestions?.find(
                    subQuestion => subQuestion[option.name || option]
                  )
                : null;
            // console.log("msirmome",subQuestions,showGrayHairManagementSubquestions,isSelected,selectedOptions3[currentStep],option)
            return (
              isSelected &&
              showGrayHairManagementSubquestions &&
              subQuestions && (
                <div key={optionIndex} className="sub-questions">
                  {Object.entries(subQuestions).map(
                    ([key, subQuestionGroup], subIndex) => (
                      <div key={subIndex} className="sub-question">
                        {subQuestionGroup.map((subQuestion, subQIndex) => (
                          <div key={subQIndex}>
                            <h3>
                              {" "}
                              {subQuestion?.ques ==
                              "Which image best describes your hair loss? (For Hereditary / genetic hair loss options)?" ? (
                                <></>
                              ) : (
                                subQuestion.ques
                              )}
                            </h3>
                            <div className="options-container">
                              {subQuestion.options == "input" ? (
                                <input
                                  type="text"
                                  className="specify-input"
                                  placeholder="Enter your answer"
                                  value={
                                    selectedSubOptions[currentStep]?.[
                                      subQuestion.ques
                                    ] || ""
                                  }
                                  onChange={e =>
                                    handleSubOptionSelect(
                                      e.target.value,
                                      subQuestion.ques,
                                      subQuestion.multi
                                    )
                                  }
                                />
                              ) : (
                                subQuestion.options.map(
                                  (subOption, subOptionIndex) => {
                                    const isSubSelected = subQuestion.multi
                                      ? selectedSubOptions[currentStep]?.[
                                          subQuestion.ques
                                        ]?.includes(subOption)
                                      : selectedSubOptions[currentStep]?.[
                                          subQuestion.ques
                                        ] === subOption;
                                    return (
                                      <div
                                        key={subOptionIndex}
                                        className={`option ${
                                          typeof subOption === "string"
                                            ? `${
                                                subOption?.name == "Not Sure" ||
                                                subOption?.name == "None" ||
                                                subOption?.name == "Other"
                                                  ? "circle-02"
                                                  : "circle-01"
                                              }`
                                            : ""
                                        } ${
                                          isSubSelected
                                            ? "selected-personal"
                                            : ""
                                        }`}
                                        onClick={() =>
                                          handleSubOptionSelect(
                                            subOption,
                                            subQuestion.ques,
                                            subQuestion.multi
                                          )
                                        }
                                      >
                                        {typeof subOption === "string" ? (
                                          <>
                                            <Tooltip
                                              title={
                                                subQuestion?.title
                                                  ? subQuestion?.title[
                                                      subOptionIndex
                                                    ]
                                                  : ""
                                              }
                                            >
                                              <div
                                                className={`${
                                                  subOption?.name ==
                                                    "Not Sure" ||
                                                  subOption?.name == "None" ||
                                                  subOption?.name == "Other"
                                                    ? "circle-02"
                                                    : "circle-01"
                                                }`}
                                              >
                                                {subOption}
                                              </div>
                                            </Tooltip>

                                            {/* <div className="hide">
                                          {subQuestion?.title
                                            ? subQuestion?.title[subOptionIndex]
                                            : ""}
                                        </div> */}
                                          </>
                                        ) : subQuestion?.ques ==
                                          "Which image best describes your hair loss? (For Hereditary / genetic hair loss options)?" ? (
                                          <></>
                                        ) : (
                                          <label>
                                            {subOption.src ? (
                                              <>
                                                <Tooltip
                                                  title={
                                                    subQuestion?.title
                                                      ? subQuestion?.title[
                                                          subOptionIndex
                                                        ]
                                                      : ""
                                                  }
                                                >
                                                  <img
                                                    className={`${
                                                      subOption?.name ==
                                                        "Not Sure" ||
                                                      subOption?.name ==
                                                        "None" ||
                                                      subOption?.name == "Other"
                                                        ? "circle-02"
                                                        : "circle-01"
                                                    }`}
                                                    src={subOption.src}
                                                    alt={subOption.name}
                                                  />
                                                </Tooltip>
                                              </>
                                            ) : (
                                              <div className="circle no-image option">
                                                {subOption.name}
                                              </div>
                                            )}
                                            <p>{subOption.name}</p>
                                          </label>
                                        )}
                                      </div>
                                    );
                                  }
                                )
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              )
            );
          })}
        </div>
      ))}
      {showImages && (
        <ShowPopupImages
          male={male}
          onClose={() => setShowImages(false)}
          imagesData={imagesData}
          handleSubOptionSelect={handleSubOptionSelect}
        />
      )}
      <div className="test-btnn">
        <button onClick={handlePrevStep}>Prev</button>
        <button
          onClick={() => {
            // scrollToTop()
            handleNextStep();
          }}
          disabled={isNextButtonDisabled()}
        >
          Next
        </button>
      </div>
    </div>
  );
}
