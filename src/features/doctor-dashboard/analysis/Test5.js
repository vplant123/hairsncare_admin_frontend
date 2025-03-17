
// import React, { useState } from 'react';

// export default function Test5({selectedOptions, setSelectedOptions, prevStep, nextStep }) {
 

//   const handleCheckboxChange = (question, option) => {
//     setSelectedOptions((prev) => {
//       const currentOptions = prev[question] || [];
//       const newOptions = currentOptions.includes(option)
//         ? currentOptions.filter((item) => item !== option)
//         : [...currentOptions, option];
//       return { ...prev, [question]: newOptions };
//     });
//   };

//   const handleLabelClick = (e, question, option) => {
//     e.preventDefault();
//     handleCheckboxChange(question, option);
//   };
// console.log(selectedOptions,'test 5')
//   return (
//     <div className="ana-hairscalp">
//       <h1>2) Hair & Scalp Treatment Recommendation</h1>
//       <h2>2.1 Assessment of your Scalp</h2>

//       {[
//         { id: 'A', text: 'Normal Scalp: Scalp Routine care' },
//         { id: 'B', text: 'Oily Scalp' },
//         { id: 'C', text: 'Dry' },
//         { id: 'D', text: 'Dry & Flaky Scalp' },
//         { id: 'E', text: 'Red and irritated scalp' },
//       ].map((option) => (
//         <div className="ana-ques" key={option.text}>
//           <p>
//             <label
//               style={{ display: 'flex', gap: '1rem', alignItems: 'baseline', cursor: 'pointer' }}
//               onClick={(e) => handleLabelClick(e, '2.1 Assessment of your Scalp', option.text)}
//             >
//               <input
//                 type="checkbox"
//                 checked={(selectedOptions['2.1 Assessment of your Scalp'] || []).includes(option.text)}
//                 onChange={(e) => e.stopPropagation()}
//               />
//               {option.text}
//             </label>
//           </p>
//         </div>
//       ))}

//       <h2>2.2 Assessment of your Hair Quality</h2>

//       {[
//         { id: 'A', text: 'Normal - Nil' },
//         { id: 'B', text: 'Dull hair' },
//         { id: 'C', text: 'Frizzy hair' },
//         { id: 'D', text: 'Tangles easily & forms knot' },
//         { id: 'E', text: 'Split ends' },
//         { id: 'F', text: 'Greasy hair (oily)' },
//         { id: 'G', text: 'Dry hair' },
//         { id: 'H', text: 'Brittle hair' },
//       ].map((option) => (
//         <div className="ana-ques" key={option.text}>
//           <p>
//             <label
//               style={{ display: 'flex', gap: '1rem', alignItems: 'baseline', cursor: 'pointer' }}
//               onClick={(e) => handleLabelClick(e, '2.2 Assessment of your Hair Quality', option.text)}
//             >
//               <input
//                 type="checkbox"
//                 checked={(selectedOptions['2.2 Assessment of your Hair Quality'] || []).includes(option.text)}
//                 onChange={(e) => e.stopPropagation()}
//               />
//               {option.text}
//             </label>
//           </p>
//         </div>
//       ))}

//       <h2>2.3 Assessment of your Hair density (general instructions)</h2>

//       {[
//         { id: 'A', text: 'Normal - Nil' },
//         { id: 'B', text: 'Decreased' },
//       ].map((option) => (
//         <div className="ana-ques" key={option.text}>
//           <p>
//             <label
//               style={{ display: 'flex', gap: '1rem', alignItems: 'baseline', cursor: 'pointer' }}
//               onClick={(e) => handleLabelClick(e, '2.3 Assessment of your Hair density', option.text)}
//             >
//               <input
//                 type="checkbox"
//                 checked={(selectedOptions['2.3 Assessment of your Hair density'] || []).includes(option.text)}
//                 onChange={(e) => e.stopPropagation()}
//               />
//               {option.text}
//             </label>
//           </p>
//         </div>
//       ))}

//       <h2>2.4 Assessment of your Color vibrancy (color protection products)</h2>

