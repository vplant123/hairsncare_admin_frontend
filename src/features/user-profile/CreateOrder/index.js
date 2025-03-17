import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./../Sidebar";
import Navbar from "../../nav/Navbar";
import "./index.css";
import { Formik } from "formik";
import { Button, Form, FormGroup } from "reactstrap";
import BASE_URL from "../../../Config";
import { useDispatch, useSelector } from "react-redux";
import useRazorpay from "react-razorpay";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { renderWelcomeEmail } from "../renderEmail";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import styles from "../Address.module.css";
import ReactLoading from 'react-loading';

import { styled } from "@mui/material/styles";
import { getCartItems } from "../../products/CartSlice";

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

export default function CreateOrder(props) {
  useEffect(() => {
    if (props?.setTitle) props?.setTitle(window.location.pathname);
    scrollToTop()
  }, []);

  const contentRef = useRef();

  const scrollToTop = () =>{ 
    contentRef.current.scrollIntoView({ behavior: "smooth" });
  }; 



  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [height, setHeight] = useState("100px");
  const [cartItemsNew, setCartItemsNew] = useState([]);
  const cartItems = useSelector((state) => state.cart.items);
  const [add, setAdd] = useState(false);
  const [loading, setSetLoading] = useState(false);
  const [subtotal,setSubTotal] = useState(0)
  const [total,setTotal] = useState(0)

  const [Razorpay] = useRazorpay();

  const navigate = useNavigate();
  console.log("smrfoejr",cartItemsNew)
  useEffect(() => {
    setCartItemsNew(cartItems); 
    getSubTotalAmount();
    getTotalAmount(0);
  }, [cartItems]);
  useEffect(() => {
    // Simulate an API call to fetch orders
    setTimeout(() => {
      setOrders(sampleOrders);
    }, 1000);
  }, []);
  let storedUserData = JSON.parse(localStorage.getItem("User343"));
  const dispatch = useDispatch();
  const content = useSelector((state) => state.content.config);
  console.log("smkjir",content)
  useEffect(() => {
    dispatch(getCartItems(storedUserData?.logedInUser?.user?._id));

    getSubTotalAmount();
    getTotalAmount(0);
    fetch(`${BASE_URL}/users/getAddress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: storedUserData.logedInUser.accessToken,
      },
      body: JSON.stringify({ userId: storedUserData.logedInUser?.user?._id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setHeight(
          data?.data?.length < 3 ? 100 * parseFloat(data?.data?.length) : "150"
        );
        setAddresses(data.data);
      })
      .catch((error) => console.error("Error fetching addresses:", error));
  }, []);

  const getStatusClass = (currentStatus, stepStatus) => {
    const statusOrder = statuses.indexOf(currentStatus);
    const stepOrder = statuses.indexOf(stepStatus);
    return stepOrder <= statusOrder ? "red" : "";
  };

  const getTotalAmount = (dist) => {
    let tot = cartItems
    .reduce(
      (total, item) =>
        total +
        (item?.item?.price - parseFloat(item?.item?.discount || 0)) *
          (item?.quantity || 1),
      0
    );
    // console.log("mkjrsr",tot,discount)
    let p = parseFloat(tot || 0) - ((parseFloat(tot || 0)*(dist || 0))/100)
    if(p<content?.deliveryAmt) p = p + parseFloat(content?.deliveryCharge || 0)
    setTotal(p)
    return (p).toFixed(2);
  };


  const getSubTotalAmount = () => {
    let sub = cartItems
    .reduce(
      (total, item) =>
        total +
        (item?.item?.price - parseFloat(item?.item?.discount || 0)) *
          (item?.quantity || 1),
      0
    );
    setSubTotal(sub);
    return sub.toFixed(2);
  };

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

  const handleCheckout = async (values) => {
    console.log("smrgiioer", values);
    if (
      !total ||
      !values?.products ||
      !values?.addressId ||
      !values?.mode
    ) {
      toast.error("Please fill all details");
      return false;
    }
    const emailHtml = renderWelcomeEmail(
      {
        amount: total,
        products: values?.products,
        addressId: values?.addressId,
        mode: values?.mode,
        address: values?.address?.fullAdress,
      },
      1,
      ""
    );
    console.log("sjofje", emailHtml);

    let data = {
      amount: total,
      products: values?.products,
      addressId: values?.addressId,
      mode: values?.mode,
      htmls: emailHtml,
      couponId : couponData?._id
    };

    setSetLoading(true);
    console.log(data, "test");
    try {
      const token = storedUserData.logedInUser.accessToken;
      console.log(token, "token");
      const response = await fetch(
        `https://backend.hairsncares.com/api/v1/payment/place-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        toast.error("Please logout and login again with valid credentials.");
        setSetLoading(false);
        throw new Error("Network response was not ok");
      } else {
        if (data?.mode == "cash") {
          const responseData = await response.json();
          console.log("wemskfiew", responseData.data);
          toast.success("Order placed successfully");
          setSetLoading(false);
          window.location = "https://www.hairsncares.com/success/2";
        } else {
          console.log("jsoejoj",Math.round(total * 100))
          const responseData = await response.json();
          const options = {
            key: "rzp_live_mArtCmiYqSB4nm",
            amount: Math.round(parseFloat(total) * 100),
            currency: "INR",
            name: "Hairs N Cares",
            image: "/assets/img/logo.png",
            accept_partial: false,
            reference_id: responseData.data,
            description: storedUserData.logedInUser?.user?._id,
            handler: async function (response) {
              const data = {
                orderId: responseData.data,
              };
              const res = await fetch(
                `https://backend.hairsncares.com/api/vi/bookAppointment/update-payment-order`,
                {
                  method: "POST", 
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                  },
                  body: JSON.stringify(data),
                }
              );

              console.log(await res.json());
              window.location = "https://www.hairsncares.com/success/2";
            },
            modal: {
              confirm_close: true, // this is set to true, if we want confirmation when clicked on cross button.
              // This function is executed when checkout modal is closed
              // There can be 3 reasons when this modal is closed.
              ondismiss: async (reason) => {
                const {
                  reason: paymentReason, field, step, code,
                } = reason && reason.error ? reason.error : {};
                // Reason 1 - when payment is cancelled. It can happend when we click cross icon or cancel any payment explicitly. 
                if (reason === undefined) {
                  console.log('cancelled');
                  toast.error("Payment Unsuccessful!! Try again");
                  setSetLoading(false);
                } 
                // Reason 2 - When modal is auto closed because of time out
                else if (reason === 'timeout') {
                  console.log('timedout');
                  toast.error("Please logout and login again with valid credentials.");
                  setSetLoading(false);
                } 
                // Reason 3 - When payment gets failed.
                else {
                  console.log('failed');
                  toast.error("Please logout and login again with valid credentials.");
                  setSetLoading(false);
                }
              },
            },
            notes: {
              address: "HairsNcare Corporate Office",
            },
            theme: {
              color: "#3399cc",
            },
            redirect: true,
          };

          const rzp1 = new Razorpay(options);

          rzp1.on("payment.failed", function (response) {
            toast.error("Please logout and login again with valid credentials.");
            setSetLoading(false);
            throw new Error("Payment failed");
          });

          const res = rzp1.open();
        }
      }

      // Handle the response data as needed
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );
    }
  };
  const [address, setAddress] = useState(null);

  const handleInputChange = (e, values, setFieldValue) => {
    const { name, value } = e.target;
    let temp = values?.address || {};
    temp[name] = value;
    setFieldValue("address", temp, true);
  };

  const handleSubmitAdd = async (values, setFieldValue) => {
    // e.preventDefault();
    const addApiUrl = `${BASE_URL}/users/addAddress`;
    const editApiUrl = `${BASE_URL}/users/editAddress`;
    const apiUrl = values?.address?._id ? editApiUrl : addApiUrl;
    const method = values?.address?._id ? "POST" : "POST";
    const addressData = values?.address
      ? { ...values?.address, id: values?.address?._id }
      : values?.address;
    console.log("jsiejfijer", addressData);
    if (!addressData?.name) {
      toast.error("Please provide name");
      return false;
    }
    if (!addressData?.phone) {
      toast.error("Please provide name");
      return false;
    } else {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(addressData?.phone)) {
        toast.error("Please provide correct phone number");
        return false;
      }
    }

    if (!addressData?.fullAdress) {
      toast.error("Please provide address");
      return false;
    }
    if (!addressData?.pin) {
      toast.error("Please provide pincode");
      return false;
    } else {
      let pincodeRegex = /^[0-9]\d{5}$/;
      if (!pincodeRegex.test(addressData?.pin)) {
        toast.error("Please provide correct pincode");
        return false;
      }
    }
    if (!addressData?.state) {
      toast.error("Please provide state name");
      return false;
    }

    if (!addressData?.city) {
      toast.error("Please provide city name");
      return false;
    }

    fetch(apiUrl, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: storedUserData.logedInUser.accessToken,
      },
      body: JSON.stringify({
        ...addressData,
        userId: storedUserData.logedInUser?.user?._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("nwenifew", data);
        if (values?.address?._id) {
          toast.success("Address edit successfully");
          setAddresses(
            addresses.map((addr) =>
              addr._id == values?.address?._id ? data?.data : addr
            )
          );
          setFieldValue("address", data?.data, true);
          setFieldValue("addressId", values?.address?._id, true);
        } else {
          toast.success("Address saved successfully");
          setAddresses([...addresses, data?.data]);
          setFieldValue("address", data?.data, true);
          setFieldValue("addressId", data?.data?._id, true);
        }
        // setEditingAddress(null);
      })
      .catch((error) => {
        console.error("Error adding/editing address:", error);
        toast.error("Please logout and login again with valid credentials.");
      });
  };

  const [openC,setOpenC] = useState(false)
  const [code,setCode] = useState("")
  const [couponData,setCouponData] = useState("")
  const [discount,setDiscount] = useState("")

  const applyCoupon = async() => {
    fetch(`${BASE_URL}/users/applyCoupon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': storedUserData.logedInUser.accessToken
      },
      body: JSON.stringify({ code,type : "2"}),
    })
      .then(response => response.json())
      .then(data => {
        console.log("sjkorjf",data)
        if(data?.statusCode == 200){
          setDiscount(data?.data?.percent)
          getTotalAmount(data?.data?.percent)
          setCouponData(data?.data)
          toast.success("coupon applied successfully");
        }
        else {
          toast.error(data?.message || "error")
        }
        // setAddresses(addresses.filter(addr => addr._id !== id));
      })
      .catch(error => {
        toast.error("Please logout and login again with valid credentials.");
        console.error('Error deleting address:', error)
      });
  }
  return (
    <Navbar> 
      <Sidebar>
        <div className="d-flex flex-column" ref={contentRef}>
          <div className="couponApply d-flex flex-column">
            <div onClick={()=>setOpenC(!openC)} style={{cursor : "pointer"}}>
            Have a coupon? <strong>Click here</strong>
            </div>
            {openC && <div className="animate__animated animate__fadeInUp"><div style={{marginTop : "10px"}}>
            If you have a coupon code, please apply it below.
            </div>
            <div className="couponApply-input-main">
              <input type = "text" className="couponApply-input" placeholder="Enter Coupon Code" onChange={(e) => {
                setCouponData("")
                setDiscount("")
                getTotalAmount(0)
                setCode(e.target.value)
              }}/>
              <button className="couponApply-input-button" onClick={() => {
                if(code == couponData?.code){
                  toast.error("Coupon already applied")
                }
                else applyCoupon()
              }}>Apply Coupon</button>
            </div></div>} 
          </div>
          <div className="create-order" style={{ gap: 0, padding: 0 }}>
          <Formik
            // isValid='true'
            enableReinitialize
            //   validationSchema={validationSchema}
            initialValues={{
              address: "",
              amount: total,
              addressId: "",
              products: cartItemsNew,
              mode: "",
              agree: false,
            }}
            onSubmit={(values, actions) => {}}
          >
            {({
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form
                onSubmit={handleSubmit}
                className="create_div-main"
                style={{ marginTop: "40px" }}
              >
                <FormGroup className="order-flow">
                  <div
                    className="col-12 col-md-6 order-div"
                    style={{ padding: "0% 4% 0 1%" }}
                  >
                    <div className="d-flex flex-column">
                      <div
                        className="d-flex"
                        style={{
                          justifyContent: "space-between",
                          fontWeight: 600,
                        }}
                      >
                        <div>Billing details</div>
                        {/* <div
                          onClick={() => navigate("/cart")}
                          style={{ cursor: "pointer" }}
                        >
                          {"< Back To Cart"}
                        </div> */}
                      </div>
                      <div className="col-12" style={{ padding: "20px 0 0 0" }}>
                        {addresses?.length > 0 ? (
                          <StyledAutocomplete
                            options={addresses}
                            getOptionSelected={(option, value) =>
                              option?._id == value?.addressId
                            }
                            getOptionLabel={(item) => {
                              console.log("mkmeromore", item);
                              let reqValue = "";
                              if (item) {
                                if (item?._id) {
                                  reqValue =
                                    item?.fullAdress +
                                    "-" +
                                    item?.name +
                                    "-" +
                                    item?.phone
                                }
                              }
                              return reqValue;
                            }}
                            onOpen={() => {
                              console.log("moo3");
                              setAdd(true);
                            }}
                            style={{ width: "80%" }}
                            value={values?.address}
                            onInputChange={(event, newValue) => {
                              console.log("jiejroj", event, newValue);
                              if (newValue == "") {
                                setFieldValue("addressId", "", true);
                              }
                            }}
                            onChange={(event, newValue) => {
                              console.log("msdomfod", newValue);
                              setFieldValue("addressId", newValue?._id, true);
                              setFieldValue("address", newValue, true);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Select a Address"
                                variant="standard"
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment: (
                                    <>{params.InputProps.endAdornment}</>
                                  ),
                                }}
                              />
                            )}
                          />
                        ) : (
                          <></>
                        )}

                        <div style={{ margin: "10% 0 0 0" }}>
                          <div className={styles.formGroup}>
                            <label>Name: </label>
                            <input
                              type="text"
                              name="name"
                              value={values?.address?.name}
                              onChange={(e) =>
                                handleInputChange(e, values, setFieldValue)
                              }
                              required
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label>Phone: </label>
                            <input
                              type="text"
                              name="phone"
                              value={values?.address?.phone}
                              onChange={(e) =>
                                handleInputChange(e, values, setFieldValue)
                              }
                              required
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label>State: </label>
                            <input
                              type="text"
                              name="state"
                              value={values?.address?.state}
                              onChange={(e) =>
                                handleInputChange(e, values, setFieldValue)
                              }
                              required
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label>City: </label>
                            <input
                              type="text"
                              name="city"
                              value={values?.address?.city}
                              onChange={(e) =>
                                handleInputChange(e, values, setFieldValue)
                              }
                              required
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label>Pin: </label>
                            <input
                              type="text"
                              name="pin"
                              value={values?.address?.pin}
                              onChange={(e) =>
                                handleInputChange(e, values, setFieldValue)
                              }
                              required
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label>Email (optional): </label>
                            <input
                              type="email"
                              name="email"
                              value={values?.address?.email}
                              onChange={(e) =>
                                handleInputChange(e, values, setFieldValue)
                              }
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label>Full Address: </label>
                            <textarea
                              name="fullAdress"
                              value={values?.address?.fullAdress}
                              onChange={(e) =>
                                handleInputChange(e, values, setFieldValue)
                              }
                              required
                            />
                          </div>
                          <button
                            type="submit"
                            className={styles.button}
                            onClick={() =>
                              handleSubmitAdd(values, setFieldValue)
                            }
                          >
                            {values?.address?._id
                              ? "Edit Changes"
                              : "Add Address"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 order-div">
                    <div className="d-flex flex-column">
                      <div className="d-flex" style={{justifyContent : "space-between"}}>
                        <label>Your Order</label>
                        <div
                          onClick={() => navigate("/cart")}
                          style={{ cursor: "pointer",                          fontWeight: 600,
                          }}
                        >
                          {"< Back To Cart"}
                        </div>
                      </div>
                      <div style={{ marginTop: "20px" }}>
                        {cartItemsNew?.map((e) => {
                          return (
                            <div
                              className="d-flex"
                              style={{ marginBottom: "10px" }}
                            >
                              <img
                                width="60"
                                height="60"
                                src={e?.item?.src[0]}
                                class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail et-lazyload ls-is-cached lazyloaded"
                                alt=""
                                decoding="async"
                                loading="lazy"
                                data-sizes="(max-width: 450px) 100vw, 450px"
                                sizes="(max-width: 450px) 100vw, 450px"
                              ></img>
                              <div className="d-flex product-desc">
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {e?.item?.name}
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <strong class="product-quantity">
                                    ×&nbsp;{e?.quantity}
                                  </strong>
                                </div>
                              </div>

                              <div style={{ margin: "17px 0 0 10px" }}>
                                ₹{" "}
                                {(
                                  parseFloat(e?.item?.price || 0) -
                                  parseFloat(e?.item?.discount || 0)
                                )?.toFixed(2)}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="total d-flex">
                        <div>SUBTOTAL</div>
                        <div>₹ {subtotal?.toFixed(2)}</div>
                      </div>
                      {
                        discount ?                       <div className="total d-flex">
                        <div>DISCOUNT</div>
                        <div>- {discount}</div>
                      </div> : <></>
                      }
                      {
                        total < content?.deliveryAmt  ?                       <div className="total d-flex">
                        <div>Delivery : </div>
                        <div>- {content?.deliveryCharge}</div>
                      </div> : <></>
                      }
                      <div className="total d-flex">
                        <div>TOTAL</div>
                        <div style={{ fontWeight: "700" }}>
                          ₹ {total?.toFixed(2)}
                        </div>
                      </div>
                      <div className="checkout-style-regular d-flex flex-column">
                        <div
                          className="d-flex"
                          onClick={() => setFieldValue("mode", "cash", true)}
                        >
                          <div style={{ width: "5%" }}>
                            <input
                              type="checkbox"
                              checked={values?.mode == "cash" ? true : false}
                            />
                          </div>
                          <div style={{ padding: "0 0 0 20px" }}>
                            Cash on delivery
                          </div>
                        </div>
                        <div
                          className="d-flex"
                          onClick={() => setFieldValue("mode", "online", true)}
                        >
                          <div style={{ width: "5%" }}>
                            <input
                              type="checkbox"
                              checked={values?.mode == "online" ? true : false}
                            />
                          </div>
                          <div
                            style={{
                              padding: "0 0 0 20px",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <div>Pay online</div>
                            <img src="https://cdn.razorpay.com/static/assets/logo/rzp_payment_icon.svg" />
                          </div>
                        </div>
                        <div style={{ padding: "15px 0 0 0" }}>
                          Your personal data will be used to process your order,
                          support your experience throughout this website, and
                          for other purposes described in our{" "}
                          <a onClick={() => navigate("/policy")} style={{cursor : "pointer"}} >
                            privacy policy
                          </a>
                          .
                        </div>
                        <div
                          className="d-flex"
                          style={{ gap: "15px", margin: "10px 0 0 0" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={values?.agree ? true : false}
                              style={{ width: "20px", height: "20px" }}
                              onChange={(e) => {
                                setFieldValue(
                                  "agree",
                                  e?.target?.checked,
                                  true
                                );
                              }}
                            />
                          </div>
                          <div>
                            I have read and agree to the website terms and
                            conditions *
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "30px 0 0 0",
                          }}
                        >
                          <Button
                            //   type="submit"
                            style={{
                              width: "100%",
                              borderRadius: "5px",
                              backgroundColor:
                                values?.mode &&
                                values?.agree &&
                                values?.addressId
                                  ? "#e31e24"
                                  : "grey",
                              cursor: "pointer",
                            }}
                            className="generateOtp textAddCust Medium btn btn-secondary"
                            disabled={
                              (values?.mode && values?.agree && values?.addressId || loading)
                                ? false
                                : true
                            }
                            onClick={() => handleCheckout(values)}
                          >
                            {loading ? "loading" : "Place order"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>                
                </FormGroup>
              </Form>
            )}
          </Formik>
        </div>
        {
               loading && <div className="loading">
               <ReactLoading type="spinningBubbles" color="#007bff" height={200} width={200} />
             </div>
            }

        </div>

        <ToastContainer position="bottom-right" />
      </Sidebar>
    </Navbar>
  );
}
