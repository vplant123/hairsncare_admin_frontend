
// import React, { useEffect } from 'react';

// function DoctorPrescribe({ medicines, prescriptions, setPrescriptions }) {
//   useEffect(() => {
//     const defaultValues = {
//       route: 'Oral',
//       dosage: '',
//       frequency: 'Daily at night',
//       when: 'Before food',
//       duration: '45 Days',
//       instructions: ''
//     };

//     medicines.forEach((medicine) => {
//       if (!prescriptions[medicine]) {
//         setPrescriptions((prev) => ({
//           ...prev,
//           [medicine]: defaultValues,
//         }));
//       }
//     });
//   }, [medicines, prescriptions, setPrescriptions]);

//   const handleChange = (medicine, field, value) => {
//     setPrescriptions((prev) => ({
//       ...prev,
//       [medicine]: {
//         ...prev[medicine],
//         [field]: value,
//       },
//     }));
//   };

//   return (
//     <div className="prescribe-container">
//       {/* <h2>Prescribe Medications</h2> */}
//       {medicines.map((medicine, index) => (
//         <div style={{marginTop:'1rem'}}key={index}>
//           <h3 style={{color:'blue'}}>{medicine}</h3>
//           <table className="prescription-table">
//             <thead>
//               <tr>
//                 <th>Route</th>
//                 <th>Dosage</th>
//                 <th>Frequency</th>
//                 <th>When</th>
//                 <th>Duration</th>
//                 <th>Instructions</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>
//                   <select
//                     value={prescriptions[medicine]?.route || 'Oral'}
//                     onChange={(e) =>
//                       handleChange(medicine, 'route', e.target.value)
//                     }
//                   >
//                     <option value="Oral">Oral</option>
//                     <option value="Topical (External Use)">
//                       Topical (External Use)
//                     </option>
//                   </select>
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={prescriptions[medicine]?.dosage || ''}
//                     onChange={(e) =>
//                       handleChange(medicine, 'dosage', e.target.value)
//                     }
//                     placeholder="Dosage instruction by Doctor"
//                   />
//                 </td>
//                 <td>
//                   <select
//                     value={prescriptions[medicine]?.frequency || 'Daily at night'}
//                     onChange={(e) =>
//                       handleChange(medicine, 'frequency', e.target.value)
//                     }
//                   >
//                     <option value="Daily at night">Daily at night</option>
//                     <option value="Daily at morning">Daily at morning</option>
//                     <option value="Daily at afternoon">
//                       Daily at afternoon
//                     </option>
//                     <option value="Once a week">Once a week</option>
//                     <option value="Twice a week">Twice a week</option>
//                     <option value="Thrice a week">Thrice a week</option>
//                     <option value="Alternate day">Alternate day</option>
//                   </select>
//                 </td>
//                 <td>
//                   <select
//                     value={prescriptions[medicine]?.when || 'Before food'}
//                     onChange={(e) =>
//                       handleChange(medicine, 'when', e.target.value)
//                     }
//                   >
//                     <option value="Before food">Before food</option>
//                     <option value="After food">After food</option>
//                     <option value="Empty stomach">Empty stomach</option>
//                   </select>
//                 </td>
//                 <td>
//                   <select
//                     value={prescriptions[medicine]?.duration || '45 Days'}
//                     onChange={(e) =>
//                       handleChange(medicine, 'duration', e.target.value)
//                     }
//                   >
//                     {/* Add other options as required */}
//                     <option value="45 Days">45 Days</option>
//                     <option value="1 month">1 month</option>
//                     <option value="2 months">2 months</option>
//                     <option value="3 months">3 months</option>
//                     <option value="4 months">4 months</option>
//                     <option value="5 months">5 months</option>
//                     <option value="6 months">6 months</option>
//                     <option value="1 Day">1 Day</option>
//                     <option value="2 Days">2 Days</option>
//                     <option value="3 Days">3 Days</option>
//                     <option value="4 Days">4 Days</option>
//                     <option value="5 Days">5 Days</option>
//                     <option value="6 Days">6 Days</option>
//                     <option value="7 Days">7 Days</option>
//                     <option value="8 Days">8 Days</option>
//                     <option value="9 Days">9 Days</option>
//                     <option value="10 Days">10 Days</option>
//                     <option value="11 Days">11 Days</option>
//                     <option value="12 Days">12 Days</option>
//                     <option value="13 Days">13 Days</option>
//                     <option value="14 Days">14 Days</option>
//                     <option value="15 Days">15 Days</option>
//                     <option value="16 Days">16 Days</option>
//                     <option value="17 Days">17 Days</option>
//                     <option value="18 Days">18 Days</option>
//                     <option value="19 Days">19 Days</option>
//                     <option value="20 Days">20 Days</option>
//                     <option value="21 Days">21 Days</option>
//                     <option value="22 Days">22 Days</option>
//                     <option value="23 Days">23 Days</option>
//                     <option value="24 Days">24 Days</option>
//                     <option value="25 Days">25 Days</option>
//                     <option value="26 Days">26 Days</option>
//                     <option value="27 Days">27 Days</option>
//                     <option value="28 Days">28 Days</option>
//                     <option value="29 Days">29 Days</option>
//                   </select>
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={prescriptions[medicine]?.instructions || ''}
//                     onChange={(e) =>
//                       handleChange(medicine, 'instructions', e.target.value)
//                     }
//                     placeholder="Special instructions by Doctor"
//                   />
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default DoctorPrescribe;
import React from 'react';

