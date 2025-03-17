// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import DoctorPrescribe from './DoctorPrescribe'; // Adjust the import path as needed

// Modal.setAppElement('#root');

//   const kits = [
//     {
//       id: 'A',
//       title: 'Advance Hair Revive Kit – Regular – Male',
//       details: `1) Tab. Hairetin M
//   2) Tab. Finsure
//   3) MNX 10% Solution
//   4) Rentop Serum
//   5) Refonte Shampoo`,
//     },
//     {
//       id: 'B',
//       title: 'Advance Hair Revive Kit – Premium – Male',
//       details: `1) Tab. Hair RG
//   2) Tab. Finsure
//   3) MNX 10% Solution
//   4) Rentop Serum
//   5) Refonte Shampoo
//   6) Tab. Hairetin M
//   7) Trachnil Sachet Men`,
//     },
//     {
//       id: 'C',
//       title: 'Advance Hair Revive Kit – Regular – Female',
//       details: `1) Tab. Hairetin F
//   2) Miloxir 5 Pro 5
//   3) Rentop Serum
//   4) Refonte Shampoo
//   5) Tab. Ferrigain Z`,
//     },
//     {
//       id: 'D',
//       title: 'Advance Hair Revive Kit – Premium – Female',
//       details: `1) Tab. Hair RG
//   2) Miloxir 5 Pro 5
//   3) Rentop Serum
//   4) Refonte Shampoo
//   5) Tab. Hairetin M
//   6) Tab. Ferrigain Z
//   7) Nutrasav Sachet (EVA)`,
//     },
//     {
//       id: 'E',
//       title: 'Advanced Grey Hair Remedy Kit',
//       details: `1) Grey X Solution
//   2) Tab. Kera Black
//   3) Tab. Hairecap`,
//     },
//     {
//       id: 'F',
//       title: 'Ultimate Dandruff Care Kit',
//       details: `1) Hairecap Tab
//   2) Saldan Shampoo
//   3) Zydip Lotion`,
//     },
//     {
//       id: 'G',
//       title: 'Alopecia Areata Remedy Kit',
//       details: `1) Tcitib Gel
//   2) Zydip Lotion
//   3) Mintop 5 %`,
//     },
//     {
//       id: 'H',
//       title: 'PCOD- Medicine',
//       details: `1) XX`,
//     },
//     {
//       id: 'I',
//       title: 'Anaemia – Medicine',
//       details: `1) XX`,
//     },
//     {
//       id: 'J',
//       title: 'Thyroid – Medicine',
//       details: `1) XX`,
//     },
//     {
//       id: 'K',
//       title: 'Hereditary – Medicine',
//       details: `1) XX`,
//     },
//   ];

// export default function Test6({ selectedOptions, setSelectedOptions, selectedTests, setSelectedTests }) {
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [currentKit, setCurrentKit] = useState(null);
//   const [prescriptions, setPrescriptions] = useState({});

//   const openModal = (kit) => {
//     setCurrentKit(kit);
//     setModalIsOpen(true);
//   };
// console.log(selectedOptions,"testing")
//   const closeModal = () => {
//     setModalIsOpen(false);
//     setCurrentKit(null);
//     setPrescriptions({});
//   };

//   const handleCheckboxChange = (kit, details) => {
//     setSelectedOptions((prev) => ({
//       ...prev,
//       medicine: { title: kit, details },
//     }));
//     openModal({ title: kit, details });
//   };

//   const savePrescription = () => {
//     setSelectedOptions((prev) => ({
//       ...prev,
//       medicines: [
//         {
//           kit: currentKit.title,
//           medicines: prescriptions,
//         },
//       ],
//     }));
//     closeModal();
//   };

//   const handleMainCheckboxChange = (test) => {
//     setSelectedTests((prev) => {
//       const updatedMainTests = prev.mainTests.includes(test)
//         ? prev.mainTests.filter((item) => item !== test)
//         : [...prev.mainTests, test];

//       return {
//         ...prev,
//         mainTests: updatedMainTests
//       };
//     });
//   };

//   const handleSubCheckboxChange = (mainTest, subTest) => {
//     setSelectedTests((prev) => {
//       const updatedSubTests = prev.subTests[mainTest].includes(subTest)
//         ? {
//             ...prev.subTests,
//             [mainTest]: prev.subTests[mainTest].filter((item) => item !== subTest),
//           }
//         : {
//             ...prev.subTests,
//             [mainTest]: [...prev.subTests[mainTest], subTest],
//           };

//       return {
//         ...prev,
//         subTests: updatedSubTests,
//       };
//     });
//   };

//     const tests = [
//     "CBC",
//     "HBA1C",
//     "LFT",
//     "KFT",
//     "Lipid Profile",
//     "T3",
//     "T4",
//     "TSH",
//     "S. Ferritin",
//     "S. Vit D3",
//     "S. Vit B12",
//     "HIV",
//     "HBsAG",
//     "Scalp Biopsy",
//     "Fasting Insulin",
//     "S. Prolactin",
//     "LH",
//     "FSH",
//     "DHEAS",
//     "S. Testosterone",
//     "Estrogen",
//     "USG Pelvis",
//   ];

//   const bloodSugarSubTests = ['F', 'PP', 'Random'];

