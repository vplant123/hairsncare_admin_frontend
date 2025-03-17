// Footer.js
import React from "react";
import "./Footer.css";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { RiSendPlaneLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();


  const scrollToTop = () =>{ 
    window.scrollTo({ 
      top: 0,  
      behavior: 'smooth'
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    }); 
  }; 
  
  return (
    <div>
        <footer className="footer-container container">
      <div className="footer-item">
        <img alt="hair" src="/assets/img/footer-logo.png" />
        <div className="icon-footer">
          <FaMapMarkerAlt size={35} />
          <p>
            HairsnCares.com, 101, Kane Plaza, Above Union Bank, Near Evershine
            Mall, Mindspace, Malad West, Mumbai, Maharashtra, 400064
          </p>
        </div>
        <div className="icon-footer al">
          <FaPhone size={14} />
          <p>9136028327</p>
        </div>
        <div className="icon-footer al">
          <IoMdMail />
          <p>hairsncares@gmail.com</p>
        </div>
      </div>
      <div className="footer-item">
        <h3>SUPPORT</h3>
        <p
          onClick={() => {
            scrollToTop()
            navigate("/disclaimer")
          }
          }
          style={{ cursor: "pointer" }}
        >
          Disclaimer{" "}
        </p>
        <p onClick={() => {
          scrollToTop()
          navigate("/policy")
          }} style={{ cursor: "pointer" }}>
          Privacy Policy
        </p>
        <p
          onClick={() => {
            scrollToTop()
            navigate("/termsOfService")
          }}
          style={{ cursor: "pointer" }}
        >
          Terms of Service
        </p>
        <p
          onClick={() => {
            scrollToTop()
            navigate("/returnPolicy")
          }}
          style={{ cursor: "pointer" }}
        >
          Cancellation/Refund Policy
        </p>
      </div>
      <div className="footer-item">
        <h3>COMPANY</h3>
        <p
          className="com-con"
          onClick={() => {
            window.location = "/";
          }}
          style={{ cursor: "pointer" }}
        >
          HOME
        </p>
        <p
          className="com-con"
          onClick={() => {
            window.location = "/about-us";
          }}
          style={{ cursor: "pointer" }}
        >
          ABOUT
        </p>
        <p
          className="com-con"
          onClick={() => {
            window.location = "/our-specialist";
          }}
          style={{ cursor: "pointer" }}
        >
          OUR SPECIALIST
        </p>
        <p
          className="com-con"
          onClick={() => {
            window.location = "/book";
          }}
          style={{ cursor: "pointer" }}
        >
          CONTACT US
        </p>
      </div>
      <div className="footer-item">
        <h3>NEWSLETTER</h3>
        <p className="com-con">
          Subscribe to our weekly Newsletter and receive updates via email
        </p>
        <form action="#">
          <input
            type="email"
            name="news_email"
            id="news_email"
            placeholder="hairsncares@gmail.com"
          />

          <div class="btn-footer">
            <button
              class="theme-btn-1 btn-foo"
              type="submit"
              value="news_submit"
              id="news_submit"
              disabled="disabled"
            >
              <RiSendPlaneLine size={20} />
            </button>
          </div>
        </form>
      </div>
    </footer>
          <div className="row">
          <div className="copyright col-12">2024 Copyrights with HairsNcares.com      </div>
    
          </div>
    </div>
  );
};

export default Footer;
