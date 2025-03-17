
// import React, { useState } from "react";

// export default function Test4({selectedOptions, setSelectedOptions,inputValue,setInputValue, nextStep, prevStep }) {
 
// const handleChangeInput=(e)=>{
//   setInputValue(e.target.value)
//   handleCheckboxChange(
//     "Other",
//     e.target.value
//   )
// }
//   const handleCheckboxChange = (option, content) => {
//     setSelectedOptions((prev) => ({
//       ...prev,
//       [option]: prev[option] ? '' : content,
//     }));
//   };
// console.log(selectedOptions,'test 4')
//   return (
//     <div>
//     <label className="label4">
//     <div style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}>
//         <input
//           type="checkbox"
//           checked={!!selectedOptions["7) Alopecia Areata"]}
//           onChange={() =>
//             handleCheckboxChange(
//               "7) Alopecia Areata",
//               "Importance of Modern Medicine in treating Alopecia Areata. Modern medicine plays a crucial role in treating Alopecia Areata. Alopecia Areata is an autoimmune condition that leads to hair loss, typically in patches on the scalp but can also affect other parts of the body. Several modern medical treatments can help manage and even reverse its effects. However, the effectiveness of these treatments can vary among individuals. Consulting a dermatologist or healthcare professional is essential to determine the most suitable treatment plan based on the severity and individual characteristics of the condition. Additionally, considering the psychological impact of hair loss, especially for males, counseling and support can also be crucial components of treatment. Remember, the effectiveness of treatments and their suitability can vary from person to person, and not all treatments may work for everyone. It's essential to work closely with a healthcare professional to find the most effective and appropriate treatment plan for each individual."
//             )
//           }
//         />
//         <div>
//           <h2>7) Alopecia Areata</h2>
//           <p>
//             Importance of Modern Medicine in treating Alopecia Areata. Modern
//             medicine plays a crucial role in treating Alopecia Areata. Alopecia
//             Areata is an autoimmune condition that leads to hair loss, typically
//             in patches on the scalp but can also affect other parts of the body.
//             Several modern medical treatments can help manage and even reverse
//             its effects. However, the effectiveness of these treatments can vary
//             among individuals. Consulting a dermatologist or healthcare
//             professional is essential to determine the most suitable treatment
//             plan based on the severity and individual characteristics of the
//             condition. Additionally, considering the psychological impact of
//             hair loss, especially for males, counseling and support can also be
//             crucial components of treatment. Remember, the effectiveness of
//             treatments and their suitability can vary from person to person, and
//             not all treatments may work for everyone. It's essential to work
//             closely with a healthcare professional to find the most effective
//             and appropriate treatment plan for each individual.
//           </p>
//         </div>
//       </div>
//     </label>

//      <label className="label4">
//      <div style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}>
//         <input
//           type="checkbox"
//           checked={!!selectedOptions["8) PCOD"]}
//           onChange={() =>
//             handleCheckboxChange(
//               "8) PCOD",
//               "Importance of Modern Medicine in hair loss & thinning due to PCOD. Modern medicine has revolutionized the management of Polycystic Ovary Syndrome (PCOS) and Polycystic Ovary Disease (PCOD), offering vital contributions in hormonal regulation, fertility support, insulin management, lifestyle adjustments, symptom treatment, complication handling, and emotional support. From controlling menstrual cycles with medications like birth control pills to addressing fertility through ovulation-inducing drugs and insulin resistance with medications, modern medicine's tailored approach significantly improves the quality of life for individuals. However, combining medical interventions with lifestyle changes remains crucial for optimal outcomes, emphasizing the need for personalized treatment plans guided by healthcare professionals."
//             )
//           }
//         />
//         <div>
//           <h2>8) PCOD</h2>
//           <p>
//             Importance of Modern Medicine in hair loss & thinning due to PCOD.
//             Modern medicine has revolutionized the management of Polycystic
//             Ovary Syndrome (PCOS) and Polycystic Ovary Disease (PCOD), offering
//             vital contributions in hormonal regulation, fertility support,
//             insulin management, lifestyle adjustments, symptom treatment,
//             complication handling, and emotional support. From controlling
//             menstrual cycles with medications like birth control pills to
//             addressing fertility through ovulation-inducing drugs and insulin
//             resistance with medications, modern medicine's tailored approach
//             significantly improves the quality of life for individuals. However,
//             combining medical interventions with lifestyle changes remains
//             crucial for optimal outcomes, emphasizing the need for personalized
//             treatment plans guided by healthcare professionals.
//           </p>
//         </div>
//       </div>
//      </label>

