



import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar';
import BASE_URL from '../../Config';
import { MaterialReactTable } from 'material-react-table';
import moment from 'moment';
import { Button } from 'reactstrap';
export default function AllContactUs() {
  
  
  const [patientData,setPatientData] = useState([])
  let storedUserData = JSON.parse(localStorage.getItem("User343"));

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/contactDetails`,{

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


  return (
    <AdminNavbar>
            <div className="all-patient-list-container">
             

            <MaterialReactTable
          columns={[
            {
              accessorKey: "name",
              header: "Name",
              size: 100,
              id: "name", // Added id
            },
            {
              accessorKey: "email",
              header: "Email",
              size: 100,
              id: "email", // Added id
            },
            {
              accessorKey: "phone",
              header: "Phone",
              size: 100,
              id: "phone", // Added id
            },
            {
              accessorKey: "msg",
              header: "message",
              size: 100,
              id: "order", // Added id
            },
            {
              accessorKey: "method",
              header: "Method",
              size: 100,
              id: "method", // Added id
            },

          ]}
          data={patientData || []}
        />
            </div>
        </AdminNavbar>
  )
}