//   return (
//     <>
//       <h2 className="diag1">Medicines</h2>
//       <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#90ff90', padding: '1rem' }}>
//         {kits.map((kit) => (
//           <div key={kit.id} style={{ display: 'flex', width: '50%', gap: '1rem', alignItems: 'baseline', border: '1px solid black' }}>
//             <label style={{ display: 'flex', gap: '1rem', alignItems: 'baseline', cursor: 'pointer' }}>
//               <input
//                 type="checkbox"
//                 checked={selectedOptions.medicine && selectedOptions.medicine.title === kit.title}
//                 onChange={() => handleCheckboxChange(kit.title, kit.details)}
//               />
//               <div>
//                 <h2>{kit.id}) {kit.title}</h2>
//                 <div>{kit.details.split('\n').map((line, index) => <p key={index}>{line}</p>)}</div>
//               </div>
//             </label>
//           </div>
//         ))}
//       </div>
//       <h2 className="diag1">Blood Tests</h2>
//       <div style={{ display: 'flex', flexWrap: 'wrap', padding: '1rem', backgroundColor: 'yellow' }}>
//         {tests.map((test) => (
//           <div key={test} style={{ width: '33%' }}>
//             <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '.5rem', fontSize: '1rem', marginTop: '1rem' }}>
//               <input
//                 type="checkbox"
//                 checked={selectedTests.mainTests.includes(test)}
//                 onChange={() => handleMainCheckboxChange(test)}
//               />
//               <span>{test}</span>
//             </label>
//           </div>
//         ))}
//         <label style={{ display: 'flex', marginRight: '1.7%', alignItems: 'center', cursor: 'pointer', gap: '.5rem', fontSize: '1rem', marginTop: '1rem' }}>
//           <span>Other</span>
//           <input type="text" />
//         </label>
//         <div style={{ width: '33%' }}>
//           <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '.5rem', fontSize: '1rem', marginTop: '1rem' }}>
//             <input
//               type="checkbox"
//               checked={selectedTests.mainTests.includes('Blood Sugar')}
//               onChange={() => handleMainCheckboxChange('Blood Sugar')}
//             />
//             <span>Blood Sugar</span>
//           </label>
//           {selectedTests.mainTests.includes('Blood Sugar') && (
//             <div className="sub-input-med" style={{ paddingLeft: '20px' }}>
//               {bloodSugarSubTests.map((subTest) => (
//                 <div key={subTest} className="input-med">
//                   <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '.5rem', fontSize: '1rem', marginTop: '1rem' }}>
//                     <input
//                       type="checkbox"
//                       checked={selectedTests.subTests['Blood Sugar'].includes(subTest)}
//                       onChange={() => handleSubCheckboxChange('Blood Sugar', subTest)}
//                     />
//                     <span>{subTest}</span>
//                   </label>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         contentLabel="Prescribe Medicine"
//         style={{
//           content: {
//             top: '50%',
//             left: '50%',
//             right: 'auto',
//             bottom: 'auto',
//             marginRight: '-50%',
//             transform: 'translate(-50%, -50%)',
//           },
//         }}
//       >
//         {currentKit && (
//           <>
//             {/* <h2>Prescribe Medicines for {currentKit.title}</h2> */}
//             <h2>Instructions</h2>
//             <DoctorPrescribe
//               medicines={currentKit.details.split('\n').map((medicine) => medicine.split(') ')[1])}
//               prescriptions={prescriptions}
//               setPrescriptions={setPrescriptions}
//             />
//             <button onClick={savePrescription}>Submit Prescription</button>
//             <button onClick={closeModal}>Close</button>
//           </>
//         )}
//       </Modal>
//     </>
//   );
// }
// import React, { useState, useEffect } from 'react';
// import DoctorPrescribe from './DoctorPrescribe'; // Adjust the import path as needed

//   const kits = [
//     {
//       id: 'A',
//       title: 'Advance Hair Revive Kit – Regular – Male',
//       details: `1) Tab. Hairetin M
//   2) Tab. Finsure
//   3) MNX 10% Solution
//   4) Rentop Serum
//   5) Refonte Shampoo`,
//     },
//     {
//       id: 'B',
//       title: 'Advance Hair Revive Kit – Premium – Male',
//       details: `1) Tab. Hair RG
//   2) Tab. Finsure
//   3) MNX 10% Solution
//   4) Rentop Serum
//   5) Refonte Shampoo
//   6) Tab. Hairetin M
//   7) Trachnil Sachet Men`,
//     },
//     {
//       id: 'C',
//       title: 'Advance Hair Revive Kit – Regular – Female',
//       details: `1) Tab. Hairetin F
//   2) Miloxir 5 Pro 5
//   3) Rentop Serum
//   4) Refonte Shampoo
//   5) Tab. Ferrigain Z`,
//     },
//     {
//       id: 'D',
//       title: 'Advance Hair Revive Kit – Premium – Female',
//       details: `1) Tab. Hair RG
//   2) Miloxir 5 Pro 5
//   3) Rentop Serum
//   4) Refonte Shampoo
//   5) Tab. Hairetin M
//   6) Tab. Ferrigain Z
//   7) Nutrasav Sachet (EVA)`,
//     },
//     {
//       id: 'E',
//       title: 'Advanced Grey Hair Remedy Kit',
//       details: `1) Grey X Solution
//   2) Tab. Kera Black
//   3) Tab. Hairecap`,
//     },
//     {
//       id: 'F',
//       title: 'Ultimate Dandruff Care Kit',
//       details: `1) Hairecap Tab
//   2) Saldan Shampoo
//   3) Zydip Lotion`,
//     },
//     {
//       id: 'G',
//       title: 'Alopecia Areata Remedy Kit',
//       details: `1) Tcitib Gel
//   2) Zydip Lotion
//   3) Mintop 5 %`,
//     },
//     {
//       id: 'H',
//       title: 'PCOD- Medicine',
//       details: `1) XX`,
//     },
//     {
//       id: 'I',
//       title: 'Anaemia – Medicine',
//       details: `1) XX`,
//     },
//     {
//       id: 'J',
//       title: 'Thyroid – Medicine',
//       details: `1) XX`,
//     },
//     {
//       id: 'K',
//       title: 'Hereditary – Medicine',
//       details: `1) XX`,
//     },
//   ];