//      <label className="label4">
//      <div style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}>
//         <input
//           type="checkbox"
//           checked={!!selectedOptions["9) Thyroid"]}
//           onChange={() =>
//             handleCheckboxChange(
//               "9) Thyroid",
//               "Importance of Modern Medicine in hair loss & thinning due to Thyroid. Modern medicine is pivotal in combating hair loss from thyroid disorders like hypothyroidism and hyperthyroidism. Hypothyroidism, with its hormone deficiency, sees restoration through thyroid hormone replacement, aiding in reversing associated hair loss. For hyperthyroidism, medications regulate hormone production, reducing hair loss. Managing the root cause—thyroid dysfunction—is vital, and modern medicine offers diverse strategies to stabilize these conditions. Supplements support hair health during thyroid treatment. Additionally, healthcare providers address contributing factors like nutrient deficiencies or linked autoimmune conditions. Response to treatment varies, and a collaborative approach involving specialists ensures personalized care and optimal outcomes in managing thyroid-related hair loss."
//             )
//           }
//         />
//         <div>
//           <h2>9) Thyroid</h2>
//           <p>
//             Importance of Modern Medicine in hair loss & thinning due to
//             Thyroid. Modern medicine is pivotal in combating hair loss from
//             thyroid disorders like hypothyroidism and hyperthyroidism.
//             Hypothyroidism, with its hormone deficiency, sees restoration
//             through thyroid hormone replacement, aiding in reversing associated
//             hair loss. For hyperthyroidism, medications regulate hormone
//             production, reducing hair loss. Managing the root cause—thyroid
//             dysfunction—is vital, and modern medicine offers diverse strategies
//             to stabilize these conditions. Supplements support hair health
//             during thyroid treatment. Additionally, healthcare providers address
//             contributing factors like nutrient deficiencies or linked autoimmune
//             conditions. Response to treatment varies, and a collaborative
//             approach involving specialists ensures personalized care and optimal
//             outcomes in managing thyroid-related hair loss.
//           </p>
//         </div>
//       </div>
//      </label>

//       <label className="label4">
//       <div style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}>
//         <input
//           type="checkbox"
//           checked={!!selectedOptions["10) Anemia"]}
//           onChange={() =>
//             handleCheckboxChange(
//               "10) Anemia",
//               "Importance of Modern Medicine in hair loss & thinning due to Anemia. Modern medicine plays a pivotal role in addressing hair loss and thinning caused by anemia, a condition marked by insufficient red blood cells or low hemoglobin levels. Iron-deficiency anemia, a common form, disrupts oxygen delivery to tissues, including the scalp, affecting hair follicles' health. Through diagnostics, modern medicine identifies anemia's underlying cause, often prescribing iron supplements or suggesting dietary changes rich in iron and other nutrients crucial for red blood cell production. Additionally, treatments might include addressing any chronic bleeding sources or conditions contributing to anemia. By rectifying the anemia, modern medicine aids in restoring the body's ability to support healthy hair growth and reduce hair loss associated with this deficiency."
//             )
//           }
//         />
//         <div>
//           <h2>10) Anemia</h2>
//           <p>
//             Importance of Modern Medicine in hair loss & thinning due to Anemia.
//             Modern medicine plays a pivotal role in addressing hair loss and
//             thinning caused by anemia, a condition marked by insufficient red
//             blood cells or low hemoglobin levels. Iron-deficiency anemia, a
//             common form, disrupts oxygen delivery to tissues, including the
//             scalp, affecting hair follicles' health. Through diagnostics, modern
//             medicine identifies anemia's underlying cause, often prescribing
//             iron supplements or suggesting dietary changes rich in iron and
//             other nutrients crucial for red blood cell production. Additionally,
//             treatments might include addressing any chronic bleeding sources or
//             conditions contributing to anemia. By rectifying the anemia, modern
//             medicine aids in restoring the body's ability to support healthy
//             hair growth and reduce hair loss associated with this deficiency.
//           </p>
//         </div>
//       </div>
//       </label>

