import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import BASE_URL from "../../../Config";
import { toast } from "react-toastify";
// import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import ReactLoading from "react-loading";

function Checkout({ testId }) {
  const [selectedOption, setSelectedOption] = useState("rs500");
  const handleOptionSelect = option => {
    setSelectedOption(option);
  };

  const content = useSelector(state => state.content?.plan);
  console.log("testIdtestIdtestIdtestId", content);
  let storedUserData = JSON.parse(localStorage.getItem("User343"));

  const [openC, setOpenC] = useState(false);
  const [code, setCode] = useState("");
  const [couponData, setCouponData] = useState("");
  const [discount, setDiscount] = useState("");

  const applyCoupon = async () => {
    fetch(`${BASE_URL}/users/applyCoupon`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: storedUserData.logedInUser.accessToken,
      },
      body: JSON.stringify({ code, type: "1" }),
    })
      .then(response => response.json())
      .then(data => {
        console.log("sjkorjf", data);
        if (data?.statusCode == 200) {
          setDiscount(data?.data?.percent);
          // getTotalAmount(data?.data?.percent)
          setCouponData(data?.data);
          toast.success("coupon applied successfully");
        } else {
          toast.error(data?.message || "error");
        }
        // setAddresses(addresses.filter(addr => addr._id !== id));
      })
      .catch(error => {
        toast.error("Please logout and login again with valid credentials.");
        console.error("Error deleting address:", error);
      });
  };
  return (
    <div className="ltn__checkout-payment-method payment-method mb-50">
      <div className="couponApply d-flex flex-column">
        <div onClick={() => setOpenC(!openC)} style={{ cursor: "pointer" }}>
          Have a coupon? Click here to enter your code
        </div>
        {openC && (
          <div className="animate__animated animate__fadeInUp">
            <div style={{ marginTop: "10px" }}>
              If you have a coupon code, please apply it below.
            </div>
            <div className="couponApply-input-main">
              <input
                type="text"
                className="couponApply-input"
                placeholder="Enter Coupon Code"
                onChange={e => {
                  setCouponData("");
                  setDiscount("");
                  // getTotalAmount(0)
                  setCode(e.target.value);
                }}
              />
              <button
                className="couponApply-input-button"
                onClick={() => {
                  if (code == couponData?.code) {
                    toast.error("Coupon already applied");
                  } else applyCoupon();
                }}
              >
                Apply Coupon
              </button>
            </div>
          </div>
        )}
      </div>
      <h4>Prescription Required*</h4>
      <div id="checkout_accordion_1">
        <PrescriptionOption
          label="Get a Auto generated Prescription that contains your medications and dosages."
          price={`₹${parseFloat(content?.[0]?.price) - (parseFloat(content?.[0]?.price || 0) * discount) / 100}`}
          onSelect={() => handleOptionSelect("rs100")}
          selected={selectedOption === "rs100"}
          planId="66194c29e6c1744156eb35cf"
          testId={testId}
          couponData={couponData}
          setCouponData={setCouponData}
        />
        <PrescriptionOption
          label="Get a consultation appointment with doctor and medical prescription for your medications, dosages, and usage instructions by doctor."
          price={`₹${parseFloat(content?.[1]?.price) - (parseFloat(content?.[1]?.price || 0) * discount) / 100}`}
          onSelect={() => handleOptionSelect("rs500")}
          selected={selectedOption === "rs500"}
          planId="66194c51e6c1744156eb35d2"
          testId={testId}
          couponData={couponData}
          setCouponData={setCouponData}
        />
      </div>
    </div>
  );
}