// export default function Test6({ selectedOptions, setSelectedOptions, selectedTests, setSelectedTests }) {
//   const [currentKit, setCurrentKit] = useState(null);
//   const [prescriptions, setPrescriptions] = useState({});

//   useEffect(() => {
//     if (currentKit) {
//       const defaultValues = {
//         route: 'Oral',
//         dosage: '',
//         frequency: 'Daily at night',
//         when: 'Before food',
//         duration: '45 Days',
//         instructions: ''
//       };

//       const medicines = currentKit.details.split('\n').map((medicine) => medicine.split(') ')[1]);
//       const initialPrescriptions = medicines.reduce((acc, medicine) => {
//         acc[medicine] = defaultValues;
//         return acc;
//       }, {});

//       setPrescriptions(initialPrescriptions);
//     }
//   }, [currentKit]);

//   const handleCheckboxChange = (kit) => {
//     setCurrentKit(kit);
//     setSelectedOptions((prev) => ({
//       ...prev,
//       medicine: { title: kit.title, details: kit.details },
//     }));
//   };

//   const savePrescription = () => {
//     setSelectedOptions((prev) => ({
//       ...prev,
//       medicines: [
//         {
//           kit: currentKit.title,
//           medicines: prescriptions,
//         },
//       ],
//     }));
//     setCurrentKit(null);
//   };

//   const handleMainCheckboxChange = (test) => {
//     setSelectedTests((prev) => {
//       const updatedMainTests = prev.mainTests.includes(test)
//         ? prev.mainTests.filter((item) => item !== test)
//         : [...prev.mainTests, test];

//       return {
//         ...prev,
//         mainTests: updatedMainTests
//       };
//     });
//   };

//   const handleSubCheckboxChange = (mainTest, subTest) => {
//     setSelectedTests((prev) => {
//       const updatedSubTests = prev.subTests[mainTest].includes(subTest)
//         ? {
//             ...prev.subTests,
//             [mainTest]: prev.subTests[mainTest].filter((item) => item !== subTest),
//           }
//         : {
//             ...prev.subTests,
//             [mainTest]: [...prev.subTests[mainTest], subTest],
//           };

//       return {
//         ...prev,
//         subTests: updatedSubTests,
//       };
//     });
//   };

//     const tests = [
//     "CBC",
//     "HBA1C",
//     "LFT",
//     "KFT",
//     "Lipid Profile",
//     "T3",
//     "T4",
//     "TSH",
//     "S. Ferritin",
//     "S. Vit D3",
//     "S. Vit B12",
//     "HIV",
//     "HBsAG",
//     "Scalp Biopsy",
//     "Fasting Insulin",
//     "S. Prolactin",
//     "LH",
//     "FSH",
//     "DHEAS",
//     "S. Testosterone",
//     "Estrogen",
//     "USG Pelvis",
//   ];

//   const bloodSugarSubTests = ['F', 'PP', 'Random'];

//   return (
//     <>
//       <h2 className="diag1">Medicines</h2>
//       <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#90ff90', padding: '1rem' }}>
//         {kits.map((kit) => (
//           <div key={kit.id} style={{ display: 'flex', width: '50%', gap: '1rem', alignItems: 'baseline', border: '1px solid black' }}>
//             <label style={{ display: 'flex', gap: '1rem', alignItems: 'baseline', cursor: 'pointer' }}>
//               <input
//                 type="checkbox"
//                 checked={selectedOptions.medicine && selectedOptions.medicine.title === kit.title}
//                 onChange={() => handleCheckboxChange(kit)}
//               />
//               <div>
//                 <h2>{kit.id}) {kit.title}</h2>
//                 <div>{kit.details.split('\n').map((line, index) => <p key={index}>{line}</p>)}</div>
//               </div>
//             </label>
//           </div>
//         ))}
//       </div>
//       {currentKit && (
//         <div>
//           <h2>Instructions</h2>
//           <DoctorPrescribe
//             medicines={currentKit.details.split('\n').map((medicine) => medicine.split(') ')[1])}
//             prescriptions={prescriptions}
//             setPrescriptions={setPrescriptions}
//           />
//           <button className='instruct-save' onClick={savePrescription}>Submit Instructions</button>
//         </div>
//       )}
//       <h2 className="diag1">Blood Tests</h2>
//       <div style={{ display: 'flex', flexWrap: 'wrap', padding: '1rem', backgroundColor: 'yellow' }}>
//         {tests.map((test) => (
//           <div key={test} style={{ width: '33%' }}>
//             <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '.5rem', fontSize: '1rem', marginTop: '1rem' }}>
//               <input
//                 type="checkbox"
//                 checked={selectedTests.mainTests.includes(test)}
//                 onChange={() => handleMainCheckboxChange(test)}
//               />
//               <span>{test}</span>
//             </label>
//           </div>
//         ))}
//         <label style={{ display: 'flex', marginRight: '1.7%', alignItems: 'center', cursor: 'pointer', gap: '.5rem', fontSize: '1rem', marginTop: '1rem' }}>
//           <span>Other</span>
//           <input type="text" />
//         </label>
//         <div style={{ width: '33%' }}>
//           <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '.5rem', fontSize: '1rem', marginTop: '1rem' }}>
//             <input
//               type="checkbox"
//               checked={selectedTests.mainTests.includes('Blood Sugar')}
//               onChange={() => handleMainCheckboxChange('Blood Sugar')}
//             />
//             <span>Blood Sugar</span>
//           </label>
//           {selectedTests.mainTests.includes('Blood Sugar') && (
//             <div className="sub-input-med" style={{ paddingLeft: '20px' }}>
//               {bloodSugarSubTests.map((subTest) => (
//                 <div key={subTest} className="input-med">
//                   <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '.5rem', fontSize: '1rem', marginTop: '1rem' }}>
//                     <input
//                       type="checkbox"
//                       checked={selectedTests.subTests['Blood Sugar'].includes(subTest)}
//                       onChange={() => handleSubCheckboxChange('Blood Sugar', subTest)}
//                     />
//                     <span>{subTest}</span>
//                   </label>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import DoctorPrescribe from './DoctorPrescribe'; // Adjust the import path as needed

