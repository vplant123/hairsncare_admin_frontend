// import React, { useEffect } from 'react';

// export default function LifeStyle({ data,prevStep, setBanner, nextStep, selectedOptions, setSelectedOptions, currentQuestionIndex, setCurrentQuestionIndex }) {
//   useEffect(() => {
//     setBanner(data.questions[currentQuestionIndex].banner);
//   }, [currentQuestionIndex, setBanner, data]);

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < data.questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       nextStep();
//     }
//   };
 
//   const handlePrevQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }else(
//       prevStep()
//     )
//   };

//   const handleOptionSelect = (option) => {
//     const newSelectedOptions = [...selectedOptions];
//     if (data.questions[currentQuestionIndex].multi) {
//       const index = newSelectedOptions[currentQuestionIndex].indexOf(option);
//       if (index === -1) {
//         newSelectedOptions[currentQuestionIndex].push(option);
//       } else {
//         newSelectedOptions[currentQuestionIndex].splice(index, 1);
//       }
//     } else {
//       newSelectedOptions[currentQuestionIndex] = [option];
//     }
//     setSelectedOptions(newSelectedOptions);
//   };

//   return (
//     <div>
//       {/* Progress indicator */}
//       <div className="progress-indicator">
//         {data.questions.map((_, index) => (
//           <span
//             key={index}
//             className={index === currentQuestionIndex ? "dot active" : "dot"}
//           />
//         ))}
//       </div>

//       <h3>{data.questions[currentQuestionIndex].ques}</h3>
//       <div className="options-container">
//         {data.questions[currentQuestionIndex].options.map((option, optionIndex) => (
//           <div key={optionIndex} className={`option ${typeof option === 'string' ? 'circle' : ''} ${selectedOptions[currentQuestionIndex].includes(option) ? 'selected' : ''}`} onClick={() => handleOptionSelect(option)}>
//             {typeof option === 'string' ? (
//               <div className="circle">
//                 {option}
//               </div>
//             ) : (
//               <label>
//                 {/* <img alt='hair' src={option.src} alt={option.name} /> */}
//                 {option.src?<img alt='hair' src={option.src} alt={option.name} />:<div className='circle no-image option'>{option.name}</div>}
//                 <p>{option.name}</p>
//               </label>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className='test-btnn'>
//         <button onClick={handlePrevQuestion} >
//           Prev
//         </button>
//         <button onClick={handleNextQuestion} disabled={selectedOptions[currentQuestionIndex].length === 0}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from 'react';

// export default function LifeStyle({ data, setBanner, showSubQuestions, setShowSubQuestions, selectedSubOption, setSelectedSubOption, currentSubQuestions, setCurrentSubQuestions, prevStep, nextStep, selectedOptions, setSelectedOptions, currentQuestionIndex, setCurrentQuestionIndex }) {
//   const [inputValue, setInputValue] = useState('');

//   useEffect(() => {
//     setBanner(data.questions[currentQuestionIndex].banner);
//     // Reset the state when moving to a new question
//     setShowSubQuestions(false);
//     setCurrentSubQuestions({});
//     setSelectedSubOption(null);
//     setInputValue(''); // Reset input value when moving to a new question
//   }, [currentQuestionIndex, setBanner, data]);

//   const handleNextQuestion = () => {
//     const isLastQuestion = data.questions.length - 1;
//     const isOptionSelected = selectedOptions[currentQuestionIndex].length > 0;

//     if (isLastQuestion && !isOptionSelected) {
//       console.log('Next disabled: No option selected');
//       return;
//     }

//     if (currentQuestionIndex < data.questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       nextStep();
//     }
//   };

//   const handlePrevQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     } else {
//       prevStep();
//     }
//   };

//   const handleOptionSelect = (option) => {
//     const newSelectedOptions = [...selectedOptions];
//     const selectedQuestion = data.questions[currentQuestionIndex].ques;

//     if (data.questions[currentQuestionIndex].multi) {
//       const index = newSelectedOptions[currentQuestionIndex].findIndex(item => item.option === option);
//       if (index === -1) {
//         newSelectedOptions[currentQuestionIndex].push({ option, question: selectedQuestion });
//       } else {
//         newSelectedOptions[currentQuestionIndex].splice(index, 1);
//       }
//     } else {
//       newSelectedOptions[currentQuestionIndex] = [{ option, question: selectedQuestion }];
//     }

