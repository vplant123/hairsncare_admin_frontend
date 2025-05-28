
// import React, { useEffect, useState } from 'react';
// import AdminNavbar from './AdminNavbar';
// import { useAsyncValue, useNavigate } from 'react-router-dom';
// import BASE_URL from '../../Config';
// import { toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';



// export default function AllHairTest() {
//   const [data, setData] = useState([]);
//   const [patientData, setPatientData] = useState([]);
//   const [selectedDoctors, setSelectedDoctors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [show, setShow] = useState(false);

//   let storedUserData = JSON.parse(localStorage.getItem("User343"));

//   const fetchAppointment = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${BASE_URL}/admin/get-Booked-appointment`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const jsonData = await response.json();
//       setPatientData(jsonData.data);
//       if (jsonData.data.length === 0) {
//         toast.success('No appointments found');
//       }
//     } catch (error) {
//       toast.error('Error fetching appointments: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDoctorSelect = (e, patientId) => {
//     const selectedDoctorName = e.target.value;
//     setSelectedDoctors(prevState => ({
//       ...prevState,
//       [patientId]: selectedDoctorName
//     }));
//   };
// const handleSendReport=async(id)=>{
//   // `${BASE_URL}/doctor/update-prescription?userId=${params.id}`
//   try {
//     const response = await fetch( `${BASE_URL}/doctor/update-prescription?userId=${id}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });

//     if (!response.ok) {
//       console.log(response)
//       throw new Error('Network response was not ok');
//     }

//     const jsonData = await response.json();
//     toast.success('success');
//  console.log(jsonData,"ojj")
    
//   } catch (error) {
//     toast.error('Error fetching appointments: ' + error.message);
//   }
// }
//   const handleAssign = async (e, patientId) => {
//     const selectedDoctor = data.find((doc) => doc.fullname === selectedDoctors[patientId]);
//     if (selectedDoctor) {
//       try {
//         const response = await fetch(`${BASE_URL}/admin/assignAppointmentToDoctor`, {
//           method: 'POST',
//           headers: {
//             'Authorization': storedUserData.logedInUser.accessToken,
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             appointmentId: patientId,
//             doctorId: selectedDoctor?._id
//           })
//         });

//         if (!response.ok) {
//           throw new Error('Failed to assign doctor');
//         }
//         const datt = await response.json();
//         toast.success("Doctor assigned successfully");
//         setShow(!show);
//       } catch (error) {
//         toast.error('Error assigning doctor: ' + error.message);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchAppointment();
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/admin/alldoctor`, {
//           method: 'GET',
//           headers: {
//             'Authorization': storedUserData.logedInUser.accessToken,
//             'Content-Type': 'application/json'
//           }
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const jsonData = await response.json();
//         setData(jsonData.data.data);
//       } catch (error) {
//         toast.error('Error fetching doctors: ' + error.message);
//       }
//     };

//     fetchData();
//   }, [show]);

//   const navigate = useNavigate();
// console.log(patientData)
//   return (
//     <AdminNavbar>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         patientData.length > 0 ? (
//           <div className="all-patient-list-container">
//             <div className="patient-list-1">
//               {patientData.map(patient => (
//                 <div key={patient?._id} className="patient-item2">
//                   <div className="patient-details">
//                     <h3>Patient Name : {patient?.userId?.fullname}</h3>
//                     <p>Payment : {patient?.amount===50000?<span style={{backgroundColor:'yellow'}}>500</span>:<span style={{backgroundColor:'orange'}}>100</span>}</p>
//                   </div>
//                   <p>Time Slot : {patient?.timeSlot}</p>
//                   <p>Appointment Date : {patient?.appointmentDate ? patient.appointmentDate : "Not Available"}</p>
//                   <button onClick={() => navigate(`/test-result/${patient.userId._id}`)} className="view-test-btt">View Test Result</button>
//                   {patient.status === "booked" && (
//                     <div className='dr-select'>
//                       <label htmlFor={`doctor-${patient?._id}`}>Select a Doctor:</label>
//                       <select id={`doctor-${patient?._id}`} value={selectedDoctors[patient?._id] || ''} onChange={(e) => handleDoctorSelect(e, patient?._id)}>
//                         <option value="">Select</option>
//                         {data.map(doctor => (
//                           <option key={doctor?._id} value={doctor.fullname}>{doctor.fullname}</option>
//                         ))}
//                       </select>
//                       {selectedDoctors[patient?._id] && <button onClick={(e) => handleAssign(e, patient?._id)}>Assign</button>}
//                     </div>
//                   )}
//                   {patient.status === "assigned" && <div>Waiting for Doctor's response</div>}
//                   {patient.status === "completed" && (
//                     <div>
//                       <button style={{ display: 'block' }} onClick={() => navigate(`/doctor/report/${patient.userId._id}`)}>Generate PDF Report</button>
//                       <button onClick={() => navigate(`/doctor-analyse-report/${patient.userId._id}`)}>Generate Doctor's analysis Report</button>
//                       <button onClick={() => navigate(`/management-report/${patient.userId._id}`)}>Generate Management Report</button>
//                       <button onClick={()=>handleSendReport(patient.userId._id)}>Send All Reports to User</button>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <p>No appointments available</p>
//         )
//       )}
//     </AdminNavbar>
//   );
// }





// import React, { useEffect, useState, useMemo } from 'react';
// import AdminNavbar from './AdminNavbar';
// import { MaterialReactTable } from 'material-react-table';
// import { MenuItem, Select, Dialog,Button, DialogTitle, DialogContent, List, ListItem, ListItemText, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import BASE_URL from '../../Config';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// export default function AllHairTest() {
//   const [data, setData] = useState([]);
//   const [patientData, setPatientData] = useState([]);
//   const [selectedDoctors, setSelectedDoctors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [show, setShow] = useState(false);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [open, setOpen] = useState(false);

//   const navigate = useNavigate();
//   let storedUserData = JSON.parse(localStorage.getItem("User343"));

//   const fetchAppointment = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${BASE_URL}/admin/get-Booked-appointment`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const jsonData = await response.json();
//       setPatientData(jsonData.data);
//       if (jsonData.data.length === 0) {
//         toast.success('No appointments found');
//       }
//     } catch (error) {
//       toast.error('Error fetching appointments: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDoctorSelect = (e, patientId) => {
//     const selectedDoctorName = e.target.value;
//     setSelectedDoctors(prevState => ({
//       ...prevState,
//       [patientId]: selectedDoctorName
//     }));
//   };

