
import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { MaterialReactTable } from 'material-react-table';
import { MenuItem, Select, Dialog, Button, DialogTitle, DialogContent, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BASE_URL from '../../Config';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export default function PendingDashboard() {
  const [data, setData] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [selectedDoctors, setSelectedDoctors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  let storedUserData = JSON.parse(localStorage.getItem("User343"));

  console.log("nakaja",patientData)
  const fetchAppointment = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/admin/allPendingAppointment`, {
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

  const handleGeneratePrescription = (userId) => {
    window.open(`/doctor/report/${userId}`)
    toast.info('Generating Prescription for user ' + userId);
  };

  const handleGenerateAssessmentReport = (userId) => {
    window.open(`/doctor-analyse-report/${userId}`)
    toast.info('Generating Assessment Report for user ' + userId);
  };

  const handleManagementReport = (userId) => {
    window.open(`/management-report/${userId}`)
    toast.info('Generating Management Report for user ' + userId);
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


  const sendWhatsapp = async (patient) => {
    console.log("moreo",patient)

    try {
      const response = await fetch(`${BASE_URL}/admin/sendWhatsapp?userId=${patient?.userId?._id}`, {
        method: 'POST',
        headers: {
          'Authorization': storedUserData.logedInUser.accessToken,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Failed to assign doctor');
      }
      const datt = await response.json();
      toast.success("whatsapp send successfully");
    } catch (error) {
      toast.error('Error assigning doctor: ' + error.message);
    }
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
                    backgroundColor: "orange",
                    padding: "5px",
                    borderRadius: "4px",
                  }}
                >
                  ₹ {cell.row.original.amount}
                </span>
                // <div> -
                //     </div>
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
                    backgroundColor = "yellow";
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
              accessorKey: "Progress",
              header: "Progress",
              size: 150,
              id: "Progress", // Added id
              Cell: ({ cell }) => {
                // const status = cell.row.original.status.toLowerCase();
                let backgroundColor;
                let color;
                let progress = 0;
                if (cell.row.original?.hairTestId?.personal) progress = "20%";
                if (cell.row.original?.hairTestId?.Nutritional)
                  progress = "40%";
                if (cell.row.original?.hairTestId?.LifeStyle) progress = "60%";
                if (cell.row.original?.hairTestId?.Stress) progress = "80%";
                if (cell.row.original?.hairTestId?.HairAndScalp)
                  progress = "100%";

                return (
                  <div
                    style={{
                      backgroundColor,
                      color,
                      padding: "5px",
                      borderRadius: "4px",
                    }}
                  >
                    {progress}
                  </div>
                );
              },
            },
            {
              header: "",
              size: 150,
              id: "viewDetails", // Added id
              Cell: ({ cell }) => (
                <Button onClick={() => sendWhatsapp(cell.row.original)}>
                  Send Whatsapp
                </Button>
              ),
            },
            {
              header: "",
              size: 150,
              id: "viewDetails", // Added id
              Cell: ({ cell }) => (
                <Button onClick={() => handleRowClick(cell.row.original)}>
                  View Report
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
                  primary={`Patient Name: ${selectedPatient.userId.fullname}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Payment: -`} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Time Slot: ${selectedPatient?.timeSlot || ""}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Appointment Date: ${
                    selectedPatient?.appointmentDate || ""
                  }`}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Status: ${selectedPatient.status}`} />
              </ListItem>
              {selectedPatient.status === "assigned" && (
                <ListItem>
                  <ListItemText primary="Waiting for Doctor's Response" />
                </ListItem>
              )}
              <ListItem>
                <button
                  onClick={() =>
                    navigate(
                      `/pending-test-result/${selectedPatient.hairTestId._id}`
                    )
                  }
                  className="view-test-btt"
                >
                  View Test Result
                </button>
              </ListItem>
              {selectedPatient.status === "pending" && (
                <ListItem>
                  <Select
                    value={selectedDoctors[selectedPatient._id] || ""}
                    onChange={(e) => handleDoctorSelect(e, selectedPatient._id)}
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
                  <Button onClick={(e) => handleAssign(e, selectedPatient._id)}>
                    Assign Doctor
                  </Button>
                </ListItem>
              )}
              {selectedPatient.status === "completed" && (
                <ListItem>
                  <Button
                    onClick={() =>
                      handleGenerateAssessmentReport(selectedPatient.userId._id)
                    }
                  >
                    Generate Assessment Report
                  </Button>
                  <Button
                    onClick={() =>
                      handleManagementReport(selectedPatient.userId._id)
                    }
                  >
                    Management Report
                  </Button>
                  <Button
                    onClick={() =>
                      handleGeneratePrescription(selectedPatient.userId._id)
                    }
                  >
                    Generate Prescription
                  </Button>

                  <Button
                    onClick={() => handleSendReport(selectedPatient.userId._id)}
                  >
                    Send Report to Patient
                  </Button>
                </ListItem>
              )}
            </List>
          )}
        </DialogContent>
      </Dialog>
      <ToastContainer position="bottom-right"/>
    </AdminNavbar>
  );
}
