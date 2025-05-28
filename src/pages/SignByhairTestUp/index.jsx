import React, { useState, useEffect } from "react";
// import { MdClose } from "react-icons/md";
import "./index.css"; // Import the CSS file
import BASE_URL from "../../Config";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
// import { useAlert } from 'react-alert'

function SignByhairTestUp(props) {
  const { onClose, name, emailAdd, phoneNumber, api } = props;
  // const alert = useAlert()
  console.log("jkerojo", name, emailAdd, phoneNumber);
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
  const navigate = useNavigate();
  useEffect(() => {
    let countdownTimer;
    if (showOtpInput && timer > 0) {
      countdownTimer = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // email: loginMethod === 'email' ? email : '',
        // phone: loginMethod === 'phone' ? phone : '',
        mobile: phone,
      }),
    });
    console.log(response);
    // Reset timer and resend OTP logic here
    if (response.ok) {
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
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (validateForm()) {
      const startTimer = () => {
        setTimer(120); // Reset timer to 2 minutes when starting
        setResendAllowed(false); // Disable resend option initially
      };
      if (showOtpInput) {
        setLoading(true);

        const response = await fetch(`${BASE_URL}/users/verifyOTP`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // email: loginMethod === 'email' ? email : '',
            // phone: loginMethod === 'phone' ? phone : '',
            mobile: phone,
            otp,
          }),
        });
        console.log(response); // Validate OTP and complete sign-up process
        // For demonstration, you can navigate to a different page
        // Close the signup popup
        if (response.ok) {
          const response2 = await fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fullname: fullName,
              email,
              password,
              mobile: phone,
            }),
          });
          if (response2.ok) {
            const userData = await response2.json();
            console.log("Login successful:", userData.data);
            localStorage.setItem("User343", JSON.stringify(userData.data));
            toast.success("Register Successfull");
          } else {
            toast.error(
              "Please logout and login again with valid credentials."
            );
            setLoading(false);
          }
          console.log(response2, "register response");

          // alert.show('Register Successfully !')
          setLoading(false);
          onClose();
        }
      } else {
        try {
          setLoading(true);
          const response1 = await fetch(`${BASE_URL}/users/${api}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              mobile: phone,
            }),
          });
          console.log("kjdoigj", response1);

          if (response1.ok) {
            // alert.show('OTP sent Successfully !')
            setLoading(false);
            setShowOtpInput(true); // Display OTP input field after successfully sending OTP
            startTimer(); // Start the countdown timer
          } else {
            // toast.success('Register Successfull')
          }
        } catch (error) {
          console.error("Error logging in:", error);
          // Handle network errors or other unexpected errors
        }
      }
    }
  };

  return (
    <div className="overlay">
      <div className="popup-login">
        <button className="close-btn" onClick={onClose}>
          <MdClose size={15} />
        </button>
        <form className="signup-form" onSubmit={handleSubmit}>
          {/* <div className="form-group">
            <label className="sign-label">Full Name:</label>
            <input
              className="sign-input"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && (
              <span className="error">{errors.fullName}</span>
            )}
          </div>
          <div className="form-group">
            <label className="sign-label">Email:</label>
            <input
              className="sign-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div> */}
          {/* <div className="form-group">
            <label className="sign-label">Password:</label>
            <input
              className="sign-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>
          <div className="form-group">
            <label className="sign-label">Confirm Password:</label>
            <input
              className="sign-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div> */}
          {/* <div className="form-group">
            <label className="sign-label">Phone:</label>
            <input
              className="sign-input"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div> */}
          {showOtpInput && (
            <div className="form-group">
              <label className="sign-label">Enter OTP:</label>
              <input
                className="sign-input"
                type="text"
                value={otp}
                onChange={e => setOtp(e.target.value)}
              />
              {errors.otp && <span className="error">{errors.otp}</span>}
            </div>
          )}

          {/* Countdown timer display */}
          {showOtpInput && timer > 0 && (
            <p className="countdown-timer">{`Resend OTP in ${Math.floor(timer / 60)}:${timer % 60}`}</p>
          )}

          {/* Resend OTP option */}
          {resendAllowed && (
            <button
              type="button"
              className="resend-btn"
              onClick={handleResendOTP}
            >
              Resend OTP
            </button>
          )}

          {/* Submit button */}
          <button type="submit" className="submit-1">
            {!loading
              ? showOtpInput
                ? "Verify Your Phone Number"
                : "Send OTP"
              : "Please Wait"}
          </button>

          {/* Existing code for resend message */}
        </form>
      </div>
    </div>
  );
}

export default SignByhairTestUp;
