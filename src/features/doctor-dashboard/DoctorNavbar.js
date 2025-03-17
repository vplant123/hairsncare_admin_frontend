import React, { useEffect, useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { toggleLogin } from '../login/LoginSlice';
import { Login } from '@mui/icons-material';
export default function DoctorNavbar({children}) {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [showSignup, setShowSignup] = useState(false);


  const [showLogout, setShowLogout] = useState(false);
  const handleLogout = () => {
    setShowLogout(false);
    localStorage.removeItem("User343");
    navigate("/")
    toast("Logout Successfully");
  };

  const handleLoginClick = () => {
    dispatch(toggleLogin());
  };

  const handleSignupClick = () => {
    setShowSignup(!showSignup);
  };
  let storedUserData = JSON.parse(localStorage.getItem("User343"));
 
  useEffect(() => {
    if (storedUserData) {
      setShowLogout(true);
    }
  }, [dispatch]);

  const showLogin = useSelector((state) => state.login.showLogin);


  return (
    <>
    <div className="nav-container">
      <div onClick={() => {
                  if(storedUserData?.logedInUser?.user?.role == "doctor") navigate("/doctor-dashboard")
                    else navigate("/admin-dashboard")
        }} style={{cursor : "pointer"}}>
        <img 
          alt="logo"
          className="nav-logo"
          src="/assets/img/logo.png"

        />
      </div>

      <div className="nav-right">
        <div className="user-svg">
          <FaRegUser size={20} />
          <div className="sub-link" style={{width: "135px",padding : "1rem",zIndex : 100}} >
                  {showLogout ? (
                    <div>
                      <p style={{ fontSize : "17px"}} onClick={() => navigate('/user-profile')}>My Account</p>
                      <p onClick={handleLogout} style={{textAlign : "center",fontSize : "17px"}}>Logout</p>
                    </div>
                  ) : (
                    <div>
                      <p onClick={handleLoginClick}  style={{textAlign : "center"}}>Login</p>
                      {/* <p onClick={handleSignupClick}  style={{textAlign : "center"}}>Signup</p> */}
                    </div>
                  )}
                </div>
        </div>
      </div>
    </div>
    <div className="container">
    <div className="dashboard-container">
      <div className="left-column" style={{border: "1px solid gray"}}>
       {/* <NavLink to={'/doctor-dashboard'}>Dashboard</NavLink> */}
       
       {/* <NavLink to={'/doctor-profile'}>Profile</NavLink> */}
      
       <NavLink to={'/appointment'}>Appointment</NavLink>
    

      </div>
      <div className="right-column" style={{border: "1px solid gray"}}>
     {children}
      </div>
      {showLogin && <Login onClose={handleLoginClick} showSignup={showSignup} setShowSignup={setShowSignup} />}

    </div>

    </div>
  </>
  )
}
