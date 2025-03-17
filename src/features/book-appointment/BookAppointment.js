import React, { useState } from "react";
import "./BookAppointment.css";
import { CgFormatBold } from "react-icons/cg";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from "../../Config";
import { LeftAnimatedDiv, RightAnimatedDiv, ZoomInDiv } from "../../componet/Animation";
import { useSelector } from "react-redux";

function BookAppointment() {

  const [name, setName] = useState('');
  const [email, setemail] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [method, setMethod] = useState('');
  const [loader, setLoader] = useState(false);


  const content = useSelector((state) => state.content.contactus);
  const home = useSelector((state) => state.content.home);


  // const validateForm = () => {

  //   if (!name || !email || !phone || !msg || method) {
  //     toast.error("All fields are required.");
  //     return false;
  //   }
  //   return true;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!validateForm()) return;
    setLoader(true)
    // const formData = new FormData();
    // console.log("nnirhei",images)
    // images.forEach(image => formData.append('image', image));
    try {

      const data = {
        name, email, phone, msg, method
      };

      try {
        const response = await fetch(`${BASE_URL}/users/bookAppointmentContactUs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        });
        setLoader(false)
        if (response.ok) {
          const result = await response.json();
          toast.success("We will contact yow soon");
        } else {
          toast.error(`Failed`);
        }
      } catch (error) {
        setLoader(false)
        toast.error("Please logout and login again with valid credentials.");
        console.error('Error:', error);
      }
    } catch (error) {
      setLoader(false)
      toast.error("Please logout and login again with valid credentials.");
      console.error('Error:', error);
    }
  };



  return (
    <>
      <div className="book-appointment" style={{    height: "600px"}}>
        <div className="book-appointment-container container" style={{    height: "100%"}}>
          <LeftAnimatedDiv>
            <div >
              <h1 className="contect-us-heading animate__animated animate__fadeInLeft">{content?.section1?.title}</h1>
            </div>
          </LeftAnimatedDiv>
          <ZoomInDiv className="contact-img">
            <img alt='hair' src={content?.section1?.image} style={{height: "100%"}} />
          </ZoomInDiv>

          <RightAnimatedDiv>
            <div>
              <h4 className="sub-had-2" style={{fontSize : "2rem"}}>{content?.section1?.description}</h4>
            </div>
          </RightAnimatedDiv>
        </div>
        <div className='icon-abs'>
        {home?.section1?.socialImg?.map((e, ind) => {
          return (
            <div onClick={() => {
              if (ind == 0) {
                window.open("https://www.facebook.com/profile.php?id=61558302628092")
              }
              if (ind == 1) {
                window.open("https://wa.link/pcousx")
              }
              if (ind == 2) {
                window.open("https://www.youtube.com/@Hairsncares")
              }
              if (ind == 3) {
                window.open("https://www.instagram.com/hairsncares/?hl=en")
              }
              if (ind == 4) {
                window.open("https://x.com/hairsncare")
              }
            }} style={{ cursor: "pointer" }}>
              <img src={e} style={{ width: "25px", height: "25px" }} />
            </div>
          )
        })}
      </div>
      </div>





      <div className="contact-section-two pt-70 pb-0">
        <div className="container" style={{
          paddingRight: "15px",
          paddingLeft: "15px", fontFamily: '"Poppins", sans-serif', color: "#28367a"
        }}>
          <ZoomInDiv>
            <div className=" contact-information" style={{ background: `url("/assets/img/info-bg.jpg") center top no-repeat`, backgroundSize: "cover" }}>

              <h2 style={{
                fontWeight: "600",
                lineHeight: "1.3", fontSize: "24px"
              }}>Get in touch</h2>
              <div className="touch-container">
                <div className="touch">
                  <img alt='hair' src="/assets/img/icons/location.png" />
                  <div className="c-content">
                    <h4 style={{
                      fontWeight: "600",
                      lineHeight: "normal", fontSize: "16px", marginBottom: "15px"
                    }}>{content?.section2?.name}</h4>
                    <p>
                    {content?.section2?.address}
                    </p>
                  </div>
                </div>
                <div className="touch">
                  <img alt='hair' src="/assets/img/icons/contact-icon.png" />
                  <div className="c-content">
                    <h4 style={{
                      fontWeight: "600",
                      lineHeight: "normal", fontSize: "16px", marginBottom: "15px"
                    }}>{content?.section2?.phone}</h4>
                    <p style={{
                      fontWeight: "600",
                      lineHeight: "normal", fontSize: "16px", marginBottom: "15px",wordBreak:"break-all"
                    }}>{content?.section2?.email}</p>
                  </div>
                </div>
                <div className="touch">
                  <img alt='hair' src="/assets/img/icons/time.png" />
                  <div className="c-content">
                    <h4 style={{
                      fontWeight: "600",
                      lineHeight: "normal", fontSize: "16px", marginBottom: "15px"
                    }}>{content?.section2?.time1}</h4>
                    <p style={{
                      fontWeight: "600",
                      lineHeight: "normal", fontSize: "16px", marginBottom: "15px"
                    }}>{content?.section2?.time2}</p>
                  </div>
                </div>
              </div>
            </div>
          </ZoomInDiv>
        </div>
      </div>


      <div className="contect-input container " id ="section3">
        <LeftAnimatedDiv className="input-content ">

          <h2>Book a Quick Online Appointment</h2>
          <input placeholder="Your Name" onChange={(e) => setName(e.target.value)} />
          <input placeholder="Your Email" onChange={(e) => setemail(e.target.value)} />
          <input placeholder="Your Phone" onChange={(e) => setPhone(e.target.value)} />

          <textarea placeholder="Your Message" onChange={(e) => setMsg(e.target.value)} />
          <form>
            <p>Preferred</p>
            <i className="item-i"> <label className="check-contact">
              <input type="checkbox" checked={method == "Google Meet"} onChange={() => setMethod("Google Meet")} />
              Google Meet
            </label>
              <label className="check-contact">
                <input type="checkbox" checked={method == "Zoom Meet"} onChange={() => setMethod("Zoom Meet")} />
                Zoom Meet
              </label>
              <label className="check-contact">
                <input type="checkbox" checked={method == "Whatsapp"} onChange={() => setMethod("Whatsapp")} />
                Whatsapp
              </label>
              <label className="check-contact">
                <input type="checkbox" checked={method == "Phone"} onChange={() => setMethod("Phone")} />
                Phone
              </label>
            </i>
          </form>
          <button className="input-button-content" disabled={loader} onClick={handleSubmit}>{loader ? "Please wait..." : "Book Now"}</button>
        </LeftAnimatedDiv>
        <RightAnimatedDiv>
          <h2>{content?.section3?.title}</h2>
          <figure className="text-center">
            <img alt='hair' src={content?.section3?.img} />
          </figure>
          {
                content?.section3?.data?.map((item,i) => {
                    return(
                        <>
                                  <p className="text-list">
            <span>{"0"+(i+1)}</span>       {item?.desc}
          </p>
                        </>
                    )
                })
            }
        </RightAnimatedDiv>
      </div>
      <ToastContainer  position="bottom-right"/>

    </>
  );
}

export default BookAppointment;