//       {[
//         { id: 'A', text: 'Normal Hair color: Nil' },
//         { id: 'B', text: 'Faded (Dull) Hair color' },
//       ].map((option) => (
//         <div className="ana-ques" key={option.text}>
//           <p>
//             <label
//               style={{ display: 'flex', gap: '1rem', alignItems: 'baseline', cursor: 'pointer' }}
//               onClick={(e) => handleLabelClick(e, '2.4 Assessment of your Color vibrancy', option.text)}
//             >
//               <input
//                 type="checkbox"
//                 checked={(selectedOptions['2.4 Assessment of your Color vibrancy'] || []).includes(option.text)}
//                 onChange={(e) => e.stopPropagation()}
//               />
//               {option.text}
//             </label>
//           </p>
//         </div>
//       ))}

//       <h2>2.5 Assessment of Moisture and hydration of hair</h2>

//       {[
//         { id: 'A', text: 'Well Hydrated: Nil' },
//         { id: 'B', text: 'Lack of moisture' },
//       ].map((option) => (
//         <div className="ana-ques" key={option.text}>
//           <p>
//             <label
//               style={{ display: 'flex', gap: '1rem', alignItems: 'baseline', cursor: 'pointer' }}
//               onClick={(e) => handleLabelClick(e, '2.5 Assessment of Moisture and hydration of hair', option.text)}
//             >
//               <input
//                 type="checkbox"
//                 checked={(selectedOptions['2.5 Assessment of Moisture and hydration of hair'] || []).includes(option.text)}
//                 onChange={(e) => e.stopPropagation()}
//               />
//               {option.text}
//             </label>
//           </p>
//         </div>
//       ))}

//       <h2>2.6 Assessment of Hair breakage</h2>

//       {[
//         { id: 'A', text: 'Normal Breakage' },
//         { id: 'B', text: 'Excessive Breakage' },
//         { id: 'C', text: 'No Breakage: Nil' },
//       ].map((option) => (
//         <div className="ana-ques" key={option.text}>
//           <p>
//             <label
//               style={{ display: 'flex', gap: '1rem', alignItems: 'baseline', cursor: 'pointer' }}
//               onClick={(e) => handleLabelClick(e, '2.6 Assessment of Hair breakage', option.text)}
//             >
//               <input
//                 type="checkbox"
//                 checked={(selectedOptions['2.6 Assessment of Hair breakage'] || []).includes(option.text)}
//                 onChange={(e) => e.stopPropagation()}
//               />
//               {option.text}
//             </label>
//           </p>
//         </div>
//       ))}

//       <div className="test-btnn">
//         <button onClick={prevStep}>Prev</button>
//         <button onClick={nextStep}>Next</button>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';

export default function Test5({selectedOption,setSelectedOption,nextStep}) {

  const options = [
    // {
    //   value: 'No stress',
    //   src: '/3.png',
    //   description: 'Despite your current stress level being within the normal range, adhering to general stress management guidelines will contribute to an improved journey towards better hair growth.'
    // },
    {
      value: 'Mild to Moderate Level',
      src: '/2.png',
      description: 'As your stress level shifts to a moderate state, adhering to specific stress management guidelines will significantly aid you on your journey to achieving better hair growth.'
    },
    {
      value: 'Moderate to Severe Level',
      src: '/4.png',
      description: 'Incorporating the suggested guidance can help you improve your approach to stress, thereby preserving the quality of your hair, protecting it from damage, and sustaining its vibrancy.'
    }
  ];
console.log(selectedOption,'kk')
  const handleChange = (event, index) => {
    const selectedValue = event.target.value;
    const selectedOption = options[index];
    setSelectedOption(selectedOption);
  };

  return (
    <>
      <h1 className='diag tab-4'>5) Stress Analysis</h1>
      <h1>Conclusion:</h1>
      <p>As per your score your provisional stress category is:</p>
      {options.map((option, index) => (
        <div key={index} className='div-check'>
          <input
            type="checkbox"
            name="stressAnalysis"
            value={option.value}
            onChange={(event) => handleChange(event, index)}
            checked={selectedOption && selectedOption.value === option.value}
          />
          <div>
            <h2>{option.value}</h2>
            <img src={option.src} alt={option.value} />
            <p>{option.description}</p>
          </div>
        </div>
      ))}
      <div className='test-btnn btn-tt'> 
      <button onClick={()=>nextStep()}>Assessment Save, and Continue</button>
      </div>
      
    </>
  );
}