function DoctorPrescribe({ medicines, prescriptions, setPrescriptions }) {
  const handleChange = (medicine, field, value) => {
    setPrescriptions((prev) => ({
      ...prev,
      [medicine]: {
        ...prev[medicine],
        [field]: value,
      },
    }));
  };

  return (
    <div className="prescribe-container">
      {/* <h2>Prescribe Medications</h2> */}
      {medicines.map((medicine, index) => (
        <div style={{marginTop:'1rem'}} key={index}>
          <h3  style={{color:'blue'}}>{medicine}</h3>
          <table className="prescription-table">
            <thead>
              <tr>
                <th>Route</th>
                <th>sub category</th>
                <th>quantity</th>
                <th>Dosage</th>
                <th>Frequency</th>
                <th>When</th>
                <th>Duration</th>
                <th>Instructions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <select
                    value={prescriptions[medicine]?.route || 'Oral'}
                    onChange={(e) => handleChange(medicine, 'route', e.target.value)}
                  >
                    <option value="Oral">Oral</option>
                    <option value="Topical (External Use)">Topical (External Use)</option>
                  </select>
                </td>
                <td>
                  <select
                    value={prescriptions[medicine]?.subCategory || ''}
                    onChange={(e) => handleChange(medicine, 'subCategory', e.target.value)}
                  >
                   {prescriptions[medicine]?.route == "Oral" ?  <><option value="Tablets">Tablets</option>
                    <option value="Syrup">Syrup</option><option value="Sachets">Sachets</option></> : <>
                    <option value="Tablets">Hair Solution</option>
                    <option value="Syrup">Serum</option>
                    <option value="Sachets">Oil</option>
                    <option value="Syrup">Gel</option>
                    <option value="Syrup">Mask</option>
                    <option value="Syrup">Cream & Ointments</option>
                    <option value="Syrup">Shampoo</option>
                    <option value="Syrup">Conditioner</option>
                    <option value="Syrup">Color</option>
                    <option value="Syrup">Spray</option>
                    <option value="Syrup">Foam</option>
                    <option value="Syrup">Fibre</option>
                    </>
                    }
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    value={prescriptions[medicine]?.quantity || ''}
                    onChange={(e) => handleChange(medicine, 'quantity', e.target.value)}
                    placeholder="quantity by Doctor"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={prescriptions[medicine]?.dosage || ''}
                    onChange={(e) => handleChange(medicine, 'dosage', e.target.value)}
                    placeholder="Dosage instruction by Doctor"
                  />
                </td>
                <td>
                  <select
                    value={prescriptions[medicine]?.frequency || 'Daily at night'}
                    onChange={(e) => handleChange(medicine, 'frequency', e.target.value)}
                  >
                    <option value="Daily at night">Daily at night</option>
                    <option value="Daily at morning">Daily at morning</option>
                    <option value="Daily at afternoon">Daily at afternoon</option>
                    <option value="Once a week">Once a week</option>
                    <option value="Twice a week">Twice a week</option>
                    <option value="Thrice a week">Thrice a week</option>
                    <option value="Alternate day">Alternate day</option>
                  </select>
                </td>
                <td>
                  <select
                    value={prescriptions[medicine]?.when || 'Before food'}
                    onChange={(e) => handleChange(medicine, 'when', e.target.value)}
                  >
                    <option value="Before food">Before food</option>
                    <option value="After food">After food</option>
                    <option value="Empty stomach">Empty stomach</option>
                  </select>
                </td>
                <td>
                  <select
                    value={prescriptions[medicine]?.duration || '1 month'}
                    onChange={(e) => handleChange(medicine, 'duration', e.target.value)}
                  >
                    <option value="45 Days">45 Days</option>
                    <option value="1 month">1 month</option>
                    <option value="2 months">2 months</option>
                    <option value="3 months">3 months</option>
                    <option value="4 months">4 months</option>
                    <option value="5 months">5 months</option>
                    <option value="6 months">6 months</option>
                    <option value="1 Day">1 Day</option>
                    <option value="2 Days">2 Days</option>
                    <option value="3 Days">3 Days</option>
                    <option value="4 Days">4 Days</option>
                    <option value="5 Days">5 Days</option>
                    <option value="6 Days">6 Days</option>
                    <option value="7 Days">7 Days</option>
                    <option value="8 Days">8 Days</option>
                    <option value="9 Days">9 Days</option>
                    <option value="10 Days">10 Days</option>
                    <option value="11 Days">11 Days</option>
                    <option value="12 Days">12 Days</option>
                    <option value="13 Days">13 Days</option>
                    <option value="14 Days">14 Days</option>
                    <option value="15 Days">15 Days</option>
                    <option value="16 Days">16 Days</option>
                    <option value="17 Days">17 Days</option>
                    <option value="18 Days">18 Days</option>
                    <option value="19 Days">19 Days</option>
                    <option value="20 Days">20 Days</option>
                    <option value="21 Days">21 Days</option>
                    <option value="22 Days">22 Days</option>
                    <option value="23 Days">23 Days</option>
                    <option value="24 Days">24 Days</option>
                    <option value="25 Days">25 Days</option>
                    <option value="26 Days">26 Days</option>
                    <option value="27 Days">27 Days</option>
                    <option value="28 Days">28 Days</option>
                    <option value="29 Days">29 Days</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    value={prescriptions[medicine]?.instructions || ''}
                    onChange={(e) => handleChange(medicine, 'instructions', e.target.value)}
                    placeholder="Special instructions by Doctor"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default DoctorPrescribe;
