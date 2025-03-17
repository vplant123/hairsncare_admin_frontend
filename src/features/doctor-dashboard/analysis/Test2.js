
// import React, { useState } from 'react';

// export default function Test2({ selectedAnswers, setSelectedAnswers,nextStep, prevStep }) {
 

//   const handleRadioChange = (section, option) => {
//     setSelectedAnswers((prev) => ({
//       ...prev,
//       [section]: option,
//     }));
//   };

//   const allSelected = ['DietManagementGeneral', 'DietManagementSpecific', 'LifeStyleManagementGeneral', 'LifeStyleManagementSpecific', 'StressManagement'].every(
//     (section) => selectedAnswers[section] !== ''
//   );

//   const handleNext = () => {
//     if (allSelected) {
//       nextStep(selectedAnswers);
//     }
//   };
// console.log(selectedAnswers,"Test 2")
//   return (
//     <div>
//       <div className="ana-test">
//         <div className="ana-t">
//           <h2>1) Diet Management</h2>
//           <div className="ana-ques">
//             <h3>a) GENERAL Hairloss DIET</h3>
//             <p>
//               <label>
//                 <input
//                   type="radio"
//                   name="DietManagementGeneral"
//                   value="GENERAL Hairloss DIET"
//                   checked={selectedAnswers.DietManagementGeneral === 'GENERAL Hairloss DIET'}
//                   onChange={() => handleRadioChange('DietManagementGeneral', 'GENERAL Hairloss DIET')}
//                 />
//                 a) GENERAL Hairloss DIET
//               </label>
//             </p>
//           </div>
//           <h3>b) Specific Hairloss Diet</h3>
//           <div className="ana-ques">
//             <p>
//               <label>
//                 <input
//                   type="radio"
//                   name="DietManagementSpecific"
//                   value="Anemia"
//                   checked={selectedAnswers.DietManagementSpecific === 'Anemia'}
//                   onChange={() => handleRadioChange('DietManagementSpecific', 'Anemia')}
//                 />
//                 i) Anemia
//               </label>
//             </p>
//           </div>
//           <div className="ana-ques">
//             <p>
//               <label>
//                 <input
//                   type="radio"
//                   name="DietManagementSpecific"
//                   value="PCOD"
//                   checked={selectedAnswers.DietManagementSpecific === 'PCOD'}
//                   onChange={() => handleRadioChange('DietManagementSpecific', 'PCOD')}
//                 />
//                 ii) PCOD
//               </label>
//             </p>
//           </div>
//           <div className="ana-ques">
//             <p>
//               <label>
//                 <input
//                   type="radio"
//                   name="DietManagementSpecific"
//                   value="Thyroid"
//                   checked={selectedAnswers.DietManagementSpecific === 'Thyroid'}
//                   onChange={() => handleRadioChange('DietManagementSpecific', 'Thyroid')}
//                 />
//                 iii) Thyroid
//               </label>
//             </p>
//           </div>
//         </div>
//         <div className="ana-t">
//           <h2>2) LifeStyle Management</h2>
//           <div className="ana-ques">
//             <h3>a) GENERAL Lifestyle Advice</h3>
//             <p>
//               <label>
//                 <input
//                   type="radio"
//                   name="LifeStyleManagementGeneral"
//                   value="GENERAL Lifestyle Advice"
//                   checked={selectedAnswers.LifeStyleManagementGeneral === 'GENERAL Lifestyle Advice'}
//                   onChange={() => handleRadioChange('LifeStyleManagementGeneral', 'GENERAL Lifestyle Advice')}
//                 />
//                 a) GENERAL Lifestyle Advice
//               </label>
//             </p>
//           </div>
//           <h3>b) Specific Lifestyle Advice</h3>
//           <div className="ana-ques">
//             <p>
//               <label>
//                 <input
//                   type="radio"
//                   name="LifeStyleManagementSpecific"
//                   value="Anemia"
//                   checked={selectedAnswers.LifeStyleManagementSpecific === 'Anemia'}
//                   onChange={() => handleRadioChange('LifeStyleManagementSpecific', 'Anemia')}
//                 />
//                 i) Anemia
//               </label>
//             </p>
//           </div>
//           <div className="ana-ques">
//             <p>
//               <label>
//                 <input
//                   type="radio"
//                   name="LifeStyleManagementSpecific"
//                   value="PCOD"
//                   checked={selectedAnswers.LifeStyleManagementSpecific === 'PCOD'}
//                   onChange={() => handleRadioChange('LifeStyleManagementSpecific', 'PCOD')}
//                 />
//                 ii) PCOD
//               </label>
//             </p>
//           </div>
//           <div className="ana-ques">
//             <p>
//               <label>
//                 <input
//                   type="radio"
//                   name="LifeStyleManagementSpecific"
//                   value="Thyroid"
//                   checked={selectedAnswers.LifeStyleManagementSpecific === 'Thyroid'}
//                   onChange={() => handleRadioChange('LifeStyleManagementSpecific', 'Thyroid')}
//                 />
//                 iii) Thyroid
//               </label>
//             </p>
//           </div>
//         </div>
//         <div className="ana-t">
//           <h2>3) Stress Management</h2>
//           <div className="ana-ques">
//             <p>
//               <label>
//                 <input
//                   type="radio"
//                   name="StressManagement"
//                   value="No Stress Management"
//                   checked={selectedAnswers.StressManagement === 'No Stress Management'}
//                   onChange={() => handleRadioChange('StressManagement', 'No Stress Management')}
//                 />
//                 a) No Stress Management
//               </label>
//             </p>
//           </div>
//           <div className="ana-ques">
//             <p>
//               <label>
//                 <input
//                   type="radio"
//                   name="StressManagement"
//                   value="Stress Management – Mild to Moderate - General Instructions"
//                   checked={selectedAnswers.StressManagement === 'Stress Management – Mild to Moderate - General Instructions'}
//                   onChange={() => handleRadioChange('StressManagement', 'Stress Management – Mild to Moderate - General Instructions')}
//                 />
//                 b) Stress Management – Mild to Moderate - General Instructions
//               </label>
//             </p>
//           </div>
//           <div className="ana-ques">
//             <p>
//               <label>
//                 <input
//                   type="radio"
//                   name="StressManagement"
//                   value="Stress Management – Severe"
//                   checked={selectedAnswers.StressManagement === 'Stress Management – Severe'}
//                   onChange={() => handleRadioChange('StressManagement', 'Stress Management – Severe')}
//                 />
//                 c) Stress Management – Severe
//               </label>
//             </p>
//           </div>
//           <div className="ana-ques">
//             <p>
//               <label>
//                 <input
//                   type="radio"
//                   name="StressManagement"
//                   value="Stress Management for PCOD & Thyroid"
//                   checked={selectedAnswers.StressManagement === 'Stress Management for PCOD & Thyroid'}
//                   onChange={() => handleRadioChange('StressManagement', 'Stress Management for PCOD & Thyroid')}
//                 />
//                 d) Stress Management for PCOD & Thyroid
//               </label>
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="test-btnn">
//         <button onClick={prevStep}>Prev</button>
//         <button onClick={handleNext} disabled={!allSelected}>Next</button>
//       </div>
//     </div>
//   );
// }
// import React,{useState} from 'react'

