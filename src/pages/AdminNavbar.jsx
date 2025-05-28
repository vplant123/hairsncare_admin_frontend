import React, { useEffect, useState } from "react";
// import icons you use, for example:
// import { FaRegUser, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
// import Login from "./login/Login";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import ShopIcon from "@mui/icons-material/Shop";
// import WebAssetIcon from "@mui/icons-material/WebAsset";
// import Inventory2Icon from "@mui/icons-material/Inventory2";
// import DiscountIcon from "@mui/icons-material/Discount";

export default function AdminNavbar({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [orderDropdownVisible, setOrderDropdownVisible] = useState(false);
  const [websiteDropdownVisible, setWebsiteDropdownVisible] = useState(false);
  const [ecommerceDropdownVisible, setEcommerceDropdownVisible] =
    useState(false);
  const [couponDropdownVisible, setCouponDropdownVisible] = useState(false);

  const toggleDropdown1 = val => {
    if (dropdownVisible === val) setDropdownVisible(null);
    else setDropdownVisible(val);
  };

  const toggleOrderDropdown = () => {
    setOrderDropdownVisible(!orderDropdownVisible);
    setDropdownVisible(false);
    setWebsiteDropdownVisible(false);
    setEcommerceDropdownVisible(false);
    setCouponDropdownVisible(false);
  };

  const toggleWebsiteDropdown = () => {
    setWebsiteDropdownVisible(!websiteDropdownVisible);
    setDropdownVisible(false);
    setOrderDropdownVisible(false);
    setEcommerceDropdownVisible(false);
    setCouponDropdownVisible(false);
  };

  const toggleEcommerceDropdown = () => {
    setEcommerceDropdownVisible(!ecommerceDropdownVisible);
    setDropdownVisible(false);
    setOrderDropdownVisible(false);
    setWebsiteDropdownVisible(false);
    setCouponDropdownVisible(false);
  };

  const toggleCouponDropdown = () => {
    setCouponDropdownVisible(!couponDropdownVisible);
    setDropdownVisible(false);
    setOrderDropdownVisible(false);
    setWebsiteDropdownVisible(false);
    setEcommerceDropdownVisible(false);
  };

  const [showSignup, setShowSignup] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    setShowLogout(false);
    localStorage.removeItem("User343");
    navigate("/");
    toast("Logout Successfully");
  };

  // Assuming you have a toggleLogin action in your Redux store
  // const handleLoginClick = () => {
  //   dispatch(toggleLogin());
  // };

  const storedUserData = JSON.parse(localStorage.getItem("User343"));
  const permissions = storedUserData?.logedInUser?.user?.permission;
  const isAdmin = storedUserData?.logedInUser?.user?.role;

  useEffect(() => {
    if (storedUserData) {
      setShowLogout(true);
    }
  }, [storedUserData]);

  // Get showLogin from Redux store
  const showLogin = useSelector(state => state.auth?.showLogin);

  return (
    <>
      <div className="dashboard-container">
        <div className="left-column-111 admin-side-width">
          {(isAdmin === "admin" || permissions?.hairTest) && (
            <>
              <div
                className="tab-color d-flex left-column-111-parent-div"
                onClick={() => toggleDropdown1("hairTest")}
              >
                {/* <DashboardIcon /> */}
                <div className="nav-colour-text">Hair Test</div>
                {dropdownVisible === "hairTest" ? (
                  // <FaChevronUp />
                  <span>▲</span>
                ) : (
                  // <FaChevronDown />
                  <span>▼</span>
                )}
              </div>
              {dropdownVisible === "hairTest" && (
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
                </>
              )}
            </>
          )}

          {/* Similar blocks for Patients, Doctors, Reviews, etc. */}
          {/* Repeat the pattern shown above for other dropdowns */}

          {/* The rest of your nav items here... */}
        </div>

        <div className="right-column">{children}</div>

        {showLogin && (
          // <Login
          //   onClose={handleLoginClick}
          //   showSignup={showSignup}
          //   setShowSignup={setShowSignup}
          // />
          <div>Login Modal Placeholder</div>
        )}
      </div>
    </>
  );
}
