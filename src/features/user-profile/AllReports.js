import React, { useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { MenuItem, Select, Dialog, Button, DialogTitle, DialogContent, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BASE_URL from '../../Config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export default function AllReports() {
  const [data, setData] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [selectedDoctors, setSelectedDoctors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  let storedUserData = localStorage?.getItem("User343");
  let User=JSON.parse(storedUserData)?.logedInUser?.user;

  const fetchAppointment = async () => {
    setLoading(true);
    try {
        const response = await fetch(`${BASE_URL}/doctor/getAllPrescription?userId=${User._id }`, {
          method: 'GET',
          headers: {
            
          }
        });

        if (!response.ok) {
        //   setNoData(true)
          throw new Error('Network response was not ok');
        }
 
        const data = await response.json();
        console.log(data.data
            ,'fsijsaijfijiasjijis');
        setData(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
      setLoading(false);
    }
  };

  const handleDoctorSelect = (e, patientId) => {
    const selectedDoctorName = e.target.value;
    setSelectedDoctors(prevState => ({
      ...prevState,
      [patientId]: selectedDoctorName
    }));
  };

  const handleSendReport = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/doctor/update-prescription?userId=${id}`, {
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
    navigate(`/user-profile/${appointmentId}`)
  };

  const handleGenerateAssessmentReport = (appointmentId) => {
    navigate(`/doctor-analyse-report/${appointmentId}`)
    toast.info('Generating Assessment Report for user ' + appointmentId);
  };

  const handleManagementReport = (appointmentId) => {
    navigate(`/management-report/${appointmentId}`)
    toast.info('Generating Management Report for user ' + appointmentId);
  };

  const handleAssign = async (e, patientId) => {
    const selectedDoctor = data.find((doc) => doc.fullname === selectedDoctors[patientId]);
    if (selectedDoctor) {
      try {
        const response = await fetch(`${BASE_URL}/admin/assignAppointmentToDoctor`, {
          method: 'POST',
          headers: {
            'Authorization': storedUserData?.logedInUser?.accessToken,
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
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <MaterialReactTable
          columns={[
            {
              accessorKey: 'personal.name',
              header: 'Patient Name',
              size: 150,
              id: 'patientName', // Added id
            },
            {
              accessorKey: 'personal.age',
              header: 'Age',
              size: 100,
              id: 'age', // Added id
            },
            {
              accessorKey: 'personal.phone',
              header: 'Phone',
              size: 150,
              id: 'phone', // Added id
            },
            {
              accessorKey: 'personal.email',
              header: 'Email',
              size: 150,
              id: 'email', // Added id
            },
            {
              header: 'appointment Date',
              size: 150,
              Cell: ({ cell }) => (
                // <span style={{ backgroundColor: cell.row.original.amount === 50000 ? 'yellow' : 'orange', padding: '5px', borderRadius: '4px' }}>
                //   {cell.row.original.amount===50000?"Rs 500":"Rs 100"}
                // </span>
                <div>
                  {cell.row.original?.appointmentData?.createdAt
                    ? moment(cell.row.original?.appointmentData?.createdAt).format("DD-MM-YYYY")
                    : "-"}
                </div>
              ),
            },
            {
              header: 'View Details',
              size: 150,
              id: 'viewDetails', // Added id
              Cell: ({ cell }) => (
                <Button onClick={() => handleGeneratePrescription(cell.row.original?.appointmentId)} 
                style={{    
                  background: "#6ED6F4",
                  boxShadow:"0 2px 5px rgba(0, 0, 0, 0.2)",
                  color: "black"}}>View Report</Button>
              ),
            },
          ]}
          data={data || []}
        />
      )}
      {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Patient Details
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
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
                <ListItemText primary={`Patient Name: ${selectedPatient.userId.fullname}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Payment: ${selectedPatient.amount===50000?"500":"100"}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Time Slot: ${selectedPatient.timeSlot}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Appointment Date: ${selectedPatient.appointmentDate}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Status: ${selectedPatient.status}`} />
              </ListItem>
              {selectedPatient.status === 'assigned' &&
              <ListItem>
              <ListItemText primary="Waiting for Doctor's Response" />
            </ListItem>
              }
              <ListItem>
               <button onClick={() => navigate(`/test-result/${selectedPatient.hairTestId._id}`)} className="view-test-btt">View Test Result</button>
             </ListItem>
              {selectedPatient.status === 'booked' && (
                <ListItem>
                  <Select
                    value={selectedDoctors[selectedPatient._id] || ''}
                    onChange={(e) => handleDoctorSelect(e, selectedPatient._id)}
                    displayEmpty
                    renderValue={(value) => (value ? value : 'Select Doctor')}
                    fullWidth
                  >
                    {data.map((doctor) => (
                      <MenuItem key={doctor._id} value={doctor.fullname}>
                        {doctor.fullname}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button onClick={(e) => handleAssign(e, selectedPatient._id)}>Assign Doctor</Button>
                </ListItem>
              )}
              {selectedPatient.status === 'completed' && (
                <ListItem>
                  <Button onClick={() => handleSendReport(selectedPatient.userId._id)}>Send Report to Patient</Button>
                  <Button onClick={() => handleGeneratePrescription(selectedPatient._id)}>Generate Prescription</Button>
                  <Button onClick={() => handleGenerateAssessmentReport(selectedPatient._id)}>Generate Assessment Report</Button>
                  <Button onClick={() => handleManagementReport(selectedPatient._id)}>Management Report</Button>
                </ListItem>
              )}
            </List>
          )}
        </DialogContent>
      </Dialog> */}
    </>
  );
}