// const kits = [
//   {
//     id: 'A',
//     title: 'Advance Hair Revive Kit – Regular – Male',
//     details: `1) Tab. Hairetin M
// 2) Tab. Finsure
// 3) MNX 10% Solution
// 4) Refonte Shampoo`,
//   },
//   {
//     id: 'B',
//     title: 'Advance Hair Revive Kit – Premium – Male',
//     details: `1) Tab. Hair RG
// 2) Tab. Finsure
// 3) Miloxir 10 Pro F
// 4) Keraleo Max Serum
// 5) Refonte Shampoo
// 6) Trachnil Sachet Male`,
//   },
//   {
//     id: 'C',
//     title: 'Advance Hair Revive Kit – Regular – Female',
//     details: `1) Tab. Hairetin F
// 2) Tab. Ferrigain Z
// 3) Miloxir 5 Pro 5
// 4) Refonte Shampoo
// 5) Nutrasav Sachets (EVA)`,
//   },
//   {
//     id: 'D',
//     title: 'Advance Hair Revive Kit – Premium – Female',
//     details: `1) Tab. Hair RG
// 2) Tab. Ferrigain Z
// 3) Miloxir 5 Pro 5
// 4) Rentop Serum
// 5) Refonte Shampoo
// 6) Nutrasav Sachets (EVA)
// 7) Aldactone Tablet`,
//   },
//   {
//     id: 'E',
//     title: 'Advanced Grey Hair Remedy Kit',
//     details: `1) Grey X Solution
// 2) Tab. Kera Black
// 3) Refonte Shampoo`,
//   },
//   {
//     id: 'F',
//     title: 'Ultimate Dandruff Care Kit',
//     details: `1) Hairecap Tab.
// 2) Saldan Shampoo
// 3) Zydip Lotion
// 4) Tab. Flucose 150 mg`,
//   },
//   {
//     id: 'G',
//     title: 'Alopecia Areata Remedy Kit',
//     details: `1) Tcitib Gel
// 2) Zydip Lotion
// 3) Follicos 5%`,
//   },
//   {
//     id: 'H',
//     title: 'PCOD- Medicine',
//     details: `1) XX
//     2) XX`,
//   },
//   {
//     id: 'I',
//     title: 'Anaemia – Medicine',
//     details: `1) XX
//     2) XX`,
//   },
//   {
//     id: 'J',
//     title: 'Thyroid – Medicine',
//     details: `1) XX
//     2) XX`,
//   },
//   {
//     id: 'K',
//     title: 'Hereditary – Medicine',
//     details: `1) XX
//     2) XX`,
//   },
//   {
//     id: 'L',
//     title: 'Tab. Hairetin M',
//     details: `1) Tab. Hairetin M`,
//   },
//   {
//     id: 'M',
//     title: 'Tab. Finsure',
//     details: `1) Tab. Finsure`,
//   },
//   {
//     id: 'N',
//     title: 'Minoxidil Topical Solution 10%',
//     details: `1) Minoxidil Topical Solution 10%`,
//   },
//   {
//     id: 'O',
//     title: 'Refonte Shampoo',
//     details: `1) Refonte Shampoo`,
//   },
//   {
//     id: 'P',
//     title: 'Tab. Hair RG Male',
//     details: `1) Tab. Hair RG Male`,
//   },
//   {
//     id: 'Q',
//     title: 'Miloxir 10 Pro F',
//     details: `1) Miloxir 10 Pro F`,
//   },
//   {
//     id: 'R',
//     title: 'Keraleo Max Serum',
//     details: `1) Keraleo Max Serum`,
//   },
//   {
//     id: 'S',
//     title: 'Trachnil Sachet Male',
//     details: `1) Trachnil Sachet Male`,
//   },
//   {
//     id: 'T',
//     title: 'Tab. Hairetin F',
//     details: `1) Tab. Hairetin F`,
//   },
//   {
//     id: 'U',
//     title: 'Tab. Ferrigain Z',
//     details: `1) Tab. Ferrigain Z`,
//   },
//   {
//     id: 'V',
//     title: 'Miloxir 5 Pro F',
//     details: `1) Miloxir 5 Pro F`,
//   },
//   {
//     id: 'W',
//     title: 'Nutrasav Sachets (EVA)',
//     details: `1) Nutrasav Sachets (EVA)`,
//   },
//   {
//     id: 'X',
//     title: 'Rentop Hair ReGrowth Serum',
//     details: `1) Rentop Hair ReGrowth Serum`,
//   },
//   {
//     id: 'Y',
//     title: 'Aldactone Tablet',
//     details: `1) Aldactone Tablet`,
//   },
//   {
//     id: 'Z',
//     title: 'Grey Ex Solution',
//     details: `1) Grey Ex Solution`,
//   },
//   {
//     id: 'AA',
//     title: 'Tab. Kera Black',
//     details: `1) Tab. Kera Black`,
//   },
//   {
//     id: 'AB',
//     title: 'Hairecap Tab.',
//     details: `1) Hairecap Tab.`,
//   },
//   {
//     id: 'AC',
//     title: 'Saldan Shampoo',
//     details: `1) Saldan Shampoo`,
//   },
//   {
//     id: 'AD',
//     title: 'Zydip Lotion',
//     details: `1) Zydip Lotion`,
//   },
//   {
//     id: 'AE',
//     title: 'Tab. Flucose 150 mg',
//     details: `1) Tab. Flucose 150 mg`,
//   },
//   {
//     id: 'AF',
//     title: 'Tcitib Gel',
//     details: `1) Tcitib Gel`,
//   },
//   {
//     id: 'AG',
//     title: 'Follicos 5%',
//     details: `1) Follicos 5%`,
//   },
//   {
//     id: 'AH',
//     title: 'Tab. Hair RG Female',
//     details: `1) Tab. Hair RG Female`,
//   },
// ];

