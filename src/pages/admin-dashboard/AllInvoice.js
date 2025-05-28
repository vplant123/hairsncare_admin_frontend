
import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { MaterialReactTable } from 'material-react-table';
import { MenuItem, Select, Dialog, Button, DialogTitle, DialogContent, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BASE_URL from '../../Config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export default function AllInvoices() {
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
      const response = await fetch(`${BASE_URL}/admin/getInvoices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: storedUserData?.logedInUser?.accessToken,
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

  }, []);

  return (
    <AdminNavbar>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <MaterialReactTable
          columns={[
            {
              accessorKey: "name",
              header: "Patient Name",
              size: 150,
              id: "name", // Added id
            },
            {
              accessorKey: "doctor.name",
              header: "Doctor",
              size: 100,
              id: "doctor", // Added id
            },
            {
              accessorKey: "mobile",
              header: "Phone",
              size: 150,
              id: "mobile", // Added id
            },
            {
              accessorKey: "address",
              header: "Address",
              size: 150,
              id: "address", // Added id
            },
            {
                accessorKey: "total",
                header: "Total",
                size: 50,
                id: "total", // Added id
            },
            {
                accessorKey: "paidAmt",
                header: "Paid",
                size: 50,
                id: "paidAmt", // Added id
            },
            {
                accessorKey: "dues",
                header: "Dues",
                size: 50,
                id: "dues", // Added id
            },
            {
              accessorKey: "date",
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
              size:100,
              id: "status", // Added id
              Cell: ({ cell }) => {
                const status = cell.row.original.paid;
                return (
                  <div
                    style={{
                      backgroundColor : status && status == true ?  "rgb(149, 72, 154)" : "orange",
                      padding: "5px",
                      borderRadius: "4px",
                    }}
                  >
                    {"Paid"}
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
                  {"View Item"}
                </Button>
              ),
            },
            {
                header: "",
                size: 150,
                id: "viewDetails", // Added id
                Cell: ({ cell }) => (
                  <Button onClick={() => navigate(`/invoiceView/${cell.row.original?._id}`)}>
                    {"View"}
                  </Button>
                ),
              },
          ]}
          data={patientData || []}
        />
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Product Details
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
              {selectedPatient?.items?.map((item) => (
                <ListItem key={item?._id}>
                  <ListItemText
                    primary={`${item?.item?.name} - Quantity: ${
                      item?.quantity
                    } -  Discount: ${
                      item?.discount
                    } - GST: ${
                      item?.gst
                    } - Price: ${item?.rate} - Total: ${
                        ( parseFloat(item["quantity"] || 1) *
                        (parseFloat(item["rate"] || 0) -
                          parseFloat(item["discount"] || 0)) + ((      parseFloat(item["quantity"] || 1) *
                          (parseFloat(item["rate"] || 0) -
                            parseFloat(item["discount"] || 0))) * parseFloat(item["gst"] || 0))/100)?.toFixed(2)
                    } `}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>
    </AdminNavbar>
  );
}
