import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import BASE_URL from "../../Config";
import { toast, ToastContainer } from "react-toastify";
import styles from "../user-profile/Address.module.css";

export default function AddAdmin({ setDoctor, doctor }) {
  // State variables to store form data
  const [name, setName] = useState(doctor?.name || "");
  const [image, setImage] = useState(doctor?.image || null); // For image upload
  const [phone, setPhone] = useState(doctor?.phone || "");
  const [email, setEmail] = useState(doctor?.email || "");
  const [edit, setEdit] = useState(false);
  const [specialist, setSpecialist] = useState(doctor?.specialist || "");
  const [experience, setExperience] = useState(doctor?.experience || "");
  const [language, setLanguage] = useState(doctor?.language || "");
  const [expertise, setExpertise] = useState(doctor?.expertise || [""]);
  const [password, setPassword] = useState("");
  const [awards, setAwards] = useState([""]);
  const [qualification, setQualification] = useState(
    doctor?.qualification || ""
  );
  const [isSpec, setIsSpec] = useState(0);

  const [isImg, setIsImg] = useState(false);

  const [loading, setLoading] = useState(false);

  const handlesetExpertiseChange = (value, i) => {
    console.log("sjdijer", value, i);
    let input = expertise;
    input[i] = value;
    setExpertise(input);
  };
  const addsetExpertiseChange = () => {
    setExpertise([...expertise, ""]);
  };
  const removesetExpertisetChange = (ind) => {
    let input = expertise;
    let new1 = input?.filter((e, i) => i != ind);
    setExpertise(new1);
  };

  const handlesetAwardsChange = (value, i) => {
    const file = value.target.files[0];
    let input = awards;
    input[i] = file;
    setAwards(input);
  };
  const addsetAwardsChange = () => {
    setAwards([...awards, ""]);
  };
  const removesetAwardstChange = (ind) => {
    let input = awards;
    let new1 = input?.filter((e, i) => i != ind);
    setAwards(new1);
  };
  const [permissions, setPermissions] = useState({
    hairTest: 0,
    doctor: 0,
    patient: 0,
    website: 0,
    coupon: 0,
    orders: 0,
    contactus: 0,
    product: 0,
    reviews: 0,
    admin: 0,
  });

  const [addresses, setAddresses] = useState([]);
  let storedUserData = JSON.parse(localStorage?.getItem("User343"));

  useEffect(() => {
    fetch(`${BASE_URL}/admin/getAdmin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: storedUserData?.logedInUser?.accessToken,
      },
      //   body: JSON.stringify({ userId: storedUserData?.logedInUser?.user?._id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAddresses(data.data);
      })
      .catch((error) => console.error("Error fetching addresses:", error));
  }, []);

  const validateForm = () => {
    if (!name || !email || !phone || !password || !isSpec) {
      toast.error("All fields are required.");
      return false;
    }

    return true;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    // toast("test")
    e.preventDefault();
    if (!edit && !validateForm()) return;
    setLoading(true);
    let imageArr = [];
    console.log("moekrokf", awards);

    try {
        let url = `${BASE_URL}/admin/addAdmin`
        let method = "POST";
        let input = {
            fullname: name,
            email,
            mobile: phone,
            // password: password,
            role: isSpec,
            permission: permissions,
          }
        if(edit){
            url = `${BASE_URL}/admin/update-admin-profile`;
            method = "PUT"
        }
        else{
            input["password"] =  password;
        }
      const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Authorization: storedUserData?.logedInUser?.accessToken,
          },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        toast.error("Please logout and login again with valid credentials.");
        // You can update state or display error messages accordingly
        return;
      }

      toast.success(
        "Admin Added Successfully!"
      );
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setIsSpec(0);
      // Perform actions after successful login, such as updating state or redirecting
      fetch(`${BASE_URL}/admin/getAdmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: storedUserData?.logedInUser?.accessToken,
        },
        //   body: JSON.stringify({ userId: storedUserData?.logedInUser?.user?._id }),
      })
        .then((response) => response.json())
        .then((data) => {
          setAddresses(data.data);
        })
        .catch((error) => console.error("Error fetching addresses:", error));
    } catch (error) {
      toast.error("Please logout and login again with valid credentials.");
    } finally {
      setLoading(false); // Hide loader regardless of success or failure
    }
  };

  // Function to handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Handle file upload logic here
    console.log("Image uploaded:", file);
    setIsImg(true);
    setImage(file);
  };

  return (
    <AdminNavbar>
      <div className="d-flex admin-right-side-width">
        <div className="admin-1">
          <ul className={styles.addressList}>
            {addresses?.map((address, index) => (
              <li key={index} className={styles.addressItem}>
                <p>
                  <strong>Name:</strong> {address?.fullname}
                </p>
                <p>
                  <strong>email:</strong> {address?.email}
                </p>
                <p>
                  <strong>phone:</strong> {address?.mobile}
                </p>
                <p>
                  <strong>role:</strong> {address?.role}
                </p>
                {/* <button onClick={() => handleEdit(address)} className={styles.button}>Edit</button> */}
                <button
                  style={{ margin: "0 0 0 5px" }}
                  onClick={() => {
                    setName(address?.fullname);
                    setEmail(address?.email);
                    setPhone(address?.mobile);
                    setIsSpec(address?.role);
                    setPermissions(address?.permission);
                    setEdit(true);
                  }}
                  className={styles.button}
                >
                  Edit
                </button>
                <button
                  style={{ margin: "0 0 0 5px", backgroundColor: "#e31e24"}}
                  onClick={() => {}}
                  className={styles.button}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="add-doctor-container admin-1" >
          <h2>Add Admin</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            //   required
            />

            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            //   required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            //   required
            />

            {!edit && (
              <>
                <label htmlFor="address">Password:</label>
                <input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                //   required
                />
              </>
            )}

            <label htmlFor="isSpec">Role</label>
            <div className="d-flex flex-column">
              <div className="d-flex">
                <label htmlFor="isSpec">Admin</label>
                <input
                  type="checkbox"
                  style={{ margin: "0 0 0 20px" }}
                  id="isSpec"
                  checked={isSpec == "admin"}
                  onChange={(e) => {
                    if (isSpec == "admin") setIsSpec(0);
                    else setIsSpec("admin");
                  }}
                  // required
                />
              </div>
              <div className="d-flex">
                <label htmlFor="isSpec">Sub Admin</label>
                <input
                  type="checkbox"
                  style={{ margin: "0 0 0 20px" }}
                  id="isSpec"
                  checked={isSpec == "subadmin"}
                  onChange={(e) => {
                    if (isSpec == "subadmin") setIsSpec(0);
                    else setIsSpec("subadmin");
                  }}
                  // required
                />
              </div>
            </div>

            {isSpec == "subadmin" && (
              <div>
                <label htmlFor="isSpec" style={{ fontSize: "24px" }}>
                  Add Permissions
                </label>
                <div className="d-flex flex-column">
                  <div className="d-flex">
                    <label htmlFor="isSpec">Hair Test</label>
                    <input
                      type="checkbox"
                      style={{ margin: "0 0 0 20px" }}
                      id="isSpec"
                      checked={permissions.hairTest == 1}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPermissions({ ...permissions, hairTest: 1 });
                        } else setPermissions({ ...permissions, hairTest: 0 });
                      }}
                      // required
                    />
                  </div>{" "}
                  <div className="d-flex">
                    <label htmlFor="isSpec">Doctors</label>
                    <input
                      type="checkbox"
                      style={{ margin: "0 0 0 20px" }}
                      id="isSpec"
                      checked={permissions?.doctor == 1}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPermissions({ ...permissions, doctor: 1 });
                        } else setPermissions({ ...permissions, doctor: 0 });
                      }}
                      // required
                    />
                  </div>{" "}
                  <div className="d-flex">
                    <label htmlFor="isSpec">Patient</label>
                    <input
                      type="checkbox"
                      style={{ margin: "0 0 0 20px" }}
                      id="isSpec"
                      checked={permissions?.patient == 1}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPermissions({ ...permissions, patient: 1 });
                        } else setPermissions({ ...permissions, patient: 0 });
                      }}
                      // required
                    />
                  </div>{" "}
                  <div className="d-flex">
                    <label htmlFor="isSpec">Manage website</label>
                    <input
                      type="checkbox"
                      style={{ margin: "0 0 0 20px" }}
                      id="isSpec"
                      checked={permissions?.website == 1}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPermissions({ ...permissions, website: 1 });
                        } else setPermissions({ ...permissions, website: 0 });
                      }}
                      // required
                    />
                  </div>{" "}
                  <div className="d-flex">
                    <label htmlFor="isSpec">coupon</label>
                    <input
                      type="checkbox"
                      style={{ margin: "0 0 0 20px" }}
                      id="isSpec"
                      checked={permissions?.coupon == 1}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPermissions({ ...permissions, coupon: 1 });
                        } else setPermissions({ ...permissions, coupon: 0 });
                      }}
                      // required
                    />
                  </div>{" "}
                  <div className="d-flex">
                    <label htmlFor="isSpec">Orders</label>
                    <input
                      type="checkbox"
                      style={{ margin: "0 0 0 20px" }}
                      id="isSpec"
                      checked={permissions?.orders == 1}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPermissions({ ...permissions, orders: 1 });
                        } else setPermissions({ ...permissions, orders: 0 });
                      }}
                      // required
                    />
                  </div>{" "}
                  <div className="d-flex">
                    <label htmlFor="isSpec">Contactus</label>
                    <input
                      type="checkbox"
                      style={{ margin: "0 0 0 20px" }}
                      id="isSpec"
                      checked={permissions?.contactus == 1}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPermissions({ ...permissions, contactus: 1 });
                        } else setPermissions({ ...permissions, contactus: 0 });
                      }}
                      // required
                    />
                  </div>
                  <div className="d-flex">
                    <label htmlFor="isSpec">Product</label>
                    <input
                      type="checkbox"
                      style={{ margin: "0 0 0 20px" }}
                      id="isSpec"
                      checked={permissions?.product == 1}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPermissions({ ...permissions, product: 1 });
                        } else setPermissions({ ...permissions, product: 0 });
                      }}
                      // required
                    />
                  </div>
                  <div className="d-flex">
                    <label htmlFor="isSpec">Reviews</label>
                    <input
                      type="checkbox"
                      style={{ margin: "0 0 0 20px" }}
                      id="isSpec"
                      checked={permissions?.reviews == 1}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPermissions({ ...permissions, reviews: 1 });
                        } else setPermissions({ ...permissions, reviews: 0 });
                      }}
                      // required
                    />
                  </div>
                  <div className="d-flex">
                    <label htmlFor="isSpec">Create Admin</label>
                    <input
                      type="checkbox"
                      style={{ margin: "0 0 0 20px" }}
                      id="isSpec"
                      checked={permissions?.admin == 1}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPermissions({ ...permissions, admin: 1 });
                        } else setPermissions({ ...permissions, admin: 0 });
                      }}
                      // required
                    />
                  </div>
                </div>
              </div>
            )}

            <button type="submit">
              {loading ? "Please wait" : doctor ? "Edit" : "Submit"}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="bottom-right" />
    </AdminNavbar>
  );
}