// export default function Test6({ selectedOptions, setSelectedOptions, selectedTests, setSelectedTests }) {
//   const [currentKits, setCurrentKits] = useState([]);
//   const [prescriptions, setPrescriptions] = useState({});
//   const [newMedicine, setNewMedicine] = useState('');
//   const [addedMedicines, setAddedMedicines] = useState([]);

//   useEffect(() => {
//     const defaultValues = {
//       route: 'Oral',
//       dosage: '',
//       frequency: 'Daily at night',
//       when: 'Before food',
//       duration: '45 Days',
//       instructions: ''
//     };

//     const allMedicines = currentKits
//       .flatMap(kit => kit.details.split('\n').map(medicine => medicine.split(') ')[1]))
//       .concat(addedMedicines);

//     const initialPrescriptions = allMedicines.reduce((acc, medicine) => {
//       acc[medicine] = acc[medicine] || defaultValues;
//       return acc;
//     }, { ...prescriptions });

//     setPrescriptions(initialPrescriptions);
//   }, [currentKits, addedMedicines]);
//   console.log(addedMedicines,"fsfsfs")
//   const handleCheckboxChange = (kit) => {
//     setCurrentKits(prev => prev.some(selectedKit => selectedKit.id === kit.id)
//       ? prev.filter(selectedKit => selectedKit.id !== kit.id)
//       : [...prev, kit]);
//   };

//   const savePrescription = () => {
//     setSelectedOptions(prev => ({
//       ...prev,
//       medicines: currentKits.map(kit => ({
//         kit: kit.title,
//         medicines: prescriptions,
//       })),
//     }));
//   };

//   const handleMainCheckboxChange = (test) => {
//     setSelectedTests(prev => {
//       const updatedMainTests = prev.mainTests.includes(test)
//         ? prev.mainTests.filter(item => item !== test)
//         : [...prev.mainTests, test];

//       return {
//         ...prev,
//         mainTests: updatedMainTests
//       };
//     });
//   };

//   const handleSubCheckboxChange = (mainTest, subTest) => {
//     setSelectedTests(prev => {
//       const updatedSubTests = prev.subTests[mainTest].includes(subTest)
//         ? {
//             ...prev.subTests,
//             [mainTest]: prev.subTests[mainTest].filter(item => item !== subTest),
//           }
//         : {
//             ...prev.subTests,
//             [mainTest]: [...prev.subTests[mainTest], subTest],
//           };

//       return {
//         ...prev,
//         subTests: updatedSubTests,
//       };
//     });
//   };

//   const handleAddMedicine = () => {
//     if (newMedicine.trim()) {
//       setAddedMedicines(prev => [...prev, newMedicine.trim()]);
//       setNewMedicine('');
//     }
//   };

//   const tests = [
//     "CBC",
//     "HBA1C",
//     "LFT",
//     "KFT",
//     "Lipid Profile",
//     "T3",
//     "T4",
//     "TSH",
//     "S. Ferritin",
//     "S. Iron",
//     "S. Folate",
//     "S. Vit B12",
//     "S. Vit D3",
//     "Blood Sugar"
//   ];

//   const bloodSugarSubTests = ['F', 'PP', 'Random'];

