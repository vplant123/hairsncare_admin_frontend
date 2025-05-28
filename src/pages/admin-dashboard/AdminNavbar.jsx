
import React, { useEffect, useState } from "react";
import { FaRegUser, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { toggleLogin } from "../login/LoginSlice";
import { useDispatch, useSelector } from "react-redux";
import Login from "../login/Login";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShopIcon from "@mui/icons-material/Shop";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import DiscountIcon from "@mui/icons-material/Discount";

export default function AdminNavbar({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [orderDropdownVisible, setOrderDropdownVisible] = useState(false);
  const [websiteDropdownVisible, setWebsiteDropdownVisible] = useState(false);
  const [ecommerceDropdownVisible, setEcommerceDropdownVisible] =
    useState(false);
  const [couponDropdownVisible, setCouponDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    orderDropdownVisible && setOrderDropdownVisible(false);
    websiteDropdownVisible && setWebsiteDropdownVisible(false);
    ecommerceDropdownVisible && setEcommerceDropdownVisible(false);
    couponDropdownVisible && setCouponDropdownVisible(false);
  };

  const toggleOrderDropdown = () => {
    setOrderDropdownVisible(!orderDropdownVisible);
    dropdownVisible && setDropdownVisible(false);
    websiteDropdownVisible && setWebsiteDropdownVisible(false);
    ecommerceDropdownVisible && setEcommerceDropdownVisible(false);
    couponDropdownVisible && setCouponDropdownVisible(false);
  };

  const toggleWebsiteDropdown = () => {
    setWebsiteDropdownVisible(!websiteDropdownVisible);
    ecommerceDropdownVisible && setEcommerceDropdownVisible(false);
    dropdownVisible && setDropdownVisible(false);
    orderDropdownVisible && setOrderDropdownVisible(false);
    couponDropdownVisible && setCouponDropdownVisible(false);
  };

  const toggleEcommerceDropdown = () => {
    setEcommerceDropdownVisible(!ecommerceDropdownVisible);
    dropdownVisible && setDropdownVisible(false);
    orderDropdownVisible && setOrderDropdownVisible(false);
    websiteDropdownVisible && setWebsiteDropdownVisible(false);
    couponDropdownVisible && setCouponDropdownVisible(false);
  };

  const toggleCouponDropdown = () => {
    setCouponDropdownVisible(!couponDropdownVisible);
    dropdownVisible && setDropdownVisible(false);
    orderDropdownVisible && setOrderDropdownVisible(false);
    websiteDropdownVisible && setWebsiteDropdownVisible(false);
    ecommerceDropdownVisible && setEcommerceDropdownVisible(false);
  };

  const toggleDropdown1 = (val) => {
    if (dropdownVisible == val) setDropdownVisible(null)
    else setDropdownVisible(val);
  };

  const [showSignup, setShowSignup] = useState(false);

  const [showLogout, setShowLogout] = useState(false);
  const handleLogout = () => {
    setShowLogout(false);
    localStorage.removeItem("User343");
    navigate("/");
    toast("Logout Successfully");
  };

  const handleLoginClick = () => {
    dispatch(toggleLogin());
  };

  const handleSignupClick = () => {
    setShowSignup(!showSignup);
  };
  let storedUserData = JSON.parse(localStorage.getItem("User343"));
  let permissions = storedUserData?.logedInUser?.user?.permission;
  let isAdmin = storedUserData?.logedInUser?.user?.role

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
          if (isAdmin == "doctor") navigate("/doctor-dashboard")
          else navigate("/admin-dashboard")
        }} style={{ cursor: "pointer" }}>
          <img alt="logo" className="nav-logo" src="/assets/img/logo.png" />
        </div>

        <div className="nav-right">
          <div className="user-svg">
            <FaRegUser size={20} />
            <div
              className="sub-link"
              style={{ width: "135px", padding: "1rem", zIndex: 100 }}
            >
              {showLogout ? (
                <div>
                  <p
                    style={{ fontSize: "17px" }}
                    onClick={() => navigate("/user-profile")}
                  >
                    My Account
                  </p>
                  <p
                    onClick={handleLogout}
                    style={{ textAlign: "center", fontSize: "17px" }}
                  >
                    Logout
                  </p>
                </div>
              ) : (
                <div>
                  <p onClick={handleLoginClick} style={{ textAlign: "center" }}>
                    Login
                  </p>
                  {/* <p onClick={handleSignupClick}  style={{textAlign : "center"}}>Signup</p> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="dashboard-container ">
          <div className="left-column-111 admin-side-width">
            {(isAdmin == "admin" || permissions?.hairTest) && <div
              className="tab-color d-flex left-column-111-parent-div"
              onClick={() => toggleDropdown1("hairTest")}
            >
              <DashboardIcon />
              <div className="nav-colour-text">Hair Test</div>
              {dropdownVisible == "hairTest" ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </div>}
            {dropdownVisible == "hairTest" && (
              <>
                <div
                  className={
                    location.pathname.includes("/admin-dashboard")
                      ? "select left-column-111-child-div"
                      : "left-column-111-child-div"
                  }
                  onClick={() => navigate("/admin-dashboard")}
                >
                  All Hair Test Results
                </div>
                <div
                  className={
                    location.pathname.includes("/pending-appointments")
                      ? "select left-column-111-child-div"
                      : "left-column-111-child-div"
                  }
                  onClick={() => navigate("/pending-appointments")}
                >
                  Pending Test
                </div>
                {/* <div onClick={() => navigate('/admins')} className={location.pathname.includes("/reviews")?'select left-column-111-child-div':'left-column-111-child-div'}>All Reviews</div> */}

                {/* Add more sublinks as needed */}
              </>
            )}

            {(isAdmin == "admin" || permissions?.patient) && <div
              className="tab-color d-flex left-column-111-parent-div"
              onClick={() => toggleDropdown1("patient")}
            >
              <DashboardIcon />
              <div className="nav-colour-text">Patients</div>
              {dropdownVisible == "patient" ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </div>}

            {dropdownVisible == "patient" && (
              <>
                <div
                  onClick={() => navigate("/all-patient-list")}
                  className={
                    location.pathname.includes("/all-patient-list")
                      ? "select left-column-111-child-div"
                      : "left-column-111-child-div"
                  }
                >
                  All Patient List
                </div>{" "}
                {/* <div onClick={() => navigate('/admins')} className={location.pathname.includes("/reviews")?'select left-column-111-child-div':'left-column-111-child-div'}>All Reviews</div> */}
              </>
            )}

            {(isAdmin == "admin" || permissions?.doctor) && <div
              className="tab-color d-flex left-column-111-parent-div"
              onClick={() => toggleDropdown1("doctor")}
            >
              <DashboardIcon />
              <div className="nav-colour-text">Doctors</div>
              {dropdownVisible == "doctor" ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </div>}

            {dropdownVisible == "doctor" && (
              <>
                <div
                  onClick={() => navigate("/add-doctor")}
                  className={
                    location.pathname.includes("/doctor")
                      ? "select left-column-111-child-div"
                      : "left-column-111-child-div"
                  }
                >
                  Add Doctor
                </div>
                <div
                  onClick={() => navigate("/all-doctor")}
                  className={
                    location.pathname.includes("/doctor")
                      ? "select left-column-111-child-div"
                      : "left-column-111-child-div"
                  }
                >
                  All Doctors
                </div>
              </>
            )}

            {(isAdmin == "admin" || permissions?.reviews) && <div
              className="tab-color d-flex left-column-111-parent-div"
              onClick={() => toggleDropdown1("reviews")}
            >
              <DashboardIcon />
              <div className="nav-colour-text">Reviews</div>
              {dropdownVisible == "reviews" ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </div>}
            {dropdownVisible == "reviews" && (
              <>
                <div
                  onClick={() => navigate("/reviews")}
                  className={
                    location.pathname.includes("/reviews")
                      ? "select left-column-111-child-div"
                      : "left-column-111-child-div"
                  }
                >
                  All Reviews
                </div>
              </>
            )}

            {(isAdmin == "admin" || permissions?.contactus) && <div
              className="tab-color d-flex left-column-111-parent-div"
              onClick={() => toggleDropdown1("contactUs")}
            >
              <DashboardIcon />
              <div className="nav-colour-text">Contact us</div>
              {dropdownVisible == "contactUs" ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </div>}
            {dropdownVisible == "contactUs" && (
              <>
                <div
                  onClick={() => navigate("/all-contact-us-form-result")}
                  className={
                    location.pathname.includes("/all-contact-us-form-result")
                      ? "select left-column-111-child-div"
                      : "left-column-111-child-div"
                  }
                >
                  All Contact Us
                </div>
              </>
            )}


            {(isAdmin == "admin" || permissions?.blog) && <div
              className="tab-color d-flex left-column-111-parent-div"
              onClick={() => toggleDropdown1("blog")}
            >
              <DashboardIcon />
              <div className="nav-colour-text">Blogs</div>
              {dropdownVisible == "blog" ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </div>}
            {dropdownVisible == "blog" && (
              <>
                <div
                  onClick={() => navigate("/addBlogs")}
                  className={
                    location.pathname.includes("/addBlogs")
                      ? "select left-column-111-child-div"
                      : "left-column-111-child-div"
                  }
                >
                  Add Blogs
                </div>
                <div
                  onClick={() => navigate("/allBlogs")}
                  className={
                    location.pathname.includes("/allBlogs")
                      ? "select left-column-111-child-div"
                      : "left-column-111-child-div"
                  }
                >
                  View Blogs
                </div>
                <div
                  onClick={() => navigate("/blogCategory")}
                  className={
                    location.pathname.includes("/blogCategory")
                      ? "select left-column-111-child-div"
                      : "left-column-111-child-div"
                  }
                >
                  Add Blogs Category
                </div>
                <div
                  onClick={() => navigate("/news")}
                  className={
                    location.pathname.includes("/news")
                      ? "select left-column-111-child-div"
                      : "left-column-111-child-div"
                  }
                >
                  Add News
                </div>
              </>
            )}




            {(isAdmin == "admin" || permissions?.orders) && <div
              className="tab-color left-column-111-parent-div d-flex"
              onClick={toggleOrderDropdown}
            >
              <ShopIcon />
              <div className="nav-colour-text">Order</div>
              {orderDropdownVisible ? <FaChevronUp /> : <FaChevronDown />}
            </div>}
            {orderDropdownVisible && (
              <>
                <div
                  className={
                    location.pathname.includes("/manage-order")
                      ? "select left-column-111-child-div"
                      : "left-column-111-child-div"
                  }
                  onClick={() => navigate("/manage-order")}
                >
                  All Orders
                </div>
                {/* Add more sublinks related to orders as needed */}
              </>
            )}
            {(isAdmin == "admin" || permissions?.website) && <div
              className="tab-color left-column-111-parent-div d-flex"
              onClick={toggleWebsiteDropdown}
            >
              <WebAssetIcon />
              <div className="nav-colour-text">Website</div>
              {websiteDropdownVisible ? <FaChevronUp /> : <FaChevronDown />}
            </div>}
            {websiteDropdownVisible && (
              <>
                <div
                  onClick={() => navigate("/manage-website")}
                  className={
                    location.pathname.includes("/manage-website")
                      ? "select left-column-111-child-div"
                      : "left-column-111-child-div"
                  }
                >
                  Manage Website
                </div>
                {/* Add more sublinks related to website as needed */}
              </>
            )}
            {(isAdmin == "admin" || permissions?.product) && <div
              className="tab-color left-column-111-parent-div d-flex "
              onClick={toggleEcommerceDropdown}
            >
              <Inventory2Icon />
              <div className="nav-colour-text">Ecommerce</div>
              {ecommerceDropdownVisible ? <FaChevronUp /> : <FaChevronDown />}
            </div>}
            {ecommerceDropdownVisible && (
              <>
                <div
                  className={
                    location.pathname.includes("/add-product")
                      ? "select left-column-111-child-div"
                      : "left-column-111-child-div"
                  }
                  onClick={() => navigate("/add-product")}
                >
                  Add Product
                </div>
                <div
                  className={
                    location.pathname.includes("/edit-delete-product")
                      ? "select left-column-111-child-div"
                      : "left-column-111-child-div"
                  }
                  onClick={() => navigate("/edit-delete-product")}
                >
                  Edit and Delete Product
                </div>
                {/* Add more sublinks related to ecommerce as needed */}
              </>
            )}
            {(isAdmin == "admin" || permissions?.coupon) && <div
              className="tab-color left-column-111-parent-div d-flex"
              onClick={toggleCouponDropdown}
            >
              <DiscountIcon />
              <div className="nav-colour-text">Coupons</div>
              {couponDropdownVisible ? <FaChevronUp /> : <FaChevronDown />}
            </div>}
            {couponDropdownVisible && (
              <>
                <div
                  className={
                    location.pathname.includes("/all-coupons")
                      ? "select left-column-111-child-div"
                      : "left-column-111-child-div"
                  }
                  onClick={() => navigate("/all-coupons")}
                >
                  All Coupons
                </div>
                {/* <div onClick={() => navigate('/edit-delete-coupon')}>Edit and Delete Coupons</div> */}
                {/* Add more sublinks related to ecommerce as needed */}
              </>
            )}

            {(isAdmin == "admin" || permissions?.admin) && <div
              className="tab-color d-flex left-column-111-parent-div"
              onClick={() => toggleDropdown1("admin")}
            >
              <DashboardIcon />
              <div className="nav-colour-text">Admins</div>
              {dropdownVisible == "admin" ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </div>}

            {dropdownVisible == "admin" && (
              <>
                <div
                  onClick={() => navigate("/admins")}
                  className={
                    location.pathname.includes("/reviews")
                      ? "select left-column-111-child-div"
                      : "left-column-111-child-div"
                  }
                >
                  All Admins
                </div>
              </>
            )}



            {true && <div
              className="tab-color d-flex left-column-111-parent-div"
              onClick={() => toggleDropdown1("invoice")}
            >
              <DashboardIcon />
              <div className="nav-colour-text">Invoice</div>
              {dropdownVisible == "invoice" ? (
                <FaChevronUp />
              ) : (
                <FaChevronDown />
              )}
            </div>}
            {dropdownVisible == "invoice" && (
              <>
                <div
                  onClick={() => navigate("/addInvoice")}
                  className={
                    location.pathname.includes("/addInvoice")
                      ? "select left-column-111-child-div"
                      : "left-column-111-child-div"
                  }
                >
                  Add Invoice
                </div>
                <div
                  onClick={() => navigate("/allInvoice")}
                  className={
                    location.pathname.includes("/allInvoice")
                      ? "select left-column-111-child-div"
                      : "left-column-111-child-div"
                  }
                >
                  All Invoices
                </div>
              </>
            )}
          </div>

          <div className="right-column" >
            {children}
          </div>
          {showLogin && (
            <Login
              onClose={handleLoginClick}
              showSignup={showSignup}
              setShowSignup={setShowSignup}
            />
          )}
        </div>
      </div>
    </>
  );
}
