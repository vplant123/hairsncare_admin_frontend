import React, { useState } from "react";
import BASE_URL from "../../../../Config";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
function SignInForm() {
  const [state, setState] = React.useState({
    email: "",
    password: "",
    otp : "",
  });
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false); // State to control the visibility of the "Forgot Password" form
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  //   const handleOnSubmit = evt => {
  //     evt.preventDefault();

  //     const { email, password } = state;
  //     alert(`You are login with email: ${email} and password: ${password}`);

  //     for (const key in state) {
  //       setState({
  //         ...state,
  //         [key]: ""
  //       });
  //     }
  //   };
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Email validation
    if (!state?.email) {
      isValid = false;
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(state?.email)) {
      isValid = false;
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleOnSubmit = async (e) => {
    const { email, password } = state;

    // const startTimer = () => {
    //   setTimer(120); // Reset timer to 2 minutes when starting
    //   setResendAllowed(false); // Disable resend option initially
    // };
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (!response.ok) {
          // Handle non-successful responses here
          const errorData = await response.json();
          // console.error('Login failed:', errorData.message);
          toast.error("Wrong Credentials");
          // You can update state or display error messages accordingly
          return;
        }

        const userData = await response.json();
        console.log("Login successful:", userData.data);
        localStorage.setItem("User343", JSON.stringify(userData.data));
        if (userData.data.logedInUser.role === "doctor") {
          navigate("/appointment");
        } else if (userData.data.logedInUser.role === "admin" || userData.data.logedInUser.role === "subadmin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-profile");
        }

        toast.success("Login Successful !");
        // Perform actions after successful login, such as updating state or redirecting
      } catch (error) {
        toast.error("Network Error");
      } finally {
        setLoading(false); // Hide loader regardless of success or failure
      }
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
        setLoading(true)
      const response = await fetch(`${BASE_URL}/users/forgetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: state?.email,
        }),
      });
      setLoading(false)
      if (!response.ok) {
        toast.error("Network Error");
        const errorData = await response.json();
        console.error("Forgot Password request failed:", errorData.message);
        return;
      }
      if (response.ok) {
        toast.success("Otp Send Successful !");
        setShowUpdatePassword(true);
        setShowForgotPassword(false);
      }
    } catch (error) {
        toast.error("Network Error");
      console.error("Error sending Forgot Password request:", error);
    }
  };

  const handleUpdatePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/users/updatePassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: state?.email,
            otp : state?.otp,
            newPassword : state?.password,
        })
      });
      setLoading(false)

      if (!response.ok) {
        toast.error("Network Error");
        const errorData = await response.json();
        console.error('Forgot Password request failed:', errorData.message);
        return;
      }
      toast.success("Password change Successful !");
if(response.ok){
  setShowUpdatePassword(false)
  setShowForgotPassword(false)
}
     
    } catch (error) {
        toast.error("Network Error");
      console.error('Error sending Forgot Password request:', error);
    }
  };

  return (
    <div className="form-container sign-in-container">
      {showForgotPassword ? (
        <form onSubmit={handleForgotPasswordSubmit}>
          <h1>Forgot Password</h1>
          <input
            type="email"
            placeholder="email"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
          <button disabled={loading}>{loading ? "Loading" : "Send OTP"}</button>
        </form>
      ) : showUpdatePassword ? (
        <form onSubmit={handleUpdatePasswordSubmit}>
          <h1>Enter New Password</h1>
          <input
            type="email"
            placeholder="email"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={state.otp}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={state.password}
            onChange={handleChange}
          />
          <button disabled={loading}>{loading ? "Loading" : "Update Password"}</button>
        </form>
      ) : (
        <form onSubmit={handleOnSubmit}>
          <h1>Sign in</h1>
          {/* <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div> */}
          {/* <span>or use your account</span> */}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
          <a onClick={() => setShowForgotPassword(true)} style={{cursor : "pointer"}}>Forgot your password?</a>
          <button disabled={loading}>{loading ? "Loading" : "Sign In"}</button>
        </form>
      )}

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default SignInForm;
