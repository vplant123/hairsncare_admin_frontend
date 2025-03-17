// import React, { useState } from 'react';

// export default function Test3({selectedAnswers, setSelectedAnswers, nextStep, prevStep }) {
 

//   const handleRadioChange = (section, option) => {
//     setSelectedAnswers((prev) => ({
//       ...prev,
//       [section]: option,
//     }));
//   };

//   const allSelected = Object.values(selectedAnswers).every((answer) => answer !== '');

//   const handleNext = () => {
//     if (allSelected) {
//       nextStep(selectedAnswers);
//     }
//   };
// console.log(selectedAnswers,"test 3")
//   return (
//     <div className="ana-hairscalp">
//       <h1>1) Treatment Synopsis</h1>

//       <h2>1) Acute Telogen Effluvium – Male</h2>
//       <div className="ana-ques">
//         <p>
//           <label>
//             <input
//               type="radio"
//               name="1) Acute Telogen Effluvium – Male"
//               value="a) Importance of Modern Medicine in Acute Telogen Effluvium – Male"
//               checked={selectedAnswers['1) Acute Telogen Effluvium – Male'] === 'a) Importance of Modern Medicine in Acute Telogen Effluvium – Male'}
//               onChange={() => handleRadioChange('1) Acute Telogen Effluvium – Male', 'a) Importance of Modern Medicine in Acute Telogen Effluvium – Male')}
//             />
//             a) Importance of Modern Medicine in Acute Telogen Effluvium – Male
//           </label>
//         </p>
//         <p>
//           <label>
//             <input
//               type="radio"
//               name="1) Acute Telogen Effluvium – Male"
//               value="b) General Treatment Guidelines for preventing hair loss in future – Instructions"
//               checked={selectedAnswers['1) Acute Telogen Effluvium – Male'] === 'b) General Treatment Guidelines for preventing hair loss in future – Instructions'}
//               onChange={() => handleRadioChange('1) Acute Telogen Effluvium – Male', 'b) General Treatment Guidelines for preventing hair loss in future – Instructions')}
//             />
//             b) General Treatment Guidelines for preventing hair loss in future – Instructions
//           </label>
//         </p>
//       </div>

//       <h2>2) Chronic Telogen Effluvium – Male</h2>
//       <div className="ana-ques">
//         <p>
//           <label>
//             <input
//               type="radio"
//               name="2) Chronic Telogen Effluvium – Male"
//               value="a) Importance of Modern Medicine in Chronic Telogen Effluvium – Male"
//               checked={selectedAnswers['2) Chronic Telogen Effluvium – Male'] === 'a) Importance of Modern Medicine in Chronic Telogen Effluvium – Male'}
//               onChange={() => handleRadioChange('2) Chronic Telogen Effluvium – Male', 'a) Importance of Modern Medicine in Chronic Telogen Effluvium – Male')}
//             />
//             a) Importance of Modern Medicine in Chronic Telogen Effluvium – Male
//           </label>
//         </p>
//         <p>
//           <label>
//             <input
//               type="radio"
//               name="2) Chronic Telogen Effluvium – Male"
//               value="b) General Treatment Guidelines for preventing hair loss in future – Instructions"
//               checked={selectedAnswers['2) Chronic Telogen Effluvium – Male'] === 'b) General Treatment Guidelines for preventing hair loss in future – Instructions'}
//               onChange={() => handleRadioChange('2) Chronic Telogen Effluvium – Male', 'b) General Treatment Guidelines for preventing hair loss in future – Instructions')}
//             />
//             b) General Treatment Guidelines for preventing hair loss in future – Instructions
//           </label>
//         </p>
//       </div>

