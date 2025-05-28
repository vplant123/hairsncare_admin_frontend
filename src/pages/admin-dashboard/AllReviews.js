import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar';
import BASE_URL from '../../Config';
import { MaterialReactTable } from 'material-react-table';
import moment from 'moment';
import { Button } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
export default function AllReviews() {


  const [patientData,setPatientData] = useState([])
  let storedUserData = JSON.parse(localStorage.getItem("User343"));

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/getReviewAll`,{

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


  const deleteReview = async (id) => {
    try {
      console.log("nskrninre",id)
      const response = await fetch(`${BASE_URL}/admin/deleteReview/${id}`,{

      method: 'POST',
      headers: {
        'Authorization': storedUserData?.logedInUser?.accessToken,
        'Content-Type': 'application/json'
      },
      });
      const data = await response.json();
      console.log("skrofekr",data)
      const productData = data?.data;
      // setPatientData(productData);
      fetchProduct();
      toast.success("delete review successfully")
      // setReviews(productData.userReview);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };


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
              accessorKey: "comment",
              header: "Comment",
              size: 100,
              id: "comment", // Added id
            },
            {
              accessorKey: "rating",
              header: "Rating",
              size: 100,
              id: "rating", // Added id
            },
            {
              accessorKey: "productId.name",
              header: "Product Name",
              size: 100,
              id: "order", // Added id
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
                  onClick={() => deleteReview(cell.row.original?._id)}
                >
                  {"Delete"}
                </Button>
              ),
            },

          ]}
          data={patientData || []}
        />
            </div>
            <ToastContainer position="bottom-right" />
        </AdminNavbar>
  )
}