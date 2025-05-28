

import React, { useEffect, useState } from 'react';
import BASE_URL from '../../../Config';

export default function Nutritional({
  data,
  setBanner,
  testId, 

  showSubQuestions,
  setShowSubQuestions,
  selectedSubOption,
  setSelectedSubOption,
  currentSubQuestions,
  setCurrentSubQuestions,
  prevStep,
  nextStep,
  selectedOptions,
  setSelectedOptions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  hairTestExist,
  scrollToTop
}) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setBanner(data.questions[currentQuestionIndex].banner);
    console.log("snmkrfner",currentQuestionIndex)
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

  let storedUserData = JSON.parse(localStorage?.getItem("User343"));
  const token = storedUserData?.logedInUser?.accessToken;

  useEffect(() => {
    if(hairTestExist?.Nutritional){
      console.log("erknker",hairTestExist?.Nutritional)
      setSelectedOptions(hairTestExist?.Nutritional);
    }
  },[hairTestExist])

  const handleNextQuestion =async () => {
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
          body: JSON.stringify({id:testId,data:{Nutritional:selectedOptions,userId:storedUserData.logedInUser.user._id}})
        });
      
        if (!response.ok) {
        
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

    const isNoneOption = option.name === 'None';
    const isNoneSelected = currentOptions.some((item) => item.option.name === 'None');

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
        const index = currentOptions.findIndex((item) => item.option.name === option.name);
        if (index === -1) {
          // Add option if not already selected
          newSelectedOptions[currentQuestionIndex] = [...currentOptions, { option, question: selectedQuestion }];
        } else {
          // Remove option if already selected
          newSelectedOptions[currentQuestionIndex] = currentOptions.filter((item) => item.option.name !== option.name);
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
    console.log("okwoke",newSelectedOptions)

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
    console.log("jeokjroperjk",option,currentOptions,currentOptions.some((item) => item.option == option || item.option?.name == option?.name))
    return currentOptions.some((item) => item.option == option || (item?.option?.name && item?.option?.name == option?.name));
  };

  return (
    <div>
         <h1 style={{marginTop:'0'}}>Nutritional</h1>
      <div className="progress-indicator">
   
        {data.questions.map((_, index) => (
          <span key={index} className={index === currentQuestionIndex ? 'dot active' : 'dot-nut'} />
        ))}
      </div>

      <h3>{data.questions[currentQuestionIndex].ques}</h3>
      <div className="options-container">
        {data.questions[currentQuestionIndex].options.map((option, optionIndex) => (
          <div
            key={optionIndex}
            className={`option ${typeof option === 'string' ? 'circle' : ''} ${
              isSelected(option) ? 'selected-nut' : ''
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
                    selectedSubOption === option ? 'selected-nut' : ''
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