//     if (data.questions[currentQuestionIndex].subQuestions && data.questions[currentQuestionIndex].subQuestions[option]) {
//       setShowSubQuestions(true);
//       setCurrentSubQuestions(data.questions[currentQuestionIndex].subQuestions[option]);
//     } else {
//       setShowSubQuestions(false);
//       setCurrentSubQuestions({});
//       setSelectedSubOption(null); // Reset selected sub-option
//     }

//     setSelectedOptions(newSelectedOptions);
//   };

//   const handleSubOptionSelect = (option, selectedOption, currentSubQuestion) => {
//     console.log("Sub-option selected:", option, selectedOption, currentSubQuestion);

//     const parentOptionIndex = selectedOptions[currentQuestionIndex].findIndex(item => item.option === selectedOption);
//     const newSelectedOptions = [...selectedOptions];
//     setSelectedSubOption(option);
//     if (parentOptionIndex !== -1) {
//       newSelectedOptions[currentQuestionIndex][parentOptionIndex].subquestion = currentSubQuestion.ques;
//       newSelectedOptions[currentQuestionIndex][parentOptionIndex].suboption = option;

//       setSelectedOptions(newSelectedOptions);
//     }

//     // Store the input value when a sub-option is selected
//     setInputValue(option === 'input' ? '' : option);
//   };




  
  
//   const handleInputValueChange = (e) => {
//     console.log('Input value changed:', currentSubQuestions);
    
//     // Store the input value directly
//     const newSelectedOptions = [...selectedOptions];
//     console.log((newSelectedOptions[currentQuestionIndex]),'fkjsakj');
//     const parentOptionIndex = newSelectedOptions[currentQuestionIndex].findIndex(item => item.ques === currentSubQuestions.ques);
//     // Check if the current question has any selected options
//     if (newSelectedOptions[currentQuestionIndex]) {
//         // Find the index of the subquestion in the selectedOptions array
//         newSelectedOptions[currentQuestionIndex][0].subquestion=currentSubQuestions.ques
//         newSelectedOptions[currentQuestionIndex][0].suboption = e.target.value;
//         setSelectedOptions(newSelectedOptions);
        
//             // Update the suboption with the input value
//           }
           
  
//         setSelectedOptions(newSelectedOptions);
    
  
//     setInputValue(e.target.value);
// };

//   console.log(selectedSubOption,"opsub")
  
//   return (
//     <div>
//       <div className="progress-indicator">
//         {data.questions.map((_, index) => (
//           <span
//             key={index}
//             className={index === currentQuestionIndex ? "dot active" : "dot"}
//           />
//         ))}
//       </div>

//       <h3>{data.questions[currentQuestionIndex].ques}</h3>
//       <div className="options-container">
//         {data.questions[currentQuestionIndex].options.map((option, optionIndex) => (
//           <div key={optionIndex} className={`option ${typeof option === 'string' ? 'circle' : ''} ${selectedOptions[currentQuestionIndex].find(item => item.option === option) ? 'selected-life' : ''}`} onClick={() => handleOptionSelect(option)}>
//             {typeof option === 'string' ? (
//               <div className="circle">
//                 {option}
//               </div>
//             ) : (
//               <label>
//                 {option.src ? <img className='circle' src={option.src} alt={option.name} /> : <div className='circle no-image option'>{option.name}</div>}
//                 <p>{option.name}</p>
//               </label>
//             )}
//           </div>
//         ))}
//       </div>

//       {showSubQuestions && (
//         <div>
//           <h3>{currentSubQuestions.ques}</h3>
//           <div className="options-container">
//             {Array.isArray(currentSubQuestions.options) ? (
//               currentSubQuestions.options.map((option, optionIndex) => (
//                 <div key={optionIndex} className={`option ${typeof option === 'string' ? 'circle' : ''} ${selectedSubOption === option ? 'selected-life' : ''}`} onClick={() => handleSubOptionSelect(option, selectedOptions[currentQuestionIndex][0].option, currentSubQuestions)}>
//                   {typeof option === 'string' ? (
//                     <div className="circle">
//                       {option}
//                     </div>
//                   ) : (
//                     <label>
//                       {option.src ? <img className='circle'  src={option.src} alt={option.name} /> : <div className='circle no-image option'>{option.name}</div>}
//                       <p>{option.name}</p>
//                     </label>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <input 
//                 className='specify-input'
//                 type="text" 
//                 placeholder="Enter your answer" 
//                 value={inputValue} 
//                 onChange={handleInputValueChange} 
//               />
//             )}
//           </div>
//         </div>
//       )}