//   const handleSendReport = async (id) => {
//     try {
//       const response = await fetch(`${BASE_URL}/doctor/update-prescription?userId=${id}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const jsonData = await response.json();
//       toast.success('Success');
//       console.log(jsonData, "ojj");
//     } catch (error) {
//       toast.error('Error sending report: ' + error.message);
//     }
//   };
//   const handleGeneratePrescription = (userId) => {
//     navigate(`/doctor/report/${userId}`)
//     toast.info('Generating Prescription for user ' + userId);
//   };
  
//   const handleGenerateAssessmentReport = (userId) => {
//     navigate(`/doctor-analyse-report/${userId}`)
//     toast.info('Generating Assessment Report for user ' + userId);
//   };
  
//   const handleManagementReport = (userId) => {
//     navigate(`/management-report/${userId}`)
//     toast.info('Generating Management Report for user ' + userId);
//   };
//   const handleAssign = async (e, patientId) => {
//     const selectedDoctor = data.find((doc) => doc.fullname === selectedDoctors[patientId]);
//     if (selectedDoctor) {
//       try {
//         const response = await fetch(`${BASE_URL}/admin/assignAppointmentToDoctor`, {
//           method: 'POST',
//           headers: {
//             'Authorization': storedUserData.logedInUser.accessToken,
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             appointmentId: patientId,
//             doctorId: selectedDoctor._id
//           })
//         });

//         if (!response.ok) {
//           throw new Error('Failed to assign doctor');
//         }
//         const datt = await response.json();
//         toast.success("Doctor assigned successfully");
//         setShow(!show);
//       } catch (error) {
//         toast.error('Error assigning doctor: ' + error.message);
//       }
//     }
//   };

//   const handleRowClick = (patient) => {
//     setSelectedPatient(patient);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedPatient(null);
//   };

