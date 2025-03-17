import React from 'react'
import DoctorNavbar from './DoctorNavbar'
const patientData = [
    {
      id: 1,
      name: 'John Doe',
      address: '123 Main St, City, Country',
      weight: '70 kg',
      bloodGlucose: '110 mg/dL',
      bloodPressure: '120/80 mmHg'
    },
    {
      id: 2,
      name: 'Jane Smith',
      address: '456 Elm St, Town, Country',
      weight: '65 kg',
      bloodGlucose: '95 mg/dL',
      bloodPressure: '110/70 mmHg'
    },
    {
      id: 3,
      name: 'Alice Johnson',
      address: '789 Oak St, Village, Country',
      weight: '75 kg',
      bloodGlucose: '120 mg/dL',
      bloodPressure: '130/90 mmHg'
    },
    {
      id: 4,
      name: 'Bob Brown',
      address: '111 Pine St, City, Country',
      weight: '80 kg',
      bloodGlucose: '130 mg/dL',
      bloodPressure: '140/85 mmHg'
    },
    {
      id: 5,
      name: 'Emily Jones',
      address: '222 Cedar St, Town, Country',
      weight: '68 kg',
      bloodGlucose: '100 mg/dL',
      bloodPressure: '115/75 mmHg'
    },
    {
      id: 6,
      name: 'Michael Davis',
      address: '333 Maple St, Village, Country',
      weight: '72 kg',
      bloodGlucose: '105 mg/dL',
      bloodPressure: '125/80 mmHg'
    },
    {
      id: 7,
      name: 'Sarah Wilson',
      address: '444 Birch St, City, Country',
      weight: '78 kg',
      bloodGlucose: '115 mg/dL',
      bloodPressure: '135/85 mmHg'
    },
    {
      id: 8,
      name: 'David Rodriguez',
      address: '555 Walnut St, Town, Country',
      weight: '75 kg',
      bloodGlucose: '120 mg/dL',
      bloodPressure: '130/90 mmHg'
    },
    {
      id: 9,
      name: 'Laura Martinez',
      address: '666 Pineapple St, Village, Country',
      weight: '70 kg',
      bloodGlucose: '110 mg/dL',
      bloodPressure: '120/80 mmHg'
    },
    {
      id: 10,
      name: 'Chris Thompson',
      address: '777 Strawberry St, City, Country',
      weight: '72 kg',
      bloodGlucose: '105 mg/dL',
      bloodPressure: '125/80 mmHg'
    }
  ];
  
  
  
export default function PatientList() {
  return (
   <DoctorNavbar>
  
    <div className="patient-list-container">
      {patientData.map(patient => (
        <div key={patient.id} className="patient-item">
          <div className="patient-details">
            <h2>{patient.name}</h2>
            <p><strong>Address:</strong> {patient.address}</p>
            <p><strong>Weight:</strong> {patient.weight}</p>
            <p><strong>Blood Glucose:</strong> {patient.bloodGlucose}</p>
            <p><strong>Blood Pressure:</strong> {patient.bloodPressure}</p>
          </div>
          <button className="view-details-button">View Details</button>
        </div>
      ))}
    </div>

   </DoctorNavbar>
  )
}