//   return (
//     <>
//       <h2 className="diag1">Medicines</h2>
//       <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#90ff90', padding: '1rem' }}>
//         {kits.map((kit) => (
//           <div key={kit.id} style={{ display: 'flex', width: '50%', gap: '1rem', alignItems: 'baseline', border: '1px solid black' }}>
//             <label style={{ display: 'flex', gap: '1rem', alignItems: 'baseline', cursor: 'pointer' }}>
//               <input
//                 type="checkbox"
//                 checked={currentKits.some(selectedKit => selectedKit.id === kit.id)}
//                 onChange={() => handleCheckboxChange(kit)}
//               />
//               <div>
//                 {kit.details.split('\n').length > 1 ? <h2>{kit.id}) {kit.title}</h2> : <h2></h2>}
//                 <div>{kit.details.split('\n').map((line, index) => <p key={index}>{line}</p>)}</div>
//               </div>
//             </label>
//           </div>
//         ))}
//       </div>
//       {currentKits.length > 0 && (
//         <div>
//           <h2>Instructions</h2>
//           <DoctorPrescribe
//             medicines={currentKits.flatMap(kit => kit.details.split('\n').map(medicine => medicine.split(') ')[1])).concat(addedMedicines)}
//             prescriptions={prescriptions}
//             setPrescriptions={setPrescriptions}
//           />
//           <input
//             type="text"
//             value={newMedicine}
//             onChange={(e) => setNewMedicine(e.target.value)}
//             placeholder="Add new medicine"
//           />
//           <button onClick={handleAddMedicine}>Add</button>
//           <button className='instruct-save' onClick={savePrescription}>Submit Instructions</button>
//         </div>
//       )}
//       <h2 className="diag1">Blood Tests</h2>
//       <div style={{ display: 'flex', flexWrap: 'wrap', padding: '1rem', backgroundColor: 'yellow' }}>
//         {tests.map((test) => (
//           <div key={test} style={{ width: '33%' }}>
//             <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '.5rem', fontSize: '1rem', marginTop: '1rem' }}>
//               <input
//                 type="checkbox"
//                 checked={selectedTests.mainTests.includes(test)}
//                 onChange={() => handleMainCheckboxChange(test)}
//               />
//               <span>{test}</span>
//             </label>
//           </div>
//         ))}
//         <label style={{ display: 'flex', marginRight: '1.7%', alignItems: 'center', cursor: 'pointer', gap: '.5rem', fontSize: '1rem', marginTop: '1rem' }}>
//           <span>Other</span>
//           <input type="text" />
//         </label>
//         <div style={{ width: '33%' }}>
//           <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '.5rem', fontSize: '1rem', marginTop: '1rem' }}>
//             <input
//               type="checkbox"
//               checked={selectedTests.mainTests.includes('Blood Sugar')}
//               onChange={() => handleMainCheckboxChange('Blood Sugar')}
//             />
//             <span>Blood Sugar</span>
//           </label>
//           {selectedTests.mainTests.includes('Blood Sugar') && (
//             <div className="sub-input-med" style={{ paddingLeft: '20px' }}>
//               {bloodSugarSubTests.map((subTest) => (
//                 <div key={subTest} className="input-med">
//                   <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '.5rem', fontSize: '1rem', marginTop: '1rem' }}>
//                     <input
//                       type="checkbox"
//                       checked={selectedTests.subTests['Blood Sugar'].includes(subTest)}
//                       onChange={() => handleSubCheckboxChange('Blood Sugar', subTest)}
//                     />
//                     <span>{subTest}</span>
//                   </label>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import DoctorPrescribe from "./DoctorPrescribe"; // Adjust the import path as needed
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductAsync } from "../../products/productSlice";
import BASE_URL from "../../../Config";
import { toast } from "react-toastify";