// export default function Test2({selectedOption,setSelectedOption,scalp,setScalp,hairQuality,setHairQuality,hairDensity,setHairDensity,colorVibrancy,setColorVibrancy,moisture,setMoisture,hairBreakage,setHairBreakage}) {
  
//   const handleScalpChange = (event) => setScalp(event.target.value);
//   const handleHairQualityChange = (event) => setHairQuality(event.target.value);
//   const handleHairDensityChange = (event) => setHairDensity(event.target.value);
//   const handleColorVibrancyChange = (event) => setColorVibrancy(event.target.value);
//   const handleMoistureChange = (event) => setMoisture(event.target.value);
//   const handleHairBreakageChange = (event) => setHairBreakage(event.target.value);

//   const options = [
//     {
//       value: 'Satisfactory condition',
//       src: '/Hair Scalp analysis/7.png',
//       description: 'With the implementation of the provided recommendations, you can further improve the quality of your hair, prevent damage, and maintain healthy, vibrant locks.'
//     },
//     {
//       value: 'Satisfactory condition but needs improvement',
//       src: '/Hair Scalp analysis/5.png',
//       description: 'While the current state is satisfactory, by applying the provided suggestions, you can enhance your hair\'s quality, avert potential damage, and uphold the well-being of your hair for vibrant locks.'
//     }
//   ];

