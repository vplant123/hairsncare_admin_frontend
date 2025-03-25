
import React, { useState, useEffect } from 'react';
import styles from '../../user-profile/Address.module.css';
import BASE_URL from '../../../Config';
import { toast, ToastContainer } from 'react-toastify';
import AdminNavbar from '../AdminNavbar';
import moment from 'moment';


const fetchApiUrl = `${BASE_URL}/admin/getCoupons`;
const addApiUrl = `${BASE_URL}/admin/editCoupon`;
const editApiUrl = `${BASE_URL}/admin/editCoupon`;
const deleteApiUrl = `${BASE_URL}/admin/deleteCoupon`;

export default function AllCoupons(props) {


  useEffect(() => {
    if (props?.setTitle) props?.setTitle(window.location.pathname)
  }, [])




  let storedUserData = JSON.parse(localStorage?.getItem("User343"));
  const [addresses, setAddresses] = useState([]);
  const [coupon, setCoupon] = useState({
    code: '',
    percent: '',
    validity: '',
    type: '',
    isActive: true
  });
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    fetch(fetchApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': storedUserData?.logedInUser?.accessToken
      },
      //   body: JSON.stringify({ userId: storedUserData?.logedInUser?.user?._id }),
    })
      .then(response => response.json())
      .then(data => {
        setAddresses(data.data);
      })
      .catch(error => console.error('Error fetching addresses:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCoupon({
      ...coupon,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl = editingAddress ? editApiUrl : addApiUrl;
    const method = editingAddress ? 'POST' : 'POST';
    const addressData = editingAddress ? { ...coupon, id: editingAddress._id } : coupon;
    console.log("jsiejfijer", addressData)

    if (!addressData?.code) {
      toast.error("Please code name");
      return false
    }

    if (!addressData?.percent) {
      toast.error("Please provide percent");
      return false
    }
    if (!addressData?.validity) {
      toast.error("Please provide pincode");
      return false
    }
    else {
      addressData.validity = moment(addressData?.validity).format("YYYY-MM-DD")
    }

    if (!addressData?.type) {
      toast.error("Please provide type name");
      return false
    }


    fetch(apiUrl, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': storedUserData.logedInUser.accessToken
      },
      body: JSON.stringify({ ...addressData }),
    })
      .then(response => response.json())
      .then(data => {
        if (editingAddress) {
          toast.success("Address edit successfully");
          setAddresses(addresses.map(addr => addr._id == editingAddress._id ? data?.data : addr));
        } else {
          toast.success("Address saved successfully");
          setAddresses([...addresses, data?.data]);
        }
        setEditingAddress(null);
        setCoupon({
          code: '',
          percent: '',
          validity: '',
          type: '',
        });
      })
      .catch(error => {
        console.error('Error adding/editing address:', error)
        toast.error("Please logout and login again with valid credentials.");
      });
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setCoupon(address);
    console.log("knerig", address)
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
    <AdminNavbar>

      <div className={styles.container}>
        {/* <h2 className={styles.header}>Addresses</h2> */}
        <ul className={styles.addressList}>
          {addresses?.map((address, index) => (
            <li key={index} className={styles.addressItem}>
              <p><strong>Code:</strong> {address?.code}</p>
              <p><strong>Percent:</strong> {address?.percent}</p>
              <p><strong>validity:</strong> {address?.validity}</p>
              <p><strong>type:</strong> {address?.type == "1" ? "Hait-test" : address.type == "2" ? "Order" : "Both"}</p>
              <button onClick={() => handleEdit(address)} className={styles.button}>Edit</button>
              <button style={{ margin: "0 0 0 5px" }} onClick={() => handleDelete(address._id)} className={styles.button}>Delete</button>
            </li>
          ))}
        </ul>
        <h2 className={styles.header}>{editingAddress ? 'Edit Address' : 'Add New Address'}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Code: </label>
            <input
              type="text"
              name="code"
              value={coupon.code}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Percent: </label>
            <input
              type="number"
              name="percent"
              value={coupon.percent}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Validity: </label>
            <input
              type="date"
              name="validity"
              value={coupon.validity ? moment(coupon.validity).format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD")}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup} style={{ display: "flex", gap: "20px" }}>
            <label>type: </label>
            <div style={{ display: "flex", gap: "10px" }}>
              <label>Hair Test: </label>
              <input
                type="checkbox"
                name="type"
                checked={coupon.type == "1" ? true : false}
                onChange={() => handleInputChange({
                  target: {
                    name: "type",
                    value: "1"
                  }
                })}
              //   required
              />
              <label>Order: </label>
              <input
                type="checkbox"
                name="type"
                checked={coupon.type == "2" ? true : false}
                onChange={() => handleInputChange({
                  target: {
                    name: "type",
                    value: "2"
                  }
                })}
              //   required
              />
              <label>Both: </label>

              <input
                type="checkbox"
                name="type"
                checked={coupon.type == "3" ? true : false}
                onChange={() => handleInputChange({
                  target: {
                    name: "type",
                    value: "3"
                  }
                })}
              //   required
              />
            </div>


          </div>
          <div className={styles.formGroup} style={{ display: "flex", width: "110px", justifyContent: "space-between", alignItems: "center" }}>
            <label>Is Active: </label>
            <input
              type="checkbox"
              name="type"
              style={{ width: "20px", height: "20px" }}
              value={coupon.isActive}
              checked={coupon.isActive}
              onChange={(state) => {
                handleInputChange({
                  target: {
                    name: "isActive",
                    value: state.target.checked
                  }
                })
              }}
            />
          </div>
          <button type="submit" className={styles.button}>{editingAddress ? 'Save Changes' : 'Add Coupon'}</button>
        </form>
      </div>
      <ToastContainer position="bottom-right" />
    </AdminNavbar>
  );
}
