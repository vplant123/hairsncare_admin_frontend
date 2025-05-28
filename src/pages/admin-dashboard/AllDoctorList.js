
import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import BASE_URL from '../../Config';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


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

export default function AllDoctorList() {

  const navigate=useNavigate()
  const [edit,setEdit] = useState(false)
  const editDoctor = async (id,del=false) => {
        // Handle blocking user logic here
        try {
          const response = await fetch(`${BASE_URL}/admin/edit-doctor`, {
            method: 'POST',
            headers: {
              'Authorization': storedUserData.logedInUser.accessToken,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({id,isDelete : true}),
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const jsonData = await response.json();
          console.log("vejorj",jsonData)
          toast.success('doctor delete successfully');
          fetchData()
        } catch (error) {
          toast.error('Error fetching doctors: ' + error.message);
        }    };


    const [doctors,setDoctors] = useState([])
    let storedUserData = JSON.parse(localStorage.getItem("User343"));


    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/all-doctor-Data`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        console.log("vejorj",jsonData)
        setDoctors(jsonData?.data);
      } catch (error) {
        toast.error('Error fetching doctors: ' + error.message);
      }
    };

    useEffect(() => {
  
      fetchData();
    }, []);

    return (
        <AdminNavbar>
            <div className="all-patient-list-container">
                <h2>All Doctors List</h2>
                <div className="patient-list">
                    {doctors.map(patient => (
                        <div key={patient.id} className="patient-item1">
                            <div className="patient-details">
                                <h3>{patient?.name}</h3>
                                <p>{patient?.address}</p>
                                <p>{patient?.phone}</p>
                                <p>{patient?.degree}</p>

                              
                            </div>
                          <div>  <button className="block-button" onClick={() => editDoctor(patient._id)}>Delete</button>
                          <button  className="block-button edit1" onClick={() => {
                            navigate(`/edit-doctor/${patient._id}`)
                          }}>Edit</button>
                          </div>
                        </div>
                    ))}
                </div>
                
            </div>
            <ToastContainer position="bottom-right"/>
        </AdminNavbar>
    );
}