//       <div className='test-btnn'>
//         <button onClick={handlePrevQuestion}>
//           Prev
//         </button>
//         <button onClick={handleNextQuestion} disabled={ selectedOptions[currentQuestionIndex].length === 0}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import BASE_URL from '../../../Config';

export default function LifeStyle({
  data,
  setBanner,
  showSubQuestions,
  setShowSubQuestions,
  selectedSubOption,
  setSelectedSubOption,
  currentSubQuestions,
  setCurrentSubQuestions,
  prevStep,
  testId,
  nextStep,
  selectedOptions,
  setSelectedOptions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  hairTestExist,
  scrollToTop
}) {
  const [inputValue, setInputValue] = useState('');

  let storedUserData = JSON.parse(localStorage.getItem("User343"));
  const token = storedUserData.logedInUser.accessToken;
  useEffect(() => {
    setBanner(data.questions[currentQuestionIndex].banner);

    const currentOptions = selectedOptions[currentQuestionIndex];
    if (currentOptions && currentOptions.length > 0) {
      const selectedOption = currentOptions[0].option;
      if (data.questions[currentQuestionIndex].subQuestions && data.questions[currentQuestionIndex].subQuestions[selectedOption]) {
        setShowSubQuestions(true);
        setCurrentSubQuestions(data.questions[currentQuestionIndex].subQuestions[selectedOption]);
        setSelectedSubOption(currentOptions[0].suboption || null);
        setInputValue(currentOptions[0].suboption || '');
      } else {
        setShowSubQuestions(false);
        setCurrentSubQuestions({});
        setSelectedSubOption(null);
        setInputValue('');
      }
    } else {
      setShowSubQuestions(false);
      setCurrentSubQuestions({});
      setSelectedSubOption(null);
      setInputValue('');
    }
  }, [currentQuestionIndex, setBanner, data, selectedOptions]);

  useEffect(() => {
    if(hairTestExist?.LifeStyle){
      console.log("erknker",hairTestExist?.LifeStyle)
      setSelectedOptions(hairTestExist?.LifeStyle);
    }
  },[hairTestExist])

  const handleNextQuestion = async () => {
    if (currentQuestionIndex < data.questions.length - 1) {
      scrollToTop()
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      try {
        const response = await fetch(`${BASE_URL}/hair-tests/createHairTestForUserStepWise`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify({id:testId,data:{LifeStyle:selectedOptions,userId:storedUserData.logedInUser.user._id}})
        });
      
        if (!response.ok) {
        
          console.log(response,"lifestyle response data")
          throw new Error('Network response was not ok');
        }else{
          const responseData = await response.json();
       
         
          nextStep()
          console.log(responseData,'huhuhuh');
        }
      
       
        // Handle the response data as needed
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
      } 
      nextStep();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      scrollToTop()
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      prevStep();
    }
  };

  const handleOptionSelect = (option) => {
    const newSelectedOptions = [...selectedOptions];
    const selectedQuestion = data.questions[currentQuestionIndex].ques;
    const currentOptions = newSelectedOptions[currentQuestionIndex] || [];

    const isNoneOption = option === 'None' || option.name==="None of these"|| option==="Others";
    const isNoneSelected = currentOptions.some((item) => item.option === 'None'|| item.option.name==="None of these" ||item.option==="Others");

    if (isNoneOption) {
      if (isNoneSelected) {
        // Deselect "None"
        newSelectedOptions[currentQuestionIndex] = [];
      } else {
        // Select "None" and clear other selections
        newSelectedOptions[currentQuestionIndex] = [{ option, question: selectedQuestion }];
      }
    } else {
      if (isNoneSelected) {
        // If "None" is selected, don't allow selecting other options
        return;
      }

      if (data.questions[currentQuestionIndex].multi) {
        const index = currentOptions.findIndex((item) => item.option === option);
        if (index === -1) {
          // Add option if not already selected
          newSelectedOptions[currentQuestionIndex] = [...currentOptions, { option, question: selectedQuestion }];
        } else {
          // Remove option if already selected
          newSelectedOptions[currentQuestionIndex] = currentOptions.filter((item) => item.option !== option);
        }
      } else {
        // For single-select questions
        newSelectedOptions[currentQuestionIndex] = [{ option, question: selectedQuestion }];
      }
    }

    if (data.questions[currentQuestionIndex].subQuestions && data.questions[currentQuestionIndex].subQuestions[option]) {
      setShowSubQuestions(true);
      setCurrentSubQuestions(data.questions[currentQuestionIndex].subQuestions[option]);
      setSelectedSubOption(null);
    } else {
      setShowSubQuestions(false);
      setCurrentSubQuestions({});
      setSelectedSubOption(null);
    }

    setSelectedOptions(newSelectedOptions);
  };

  const handleSubOptionSelect = (option, selectedOption, currentSubQuestion) => {
    const parentOptionIndex = selectedOptions[currentQuestionIndex].findIndex((item) => item.option === selectedOption);
    const newSelectedOptions = [...selectedOptions];
    setSelectedSubOption(option);

    if (parentOptionIndex !== -1) {
      newSelectedOptions[currentQuestionIndex][parentOptionIndex].subquestion = currentSubQuestion.ques;
      newSelectedOptions[currentQuestionIndex][parentOptionIndex].suboption = option;
      setSelectedOptions(newSelectedOptions);
    }

    setInputValue(option === 'input' ? '' : option);
  };

  const handleInputValueChange = (e) => {
    const newSelectedOptions = [...selectedOptions];
    if (newSelectedOptions[currentQuestionIndex] && newSelectedOptions[currentQuestionIndex][0]) {
      newSelectedOptions[currentQuestionIndex][0].subquestion = currentSubQuestions.ques;
      newSelectedOptions[currentQuestionIndex][0].suboption = e.target.value;
      setSelectedOptions(newSelectedOptions);
    }

    setInputValue(e.target.value);
  };

  const isSelected = (option) => {
    const currentOptions = selectedOptions[currentQuestionIndex] || [];
    // return currentOptions.some((item) => item.option === option);
    return currentOptions.some((item) => item.option == option || (item?.option?.name && item?.option?.name == option?.name));

  };

  return (
    <div>
      <h1 style={{marginTop:'0'}}>LifeStyle</h1>
      <div className="progress-indicator">
      
        {data.questions.map((_, index) => (
          <span key={index} className={index === currentQuestionIndex ? 'dot active1' : 'dot'} />
        ))}
      </div>

      <h3>{data.questions[currentQuestionIndex].ques}</h3>
      <div className="options-container">
        {data.questions[currentQuestionIndex].options.map((option, optionIndex) => (
          <div
            key={optionIndex}
            className={`option ${typeof option === 'string' ? 'circle' : ''} ${
              isSelected(option) ? 'selected-life' : ''
            }`}
            onClick={() => handleOptionSelect(option)}
          >
            {typeof option === 'string' ? (
              <div className="circle">{option}</div>
            ) : (
              <label>
                {option.src ? (
                  <img className="circle" src={option.src} alt={option.name} />
                ) : (
                  <div className="circle no-image option">{option.name}</div>
                )}
                <p>{option.name}</p>
              </label>
            )}
          </div>
        ))}
      </div>

      {showSubQuestions && (
        <div>
          <h3>{currentSubQuestions.ques}</h3>
          <div className="options-container">
            {Array.isArray(currentSubQuestions.options) ? (
              currentSubQuestions.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className={`option ${typeof option === 'string' ? 'circle' : ''} ${
                    selectedSubOption === option ? 'selected-life' : ''
                  }`}
                  onClick={() => handleSubOptionSelect(option, selectedOptions[currentQuestionIndex][0].option, currentSubQuestions)}
                >
                  {typeof option === 'string' ? (
                    <div className="circle">{option}</div>
                  ) : (
                    <label>
                      {option.src ? (
                        <img className="circle" src={option.src} alt={option.name} />
                      ) : (
                        <div className="circle no-image option">{option.name}</div>
                      )}
                      <p>{option.name}</p>
                    </label>
                  )}
                </div>
              ))
            ) : (
              <input
                className="specify-input"
                type="text"
                placeholder="Enter your answer"
                value={inputValue}
                onChange={handleInputValueChange}
              />
            )}
          </div>
        </div>
      )}

      <div className="test-btnn">
        <button onClick={handlePrevQuestion}>Prev</button>
        <button onClick={handleNextQuestion} disabled={selectedOptions[currentQuestionIndex]?.length === 0}>
          Next
        </button>
      </div>
    </div>
  );
}
