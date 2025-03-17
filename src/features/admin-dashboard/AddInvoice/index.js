import React, { useEffect, useState } from "react";
import AdminNavbar from "../AdminNavbar";
import BASE_URL from "../../../Config";
import { toast, ToastContainer } from "react-toastify";
import styles from "../../user-profile/Address.module.css";
import "./index.css";
import { MaterialReactTable } from "material-react-table";
import { Autocomplete, styled, TextField } from "@mui/material";
import { Button } from "reactstrap";

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '& .MuiAutocomplete-option[data-focus="true"]': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.primary.main,
  },
  '& .MuiAutocomplete-option[aria-selected="true"]': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

export default function AddInvoice({}) {
  // State variables to store form data
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(new Date());
  const [doctor, setDoctor] = useState("");
  const [language, setLanguage] = useState(doctor?.language || "");
  const [expertise, setExpertise] = useState(doctor?.expertise || [""]);
  const [password, setPassword] = useState("");
  const [totalAmt, setTotalAmt] = useState(0);
  const [dues, setDues] = useState(0);

  const [paidAmt, setPaidAmt] = useState(0);

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
    if (!name || !phone || !address || !date || !doctor || invoiceItem?.length<1 ) {
      toast.error("All fields are required.");
      return false;
    }

    return true;
  };

  // Function to handle form submission
  const handleSubmit = async (paid) => {
    // toast("test")
    if (!validateForm()) return;
    setLoading(true);
    let imageArr = [];

    try {
      let url = `${BASE_URL}/admin/addInvoice`;
      let method = "POST";
      let input = {
        name,
        mobile : phone,
        address,
        date,
        doctor : doctor?._id,
        items : invoiceItem,
        total : totalAmt,
        paid : paid,
        paidAmt,
        dues
      };

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
        "Invoice Create Successfully!"
      );
      setName("");
      setPhone("");
      setPassword("");
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
  };

  const [invoiceItem, setInvoiceItem] = useState([
    {
      item: null,
      quantity: 1,
      rate: "",
      gst: "",
      discount: "",
      discountPercent: "",
      total: "",
    },
  ]);

  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      setStatus(true);
      try {
        const response = await fetch(`${BASE_URL}/admin/product`);
        const data = await response.json();
        setProducts(data.message); // Adjust according to your API response structure
        setStatus(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setStatus(false);
      }
    };

    fetchProducts();
  }, []);

  const handleItem = (ind, val, name) => {
    console.log("====>>>",ind,val,name)
    const temp = invoiceItem?.map((item) => ({ ...item }));
    temp[ind][name] = val;

    if(name == "item"){
      let dA = ((parseFloat(val?.discount || 0)/parseFloat(val?.price || 0))*100)?.toFixed(2)
      temp[ind]["discount"] = val?.discount || 0;
      // temp[ind]["item"] = val;
      temp[ind]["discountPercent"] = dA || 0;
      temp[ind]["rate"] = val?.price || 0;
      temp[ind]["gst"] = val?.gst || 0;
    }
    if(name == "discountPercent"){
      temp[ind]["discount"] = ((parseFloat(temp[ind]["rate"] || 0) * parseFloat(temp[ind]["discountPercent"] || 0))/100)?.toFixed(2) ;
    }
    if(name == "discount"){
      temp[ind]["discountPercent"] = ((parseFloat(temp[ind]["rate"] || 0)/parseFloat(temp[ind]["discount"] || 0))*100)?.toFixed(2) ;
    }
    temp[ind]["total"] = (
      parseFloat(temp[ind]["quantity"] || 1) *
        (parseFloat(temp[ind]["rate"] || 0) -
          parseFloat(temp[ind]["discount"] || 0)) +
      (parseFloat(temp[ind]["quantity"] || 1) *
        (parseFloat(temp[ind]["rate"] || 0) -
          parseFloat(temp[ind]["discount"] || 0)) *
        parseFloat(temp[ind]["gst"] || 0)) /
        100
    )?.toFixed(2);
    setInvoiceItem(temp);
    let z = 0
    temp?.map((ity) => {
      z += parseFloat(ity["total"] || 0)
    })
    setTotalAmt(z)
  };

  const addItem = (ind, val, name) => {
    setInvoiceItem([
      ...invoiceItem,
      {
        item: null,
        quantity: 1,
        rate: "",
        gst: "",
        discount: "",
        discountPercent: "",
        total: "",
      },
    ]);
  };

  const deleteItem = (ind) => {
    const temp = invoiceItem?.filter((item, i) => i != ind);
    let z = 0
    temp?.map((ity) => {
      z += ity["total"]
    })
    setTotalAmt(z)
    setInvoiceItem(temp);
  };


  const [doctors,setDoctors] = useState([])
  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/all-doctor-Data`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      console.log("vejorj",jsonData)
      setDoctors(jsonData?.data);
    } catch (error) {
      toast.error('Error fetching doctors: ' + error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <AdminNavbar>
      <div className="add-invoice-container d-flex flex-column">
        <h2>Add Invoice</h2>
        <form>
          <div className="d-flex" style={{ gap: "20px", padding: "20px" }}>
            <label htmlFor="name">Payee Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              //   required
            />
          </div>

          <div className="d-flex" style={{ gap: "20px", padding: "20px" }}>
            <label htmlFor="name">Mobile:</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              //   required
            />
          </div>

          <div className="d-flex" style={{ gap: "20px", padding: "20px" }}>
            <label htmlFor="name">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              //   required
            />
          </div>

          <div className="d-flex" style={{ gap: "20px", padding: "20px" }}>
            <label htmlFor="name">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              //   required
            />
          </div>

          <div className="d-flex" style={{ gap: "20px", padding: "20px" }}>
            <label htmlFor="name">Doctor:</label>
            <StyledAutocomplete
                    options={doctors}
                    loading={status}
                    getOptionSelected={(option, value) =>
                      option?._id == value?._id
                    }
                    getOptionLabel={(item) => {
                      console.log("mkmeromore", item);
                      let reqValue = "";
                      if (item) {
                        if (item?._id) {
                          reqValue = item?.name;
                        }
                      }
                      return reqValue;
                    }}
                    onOpen={() => {
                      console.log("moo3");
                      // setAdd(true);
                    }}
                    style={{ width: "20%" }}
                    value={doctor}
                    onInputChange={(event, newValue) => {
                      console.log("jiejroj", event, newValue);
                      if (newValue == "") {
                        setDoctor(null);
                        // setFieldValue("addressId", "", true);
                      }
                    }}
                    onChange={(event, newValue) => {
                      setDoctor(newValue);
                      // setFieldValue("addressId", newValue?._id, true);
                      // setFieldValue("address", newValue, true);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select a Doctor"
                        variant="standard"
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: <>{params.InputProps.endAdornment}</>,
                        }}
                      />
                    )}
                  />
          </div>

          <MaterialReactTable
            columns={[
              {
                accessorKey: "amount",
                header: "Item Information",
                size: 100,
                id: "payment", // Added id
                Cell: ({ cell }) => (
                  <StyledAutocomplete
                    options={products}
                    loading={status}
                    getOptionSelected={(option, value) =>
                      option?._id == value?._id
                    }
                    getOptionLabel={(item) => {
                      console.log("mkmeromore", item);
                      let reqValue = "";
                      if (item) {
                        if (item?._id) {
                          reqValue = item?.name;
                        }
                      }
                      return reqValue;
                    }}
                    onOpen={() => {
                      console.log("moo3");
                      // setAdd(true);
                    }}
                    style={{ width: "80%" }}
                    value={cell.row.original?.item}
                    onInputChange={(event, newValue) => {
                      console.log("jiejroj", event, newValue);
                      if (newValue == "") {
                        handleItem(cell.row?.index,null,"item")
                        // setFieldValue("addressId", "", true);
                      }
                    }}
                    onChange={(event, newValue) => {
                      console.log("msdomfod", cell.row?.index, newValue);
                      handleItem(cell.row?.index,newValue,"item")
                      // setFieldValue("addressId", newValue?._id, true);
                      // setFieldValue("address", newValue, true);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select a Product"
                        variant="standard"
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: <>{params.InputProps.endAdornment}</>,
                        }}
                      />
                    )}
                  />
                ),
              },
              {
                accessorKey: "quantity",
                header: "Quantity",
                size: 100,
                id: "quantity", // Added id
                Cell: ({ cell }) => (
                  <div className={styles.formGroup}>
                    <input
                      type="number"
                      name="phone"
                      min={1}
                      value={cell.row.original?.quantity}
                      onChange={(e) => {
                        handleItem(
                          cell.row?.index,
                          e?.target?.value,
                          "quantity"
                        );
                      }}
                      required
                    />
                  </div>
                ),
              },
              {
                accessorKey: "rate",
                header: "Rate",
                size: 100,
                id: "rate", // Added id
                Cell: ({ cell }) => (
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      name="phone"
                      value={cell.row.original?.rate}
                      onChange={(e) => {
                        handleItem(cell.row?.index, e?.target?.value, "rate");
                      }}
                      required
                    />
                  </div>
                ),
              },

              {
                accessorKey: "gst",
                header: "GST(%)",
                size: 100,
                id: "gst", // Added id
                Cell: ({ cell }) => (
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      name="phone"
                      value={cell.row.original?.gst}
                      onChange={(e) => {
                        handleItem(cell.row?.index, e?.target?.value, "gst");
                      }}
                      required
                    />
                  </div>
                ),
              },

              {
                accessorKey: "discountPercent",
                header: "Discount",
                size: 100,
                id: "discountPercent", // Added id
                Cell: ({ cell }) => (
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      name="phone"
                      value={cell.row.original?.discountPercent}
                      onChange={(e) => {
                        handleItem(
                          cell.row?.index,
                          e?.target?.value,
                          "discountPercent"
                        );
                      }}
                      required
                    />
                  </div>
                ),
              },

              {
                accessorKey: "discountAmount",
                header: "Discount amount",
                size: 100,
                id: "discountAmount", // Added id
                Cell: ({ cell }) => (
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      name="phone"
                      value={cell.row.original?.discount}
                      onChange={(e) => {
                        handleItem(
                          cell.row?.index,
                          e?.target?.value,
                          "discount"
                        );
                      }}
                      required
                    />
                  </div>
                ),
              },

              {
                accessorKey: "total",
                header: "Total",
                size: 100,
                id: "total", // Added id
                Cell: ({ cell }) => (
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      name="phone"
                      readOnly
                      value={cell.row.original?.total}
                      onChange={(e) => {
                        handleItem(cell.row?.index, e?.target?.value, "total");
                      }}
                      required
                    />
                  </div>
                ),
              },

              {
                accessorKey: "action",
                header: "Action",
                size: 100,
                id: "action", // Added id
                Cell: ({ cell }) => (
                  <Button
                    //   type="submit"
                    style={{
                      width: "100%",
                      borderRadius: "5px",
                      backgroundColor: "#e31e24",
                      cursor: "pointer",
                    }}
                    className="generateOtp textAddCust Medium btn btn-secondary"
                    onClick={() => {
                      deleteItem(cell.row?.index);
                    }}
                  >
                    {/* {loading ? "loading" : "Place order"} */}
                    Delete
                  </Button>
                ),
              },
            ]}
            data={invoiceItem || []}
          />

          <div className="d-flex flex-column">
            <div
              className="d-flex"
              style={{
                padding: "10px 0 10px 0px",
                justifyContent: "space-between",
              }}
            >
              <Button
                //   type="submit"
                style={{
                  // width: "100%",
                  borderRadius: "5px",
                  backgroundColor: "#91b5da",
                  cursor: "pointer",
                }}
                className="generateOtp textAddCust Medium btn btn-secondary"
                onClick={() => {
                  addItem();
                }}
              >
                {/* {loading ? "loading" : "Place order"} */}+ Add Item
              </Button>

              <div
                className="d-flex"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div>Grand Total</div>
                <input
                  type="text"
                  name="phone"
                  value={totalAmt}
                  readOnly
                  // value={cell.row.original?.total}
                  // onChange={(e) => {
                  //   handleItem(cell.row?.index, e?.target?.value, "total");
                  // }}
                  required
                />
              </div>
            </div>

            <div
              className="d-flex"
              style={{
                padding: "10px 0 10px 0px",
                justifyContent: "space-between",
              }}
            >
              <Button
                //   type="submit"
                style={{
                  // width: "100%",
                  borderRadius: "5px",
                  backgroundColor: "#64af42",
                  cursor: "pointer",
                }}
                className="generateOtp textAddCust Medium btn btn-secondary"
                onClick={() => {
                  handleSubmit(1)
                }}
              >
                {/* {loading ? "loading" : "Place order"} */}Save And Paid
              </Button>

              <div
                className="d-flex"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div>Paid Amount : </div>
                <input
                  type="number"
                  name="phone"
                  value={paidAmt}
                  min={0}
                  onChange={(e) => {
                    if(e?.target?.value > totalAmt) return false;
                    else {setPaidAmt(e?.target?.value);
                    setDues((parseFloat(totalAmt || 0) - parseFloat(e?.target?.value || 0))?.toFixed(2))}
                  }}
                  required
                />
              </div>
            </div>

            <div
              className="d-flex"
              style={{
                padding: "10px 0 10px 0px",
                justifyContent: "space-between",
              }}
            >
              <Button
                //   type="submit"
                style={{
                  // width: "100%",
                  borderRadius: "5px",
                  backgroundColor: "#09498b",
                  cursor: "pointer",
                }}
                className="generateOtp textAddCust Medium btn btn-secondary"
                onClick={() => {
                  handleSubmit(0)
                }}
              >
                {/* {loading ? "loading" : "Place order"} */}Save
              </Button>

              <div
                className="d-flex"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div>Due : </div>
                <input
                  type="number"
                  name="phone"
                  value={dues}
                  min={0}
                  onChange={(e) => {
                    if(e?.target?.value > totalAmt) return false;
                    else{setDues(e?.target?.value);
                    setPaidAmt((parseFloat(totalAmt || 0) - parseFloat(e?.target?.value || 0))?.toFixed(2))}
                  }}
                />
              </div>
            </div>
          </div>
{/* 
          <button type="submit">
            {loading ? "Please wait" : doctor ? "Edit" : "Submit"}
          </button> */}
        </form>
      </div>

      <ToastContainer position="bottom-right" />
    </AdminNavbar>
  );
}