//       <h2>3) Acute Telogen Effluvium – Female</h2>
//       <div className="ana-ques">
//         <p>
//           <label>
//             <input
//               type="radio"
//               name="3) Acute Telogen Effluvium – Female"
//               value="a) Importance of Modern Medicine in Acute Telogen Effluvium – Female"
//               checked={selectedAnswers['3) Acute Telogen Effluvium – Female'] === 'a) Importance of Modern Medicine in Acute Telogen Effluvium – Female'}
//               onChange={() => handleRadioChange('3) Acute Telogen Effluvium – Female', 'a) Importance of Modern Medicine in Acute Telogen Effluvium – Female')}
//             />
//             a) Importance of Modern Medicine in Acute Telogen Effluvium – Female
//           </label>
//         </p>
//         <p>
//           <label>
//             <input
//               type="radio"
//               name="3) Acute Telogen Effluvium – Female"
//               value="b) General Treatment Guidelines for preventing hair loss in future – Instructions"
//               checked={selectedAnswers['3) Acute Telogen Effluvium – Female'] === 'b) General Treatment Guidelines for preventing hair loss in future – Instructions'}
//               onChange={() => handleRadioChange('3) Acute Telogen Effluvium – Female', 'b) General Treatment Guidelines for preventing hair loss in future – Instructions')}
//             />
//             b) General Treatment Guidelines for preventing hair loss in future – Instructions
//           </label>
//         </p>
//       </div>

//       <h2>4) Chronic Telogen Effluvium – Female</h2>
//       <div className="ana-ques">
//         <p>
//           <label>
//             <input
//               type="radio"
//               name="4) Chronic Telogen Effluvium – Female"
//               value="a) Importance of Modern Medicine in Chronic Telogen Effluvium – Female"
//               checked={selectedAnswers['4) Chronic Telogen Effluvium – Female'] === 'a) Importance of Modern Medicine in Chronic Telogen Effluvium – Female'}
//               onChange={() => handleRadioChange('4) Chronic Telogen Effluvium – Female', 'a) Importance of Modern Medicine in Chronic Telogen Effluvium – Female')}
//             />
//             a) Importance of Modern Medicine in Chronic Telogen Effluvium – Female
//           </label>
//         </p>
//         <p>
//           <label>
//             <input
//               type="radio"
//               name="4) Chronic Telogen Effluvium – Female"
//               value="b) General Treatment Guidelines for preventing hair loss in future – Instructions"
//               checked={selectedAnswers['4) Chronic Telogen Effluvium – Female'] === 'b) General Treatment Guidelines for preventing hair loss in future – Instructions'}
//               onChange={() => handleRadioChange('4) Chronic Telogen Effluvium – Female', 'b) General Treatment Guidelines for preventing hair loss in future – Instructions')}
//             />
//             b) General Treatment Guidelines for preventing hair loss in future – Instructions
//           </label>
//         </p>
//       </div>

//       <h2>5) Androgenetic Alopecia Male – Grade 1 to Grade 7</h2>
//       <div className="ana-ques">
//         <p>
//           <label>
//             <input
//               type="radio"
//               name="5) Androgenetic Alopecia Male – Grade 1 to Grade 7"
//               value="a) Importance of Modern Medicine in Androgenetic Alopecia Male"
//               checked={selectedAnswers['5) Androgenetic Alopecia Male – Grade 1 to Grade 7'] === 'a) Importance of Modern Medicine in Androgenetic Alopecia Male'}
//               onChange={() => handleRadioChange('5) Androgenetic Alopecia Male – Grade 1 to Grade 7', 'a) Importance of Modern Medicine in Androgenetic Alopecia Male')}
//             />
//             a) Importance of Modern Medicine in Androgenetic Alopecia Male
//           </label>
//         </p>
//         <p>
//           <label>
//             <input
//               type="radio"
//               name="5) Androgenetic Alopecia Male – Grade 1 to Grade 7"
//               value="b) General Treatment Guidelines for preventing hair loss in future – Instructions"
//               checked={selectedAnswers['5) Androgenetic Alopecia Male – Grade 1 to Grade 7'] === 'b) General Treatment Guidelines for preventing hair loss in future – Instructions'}
//               onChange={() => handleRadioChange('5) Androgenetic Alopecia Male – Grade 1 to Grade 7', 'b) General Treatment Guidelines for preventing hair loss in future – Instructions')}
//             />
//             b) General Treatment Guidelines for preventing hair loss in future – Instructions
//           </label>
//         </p>
//       </div>