//   useEffect(() => {
//     fetchAppointment();
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/admin/alldoctor`, {
//           method: 'GET',
//           headers: {
//             'Authorization': storedUserData.logedInUser.accessToken,
//             'Content-Type': 'application/json'
//           }
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const jsonData = await response.json();
//         setData(jsonData.data.data);
//       } catch (error) {
//         toast.error('Error fetching doctors: ' + error.message);
//       }
//     };

//     fetchData();
//   }, [show]);

//   const statuses = ['booked', 'assigned', 'completed'];

//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: 'userId.fullname',
//         header: 'Patient Name',
//         size: 150,
//         id: 'patientName', // Added id
//       },
//       {
//         accessorKey: 'amount',
//         header: 'Payment',
//         size: 100,
//         id: 'payment', // Added id
//         Cell: ({ cell }) => (
//           <span style={{ backgroundColor: cell.row.original.amount === 50000 ? 'yellow' : 'orange', padding: '5px', borderRadius: '4px' }}>
//             {cell.row.original.amount}
//           </span>
//         ),
//       },
//       {
//         accessorKey: 'timeSlot',
//         header: 'Time Slot',
//         size: 150,
//         id: 'timeSlot', // Added id
//       },
//       {
//         accessorKey: 'appointmentDate',
//         header: 'Appointment Date',
//         size: 150,
//         id: 'appointmentDate', // Added id
//       },
//       {
//         accessorKey: 'status',
//         header: 'Status',
//         size: 150,
//         id: 'status', // Added id
//         Cell: ({ cell }) => {
//           const status = cell.row.original.status.toLowerCase();
//           let backgroundColor;

//           switch (status) {
//             case 'completed':
//               backgroundColor = 'green';
//               break;
//             case 'assigned':
//               backgroundColor = 'orange';
//               break;
//             case 'booked':
//               backgroundColor = 'blue';
//               break;
//             default:
//               backgroundColor = 'white';
//           }

//           return (
//             <div style={{ backgroundColor, padding: '5px', borderRadius: '4px' }}>
//               {cell.row.original.status}
//             </div>
//           );
//         },
//       },
//       {
//         header: 'Action',
//         size: 150,
//         id: 'action', // Added id
//         Cell: ({ cell }) => {
//           if (cell.row.original.status === 'booked') {
//             return (
//               <Select
//                 value={selectedDoctors[cell.row.original._id] || ''}
//                 onClick={(e) => e.stopPropagation()} // Stop event propagation
//                 onChange={(e) => handleDoctorSelect(e, cell.row.original._id)}
//                 displayEmpty
//                 renderValue={(value) => (value ? value : 'Assign Doctor')}
//                 fullWidth
//               >
//                 {data.map((doctor) => (
//                   <MenuItem key={doctor._id} value={doctor.fullname}>
//                     {doctor.fullname}
//                   </MenuItem>
//                 ))}
//               </Select>
//             );
//           }
//           return null;
//         },
//       },
//       {
//         header: '',
//         size: 150,
//         id: 'viewDetails', // Added id
//         Cell: ({ cell }) => (
//           <button onClick={() => handleRowClick(cell.row.original)}>View Details</button>
//         ),
//       },
//     ],
//     [data, selectedDoctors]
//   );

//   return (
//     <AdminNavbar>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <MaterialReactTable columns={columns} data={patientData || []} />
//       )}
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>
//           Patient Details
//           <IconButton
//             aria-label="close"
//             onClick={handleClose}
//             sx={{
//               position: 'absolute',
//               right: 8,
//               top: 8,
//               color: (theme) => theme.palette.grey[500],
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           {selectedPatient && (
//             <List>
//               <ListItem>
//                 <ListItemText primary={`Patient Name: ${selectedPatient.userId.fullname}`} />
//               </ListItem>
//               <ListItem>
//                 <ListItemText primary={`Payment: ${selectedPatient.amount}`} />
//               </ListItem>
//               <ListItem>
//                 <ListItemText primary={`Time Slot: ${selectedPatient.timeSlot}`} />
//               </ListItem>
//               <ListItem>
//                 <ListItemText primary={`Appointment Date: ${selectedPatient.appointmentDate}`} />
//               </ListItem>
//               <ListItem>
//                 <ListItemText primary={`Status: ${selectedPatient.status}`} />
//               </ListItem>
//               <ListItem>
//                 <button onClick={() => navigate(`/test-result/${selectedPatient.userId._id}`)} className="view-test-btt">View Test Result</button>
//               </ListItem>
//               {selectedPatient.status === 'completed' && (
//                 <ListItem>
//                   <Button  onClick={() => handleSendReport(selectedPatient.userId._id)}>Send Report to Patient</Button>
//                   <Button onClick={() => handleGeneratePrescription(selectedPatient.userId._id)}>Generate Prescription</Button>
//                   <Button onClick={() => handleGenerateAssessmentReport(selectedPatient.userId._id)}>Generate Assessment Report</Button>
//                   <Button onClick={() => handleManagementReport(selectedPatient.userId._id)}>Management Report</Button>
//                 </ListItem>
//               )}
//             </List>
//           )}
//         </DialogContent>
//       </Dialog>
//     </AdminNavbar>
//   );
// }
import React, { useEffect, useState } from 'react';
// import AdminNavbar from './AdminNavbar';
// import { MaterialReactTable } from 'material-react-table';
import { MenuItem, Select, Dialog, Button, DialogTitle, DialogContent, List, ListItem, ListItemText, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
import BASE_URL from '../../Config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import moment from 'moment';

export default function AllHairTest() {
  const [data, setData] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [selectedDoctors, setSelectedDoctors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [open, setOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);


  const navigate = useNavigate();
  let storedUserData = JSON.parse(localStorage.getItem("User343"));

  const fetchAppointment = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/admin/get-Booked-appointment`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await response.json();
      setPatientData(jsonData.data);
      if (jsonData.data.length === 0) {
        toast.success('No appointments found');
      }
    } catch (error) {
      toast.error('Error fetching appointments: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(selectedPatient?._id && selectedPatient?.status === "completed"){
          const response = await fetch(
            `${BASE_URL}/doctor/getPrescription?appointmentId=${selectedPatient?._id}`
          );
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const result = await response.json();
          console.log("ksokf",result)
          if(result?.data?.showToUser){
            setIsShow(true)
          }
          // setData(result.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [selectedPatient]);

  const handleDoctorSelect = (e, patientId) => {
    const selectedDoctorName = e.target.value;
    setSelectedDoctors(prevState => ({
      ...prevState,
      [patientId]: selectedDoctorName
    }));
  };

  const handleSendReport = async (userId,appointmentId) => {
    try {
      const response = await fetch(`${BASE_URL}/doctor/update-prescription?userId=${userId}&appointmentId=${appointmentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await response.json();
      toast.success('Success');
      console.log(jsonData, "ojj");
    } catch (error) {
      toast.error('Error sending report: ' + error.message);
    }
  };

  const handleGeneratePrescription = (appointmentId) => {
    window.open(`/doctor/report/${appointmentId}`)
    toast.info('Generating Prescription for user ' + appointmentId);
  };

  const handleGenerateAssessmentReport = (appointmentId) => {
    window.open(`/doctor-analyse-report/${appointmentId}`)
    // navigate(`/doctor-analyse-report/${appointmentId}`)
    toast.info('Generating Assessment Report for user ' + appointmentId);
  };

  const handleManagementReport = (appointmentId) => {
    window.open(`/management-report/${appointmentId}`)
    toast.info('Generating Management Report for user ' + appointmentId);
  };

  const handleAssign = async (e, patientId) => {
    const selectedDoctor = data.find((doc) => doc.fullname === selectedDoctors[patientId]);
    if (selectedDoctor) {
      try {
        const response = await fetch(`${BASE_URL}/admin/assignAppointmentToDoctor`, {
          method: 'POST',
          headers: {
            'Authorization': storedUserData.logedInUser.accessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            appointmentId: patientId,
            doctorId: selectedDoctor._id
          })
        });

        if (!response.ok) {
          throw new Error('Failed to assign doctor');
        }
        const datt = await response.json();
        toast.success("Doctor assigned successfully");
        fetchAppointment(); // Refresh appointments after assigning
        setOpen(false); // Close dialog after assignment
      } catch (error) {
        toast.error('Error assigning doctor: ' + error.message);
      }
    }
  };

  const handleRowClick = (patient) => {
    setSelectedPatient(patient);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPatient(null);
  };

  useEffect(() => {
    fetchAppointment();
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/alldoctor`, {
          method: 'GET',
          headers: {
            'Authorization': storedUserData.logedInUser.accessToken,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        setData(jsonData.data.data);
      } catch (error) {
        toast.error('Error fetching doctors: ' + error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminNavbar>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <MaterialReactTable
          columns={[
            {
              accessorKey: "userId.fullname",
              header: "Patient Name",
              size: 150,
              id: "patientName", // Added id
            },
            {
              accessorKey: "amount",
              header: "Payment",
              size: 100,
              id: "payment", // Added id
              Cell: ({ cell }) => (
                <span
                  style={{
                    backgroundColor: !cell.row.original.amount
                      ? "white"
                      : "yellow",
                    padding: "5px",
                    borderRadius: "4px",
                  }}
                >
                  {!cell.row.original.amount
                    ? "-"
                    : "₹ " + cell.row.original.amount}
                </span>
              ),
            },
            {
              accessorKey: "timeSlot",
              header: "Time Slot",
              size: 150,
              id: "timeSlot", // Added id
            },
            {
              accessorKey: "appointmentDate",
              header: "Appointment Date",
              size: 150,
              id: "appointmentDate", // Added id
            },
            {
              accessorKey: "createdAt",
              header: "Date",
              size: 100,
              id: "Date", // Added id
              Cell: ({ cell }) => (
                // <span style={{ backgroundColor: cell.row.original.amount === 50000 ? 'yellow' : 'orange', padding: '5px', borderRadius: '4px' }}>
                //   {cell.row.original.amount===50000?"Rs 500":"Rs 100"}
                // </span>
                <div>
                  {cell.row.original?.createdAt
                    ? moment(cell.row.original?.createdAt).format("DD-MM-YYYY")
                    : "-"}
                </div>
              ),
            },
            {
              accessorKey: "status",
              header: "Status",
              size: 150,
              id: "status", // Added id
              Cell: ({ cell }) => {
                const status = cell.row.original.status.toLowerCase();
                let backgroundColor;
                let color;
                switch (status) {
                  case "completed":
                    backgroundColor = "green";
                    color = "white";
                    break;
                  case "assigned":
                    backgroundColor = "orange";
                    break;
                  case "booked":
                    backgroundColor = "#95489a";
                    color = "white";
                    break;
                  default:
                    backgroundColor = "white";
                }

                return (
                  <div
                    style={{
                      backgroundColor,
                      color,
                      padding: "5px",
                      borderRadius: "4px",
                    }}
                  >
                    {cell.row.original.status}
                  </div>
                );
              },
            },
            {
              header: "",
              size: 150,
              id: "viewDetails", // Added id
              Cell: ({ cell }) => (
                <Button onClick={() => handleRowClick(cell.row.original)}>
                  {cell.row.original?.prescription?.showToUser ? "Report Send complete" : "View Report"}
                </Button>
              ),
            },
          ]}
          data={patientData || []}
        />
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Patient Details
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedPatient && (
            <List>
              <ListItem>
                <ListItemText
                  primary={`Patient Name: ${selectedPatient?.userId?.fullname}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Payment: ${
                    selectedPatient?.amount === 50000 ? "500" : "100"
                  }`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Time Slot: ${selectedPatient?.timeSlot}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Appointment Date: ${selectedPatient?.appointmentDate}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Status: ${selectedPatient?.status}`} />
              </ListItem>
              {(selectedPatient?.status === "assigned" || selectedPatient?.status === "completed") && (
                <ListItem>
                   <ListItemText primary={`Doctor: ${selectedPatient?.doctorId?.fullname}`} />
                </ListItem>
              )}
              {selectedPatient?.status === "assigned" && (
                <ListItem style={{display:"flex",flexDirection : "column"}}>
                  <ListItemText primary="Waiting for Doctor's Response" />
                </ListItem>
              )}
              <ListItem>
                <button
                  onClick={() =>
                    navigate(`/test-result/${selectedPatient?.hairTestId._id}`)
                  }
                  className="view-test-btt"
                >
                  View Test Result
                </button>
              </ListItem>
              {selectedPatient?.status === "booked" && (
                <ListItem>
                  <Select
                    value={selectedDoctors[selectedPatient?._id] || ""}
                    onChange={(e) =>
                      handleDoctorSelect(e, selectedPatient?._id)
                    }
                    displayEmpty
                    renderValue={(value) => (value ? value : "Select Doctor")}
                    fullWidth
                  >
                    {data.map((doctor) => (
                      <MenuItem key={doctor._id} value={doctor.fullname}>
                        {doctor.fullname}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button
                    onClick={(e) => handleAssign(e, selectedPatient?._id)}
                  >
                    Assign Doctor
                  </Button>
                </ListItem>
              )}
              {selectedPatient?.status === "completed" && (
                <ListItem>
                  <Button
                    onClick={() =>
                      handleGenerateAssessmentReport(selectedPatient?._id)
                    }
                  >
                    Generate Assessment Report
                  </Button>
                  <Button
                    onClick={() => handleManagementReport(selectedPatient?._id)}
                  >
                    Management Report
                  </Button>
                  <Button
                    onClick={() =>
                      handleGeneratePrescription(selectedPatient?._id)
                    }
                  >
                    Generate Prescription
                  </Button>

                  <Button
                    onClick={() =>{
                      if(!isShow)
                      handleSendReport(
                        selectedPatient?.userId._id,
                        selectedPatient?._id
                      )
                    }}
                  >
                    {isShow ? "Report Send complete" : "Send Report to Patient"}
                  </Button>
                </ListItem>
              )}
            </List>
          )}
        </DialogContent>
      </Dialog>
    </AdminNavbar>
  );
}
