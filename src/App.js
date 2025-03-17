
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import 'animate.css';
import './App.css';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import BookAppointmentPage from './pages/BookAppointmentPage';
import OurExpertisePage from './pages/OurExpertisePage';
import ProductDetail from './features/products/ProductDetail';
import AboutUsPage from './pages/AboutUsPage';
import OurSpecialistsPage from './pages/OurSpecialistsPage';
import HairTestPage from './pages/HairTestPage';
import DoctorDashboard from './features/doctor-dashboard/DoctorDashboard';
import PatientList from './features/doctor-dashboard/PatientList';
import AppointmentList from './features/doctor-dashboard/AppointmentList';
import AdminDashboard from './features/admin-dashboard/AdminDashboard';
import AllPatientList from './features/admin-dashboard/AllPatientList';
import AssignAppointment from './features/admin-dashboard/AssignAppointment';
import AddDoctor from './features/admin-dashboard/AddDoctor';
import TestResults from './features/admin-dashboard/TestResults';
import AllDoctorList from './features/admin-dashboard/AllDoctorList';
import UserProfilePage from './pages/UserProfilePage';
import AllHairTest from './features/admin-dashboard/AllHairTest';
import ManageWebsite from './features/admin-dashboard/MangeWebsite';
import AllContactUs from './features/admin-dashboard/AllContactUs';
import AddProduct from './features/admin-dashboard/AddProduct';
import EditDeleteProduct from './features/products/EditDeleteProduct';
import ManageOrder from './features/admin-dashboard/ManageOrder';
import PatientTestResult from './features/doctor-dashboard/PatientTestResult';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Success from './features/payment/Success';
import RoleBasedRoutes from './RoleBasedRoutes';
import Unauthorized from './pages/Unuthorized';
import Login from './features/login/Login';
import Analysis from './features/doctor-dashboard/Analysis';
import Report from './features/doctor-dashboard/Report';
import DoctorAnalyseReport from './features/admin-dashboard/DoctorAnalyseReport';
// import Step1 from './features/doctor-dashboard/analysis/Step1';
// import ManagementReport from './features/admin-dashboard/ManagementReport';
import MyOrders from './features/user-profile/MyOrders';
import Cart from './features/user-profile/Cart';
import Address from './features/user-profile/Adress';
import PendingDashboard from './features/admin-dashboard/PendingDashboard';
import PendingTestResults from './features/admin-dashboard/PendingTestResults';
import MyReportsPages from './pages/MyReportsPage';
import CreateOrder from './features/user-profile/CreateOrder';
// import Step1 from './features/doctor-dashboard/analysis/Step1';
import { getUtilityContentData } from './app/conteneDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import EditDoctor from './features/admin-dashboard/manage-website/EditDoctor';
import ErrorPage from './features/ErrorPage';
import Disclaimer from './features/disclaimer';
import Policy from './features/policy';
import ReturnPolicy from './features/returnPolicy';
import TermsOfService from './features/termsOfService';
import AllCoupons from './features/admin-dashboard/AllCoupons';
import Coupons from './features/user-profile/Coupons';
import AllReviews from './features/admin-dashboard/AllReviews';
import MarketPop from './features/MarketPop';
import AdminLogin from './features/admin-dashboard/AdminLogin';
import AddAdmin from './features/admin-dashboard/AddAdmin';
import AddInvoice from './features/admin-dashboard/AddInvoice';
import AllInvoices from './features/admin-dashboard/AllInvoice';
import InvoiceView from './features/admin-dashboard/InvoiceView';
import Blogs from './features/admin-dashboard/Blogs';
import News from './features/admin-dashboard/News';
import AllBlogs from './features/admin-dashboard/Blogs/AllBlogs';
import BlogCategory from './features/admin-dashboard/Blogs/BlogCategory';
import DoctorAnalysis from './features/Reports/DoctorAnalysis';
import ManagementReport from './features/Reports/managementReport';


const routes = [
  { path: "/", title: "HairsNcares - Home",exact:true  },
  { path: "/login", title: "HairsNcares - Login" },
  { path: "/shop", title: "HairsNcares - Shop" },
  { path: "/book", title: "HairsNcares - Book" },
  { path: "/about-us", title: "HairsNcares - About Us" },
  { path: "/product-detail", title: "HairsNcares - Details" },
  { path: "/our-specialist", title: "HairsNcares - Specialist" },
  { path: "/our-expertise", title: "HairsNcares - Expertise" },
  { path: "/user-profile", title: "HairsNcares - Profile" },
  { path: "/user-profile/", title: "HairsNcares - Profile" },
  { path: "/hair-test", title: "HairsNcares - Hair Test" },
  { path: "/doctor/report", title: "HairsNcares - Doctor Report" },
  { path: "/doctor-analyse-report", title: "HairsNcares - Doctor Analyse Report" },
  { path: "/address", title: "HairsNcares - Address" },
  { path: "/management-report/", title: "HairsNcares - Management Report" },
  { path: "/my-orders", title: "HairsNcares - My Orders" },
  { path: "/create-order", title: "HairsNcares - Create Order" },
  { path: "/cart", title: "HairsNcares - My Cart" },


  // Add more routes here
];

// Hook to set the document title based on the route



