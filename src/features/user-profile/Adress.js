// import React, { useState, useEffect } from 'react';
// import Sidebar from './Sidebar';
// import styles from './Address.module.css';

// const dummyApiUrl = 'https://jsonplaceholder.typicode.com/users'; // Replace this with your dummy API

// export default function Address() {
//   const [addresses, setAddresses] = useState([]);
//   const [newAddress, setNewAddress] = useState({
//     name: '',
//     phone: '',
//     state: '',
//     city: '',
//     pin: '',
//     email: '',
//     fullAdress: ''
//   });

//   useEffect(() => {
//     // Fetch existing addresses from the dummy API
//     fetch(dummyApiUrl)
//       .then(response => response.json())
//       .then(data => {
//         // Assuming the API response structure is compatible
//         setAddresses(data);
//       })
//       .catch(error => console.error('Error fetching addresses:', error));
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewAddress({
//       ...newAddress,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add new address to the addresses list
//     setAddresses([...addresses, newAddress]);
//     // Reset form
//     setNewAddress({
//       name: '',
//       phone: '',
//       state: '',
//       city: '',
//       pin: '',
//       email: '',
//       fullAdress: ''
//     });
//   };

//   return (
//     <Sidebar>
//       <div className={styles.container}>
//         <h2 className={styles.header}>Addresses</h2>
//         <ul className={styles.addressList}>
//           {addresses.map((address, index) => (
//             <li key={index} className={styles.addressItem}>
//               <p><strong>Name:</strong> {address.name}</p>
//               <p><strong>Phone:</strong> {address.phone}</p>
//               <p><strong>State:</strong> {address.state}</p>
//               <p><strong>City:</strong> {address.city}</p>
//               <p><strong>Pin:</strong> {address.pin}</p>
//               <p><strong>Email:</strong> {address.email}</p>
//               <p><strong>Full Address:</strong> {address.address.street}, {address.address.suite}, {address.address.city}, {address.address.zipcode}</p>
//             </li>
//           ))}
//         </ul>
//         <h2 className={styles.header}>Add New Address</h2>
//         <form onSubmit={handleSubmit} className={styles.form}>
//           <div className={styles.formGroup}>
//             <label>Name: </label>
//             <input
//               type="text"
//               name="name"
//               value={newAddress.name}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>Phone: </label>
//             <input
//               type="text"
//               name="phone"
//               value={newAddress.phone}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>State: </label>
//             <input
//               type="text"
//               name="state"
//               value={newAddress.state}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>City: </label>
//             <input
//               type="text"
//               name="city"
//               value={newAddress.city}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>Pin: </label>
//             <input
//               type="text"
//               name="pin"
//               value={newAddress.pin}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>Email (optional): </label>
//             <input
//               type="email"
//               name="email"
//               value={newAddress.email}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>Full Address: </label>
//             <textarea
//               name="fullAdress"
//               value={newAddress.fullAdress}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <button type="submit" className={styles.button}>Add Address</button>
//         </form>
//       </div>
//     </Sidebar>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import Sidebar from './Sidebar';
// import styles from './Address.module.css';
// import BASE_URL from '../../Config';
// import { toast } from 'react-toastify';
// const fetchApiUrl = `${BASE_URL}/users/getAddress`; // Replace this with your fetch API
// const addApiUrl = `${BASE_URL}/users/addAddress`; // Replace this with your add address API

// export default function Address() {
//   let storedUserData = JSON.parse(localStorage.getItem("User343"));
//   const [addresses, setAddresses] = useState([]);
//   const [newAddress, setNewAddress] = useState({

//     name: '',
//     phone: '',
//     state: '',
//     city: '',
//     pin: '',
//     email: '',
//     fullAdress: ''
//   });
//   console.log(storedUserData)
//   useEffect(() => {
//     // Fetch existing addresses from the API
//     fetch(fetchApiUrl,{
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization':storedUserData.logedInUser.accessToken
//       },
//       body: JSON.stringify({userId:storedUserData.logedInUser?.user?._id,}),
//     })
//       .then(response => response.json())
//       .then(data => {
//         toast.success("Address Added Successfully")
//       console.log(data)
//         // Assuming the API response structure is compatible
//         setAddresses(data.data);
//       })
//       .catch(error => console.error('Error fetching addresses:', error));
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewAddress({
//       ...newAddress,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Add new address to the server
//     fetch(addApiUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization':storedUserData.logedInUser.accessToken
//       },
//       body: JSON.stringify({...newAddress, userId:storedUserData.logedInUser?.user?._id,}),
//     })
//       .then(response => response.json())
//       .then(data => {
//         // Add the new address to the local state
//         setAddresses([...addresses, data]);
//         console.log({...newAddress, userId:storedUserData.logedInUser?.user?._id,})
//         // Reset form
//         setNewAddress({
         
//           name: '',
//           phone: '',
//           state: '',
//           city: '',
//           pin: '',
//           email: '',
//           fullAdress: ''
//         });
//       })
//       .catch(error => console.error('Error adding address:', error));
//   };

//   return (
//     <Sidebar>
//       <div className={styles.container}>
//         <h2 className={styles.header}>Addresses</h2>
//         <ul className={styles.addressList}>
//           {addresses.map((address, index) => (
//             <li key={index} className={styles.addressItem}>
//               <p><strong>Name:</strong> {address.name}</p>
//               <p><strong>Phone:</strong> {address.phone}</p>
//               <p><strong>State:</strong> {address.state}</p>
//               <p><strong>City:</strong> {address.city}</p>
//               <p><strong>Pin:</strong> {address.pin}</p>
//               <p><strong>Email:</strong> {address.email}</p>
//               <p><strong>Full Address:</strong> {address.fullAdress}</p>
//             </li>
//           ))}
//         </ul>
//         <h2 className={styles.header}>Add New Address</h2>
//         <form onSubmit={handleSubmit} className={styles.form}>
//           <div className={styles.formGroup}>
//             <label>Name: </label>
//             <input
//               type="text"
//               name="name"
//               value={newAddress.name}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>Phone: </label>
//             <input
//               type="text"
//               name="phone"
//               value={newAddress.phone}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>State: </label>
//             <input
//               type="text"
//               name="state"
//               value={newAddress.state}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>City: </label>
//             <input
//               type="text"
//               name="city"
//               value={newAddress.city}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>Pin: </label>
//             <input
//               type="text"
//               name="pin"
//               value={newAddress.pin}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>Email (optional): </label>
//             <input
//               type="email"
//               name="email"
//               value={newAddress.email}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className={styles.formGroup}>
//             <label>Full Address: </label>
//             <textarea
//               name="fullAdress"
//               value={newAddress.fullAdress}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <button type="submit" className={styles.button}>Add Address</button>
//         </form>
//       </div>
//     </Sidebar>
//   );
// }
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import styles from './Address.module.css';
import BASE_URL from '../../Config';
import { toast, ToastContainer } from 'react-toastify';
import Navbar from '../nav/Navbar';
import Footer from '../footer/Footer';

const fetchApiUrl = `${BASE_URL}/users/getAddress`;
const addApiUrl = `${BASE_URL}/users/addAddress`;
const editApiUrl = `${BASE_URL}/users/editAddress`;
const deleteApiUrl = `${BASE_URL}/users/deleteAddress`;

export default function Address(props) {


  useEffect(() => {
    if(props?.setTitle) props?.setTitle(window.location.pathname)
  },[])




  let storedUserData = JSON.parse(localStorage?.getItem("User343"));
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    state: '',
    city: '',
    pin: '',
    email: '',
    fullAdress: ''
  });
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    fetch(fetchApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': storedUserData?.logedInUser?.accessToken
      },
      body: JSON.stringify({ userId: storedUserData?.logedInUser?.user?._id }),
    })
      .then(response => response.json())
      .then(data => {
        setAddresses(data.data);
      })
      .catch(error => console.error('Error fetching addresses:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({
      ...newAddress,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl = editingAddress ? editApiUrl : addApiUrl;
    const method = editingAddress ? 'POST' : 'POST';
    const addressData = editingAddress ? { ...newAddress, id: editingAddress._id } : newAddress;
    console.log("jsiejfijer",addressData)
    if(!addressData?.name) {
      toast.error("Please provide name");
      return false
    }
    if(!addressData?.phone) {
      toast.error("Please provide name");
      return false
    }
    else{
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(addressData?.phone)) {
        toast.error("Please provide correct phone number");
        return false;
      }
    }

    if(!addressData?.fullAdress) {
      toast.error("Please provide address");
      return false
    }
    if(!addressData?.pin) {
      toast.error("Please provide pincode");
      return false
    }
    else{
      let pincodeRegex = /^[0-9]\d{5}$/;
      if (!pincodeRegex.test(addressData?.pin)) {
        toast.error("Please provide correct pincode");
        return false;
      }
    }
    if(!addressData?.state) {
      toast.error("Please provide state name");
      return false
    }

    if(!addressData?.city) {
      toast.error("Please provide city name");
      return false
    }

    fetch(apiUrl, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': storedUserData.logedInUser.accessToken
      },
      body: JSON.stringify({ ...addressData, userId: storedUserData.logedInUser?.user?._id }),
    })
      .then(response => response.json())
      .then(data => {
        console.log("nwenifew",data)
        if (editingAddress) {
          toast.success("Address edit successfully");
          setAddresses(addresses.map(addr => addr._id == editingAddress._id ? data?.data : addr));
        } else {
          toast.success("Address saved successfully");
          setAddresses([...addresses, data?.data]);
        }
        setEditingAddress(null);
        setNewAddress({
          name: '',
          phone: '',
          state: '',
          city: '',
          pin: '',
          email: '',
          fullAdress: ''
        });
      })
      .catch(error => {
        console.error('Error adding/editing address:', error)
        toast.error("Please logout and login again with valid credentials.");
      });
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setNewAddress(address);
  };

  const handleDelete = (id) => {
    fetch(deleteApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': storedUserData.logedInUser.accessToken
      },
      body: JSON.stringify({ id }),
    })
      .then(response => response.json())
      .then(data => {
        toast.success("Address delete successfully");
        setAddresses(addresses.filter(addr => addr._id !== id));
      })
      .catch(error => {
        toast.error("Please logout and login again with valid credentials.");
        console.error('Error deleting address:', error)
      });
  };

  return (
    <Navbar>

    <Sidebar>
      <div className={styles.container} style={{padding : 0}}>
        {/* <h2 className={styles.header}>Addresses</h2> */}
        <ul className={styles.addressList}>
          {addresses?.map((address, index) => (
            <li key={index} className={styles.addressItem}>
              <p><strong>Name:</strong> {address.name}</p>
              <p><strong>Phone:</strong> {address.phone}</p>
              <p><strong>State:</strong> {address.state}</p>
              <p><strong>City:</strong> {address.city}</p>
              <p><strong>Pin:</strong> {address.pin}</p>
              <p><strong>Email:</strong> {address.email}</p>
              <p><strong>Full Address:</strong> {address.fullAdress}</p>
              <button onClick={() => handleEdit(address)} className={styles.button}>Edit</button>
              <button style={{margin: "0 0 0 5px"}} onClick={() => handleDelete(address._id)} className={styles.button}>Delete</button>
            </li>
          ))}
        </ul>
        <h2 className={styles.header}>{editingAddress ? 'Edit Address' : 'Add New Address'}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={newAddress.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Phone: </label>
            <input
              type="text"
              name="phone"
              value={newAddress.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>State: </label>
            <input
              type="text"
              name="state"
              value={newAddress.state}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>City: </label>
            <input
              type="text"
              name="city"
              value={newAddress.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Pin: </label>
            <input
              type="text"
              name="pin"
              value={newAddress.pin}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Email (optional): </label>
            <input
              type="email"
              name="email"
              value={newAddress.email}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Full Address: </label>
            <textarea
              name="fullAdress"
              value={newAddress.fullAdress}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className={styles.button}>{editingAddress ? 'Save Changes' : 'Add Address'}</button>
        </form>
      </div>
      <ToastContainer position="bottom-right"/>
    </Sidebar>
    {/* <Footer/> */}
    </Navbar>
  );
}