function PrescriptionOption({
  label,
  planId,
  price,
  onSelect,
  selected,
  testId,
  couponData,
  setCouponData,
}) {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("morning");
  const [show, setShow] = useState(false);
  const [loading, setSetLoading] = useState(false);
  let storedUserData = JSON.parse(localStorage.getItem("User343"));

  const [Razorpay] = useRazorpay();

  const handleTimeSlotChange = slot => {
    setSelectedTimeSlot(slot);
  };
  const handleCheckout = async () => {
    let data;
    let amount;
    if (planId === "66194c51e6c1744156eb35d2") {
      data = {
        appointmentDate: startDate.toLocaleDateString("en-IN"),
        timeSlot: selectedTimeSlot,
        planId,
        testId,
        couponId: couponData?._id,
      };
    } else {
      data = { planId, testId, couponId: couponData?._id };
    }

    setSetLoading(true);
    console.log(data, "test");
    try {
      const token = storedUserData.logedInUser.accessToken;
      console.log(token, "token");
      const response = await fetch(
        `https://backend.hairsncares.com/api/vi/bookAppointment/bookAppointment`,
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
        const responseData = await response.json();
        console.log(
          "kjnwije",
          (responseData?.data?.totalAmount + "00")?.toString(),
          response
        );
        const options = {
          key: "rzp_live_mArtCmiYqSB4nm",
          amount: Math.round(parseFloat(responseData?.data?.totalAmount) * 100),
          currency: "INR",
          name: "Hairs N Cares",
          image: "/assets/img/logo.png",
          accept_partial: false,
          reference_id: responseData.data.orderId,
          description: responseData.data.userId,
          handler: async function (response) {
            const data = {
              id: responseData.data.orderId,
              planId,
            };
            const res = await fetch(
              `https://backend.hairsncares.com/api/vi/bookAppointment/update-payment`,
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
            window.location = "https://www.hairsncares.com/success/1";
          },
          modal: {
            confirm_close: true, // this is set to true, if we want confirmation when clicked on cross button.
            // This function is executed when checkout modal is closed
            // There can be 3 reasons when this modal is closed.
            ondismiss: async reason => {
              const {
                reason: paymentReason,
                field,
                step,
                code,
              } = reason && reason.error ? reason.error : {};
              // Reason 1 - when payment is cancelled. It can happend when we click cross icon or cancel any payment explicitly.
              if (reason === undefined) {
                console.log("cancelled");
                toast.error("Payment Unsuccessful!! Try again");
                setSetLoading(false);
              }
              // Reason 2 - When modal is auto closed because of time out
              else if (reason === "timeout") {
                console.log("timedout");
                toast.error(
                  "Please logout and login again with valid credentials."
                );
                setSetLoading(false);
              }
              // Reason 3 - When payment gets failed.
              else {
                console.log("failed");
                toast.error(
                  "Please logout and login again with valid credentials."
                );
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

      // Handle the response data as needed
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );
    }
  };

  return (
    <>
      <div
        onClick={onSelect}
        className={`cardsw  ${selected ? "selected3" : ""}`}
      >
        <label className={`collapsed ltn__card-title `}>
          <h1>
            <input type="checkbox" style={{ display: "none" }} />
            {price}
          </h1>
          <span>{label}</span>
          <em>
            <img src="assets/img/checkout/rx.svg" alt="#" />
          </em>
        </label>
        <h4 className="readmore">
          {planId === "66194c51e6c1744156eb35d2"
            ? "What you get in Online Video Consultation ?"
            : "Hair analysis and recommendation report."}
          &nbsp; &nbsp;
          <span onClick={() => setShow(!show)}>See detail</span>{" "}
        </h4>
        {show && (
          <div className="h5-tem">
            {planId === "66194c51e6c1744156eb35d2" && (
              <>
                {" "}
                <h5>
                  1) Detailed discussion about your hair and scalp condition
                </h5>
                <h5>2) Q & A</h5>
                <h5>
                  3) Hair analysis and recommendation report which consists of:
                </h5>
              </>
            )}
            <div className="red-option">
              <h4>1) Assessment Report</h4>
              <p>1) Diagnosis & Details</p>
              <p>2) Hair & Scalp Analysis</p>
              <p>3) Nutritional Assessment</p>
              <p>4) Lifestyle Assessment</p>
              <p>5) Stress Analysis</p>
            </div>
            <div className="red-option">
              <h4>2) Our Recommendation </h4>
              <p>
                1) Treatment Plan – Define Modern Medicine & its benefits & Give
                prescription
              </p>
              <p>2) Hair & Scalp Treatment Recommendation </p>
              <p>3) Nutritional Management</p>
              <p>4) Lifestyle Management</p>
              <p>5) Stress Management</p>
            </div>
          </div>
        )}
        {selected && (
          <div className="checkout-detail">
            {planId === "66194c51e6c1744156eb35d2" && (
              <div className="datecont">
                <label>Choose Appointment Date :</label>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                />
              </div>
            )}
            {planId === "66194c51e6c1744156eb35d2" && (
              <div style={{ gap: "1rem" }} className="datecont">
                {" "}
                <label className="label-time">Time Slot :</label>
                <div className="slot">
                  <input
                    type="radio"
                    name="timeSlot"
                    id="morning"
                    checked={selectedTimeSlot === "morning"}
                    onChange={() => handleTimeSlotChange("morning")}
                  />
                  <label htmlFor="morning">Morning</label>
                </div>
                <div className="slot">
                  <input
                    type="radio"
                    name="timeSlot"
                    id="noon"
                    checked={selectedTimeSlot === "noon"}
                    onChange={() => handleTimeSlotChange("noon")}
                  />
                  <label htmlFor="noon">Afternoon</label>
                </div>
                <div className="slot">
                  <input
                    type="radio"
                    name="timeSlot"
                    id="evening"
                    checked={selectedTimeSlot === "evening"}
                    onChange={() => handleTimeSlotChange("evening")}
                  />
                  <label htmlFor="evening">Evening</label>
                </div>
              </div>
            )}
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              {" "}
              <button
                onClick={handleCheckout}
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Please Wait" : "Checkout"}
              </button>
            </div>
            {loading && (
              <div className="loading">
                <ReactLoading
                  type="spinningBubbles"
                  color="#007bff"
                  height={200}
                  width={200}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Checkout;