//   const handleChange = (event, index) => {
//     const selectedValue = event.target.value;
//     const selectedOption = options[index];
//     setSelectedOption(selectedOption);
//   };

// console.log(selectedOption,"dudu")
//   return (
//     <>
//           <h1 className='diag tab-5'>2) Hair & Scalp Analysis: </h1>
     



//      <form className='formss'>
//        <p><strong>1. Scalp examination:</strong></p>
//        <label className='good optionss'>
//          <input type="checkbox" name="scalp" value="Normal Scalp" checked={scalp.includes('Normal Scalp')} onChange={handleScalpChange} />
//          Normal Scalp
//        </label><br />
//        <label className='better optionss'>
//          <input type="checkbox" name="scalp" value="Oily Scalp" checked={scalp.includes('Oily Scalp')} onChange={handleScalpChange} />
//          Oily Scalp
//        </label><br />
//        <label className='better optionss'>
//          <input type="checkbox" name="scalp" value="Dry Scalp" checked={scalp.includes('Dry Scalp')} onChange={handleScalpChange} />
//          Dry Scalp
//        </label><br />
//        <label className='better optionss'>
//          <input type="checkbox" name="scalp" value="Dry & Flaky Scalp" checked={scalp.includes('Dry & Flaky Scalp')} onChange={handleScalpChange} />
//          Dry & Flaky Scalp
//        </label><br />
//        <label className='better optionss'>
//          <input type="checkbox" name="scalp" value="Red and Irritated Scalp" checked={scalp.includes('Red and Irritated Scalp')} onChange={handleScalpChange} />
//          Red and Irritated Scalp
//        </label>
     
//        <p><strong>2. Hair Quality (texture):</strong></p>
//        <label className='good optionss'>
//          <input type="checkbox" name="hairQuality" value="Good" checked={hairQuality.includes('Good')} onChange={handleHairQualityChange} />
//          Good
//        </label><br />
//        <label className='better optionss'>
//          <input type="checkbox" name="hairQuality" value="Dull Hair" checked={hairQuality.includes('Dull Hair')} onChange={handleHairQualityChange} />
//          Dull Hair
//        </label><br />
//        <label className='better optionss'>
//          <input type="checkbox" name="hairQuality" value="Frizzy Hair" checked={hairQuality.includes('Frizzy Hair')} onChange={handleHairQualityChange} />
//          Frizzy Hair
//        </label><br />
//        <label className='better optionss'>
//          <input type="checkbox" name="hairQuality" value="Tangles Easily & Forms Knot" checked={hairQuality.includes('Tangles Easily & Forms Knot')} onChange={handleHairQualityChange} />
//          Tangles Easily & Forms Knot
//        </label><br />
//        <label className='better optionss'>
//          <input type="checkbox" name="hairQuality" value="Split Ends" checked={hairQuality.includes('Split Ends')} onChange={handleHairQualityChange} />
//          Split Ends
//        </label><br />
//        <label className='better optionss'>
//          <input type="checkbox" name="hairQuality" value="Greasy Hair (Oily)" checked={hairQuality.includes('Greasy Hair (Oily)')} onChange={handleHairQualityChange} />
//          Greasy Hair (Oily)
//        </label><br />
//        <label className='better optionss'>
//          <input type="checkbox" name="hairQuality" value="Dry Hair" checked={hairQuality.includes('Dry Hair')} onChange={handleHairQualityChange} />
//          Dry Hair
//        </label><br />
//        <label className='better optionss'>
//          <input type="checkbox" name="hairQuality" value="Brittle Hair" checked={hairQuality.includes('Brittle Hair')} onChange={handleHairQualityChange} />
//          Brittle Hair
//        </label>
     