let kits = [
  {
    _id: "668c64a666655468f5b81771",
    name: "Jj",
    price: 344,
    description: "description",
    kit: [],
    src: [
      "https://res.cloudinary.com/drkpwvnun/image/upload/v1720732501/hair-assessment/apqmltj5ixnbgxsjxm0q.jpg",
    ],
    __v: 1,
    userReview: [],
  },
  {
    _id: "668cd29666655468f5b8178e",
    name: "ne med",
    price: 45,
    description: "hksjko",
    kit: [],
    src: [
      "https://res.cloudinary.com/drkpwvnun/image/upload/v1720504980/hair-assessment/lknibvme4r6jkikgx0mh.jpg",
    ],
    __v: 1,
    longDes: "<p><strong>hh</strong></p>",
    userReview: [],
  },
  {
    userReview: [],
    _id: "668cf10f66655468f5b817d3",
    name: "Bhim",
    price: 50,
    description: "Bbbb",
    kit: [],
    src: [
      "https://res.cloudinary.com/drkpwvnun/image/upload/v1720512777/hair-assessment/bofe8g0l2gct12kzmx9f.jpg",
    ],
    __v: 0,
  },
  {
    userReview: [],
    _id: "668cf11866655468f5b817db",
    name: "Bhim",
    price: 50,
    description: "Bbbb",
    kit: [],
    src: [
      "https://res.cloudinary.com/drkpwvnun/image/upload/v1720512791/hair-assessment/ci3yi9m4rpojzjtjms58.jpg",
    ],
    __v: 0,
  },
  {
    userReview: [],
    _id: "668cf22a66655468f5b817ec",
    name: "Ddd",
    price: 222,
    description: "Dfd",
    kit: [],
    src: [
      "https://res.cloudinary.com/drkpwvnun/image/upload/v1720513066/hair-assessment/zc7156jjewzwir5uwvl2.jpg",
    ],
    __v: 0,
  },
  {
    userReview: [],
    _id: "668e7b802f9340b4889333c9",
    name: "TEST",
    price: 500,
    description:
      "Testing Testing Testing Testing Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing Testing",
    kit: [],
    src: [
      "https://res.cloudinary.com/drkpwvnun/image/upload/v1720613760/hair-assessment/ifd31l4fcsstwucph70d.webp",
    ],
    __v: 0,
  },
  {
    userReview: [],
    _id: "668e7b912f9340b4889333d0",
    name: "TEST",
    price: 500,
    description:
      "Testing Testing Testing Testing Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing Testing",
    kit: [],
    src: [
      "https://res.cloudinary.com/drkpwvnun/image/upload/v1720613776/hair-assessment/npufquba6s8y8ya6hflu.webp",
    ],
    __v: 0,
  },
  {
    userReview: [],
    _id: "668e7b912f9340b4889333d8",
    name: "TEST",
    price: 500,
    description:
      "Testing Testing Testing Testing Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing Testing",
    kit: [],
    src: [
      "https://res.cloudinary.com/drkpwvnun/image/upload/v1720613776/hair-assessment/ybkjnapiobjgtbdwpyhs.webp",
    ],
    __v: 0,
  },
  {
    userReview: [],
    _id: "668e7b922f9340b4889333e1",
    name: "TEST",
    price: 500,
    description:
      "Testing Testing Testing Testing Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing Testing",
    kit: [],
    src: [
      "https://res.cloudinary.com/drkpwvnun/image/upload/v1720613778/hair-assessment/k7nf7apmiqap6bpvhyld.webp",
    ],
    __v: 0,
  },
  {
    userReview: [],
    _id: "668e7b942f9340b4889333eb",
    name: "TEST",
    price: 500,
    description:
      "Testing Testing Testing Testing Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing TestingTesting Testing Testing",
    kit: [],
    src: [
      "https://res.cloudinary.com/drkpwvnun/image/upload/v1720613780/hair-assessment/td1ikkjf7a6nb5f4nygn.webp",
    ],
    __v: 0,
  },
  {
    _id: "668e7bd22f9340b488933400",
    name: "Bh12",
    price: 500,
    description:
      "Product Description: TaB Hairetin is a nutritional supplement used to provide vital nutrients for healthy hair, skin and nails. It contains various vitamins, minerals, amino acids, and plant extracts as active ingredients which are essential for the growth and maintenance of healthy hair.\nBENEFITS \n•\tEnhances the tensile strength of hair.\n•\tPromotes the stimulation of hair follicles.\n•\tProvides nourishment to hair.\n•\tBoosts the production of keratin for stronger hair.\n•\tPlays a vital role to increase hair volume.\n•\tHelps to regulate overall hair health.\nDosage & Repetition: Follow the usage instructions provided by Hairsncares Specialist\nSIDE EFFECTS\nConsult your doctor if you experience any unusual side effects.\nSafety Information:\n•\tCarefully read the label before using the product.\n•\tKeep out of the reach of children.\n•\tStore in a cool and dry place, away from direct light.\nKEY COMPOSITION\nFenugreek 50mg, Pine bark 10mg, Melatonin 570mg, DHT BLOCKER BLEND 570MG, Beta Sitosterol 200MG, Pumpkin Seed Extract 100, Quercetin 10MG, EGCG (Epigallocatechin 3 Gallate) 50MG, Rosemarry Extract 100MG, Proanthocynadins 30MG, Stinging Nettle 50MG, Tomato Extract 30MG, Biotin (% RDA 100) 30MG, L Arginine 250MG, Inositol 50MG, Gamma Linolenic Acid 30MG, Ferrous Fumarate (% RDA 97.05)50MG, Calcium Pantothenate (%RDA 100)100MG, Grape Seed Extract 100MG, C-CYSTEINE 250MG, VITAMIN B12 100MCG\n",
    kit: [],
    src: [
      "https://res.cloudinary.com/drkpwvnun/image/upload/v1720613841/hair-assessment/ew1qfzphmylsirfdo1vt.jpg",
    ],
    __v: 1,
    longDes: "<ol><li>Bbnn</li></ol>",
    userReview: [],
    discount: "50",
  },
  {
    userReview: [],
    _id: "6690604b4bca31fd97eaa415",
    name: "name",
    price: 23,
    description: "jhkihk",
    kit: [],
    src: ["imageData.imageUrl"],
    __v: 0,
  },
  {
    userReview: [],
    _id: "66910f8c4bca31fd97eb2abc",
    name: "hii",
    price: 443,
    description: "ffsfsf",
    kit: [],
    src: [
      "https://res.cloudinary.com/drkpwvnun/image/upload/v1720782731/hair-assessment/ftwtputhibkty0tdsert.png",
    ],
    __v: 0,
  },
  {
    _id: "6694ee880f6e81b9d30ac4ad",
    name: "Vb",
    price: 100,
    description: "Ttg",
    kit: [],
    src: [
      "https://res.cloudinary.com/drkpwvnun/image/upload/v1721036423/hair-assessment/tbjq8fjuth8kcqebjzqf.jpg",
    ],
    longDes: "<p>Gh</p>",
    stock: "88",
    userReview: [],
    discount: "50",
    __v: 0,
  },
  {
    _id: "6694efbf0f6e81b9d30ac4bc",
    name: "Bh19",
    price: 16,
    description: "Av",
    kit: ["TEST22", "Bhim33", "Vb33"],
    src: [
      "https://res.cloudinary.com/drkpwvnun/image/upload/v1721036734/hair-assessment/wxbapwezlcxaujebai0c.jpg",
    ],
    longDes: "<p>Wj</p>",
    stock: "16",
    userReview: [],
    discount: "",
    __v: 0,
  },
];

