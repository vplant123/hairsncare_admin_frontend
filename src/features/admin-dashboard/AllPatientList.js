
import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import BASE_URL from '../../Config';
import { toast, ToastContainer } from 'react-toastify';
import { MaterialReactTable } from 'material-react-table';
import moment from 'moment';
import { Button } from 'reactstrap';
import { MenuItem, Select, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


export default function AllPatientList() {
    const handleBlockUser = (id) => { 
        // Handle blocking user logic here
        console.log(`User with ID ${id} blocked.`);
    };
    const [patientData,setPatientData] = useState([])
    let storedUserData = JSON.parse(localStorage.getItem("User343"));

    const fetchProduct = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/allUserData`,{

        method: 'POST',
        headers: {
          'Authorization': storedUserData?.logedInUser?.accessToken,
          'Content-Type': 'application/json'
        },
        });
        const data = await response.json();
        console.log("skrofekr",data)
        const productData = data?.data;
        setPatientData(productData);
        // setReviews(productData.userReview);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };


    useEffect(() => {
      fetchProduct();
      
    }, []);


    const deleteUser = async (userId) => {
      try {
        const response = await fetch(`${BASE_URL}/admin/deleteuser?userId=${userId}`,{

        method: 'DELETE',
        headers: {
          'Authorization': storedUserData?.logedInUser?.accessToken,
          'Content-Type': 'application/json'
        },
        });
        const data = await response.json();
        console.log("skrofekr",data)
        const productData = data?.data;
        // setPatientData(productData);
        toast.success("Block successfully")
        // setReviews(productData.userReview);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const handleDownloadExcel = () => {
      // Sample data

  
      // Create a new workbook
      const workbook = XLSX.utils.book_new();
  
      // Convert the data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(patientData);
  
      // Append the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
      // Generate a binary string representation of the workbook
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
      // Save the Excel file using file-saver
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, 'data.xlsx');
    };
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [open, setOpen] = useState(false);
  
    const handleRowClick = (patient) => {
      setSelectedPatient(patient);
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
      setSelectedPatient(null);
    };
    return (
      <AdminNavbar>
                <div className="all-patient-list-container">
          <button onClick={handleDownloadExcel}>Download</button>
          {/* <div className="patient-list">
                    {patientData?.map(patient => (
                        <div key={patient?._id} className="patient-item1">
                            <div className="patient-details">
                                <h3>{patient?.fullname}</h3>
                                <p>{patient?.email}</p>
                                <p>{patient?.mobile}</p>

                            </div>
                            <button className="block-button" onClick={() => deleteUser(patient?._id)}>{patient?.isDeleted ? "Blocked" : "Block User"}</button>
                        </div>
                    ))}
                </div> */}
        </div>
        <MaterialReactTable
          columns={[
            {
              accessorKey: "fullname",
              header: "Patient Name",
              size: 100,
              id: "patientName", // Added id
            },
            {
              accessorKey: "email",
              header: "Email",
              size: 100,
              id: "email", // Added id
            },
            {
              accessorKey: "mobile",
              header: "Phone",
              size: 100,
              id: "phone", // Added id
            },
            {
              accessorKey: "order",
              header: "Orders",
              size: 100,
              id: "order", // Added id
            },
            {
              // accessorKey: "OrderAmtPaid",
              header: "Order Amt",
              size: 100,
              id: "OrderAmtPaid", // Added id
              Cell: ({ cell }) => (
                <div>{cell.row.original?.OrderAmtPaid?.toFixed(2)}</div>
              ),
            },
            // {
            //   header: "Pend HaitTest",
            //   size: 100,
            //   id: "hairTestPending", // Added id
            //   Cell: ({ cell }) => (
            //    <div>{cell.row.original?.hairTestPending}</div>
            //   ),
            // },
            {
              header: "Com HaitTest",
              size: 100,
              id: "cHaitTest", // Added id
              Cell: ({ cell }) => (
                <div>{cell.row.original?.hairtestData?.length}</div>
              ),
            },
            {
              header: "Amt HaitTest",
              size: 100,
              id: "hairTestAmt", // Added id
              Cell: ({ cell }) => <div>{cell.row.original?.hairTestAmt}</div>,
            },
            {
              header: "Last Login",
              size: 100,
              id: "lastLogin", // Added id
              Cell: ({ cell }) => (
                <div>
                  {cell.row.original?.lastLogin
                    ? moment(cell.row.original?.lastLogin).format("DD-MM-YYYY")
                    : ""}
                </div>
              ),
            },
            {
              header: "",
              size: 100,
              id: "viewDetails", // Added id
              Cell: ({ cell }) => (
                <Button
                  className="block-button"
                  style={{
                    padding: "0 6px 0 6px",
                    background: cell.row.original?.isDeleted
                      ? "#dc3545"
                      : "#0056b3",
                  }}
                  onClick={() => handleRowClick(cell.row.original)}
                >
                  Cart
                </Button>
              ),
            },

            {
              header: "",
              size: 100,
              id: "viewDetails", // Added id
              Cell: ({ cell }) => (
                <Button
                  className="block-button"
                  style={{
                    padding: "0 6px 0 6px",
                    background: cell.row.original?.isDeleted
                      ? "#dc3545"
                      : "#0056b3",
                  }}
                  onClick={() => deleteUser(cell.row.original?._id)}
                >
                  {cell.row.original?.isDeleted ? "Blocked" : "Block User"}
                </Button>
              ),
            },
          ]}
          data={patientData || []}
        />


        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Cart Details
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
        {selectedPatient?.cart?.items?.length>0 ? (
            <List>
              {selectedPatient?.cart?.items?.map((item) => (
                <ListItem key={item?.item?._id}>
                  <ListItemText
                    primary={`${item?.item?.name} - Quantity: ${
                      item?.quantity
                    } - Price: ${item?.item?.price} - Total: ${
                     ( parseFloat(item?.item?.price) -
                      parseFloat(item?.item?.discount || 0)) *
                        parseFloat(item?.quantity)
                    } `}
                  />
                </ListItem>
              ))}
            </List>
          ) : <List>
            <ListItem>
              <ListItemText
                primary={`No Items Added in Cart`}
              />
            </ListItem>
        </List>}
        </DialogContent>
      </Dialog>
        <ToastContainer position="bottom-right" />
      </AdminNavbar>
    );
}