//        <p><strong>3. Hair density (general instructions):</strong></p>
//        <label className='good optionss'>
//          <input type="checkbox" name="hairDensity" value="Good" checked={hairDensity.includes('Good')} onChange={handleHairDensityChange} />
//          Good
//        </label><br />
//        <label className='better optionss'>
//          <input type="checkbox" name="hairDensity" value="Decreased" checked={hairDensity.includes('Decreased')} onChange={handleHairDensityChange} />
//          Decreased
//        </label>
     
//        <p><strong>4. Color vibrancy (color protection products):</strong></p>
//        <label className='good optionss'>
//          <input type="checkbox" name="colorVibrancy" value="Normal Hair Color" checked={colorVibrancy.includes('Normal Hair Color')} onChange={handleColorVibrancyChange} />
//          Normal Hair Color
//        </label><br />
//        <label className='better optionss'>
//          <input type="checkbox" name="colorVibrancy" value="Faded (Dull) Hair Color" checked={colorVibrancy.includes('Faded (Dull) Hair Color')} onChange={handleColorVibrancyChange} />
//          Faded (Dull) Hair Color
//        </label>
     
//        <p><strong>5. Moisture and hydration of hair (general instructions):</strong></p>
//        <label className='good optionss'>
//          <input type="checkbox" name="moisture" value="Well Hydrated" checked={moisture.includes('Well Hydrated')} onChange={handleMoistureChange} />
//          Well Hydrated
//        </label><br />
//        <label className='better optionss'>
//          <input type="checkbox" name="moisture" value="Lack of Moisture" checked={moisture.includes('Lack of Moisture')} onChange={handleMoistureChange} />
//          Lack of Moisture
//        </label>
     
//        <p><strong>6. Hair breakage (general instructions):</strong></p>
//        <label className='better optionss'>
//          <input type="checkbox" name="hairBreakage" value="Excessive Breakage" checked={hairBreakage.includes('Excessive Breakage')} onChange={handleHairBreakageChange} />
//          Excessive Breakage
//        </label><br />
//        <label className='good optionss'>
//          <input type="checkbox" name="hairBreakage" value="No Breakage" checked={hairBreakage.includes('No Breakage')} onChange={handleHairBreakageChange} />
//          No Breakage
//        </label>
//      </form>
     
//          {/* <h1 >Hair & Scalp Analysis: </h1> */}
//          <>
//       <h1 className='diag tab-5'>Conclusion: Your Overall hair health is deemed to be</h1>
//       {options.map((option, index) => (
//         <div key={index} className='div-check'>
//           <input
//             type="checkbox"
//             name="hairHealthAssessment"
//             value={option.value}
//             onChange={(event) => handleChange(event, index)}
//             checked={selectedOption && selectedOption.value === option.value}
//           />
//           <div>
//             <h2>{index + 1}) {option.value}</h2>
//             <img src={option.src} alt={option.value} />
//             <p>{option.description}</p>
//           </div>
//         </div>
//       ))}
//     </>
//     </>
//   )
// }
import React, { useState } from 'react';