export default function Test6({ selectedOptions, setSelectedOptions, selectedTests, setSelectedTests }) {
  const [currentKits, setCurrentKits] = useState([]);
  const [prescriptions, setPrescriptions] = useState({});
  const [newMedicine, setNewMedicine] = useState('');
  const [addedMedicines, setAddedMedicines] = useState([]);
  const [kitItems, setKitItems] = useState([]);


  useEffect(() => {
    const defaultValues = {
      route: 'Oral',
      subCategory:"Tablets",
      quantity:"1",
      dosage: '',
      frequency: 'Daily at night',
      when: 'Before food',
      duration: '1 month',
      instructions: ''
    };

    const allMedicines = currentKits
      .flatMap(kit => kit.kit.length > 0 ? kit.kit : kit.name)
      .concat(addedMedicines);
      console.log("korekojg",allMedicines)
    let initialPrescriptions = {};

    for (let index = 0; index < allMedicines.length; index++) {
      const element = allMedicines[index];
      initialPrescriptions[element] = initialPrescriptions[element] || defaultValues;
    }
    // const initialPrescriptions = allMedicines.reduce((acc, medicine) => {
    //   acc[medicine] = acc[medicine] || defaultValues;
    //   return acc;
    // }, { ...prescriptions });
    console.log("korekojg1",initialPrescriptions)

    setPrescriptions(initialPrescriptions);


  }, [currentKits, addedMedicines]);

  useEffect(() => {
    fetch(`${BASE_URL}/admin/product`)
      .then(response => response.json())
      .then(data => {
        console.log("njierjiotj",data)
        setKitItems(data.message)
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleCheckboxChange = (kit) => {
    // console.log("jjewoj",kit)
    setCurrentKits(prev => prev.some(selectedKit => selectedKit._id === kit._id)
      ? prev.filter(selectedKit => selectedKit._id !== kit._id)
      : [...prev, kit]);
  };

  const savePrescription = () => {
    console.log("jjewoj",currentKits)
    setSelectedOptions(prev => ({
      ...prev,
      medicines: currentKits.map(kit => ({
        kit: kit.name,
        medicines: prescriptions,
      })),
    }));
    toast.success("Medicine added in prescription")
  };

  const handleMainCheckboxChange = (test) => {
    setSelectedTests(prev => {
      const updatedMainTests = prev.mainTests.includes(test)
        ? prev.mainTests.filter(item => item !== test)
        : [...prev.mainTests, test];

      return {
        ...prev,
        mainTests: updatedMainTests
      };
    });
  };
// console.log(Object.keys(selectedOptions.medicines[0]),'fhhffh')
  const handleSubCheckboxChange = (mainTest, subTest) => {
    setSelectedTests(prev => {
      const updatedSubTests = prev.subTests[mainTest]?.includes(subTest)
        ? {
            ...prev.subTests,
            [mainTest]: prev.subTests[mainTest].filter(item => item !== subTest),
          }
        : {
            ...prev.subTests,
            [mainTest]: [...(prev.subTests[mainTest] || []), subTest],
          };

      return {
        ...prev,
        subTests: updatedSubTests,
      };
    });
  };

  const handleAddMedicine = () => {
    if (newMedicine.trim()) {
      setAddedMedicines(prev => [...prev, newMedicine.trim()]);
      setNewMedicine('');
    }
  };

  const tests = [
    "CBC",
    "HBA1C",
    "LFT",
    "KFT",
    "Lipid Profile",
    "T3",
    "T4",
    "TSH",
    "S. Ferritin",
    "S. Iron",
    "S. Folate",
    "S. Vit B12",
    "S. Vit D3",
    "Blood Sugar"
  ];

  const bloodSugarSubTests = ['F', 'PP', 'Random'];

  return (
    <>
      <h2 className="diag1">Medicines</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#90ff90', padding: '1rem' }}>
        {kitItems?.map((kit) => (
          <div key={kit._id} style={{ display: 'flex', width: '50%', gap: '1rem', alignItems: 'baseline', border: '1px solid black' }}>
            <label style={{ display: 'flex', gap: '1rem', alignItems: 'baseline', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={currentKits.some(selectedKit => selectedKit._id === kit._id)}
                onChange={() => handleCheckboxChange(kit)}
              />
              <div>
                <h2>{kit.name}</h2>
                {kit.kit.length > 0 && (
                  <div>
                    {kit.kit.map(item => <p key={item}>{item}</p>)}
                  </div>
                )}
              </div>
            </label>
          </div>
        ))}
      </div>
      {currentKits.length > 0 && (
        <div>
          <h2>Instructions</h2>
          <DoctorPrescribe
            medicines={currentKits.flatMap(kit => kit.kit.length > 0 ? kit.kit : [kit.name]).concat(addedMedicines)}
            prescriptions={prescriptions}
            setPrescriptions={setPrescriptions}
          />
          <input
            type="text"
            value={newMedicine}
            onChange={(e) => setNewMedicine(e.target.value)}
            placeholder="Add new medicine"
          />
          <button onClick={handleAddMedicine}>Add Medicine</button>
          <button onClick={savePrescription}>Save Prescription</button>
        </div>
      )}
      <h2 className="diag1">Tests</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#90ff90', padding: '1rem' }}>
        {tests.map((test) => (
          <label key={test} style={{ display: 'flex', gap: '1rem', alignItems: 'baseline', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={selectedTests.mainTests.includes(test)}
              onChange={() => handleMainCheckboxChange(test)}
            />
            {test}
          </label>
        ))}
      </div>
      {selectedTests.mainTests.includes("Blood Sugar") && (
        <div style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#90ff90', padding: '1rem' }}>
          {bloodSugarSubTests.map((subTest) => (
            <label key={subTest} style={{ display: 'flex', gap: '1rem', alignItems: 'baseline', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={selectedTests.subTests["Blood Sugar"]?.includes(subTest) || false}
                onChange={() => handleSubCheckboxChange("Blood Sugar", subTest)}
              />
              {subTest}
            </label>
          ))}
        </div>
      )}
    </>
  );
}