function App() {
  const [title,setTitle] = useState();
  const dispatch = useDispatch();
  function useDocumentTitle(routes) {
    // const location = useLocation();
    console.log("nkner")

  
    useEffect(() => {
      console.log("nkner")
      const currentRoute = routes.find(route =>
        route.exact ? route.path === window.location.pathname : window.location.pathname.startsWith(route.path)
      );
      if (currentRoute) {
        document.title = currentRoute.title || "hairsncares";
      }
    }, [window.location?.pathname , routes]);
  }

  // useDocumentTitle(routes); 

  useEffect(() => {
    console.log("jsijroir")
    dispatch(getUtilityContentData()); 

  },[])
  useEffect(() => {
    console.log("nkner",window.location?.pathname )
    const currentRoute = routes.find(route =>
      route.exact ? route.path === window.location.pathname : window.location.pathname.startsWith(route.path)
    );
    if (currentRoute) {
      document.title = currentRoute.title || "hairsncares";
    }
  }, [title]);
  // Set document title based on the route
  console.log("sokro",localStorage.getItem("cart"))
  const [cart,setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []); 

  const [market,setMarket] = useState()

  useEffect(() => {
    let s = sessionStorage.getItem("isPopup");
    console.log("skrfgoekr",s)
    if(!s){
      setMarket(true)
    }
  }, []);


  return (
    <div style={{overflowX:"hidden"}} className='root-mobile'>
      <Router>
        <Routes>
        <Route path="/" element={<AdminLogin />} />
          <Route path="/home" element={<HomePage setTitle={setTitle} cart={cart} setCart={setCart}/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path = "/disclaimer" element={<Disclaimer/>}/>
          <Route path = "/termsOfService" element={<TermsOfService/>}/>
          <Route path = "/returnPolicy" element={<ReturnPolicy/>}/>
          <Route path = "/policy" element={<Policy/>}/>
          <Route path="/shop" element={<ProductPage setTitle={setTitle} cart={cart} setCart={setCart} />} />
          <Route path="/book" element={<BookAppointmentPage   setTitle={setTitle}/>} />
          <Route path="/about-us" element={<AboutUsPage   setTitle={setTitle}/>} />
          <Route path="/product-detail/:id" element={<ProductDetail   setTitle={setTitle} cart={cart} setCart={setCart}/>} />
          <Route path="/our-specialist" element={<OurSpecialistsPage   setTitle={setTitle}/>} />
          <Route path="/our-expertise" element={<OurExpertisePage   setTitle={setTitle}/>} />
          <Route path="/user-profile" element={<MyReportsPages   setTitle={setTitle}/>} />
          <Route path="/user-profile/:id" element={<UserProfilePage   setTitle={setTitle}/>} />
          <Route path="/success/:id" element={<Success   setTitle={setTitle}/>} />
          <Route path="/unauthorized" element={<Unauthorized   setTitle={setTitle}/>} />
          <Route path="/hair-test" element={<HairTestPage   setTitle={setTitle}/>} />
          <Route path="/doctor/report/:id" element={<Report   setTitle={setTitle}/>} />
          <Route path="/doctor-analyse-report/:id" element={<DoctorAnalysis   setTitle={setTitle}/>} />
          <Route path="/address" element={<Address   setTitle={setTitle}/>} />
      
         <Route path='management-report/:id' element={<ManagementReport  setTitle={setTitle}/>} />
         <Route path='my-orders' element={<MyOrders  setTitle={setTitle}/>} />
         <Route path='create-order' element={<CreateOrder  setTitle={setTitle}/>} />
         <Route path='cart' element={<Cart  setTitle={setTitle} cart={cart} setCart={setCart}/>} />
         <Route path='coupon' element={<Coupons  setTitle={setTitle} cart={cart} setCart={setCart}/>} />
         <Route path="/AdminLogin" element={<AdminLogin />} />



          <Route element={<RoleBasedRoutes allowedRoles={['doctor']} />}>
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/patient-list" element={<PatientList />} />
            <Route path="/appointment" element={<AppointmentList />} />
            <Route path="/patient-test-result/:id" element={<PatientTestResult />} />
            <Route path="/analysis/:id" element={<Analysis />} />

          </Route>

          <Route element={<RoleBasedRoutes allowedRoles={['admin',"subadmin"]} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/pending-appointments" element={<PendingDashboard />} />
            <Route path="/all-patient-list" element={<AllPatientList />} />
            <Route path="/test-result/:id" element={<TestResults />} />
            <Route path="/pending-test-result/:id" element={<PendingTestResults />} />

            <Route path="/assign-appointment" element={<AssignAppointment />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/edit-doctor/:id" element={<EditDoctor />} />
            <Route path="/all-doctor" element={<AllDoctorList />} />
            <Route path="/all-hair-test-result" element={<AllHairTest />} />
            <Route path="/manage-website" element={<ManageWebsite />} />
            <Route path="/all-contact-us-form-result" element={<AllContactUs />} />
            <Route path="/reviews" element={<AllReviews />} />

            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-delete-product" element={<EditDeleteProduct />} />
            <Route path="/manage-order" element={<ManageOrder />} />
            <Route path="/all-coupons" element={<AllCoupons />} />
            <Route path="/admins" element={<AddAdmin />} />

            <Route path="/addInvoice" element={<AddInvoice />} />
            <Route path="/allInvoice" element={<AllInvoices />} />
            <Route path ="/invoiceView/:id" element={<InvoiceView />}/>
            <Route path="/addBlogs" element={<Blogs />} />
            <Route path="/allBlogs" element={<AllBlogs />} />
            <Route path="/editBlogs/:id" element={<Blogs />} />
            <Route path="/blogCategory" element={<BlogCategory />} />

            <Route path="/news" element={<News />} />


          </Route>
          <Route path='*' element={<ErrorPage/>} />
        </Routes>
      </Router>
      {/* <ToastContainer position="bottom-right" /> */}
      {/* {
        market ? <MarketPop onClose={() => {
          setMarket(false)
          sessionStorage.setItem("isPopup", "1");
        }}/> : <></>
      } */}
    </div>
  );
}

export default App;