export default function Test2({
  selectedOption,
  setSelectedOption,
  scalp,
  setScalp,
  hairQuality,
  setHairQuality,
  hairDensity,
  setHairDensity,
  colorVibrancy,
  setColorVibrancy,
  moisture,
  setMoisture,
  hairBreakage,
  setHairBreakage
}) {
  const handleScalpChange = (event) => {
    const value = event.target.value;
    // setScalp(prev => {
    //   if (value === 'Normal Scalp') {
    //     return ['Normal Scalp'];
    //   } else {
    //     if (prev.includes('Normal Scalp')) {
    //       return [value];
    //     } else {
    //       if (prev.includes(value)) {
    //         return prev.filter(item => item !== value);
    //       } else {
    //         return [...prev, value];
    //       }
    //     }
    //   }
    // });
    setScalp(value)
  };

  const handleHairQualityChange = (event) => {
    const value = event.target.value;
    // setHairQuality(prev => {
    //   if (value === 'Good') {
    //     return ['Good'];
    //   } else {
    //     if (prev.includes('Good')) {
    //       return [value];
    //     } else {
    //       if (prev.includes(value)) {
    //         return prev.filter(item => item !== value);
    //       } else {
    //         return [...prev, value];
    //       }
    //     }
    //   }
    // });
    setHairQuality(value)
  };

  const handleHairDensityChange = (event) => setHairDensity(event.target.value);
  const handleColorVibrancyChange = (event) => setColorVibrancy(event.target.value);
  const handleMoistureChange = (event) => setMoisture(event.target.value);
  const handleHairBreakageChange = (event) => setHairBreakage(event.target.value);

  const options = [
    {
      value: 'Satisfactory condition',
      src: '/Hair Scalp analysis/7.png',
      description: 'With the implementation of the provided recommendations, you can further improve the quality of your hair, prevent damage, and maintain healthy, vibrant locks.'
    },
    {
      value: 'Satisfactory condition but needs improvement',
      src: '/Hair Scalp analysis/5.png',
      description: 'While the current state is satisfactory, by applying the provided suggestions, you can enhance your hair\'s quality, avert potential damage, and uphold the well-being of your hair for vibrant locks.'
    }
  ];

  const handleChange = (event, index) => {
    const selectedValue = event.target.value;
    const selectedOption = options[index];
    setSelectedOption(selectedOption);
  };

  console.log(selectedOption, "dudu");
  return (
    <>
      <h1 className='diag tab-5'>2) Hair & Scalp Analysis:</h1>
      <form className='formss'>
        <p><strong>1. Scalp examination:</strong></p>
        <label className='good optionss'>
          <input
            type="checkbox"
            name="scalp"
            value="Normal Scalp"
            checked={scalp.includes('Normal Scalp')}
            onChange={handleScalpChange}
          />
          Normal Scalp
        </label><br />
        <label className='better optionss'>
          <input
            type="checkbox"
            name="scalp"
            value="Oily Scalp"
            checked={scalp.includes('Oily Scalp')}
            onChange={handleScalpChange}
          />
          Oily Scalp
        </label><br />
        <label className='better optionss'>
          <input
            type="checkbox"
            name="scalp"
            value="Dry Scalp"
            checked={scalp.includes('Dry Scalp')}
            onChange={handleScalpChange}
          />
          Dry Scalp
        </label><br />
        <label className='better optionss'>
          <input
            type="checkbox"
            name="scalp"
            value="Dry & Flaky Scalp"
            checked={scalp.includes('Dry & Flaky Scalp')}
            onChange={handleScalpChange}
          />
          Dry & Flaky Scalp
        </label><br />
        <label className='better optionss'>
          <input
            type="checkbox"
            name="scalp"
            value="Red and Irritated Scalp"
            checked={scalp.includes('Red and Irritated Scalp')}
            onChange={handleScalpChange}
          />
          Red and Irritated Scalp
        </label>

        <p><strong>2. Hair Quality (texture):</strong></p>
        <label className='good optionss'>
          <input
            type="checkbox"
            name="hairQuality"
            value="Good"
            checked={hairQuality.includes('Good')}
            onChange={handleHairQualityChange}
          />
          Good
        </label><br />
        <label className='better optionss'>
          <input
            type="checkbox"
            name="hairQuality"
            value="Dull Hair"
            checked={hairQuality.includes('Dull Hair')}
            onChange={handleHairQualityChange}
          />
          Dull Hair
        </label><br />
        <label className='better optionss'>
          <input
            type="checkbox"
            name="hairQuality"
            value="Frizzy Hair"
            checked={hairQuality.includes('Frizzy Hair')}
            onChange={handleHairQualityChange}
          />
          Frizzy Hair
        </label><br />
        <label className='better optionss'>
          <input
            type="checkbox"
            name="hairQuality"
            value="Tangles Easily & Forms Knot"
            checked={hairQuality.includes('Tangles Easily & Forms Knot')}
            onChange={handleHairQualityChange}
          />
          Tangles Easily & Forms Knot
        </label><br />
        <label className='better optionss'>
          <input
            type="checkbox"
            name="hairQuality"
            value="Split Ends"
            checked={hairQuality.includes('Split Ends')}
            onChange={handleHairQualityChange}
          />
          Split Ends
        </label><br />
        <label className='better optionss'>
          <input
            type="checkbox"
            name="hairQuality"
            value="Greasy Hair (Oily)"
            checked={hairQuality.includes('Greasy Hair (Oily)')}
            onChange={handleHairQualityChange}
          />
          Greasy Hair (Oily)
        </label><br />
        <label className='better optionss'>
          <input
            type="checkbox"
            name="hairQuality"
            value="Dry Hair"
            checked={hairQuality.includes('Dry Hair')}
            onChange={handleHairQualityChange}
          />
          Dry Hair
        </label><br />
        <label className='better optionss'>
          <input
            type="checkbox"
            name="hairQuality"
            value="Brittle Hair"
            checked={hairQuality.includes('Brittle Hair')}
            onChange={handleHairQualityChange}
          />
          Brittle Hair
        </label>

        <p><strong>3. Hair density (general instructions):</strong></p>
        <label className='good optionss'>
          <input
            type="checkbox"
            name="hairDensity"
            value="Good"
            checked={hairDensity.includes('Good')}
            onChange={handleHairDensityChange}
          />
          Good
        </label><br />
        <label className='better optionss'>
          <input
            type="checkbox"
            name="hairDensity"
            value="Decreased"
            checked={hairDensity.includes('Decreased')}
            onChange={handleHairDensityChange}
          />
          Decreased
        </label>

        <p><strong>4. Color vibrancy (color protection products):</strong></p>
        <label className='good optionss'>
          <input
            type="checkbox"
            name="colorVibrancy"
            value="Normal Hair Color"
            checked={colorVibrancy.includes('Normal Hair Color')}
            onChange={handleColorVibrancyChange}
          />
          Normal Hair Color
        </label><br />
        <label className='better optionss'>
          <input
            type="checkbox"
            name="colorVibrancy"
            value="Faded (Dull) Hair Color"
            checked={colorVibrancy.includes('Faded (Dull) Hair Color')}
            onChange={handleColorVibrancyChange}
          />
          Faded (Dull) Hair Color
        </label>

        <p><strong>5. Moisture and hydration of hair (general instructions):</strong></p>
        <label className='good optionss'>
          <input
            type="checkbox"
            name="moisture"
            value="Well Hydrated"
            checked={moisture.includes('Well Hydrated')}
            onChange={handleMoistureChange}
          />
          Well Hydrated
        </label><br />
        <label className='better optionss'>
          <input
            type="checkbox"
            name="moisture"
            value="Lack of Moisture"
            checked={moisture.includes('Lack of Moisture')}
            onChange={handleMoistureChange}
          />
          Lack of Moisture
        </label>

        <p><strong>6. Hair breakage (general instructions):</strong></p>
        <label className='better optionss'>
          <input
            type="checkbox"
            name="hairBreakage"
            value="Excessive Breakage"
            checked={hairBreakage.includes('Excessive Breakage')}
            onChange={handleHairBreakageChange}
          />
          Excessive Breakage
        </label><br />
        <label className='good optionss'>
          <input
            type="checkbox"
            name="hairBreakage"
            value="No Breakage"
            checked={hairBreakage.includes('No Breakage')}
            onChange={handleHairBreakageChange}
          />
          No Breakage
        </label>
      </form>

      <h1 className='diag tab-5'>Conclusion: Your Overall hair health is deemed to be</h1>
      {options.map((option, index) => (
        <div key={index} className='div-check'>
          <input
            type="checkbox"
            name="hairHealthAssessment"
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
