// import React from 'react';
// import "./UserProfile.css";
// import { FaUser } from "react-icons/fa";
// import { MdEmail } from "react-icons/md";
// import { FaPhone } from "react-icons/fa";
// import { FaCartShopping } from "react-icons/fa6"
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../nav/Navbar'
// export default function UserProfile({children}) {
// const navigate=useNavigate();
// let storedUserData = localStorage.getItem("User343");
// let User=JSON.parse(storedUserData).logedInUser.user;
//   const name = User.fullname
//   const email = User.email
//   const phone = User.mobile
//   const orders = [
//     { id: 1, total: 50 },
//     { id: 2, total: 75 },
//     { id: 3, total: 100 }
//   ];

//   const handleLogout = () => {
//     // handle logout logic
//   };

//   const handleEdit = () => {
//     // handle edit logic
//   };

//   const handleClose = () => {
//     // handle close logic
//     navigate('/')
  

//   };

//   return (
//     <div className="popup-container">
//       <div className="popup">
//         <button className="close-btn" onClick={handleClose}>X</button>
//         <div className="user-profile">
//           <div className="user-info">
//             <div className='user-i'><FaUser size={25}/><div><label>FULL NAME</label><h3>{name}</h3></div></div>
//             <div className='user-i'><MdEmail size={25}/><div><label>E-MAIL</label><p> {email}</p></div></div>
//             <div className='user-i'><FaPhone size={25}/><div><label>PHONE</label><p>{phone}</p></div></div>
//           </div>
//           <div className="user-orders">
//             <h3>Orders</h3>
//             <ul>
//               {orders.map((order) => (
//                 <li key={order.id}>
//                   Order ID: {order.id} - Total: ${order.total}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>

    
  
//   )
import React from 'react'
import Sidebar from './Sidebar'
import MyReport from './MyReport'
import AllReports from './AllReports'

export default function UserReports() {
  return (
    <div>
        <Sidebar><AllReports/></Sidebar>
    </div>
  )
}
