import React, { useEffect, useState } from 'react'
import { useNavigate,NavLink } from 'react-router-dom';
import { useMediaQuery } from "@mui/material";
import "./Sidebar.css"
import Footer from '../footer/Footer';

export default function Sidebar({children}) {
const navigate =useNavigate()
     let storedUserData = localStorage?.getItem("User343");
 let User=JSON.parse(storedUserData)?.logedInUser?.user;
const name = User?.fullname

const isMobile = useMediaQuery("(max-width: 768px)");

const [showMobileMenu, setShowMobileMenu] = useState(false);


const handleMobileMenuToggle = () => {
  console.log("jojeojfer", showMobileMenu)
  setShowMobileMenu(!showMobileMenu);
};

const [text,setText] = useState("")
console.log("jcoejof",window.location.pathname)

useEffect(() => {
  if(window.location.pathname == "/user-profile"){
    setText("My Reports")
  }
  else if(window.location.pathname == "/my-orders"){
    setText("My Order")
  }
  else if(window.location.pathname == "/cart"){
    setText("My Cart")
  }
  else if(window.location.pathname == "/address"){
    setText("My Profile")
  }
  else if(window.location.pathname == "/coupon"){
    setText("Coupons")
  }
  else{
    setText("My Profile")
  }
},[window.location.pathname])

  return (
    <div className="container sidebar-top-end">
    <div className="dashboard-container">
      {storedUserData ?       
     ( isMobile ? <div>
              <div className="menubar  sideBar-col-width-3" onClick={handleMobileMenuToggle} style={{position : "relative",paddingBottom : "5px"}}>
                  <div className='tab-color left-column-11 sideBar-col-width-3  d-flex' style={{flexDirection : "row"}} >
                    <div>
                      {text ? text : "My Profile"}
                    </div>  
                    <i class="fa-regular fa-square-caret-down"></i>
                  </div>
              </div>
             
              {showMobileMenu  && <div className="left-column sideBar-col-width-4" style={{position : "absolute",paddingTop : 0,zIndex:10}} >
        <div className='tab-color' onClick={()=>{
          navigate('/user-profile')

        }} >My Reports </div>
      
        <div className='tab-color' onClick={()=>{
          navigate('/my-orders')

        }}>My Order </div>
        <div className='tab-color' onClick={()=>{
          navigate('/cart')

        }}>My Cart </div>
        <div className='tab-color' onClick={()=>{
          navigate('/address')

        }}>My Profile </div>
        <div className='tab-color' onClick={()=>{
          navigate('/coupon')

        }}>Coupons </div>

      </div>}
        </div> : <div className="left-column sideBar-col-width-1" >
        <div className='tab-color' onClick={()=>navigate('/user-profile')} >My Reports </div>
      
        <div className='tab-color' onClick={()=>navigate('/my-orders')}>My Order </div>
        <div className='tab-color' onClick={()=>navigate('/cart')}>My Cart </div>
        <div className='tab-color' onClick={()=>navigate('/address')}>My Profile </div>
        <div className='tab-color' onClick={()=>navigate('/coupon')}>Coupons </div>

      </div>)
      
      
      
      
 : <div className="left-column">
          <div className='tab-color' onClick={()=>navigate('/cart')}>My Cart </div>        
        </div>}

      <div className="right-column sideBar-col-width-2" ><div>
        <h1 style={{marginTop:"0"}}>Welcome {name}</h1>
        {children}
        </div></div>
    </div>
    <Footer />
    
  </div>
  )
}
