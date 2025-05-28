
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { FaSearch, FaShoppingCart, FaRegUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin } from "../login/LoginSlice";
import Login from "../login/Login";
import Signup from "../signup/SignUp";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getCartItems } from '../products/CartSlice';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchProduct from "../SearchProduct";

function Navbar({ children, cart, setCart }) {
  console.log("jofewjpoe", cart, setCart)
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const dispatch = useDispatch();
  const showLogin = useSelector((state) => state.login.showLogin);
  const cartItems = useSelector((state) => state.cart.items);
  const [showSearch, setShowSearch] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleMobileMenuToggle = () => {
    console.log("jojeojfer", showMobileMenu)
    setShowMobileMenu(!showMobileMenu);
  };

  const handleLogout = () => {
    setShowLogout(false);
    localStorage.removeItem("User343");
    toast("Logout Successfully");
    dispatch(getCartItems());
    // setCart([])
  };

  const goToDash = () => {
    navigate('/cart');
  };

  const handleLoginClick = () => {
    dispatch(toggleLogin());
  };

  const handleTestHair = () => {
    navigate('/hair-test')
  };

  const handleSignupClick = () => {
    setShowSignup(!showSignup);
  };

  let storedUserData = JSON.parse(localStorage.getItem("User343"));
  // console.log(storedUserData, "userData");

  useEffect(() => {
    console.log("ksorkjoer", cart?.length)
    if (storedUserData) {
      setShowLogout(true);
      dispatch(getCartItems(storedUserData.logedInUser.user._id));
    }
  }, [dispatch, cart?.length]);

  const scrollToTop = () =>{ 
    window.scrollTo({ 
      top: 0,  
      behavior: 'smooth'
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    }); 
  }; 



  return (
    <>
      <div style={{ position: "fixed", zIndex: 100, top: 0, width: "100vw",background : "#FFFFFF" }} onClick={scrollToTop}>
        <div className="nav-container container"  >

          <div>
            <img
              alt="logo"
              className="nav-logo"
              src="/assets/img/logo.png"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/home")}
            />
          </div>
          <div className={`nav-link ${showMobileMenu ? "show" : ""}`} style={{ zIndex: showMobileMenu ? 1 : "" }}>
            <a>
              <NavLink to="/home" activeClassName="active">
                HOME
              </NavLink>
            </a>
            <a className="who-we-link">
              <NavLink to="/about-us" activeClassName="active">
                WHO WE ARE+
              </NavLink>
              <div className="sub-link-2">
                <p onClick={() => navigate('/about-us')}>About Us</p>
                <p onClick={() => navigate('/our-specialist')} style={{fontSize : "17px"}}>Our specialists</p>
              </div>
            </a>
            <a>
              <NavLink to="/our-expertise" activeClassName="active">
                OUR EXPERTISE
              </NavLink>
            </a>
            <a>
              <NavLink to="/shop" activeClassName="active">
                PRODUCTS
              </NavLink>
            </a>
            <a>
              <NavLink to="/book" activeClassName="active">
                CONTACT US
              </NavLink>
            </a>
          </div>
          <div className="nav-right">
            {!location.pathname.includes("/hair-test") && <button onClick={handleTestHair} className="btn-test">TAKE HAIR TEST</button>}
            <div className="nav-icons">
              <div className="user-svg">
                {showSearch ? (
                        <SearchProduct isOpen={showSearch} onClose={() => setShowSearch(!showSearch)} cart = {cart} 
                        setCart = {setCart} />
                ) : (
                  <FaSearch
                    onClick={() => setShowSearch(!showSearch)}
                    size={20}
                  />
                )}
              </div>
              <div className="cart-icon" onClick={goToDash}>
              <Badge color="secondary" badgeContent={cartItems?.length>0 || cart?.length>0 ? cartItems?.length || cart?.length : 0} max={99}>
          <ShoppingCartIcon />
        </Badge>
                {/* <FaShoppingCart onClick={goToDash} size={20} /> */}
                {/* {(cartItems?.length > 0 || cart?.length > 0) && <span className="cart-count">{cartItems?.length || cart?.length}</span>} */}
              </div>
              <div className="user-svg">
                <FaRegUser size={20} />
                <div className="sub-link" style={{width: "135px",padding : "1rem"}}>
                  {showLogout ? (
                    <div>
                      <p style={{ fontSize : "17px"}} onClick={() => navigate('/user-profile')}>My Account</p>
                      <p onClick={() => navigate("/AdminLogin")} style={{textAlign : "center",fontSize : "17px"}}>Logout</p>
                    </div>
                  ) : (
                    <div>
                      <p onClick={() => navigate("/AdminLogin")}  style={{textAlign : "center"}}>Login</p>
                      {/* <p onClick={handleSignupClick}  style={{textAlign : "center"}}>Signup</p> */}
                    </div>
                  )}
                </div>
              </div>
              <div className="menubar" onClick={handleMobileMenuToggle}>
                <FiMenu />
              </div>
              {showLogin && <Login onClose={handleLoginClick} showSignup={showSignup} setShowSignup={setShowSignup} />}
              {showSignup && <Signup onClose={handleSignupClick} handleLoginClick={handleLoginClick} />}
            </div>
          </div>
        </div>
      </div>
      <div className="main">
        {children}
      </div>
    </>
  );
}

export default Navbar;
