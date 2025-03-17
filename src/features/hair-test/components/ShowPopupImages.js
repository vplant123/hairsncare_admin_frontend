import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
// import "./index.css"; // Import the CSS file
import BASE_URL from "../../../Config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
// import { useAlert } from 'react-alert'

function ShowPopupImages(props){
  const {onClose,
    name,
    emailAdd,
    phoneNumber,api,imagesData,handleSubOptionSelect,male} = props
  // const alert = useAlert()
  console.log("jkerojo",name,
    emailAdd,
    phoneNumber)
  const [fullName, setFullName] = useState(name);
  const [email, setEmail] = useState(emailAdd);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState(phoneNumber);
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [showOtpInput, setShowOtpInput] = useState(true);
  const [timer, setTimer] = useState(120); // Timer starts at 2 minutes (120 seconds)
  const [resendAllowed, setResendAllowed] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate =useNavigate()
  useEffect(() => {
    let countdownTimer;
if (showOtpInput && timer > 0) {
      countdownTimer = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
return () => clearInterval(countdownTimer);
  }, [showOtpInput, timer]);

  useEffect(() => {
    if (timer === 0) {
      setResendAllowed(true);
    }
  }, [timer]);

  const handleResendOTP = async () => {
    const response = await fetch(`${BASE_URL}/users/resend-otp-mobile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // email: loginMethod === 'email' ? email : '',
        // phone: loginMethod === 'phone' ? phone : '',
        mobile:phone,
       
      })
      
    });
    console.log(response);
    // Reset timer and resend OTP logic here
   if(response.ok){
    // alert.show('Resend OTP Successfully !')
    setTimer(120); // Reset timer to 2 minutes
    setResendAllowed(false); // Disable resend option
   }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validation logic for full name, email, password, confirmPassword, phone, and OTP

    // Full Name validation
    if (!fullName.trim()) {
      isValid = false;
      newErrors.fullName = "Full Name is required";
    }

    // Email validation
    if (!email) {
      isValid = false;
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      newErrors.email = "Email is invalid";
    }

    console.log("jeirjiporwjpowe")

    // Password validation
    // if (!password) {
    //   isValid = false;
    //   newErrors.password = "Password is required";
    // } else if (password.length < 6) {
    //   isValid = false;
    //   newErrors.password = "Password must be at least 6 characters long";
    // }

    // // Confirm password validation
    // if (!confirmPassword) {
    //   isValid = false;
    //   newErrors.confirmPassword = "Confirm Password is required";
    // } else if (confirmPassword !== password) {
    //   isValid = false;
    //   newErrors.confirmPassword = "Passwords do not match";
    // }

    // Phone number validation
    if (!phone) {
      isValid = false;
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      isValid = false;
      newErrors.phone = "Phone number is invalid";
    }

    // OTP validation
    if (showOtpInput && !otp) {
      isValid = false;
      newErrors.otp = "Please enter the OTP";
    }

    setErrors(newErrors);
    return isValid;
  };

  useEffect(() => {
    setTimer(120); // Reset timer to 2 minutes when starting
    setResendAllowed(false);
  },[])

  const handleSubmit =async (e) => {
    e.preventDefault();
   if(validateForm()){
    const startTimer = () => {
      setTimer(120); // Reset timer to 2 minutes when starting
      setResendAllowed(false); // Disable resend option initially
    };
    if(showOtpInput){
  setLoading(true)
     
        const response = await fetch(`${BASE_URL}/users/verifyOTP`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            // email: loginMethod === 'email' ? email : '',
            // phone: loginMethod === 'phone' ? phone : '',
            mobile:phone,
            otp
          })
          
        });
        console.log(response);  // Validate OTP and complete sign-up process
      // For demonstration, you can navigate to a different page
       // Close the signup popup
       if(response.ok){
        const response2 = await fetch(`${BASE_URL}/users/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
           
            fullname:fullName,
            email,
            password,
            mobile:phone,
          
          })
        });
      if(response2.ok){
        const userData = await response2.json();
        console.log('Login successful:', userData.data);
        localStorage.setItem("User343", JSON.stringify(userData.data));  
        toast.success('Register Successfull')
    
      }else{
        toast.error("Please logout and login again with valid credentials.")
        setLoading(false)
      }
        console.log(response2,"register response");
        
        // alert.show('Register Successfully !')
        setLoading(false)
        onClose()
       }
    }else{
      try {
        setLoading(true)
        const response1 = await fetch(`${BASE_URL}/users/${api}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            mobile: phone
          })
        });
        console.log("kjdoigj",response1)

        if (response1.ok) {
          // alert.show('OTP sent Successfully !')
          setLoading(false)
          setShowOtpInput(true); // Display OTP input field after successfully sending OTP
          startTimer(); // Start the countdown timer
        }
        else{
          // toast.success('Register Successfull')
        }
      } catch (error) {
        console.error('Error logging in:', error);
        // Handle network errors or other unexpected errors
      }
    }
   }
  };

  const [selected,setSelected] = useState(-1)

 

  return (
    <div className="overlay">
      <div className="popup-Images widthpopUP">
        <button className="close-btn" onClick={onClose}>
          <MdClose size={15} />
        </button>

        <div>{imagesData?.ques}</div>
        <div className="row" style={{margin : "20px 0 0 0"}}>
        {
            imagesData?.options?.map((e,i) => {
                return (
                  <div className="col-6 col-md-4" onClick={() => {
                    setSelected(i)
                    handleSubOptionSelect(e,imagesData?.ques,false)
                    
                  }}>
                    {e?.name == "Not Sure" ? (
                                                <Tooltip title=" If none of the images match your case, please upload clear scalp photos at the end of the hair test. This will help us assess your condition accurately">
                                                    <img src={e?.src} className="popup-Image-layout-1" style={{border : selected == i ? "5px solid #606a70" : ""}} />
                      </Tooltip>
                    ) : (
                      <img src={e?.src} className={`popup-Image-layout ${male ? "width-sm" : ""}`} style={{border : selected == i ? "5px solid #3BD5E3" : ""}}/>
                    )}
                  </div>
                );
            })
        }
        </div>
        <div style={{    display: "flex",
    justifyContent: "center"}}>
        <button type="button" onClick={() => onClose()} >
            Submit
          </button>
        </div>

      </div>
    </div>
  );
};

export default ShowPopupImages;