//      <label className="label4">
//      <div style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}>
//         <input
//           type="checkbox"
//           checked={!!selectedOptions["11) Dandruff"]}
//           onChange={() =>
//             handleCheckboxChange(
//               "11) Dandruff",
//               "Importance of Modern Medicine in treating Dandruff. Modern medicine offers valuable solutions in addressing dandruff, a common scalp condition often caused by fungal overgrowth, inflammation, or excessive oil production. Antifungal shampoos prescribed by healthcare professionals help combat fungal proliferation and reduce flaking. Additionally, anti-fungal and anti-inflammatory lotions and creams can alleviate inflammation, while medicated shampoos aid in exfoliation and reduction in scaling. With its range of specialized treatments targeting various underlying causes, modern medicine significantly assists in managing and alleviating dandruff, enhancing scalp health and reducing associated discomfort."
//             )
//           }
//         />
//         <div>
//           <h2>11) Dandruff</h2>
//           <p>
//             Importance of Modern Medicine in treating Dandruff. Modern medicine
//             offers valuable solutions in addressing dandruff, a common scalp
//             condition often caused by fungal overgrowth, inflammation, or
//             excessive oil production. Antifungal shampoos prescribed by
//             healthcare professionals help combat fungal proliferation and reduce
//             flaking. Additionally, anti-fungal and anti-inflammatory lotions and
//             creams can alleviate inflammation, while medicated shampoos aid in
//             exfoliation and reduction in scaling. With its range of specialized
//             treatments targeting various underlying causes, modern medicine
//             significantly assists in managing and alleviating dandruff,
//             enhancing scalp health and reducing associated discomfort.
//           </p>
//         </div>
//       </div>
//      </label>

//      <label className="label4">
//      <div style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}>
//         <input
//           type="checkbox"
//           checked={!!selectedOptions["12) Grey Hair"]}
//           onChange={() =>
//             handleCheckboxChange(
//               "12) Grey Hair",
//               "Importance of Modern Medicine in treating Grey hair. Modern medicine contributes significantly to understanding and potentially addressing premature graying of hair, a complex process influenced by genetic, environmental, and lifestyle factors. Research explores the underlying mechanisms, focusing on genetic predispositions, oxidative stress, and melanocyte function. While there are limited options to cure gray hair, medications targeting oxidative stress, supplements like catalase, or topical applications containing peptides and antioxidants are useful in slowing down or reversing the graying process. Moreover, advancements in cosmetic treatments offer effective ways to manage and conceal gray hair, enhancing individuals' quality of life. Modern medicine plays a pivotal role in offering means to address premature graying, both in terms of understanding its causes and providing practical remedies."
//             )
//           }
//         />
//         <div>
//           <h2>12) Grey Hair</h2>
//           <p>
//             Importance of Modern Medicine in treating Grey hair. Modern medicine
//             contributes significantly to understanding and potentially addressing
//             premature graying of hair, a complex process influenced by genetic,
//             environmental, and lifestyle factors. Research explores the underlying
//             mechanisms, focusing on genetic predispositions, oxidative stress, and
//             melanocyte function. While there are limited options to cure gray hair,
//             medications targeting oxidative stress, supplements like catalase, or
//             topical applications containing peptides and antioxidants are useful in
//             slowing down or reversing the graying process. Moreover, advancements in
//             cosmetic treatments offer effective ways to manage and conceal gray hair,
//             enhancing individuals' quality of life. Modern medicine plays a pivotal
//             role in offering means to address premature graying, both in terms of
//             understanding its causes and providing practical remedies.
//           </p>
//         </div>
//       </div>
//      </label>

//     <label className="label4">  <div style={{ display: "flex", gap: "1rem" }}>
//         <h2>Other</h2>
//         <input value={inputValue} onChange={handleChangeInput} />
//       </div></label>
//       <div className="test-btnn">
//         <button onClick={prevStep}>Prev</button>
//         <button onClick={nextStep}>Next</button>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';

export default function Test4({selectedOption,setSelectedOption}) {

  const options = [
    {
      value: 'Good Lifestyle condition',
      src: '/lifestyle/8.png',
      description: 'While your current lifestyle habits are commendable, embracing our general guidelines will further enhance your journey towards better hair growth.'
    },
    {
      value: 'Good Lifestyle condition but needs improvement',
      src: '/lifestyle/9.png',
      description: 'By incorporating the suggested advice, you can enhance your nutritional habits to sustain hair quality, safeguard against damage, and preserve the vitality of your hair.'
    },
    {
      value: 'Unhealthy Lifestyle and needs improvement',
      src: '/lifestyle/7.png',
      description: 'By integrating the recommended guidance, you can refine your nutritional habits to uphold the quality of your hair, shield it from harm, and maintain its liveliness.'
    }
  ];

  const handleChange = (event, index) => {
    const selectedValue = event.target.value;
    const selectedOption = options[index];
    setSelectedOption(selectedOption);
  };
console.log(selectedOption,"tinda")
  return (
    <>
      <h1 className='tab-3 diag'>4) Lifestyle Assessment</h1>
      <h1>Conclusion:</h1>
      {options.map((option, index) => (
        <div key={index} className='div-check'>
          <input
            type="checkbox"
            name="lifestyleAssessment"
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
