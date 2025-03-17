// import React, { useState } from 'react';

// export default function Test9({selectedOptions,setSelectedOptions}) {
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
//       <h1 className='diag1 '>1) Diagnosis</h1>
//       <form style={{backgroundColor:'#ffc254',padding:'1rem'}}>
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
//       </form>
//     </div>
//   );
// }
import React, { useState } from 'react';

export default function Test9({ selectedOptions, setSelectedOptions }) {
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

  const handleChange = (event) => {
    const { value, checked } = event.target;
    const [mainOption, subOption] = value.split(',');

    const mainOptionText = optionMapping[mainOption];
    const subOptionText = subOption ? optionMapping[value] : null;

    setSelectedOptions(prevOptions => {
      if (checked) {
        if (subOption) {
          // Deselect all other sub-options for this main option
          const updatedOptions = prevOptions.filter(opt => opt.option !== mainOptionText || opt.subOption === null);
          // Add the new sub-option
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
      <h1 className='diag1 '>1) Diagnosis</h1>
      <form style={{ backgroundColor: '#ffc254', padding: '1rem' }}>
        <h4>Diagnosis & Details</h4>
        <div className='optionss'>
          <input
            type="checkbox"
            name="diagnosis"
            value="acute_telogen_effluvium_m"
            onChange={handleChange}
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
            checked={isChecked("Grey Hair")}
          />
          Grey Hair
        </div><br />
        <div className='optionss'>
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
        </div>
      </form>
    </div>
  );
}
