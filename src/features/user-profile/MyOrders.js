import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "../nav/Navbar";
import "./MyOrders.css";
import BASE_URL from "../../Config";
import moment from "moment";
import Footer from "../footer/Footer";
import { useNavigate } from "react-router-dom";
// Sample order data for demonstration purposes
// const sampleOrders = [
//   {
//     id: 1,
//     date: '2024-06-01',
//     total: '540.00',
//     status: 'Delivered',
//     items: [
//       { name: 'Aspirin', quantity: 2, price: '210.00' },
//       { name: 'Vitamin C', quantity: 1, price: '330.00' }
//     ]
//   },
//   {
//     id: 2,
//     date: '2024-06-15',
//     total: '125.00',
//     status: 'Pending',
//     items: [
//       { name: 'Ibuprofen', quantity: 1, price: '125.00' }
//     ]
//   }
// ];

// export default function MyOrders() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     // Simulate an API call to fetch orders
//     setTimeout(() => {
//       setOrders(sampleOrders);
//     }, 1000);
//   }, []);

//   return (
//    <Navbar>
//     <Sidebar>
//     <div className="my-orders">

//       {orders.length === 0 ? (
//         <p>Loading orders...</p>
//       ) : (
//         <ul>
//           {orders.map(order => (
//             <li key={order.id} className="order">
//               <h2>Order #{order.id}</h2>
//               <p>Date: {order.date}</p>
//               <p>Total: {order.total}</p>
//               <p>Status: {order.status}</p>
//               <div className="items">
//                 <h3>Items:</h3>
//                 <ul>
//                   {order.items.map((item, index) => (
//                     <li key={index}>
//                       {item.name} - Quantity: {item.quantity} - Price: {item.price}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//     </Sidebar>
//    </Navbar>
//   );
// }
const sampleOrders = [
  {
    id: 1,
    date: "2024-06-01",
    total: "Rs 50.00",
    status: "Shipped",
    items: [
      { name: "Aspirin", quantity: 2, price: "Rs 10.00" },
      { name: "Vitamin C", quantity: 1, price: "Rs 30.00" },
    ],
  },
  {
    id: 2,
    date: "2024-06-15",
    total: "Rs 25.00",
    status: "Pending",
    items: [{ name: "Ibuprofen", quantity: 1, price: "Rs 25.00" }],
  },
];

const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function MyOrders(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if(props?.setTitle) props?.setTitle(window.location.pathname)
  },[])

  const [orders, setOrders] = useState([]);
  let storedUserData = JSON.parse(localStorage?.getItem("User343"));

  useEffect(() => {
    fetch(`${BASE_URL}/users/get-orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: storedUserData?.logedInUser?.accessToken,
      },
      body: JSON.stringify({ userId: storedUserData?.logedInUser?.user?._id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("nkniknsf", data?.data);
        setOrders(data?.data);
      })
      .catch((error) => console.error("Error fetching addresses:", error));
  }, []);

  // useEffect(() => {
  //   // Simulate an API call to fetch orders
  //   setTimeout(() => {
  //     setOrders(sampleOrders);
  //   }, 1000);
  // }, []);

  const getStatusClass = (currentStatus, stepStatus) => {
    const statusOrder = statuses.indexOf(currentStatus);
    const stepOrder = statuses.indexOf(stepStatus);
    return stepOrder <= statusOrder ? "red" : "";
  };

  return (
    <Navbar>
      <Sidebar>
        <div className="my-orders">
          {orders?.length == 0 ? <div  className='d-flex flex-column'>
    <div style={{fontSize : "25px",fontWeight : "600"}}>No Orders Yet.</div>
    <div style={{fontSize : "18px",color: "#6ED6F4",cursor : "pointer"}} onClick={() => {
      navigate("/shop")
    }}>Order Now</div>
  </div> : (
            <ul style={{
              listStyleType: "none",paddingLeft : 0
          }}>
              {orders?.map((order) => {
                let x = statuses?.findIndex((e) => e?.toLowerCase() == order?.deliveryStatus?.toLowerCase());
                console.log("nwrenine",x,order?.deliveryStatus)
                return (
                  <li key={order.id} className="order">
                    <h2>Order #{order?._id}</h2>
                    <p>Date: {moment(order?.createdAt).format("DD/MM/YYYY HH:mm:ss")}</p>
                    <p>Total: ₹ {order?.amount}</p>
                    <p>Status: {order?.status}</p>
                    <p>Payment Mode: {order?.mode == "cash" ? "Cash on delivery" : "Online"}</p>
                    <p>Address: {order?.addressId?.fullAdress +" - " + order?.addressId?.city+" - "+order?.addressId?.state+" - "+order?.addressId?.pin}</p>
                    <p>Email: {order?.addressId?.email}</p>
                    <p>Phone: {order?.addressId?.phone}</p>
                    <p>{order?.invoideId ? "View Invoice" : ""}</p>


                    <div className="status-steps">
                      {statuses.map((status, index) => {
                        return (
                          <div key={status} className="status-step">
                            <div
                              className={`circle123 Rs {getStatusClass(order.status, status)}`}
                              style={{
                                backgroundColor: x >= index ? "blue" : "#ccc",
                              }}
                            >
                              {index + 1}
                            </div>
                            <div className="status-text">{status}</div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="items">
                      <h3>Items:</h3>
                      <ul>
                        {order?.products?.map((item, index) => (
                          <li key={index} onClick={() => navigate('/product-detail/' + item?.item?._id)} style={{cursor : "pointer"}}>
                            {item?.item?.name} - Quantity: {item?.quantity || 1} - Price:{" "}
                            {item?.item?.price}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </Sidebar>
      {/* <Footer/> */}
    </Navbar>
  );
}