//       <h2>6) Androgenetic Alopecia Female – Grade 1 to Grade 3</h2>
//       <div className="ana-ques">
//         <p>
//           <label>
//             <input
//               type="radio"
//               name="6) Androgenetic Alopecia Female – Grade 1 to Grade 3"
//               value="a) Importance of Modern Medicine in Androgenetic Alopecia Female"
//               checked={selectedAnswers['6) Androgenetic Alopecia Female – Grade 1 to Grade 3'] === 'a) Importance of Modern Medicine in Androgenetic Alopecia Female'}
//               onChange={() => handleRadioChange('6) Androgenetic Alopecia Female – Grade 1 to Grade 3', 'a) Importance of Modern Medicine in Androgenetic Alopecia Female')}
//             />
//             a) Importance of Modern Medicine in Androgenetic Alopecia Female
//           </label>
//         </p>
//         <p>
//           <label>
//             <input
//               type="radio"
//               name="6) Androgenetic Alopecia Female – Grade 1 to Grade 3"
//               value="b) General Treatment Guidelines for preventing hair loss in future – Instructions"
//               checked={selectedAnswers['6) Androgenetic Alopecia Female – Grade 1 to Grade 3'] === 'b) General Treatment Guidelines for preventing hair loss in future – Instructions'}
//               onChange={() => handleRadioChange('6) Androgenetic Alopecia Female – Grade 1 to Grade 3', 'b) General Treatment Guidelines for preventing hair loss in future – Instructions')}
//             />
//             b) General Treatment Guidelines for preventing hair loss in future – Instructions
//           </label>
//         </p>
//       </div>

//       <div className="test-btnn">
//         <button onClick={prevStep}>Prev</button>
//         <button onClick={handleNext} disabled={!allSelected}>Next</button>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';

export default function Test3({selectedOption,setSelectedOption}) {

  const options = [
    {
      value: 'Adequate Nutritional Condition',
      src: '/Diet/4.png',
      description: 'With the implementation of the provided recommendations, you can further improve your nutritional habits to maintain the quality of your hair, prevent damage, and maintain healthy, vibrant looks.'
    },
    {
      value: 'Adequate Nutritional Condition but needs improvement',
      src: '/Diet/5.png',
      description: 'While the current nutritional condition is in an Adequate state, by applying the provided suggestions, you can enhance your hair\'s quality, avert potential damage, and uphold the well-being of your hair for vibrant hairs.'
    },
    {
      value: 'Inadequate nutritional condition. Requires improvement',
      src: '/Diet/6.png',
      description: 'Adhering to the given recommendations can elevate the quality of your hair, mitigate potential damage, and ensure the well-being of your hair, resulting in radiant hair.'
    }
  ];

  const handleChange = (event, index) => {
    const selectedValue = event.target.value;
    const selectedOption = options[index];
    setSelectedOption(selectedOption);
  };
console.log(selectedOption,'ff')
  return (
    <>
      <h1 className='diag tab-2'>3) Nutritional Assessment</h1>
      <h1>Conclusion:</h1>
      {options.map((option, index) => (
        <div key={index} className='div-check'>
          <input
            type="checkbox"
            name="nutritionalAssessment"
            value={option.value}
            onChange={(event) => handleChange(event, index)}
            checked={selectedOption && selectedOption.value === option.value}
          />
          <div>
            <h2>{index + 1}) {option.value}</h2>
            <img src={option.src} alt={option.value} />
            <p>{option.description}</p>
          </div>
        </div>
      ))}
    </>
  );
}
