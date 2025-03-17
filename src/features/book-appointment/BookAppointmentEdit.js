import React, { useState } from "react";
import "./BookAppointment.css";
import { CgFormatBold } from "react-icons/cg";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from "../../Config";
import { LeftAnimatedDiv, RightAnimatedDiv, ZoomInDiv } from "../../componet/Animation";

function BookAppointmentEdit({
    section1,
    setSection1,
  section2,
  setSection2,
  section3,
  setSection3}) {

  const [name, setName] = useState('');
  const [email, setemail] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [method, setMethod] = useState('');
  const [loader, setLoader] = useState(false);

  console.log("oskjrojf",section1)


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

  const handleImageUploadSection1 = async (e,type,ind) => {
    const file = e.target.files[0];
  
    try {
        const element = file;
        const formData = new FormData();
        formData.append("image", element);
  
        const imageResponse = await fetch(
          `${BASE_URL}/hair-tests/upload-image`,
          {
            method: "POST",
            body: formData,
          }
        );
        if (!imageResponse.ok) {
          // toast.error("Error uploading images.");
          throw new Error("Network response was not ok");
        }
        const imageData = await imageResponse.json();
        setSection1({...section1,image : imageData.imageUrl});
        // return imageArr;
      } catch (error) {
        // toast.error("Error uploading image.");
        console.error("Error:", error);
        return [];
        throw error;
      }
};

const handleImageUploadSection3 = async (e,type,ind) => {
    const file = e.target.files[0];
  
    try {
        const element = file;
        const formData = new FormData();
        formData.append("image", element);
  
        const imageResponse = await fetch(
          `${BASE_URL}/hair-tests/upload-image`,
          {
            method: "POST",
            body: formData,
          }
        );
        if (!imageResponse.ok) {
          // toast.error("Error uploading images.");
          throw new Error("Network response was not ok");
        }
        const imageData = await imageResponse.json();
        setSection3({...section3,img : imageData.imageUrl});
        // return imageArr;
      } catch (error) {
        // toast.error("Error uploading image.");
        console.error("Error:", error);
        return [];
        throw error;
      }
};



  return (
    <>
      <div className="book-appointment" style={{    height: "600px"}}>
        <div className="book-appointment-container container" style={{    height: "100%"}}>
            <div >
              {/* <h1 className="contect-us-heading animate__animated animate__fadeInLeft">{section1?.title}</h1> */}
              <input
                type="text"
                defaultValue={section1?.title}
                onChange={(e) =>
                  setSection1({ ...section1, title: e?.target?.value })
                }
                // className="contect-us-heading"
                style={{ color: "black" }}
              />
            </div>
            <div className="d-flex flex-column"> 
            <img
                alt="hair"
                src={section1?.image}
                style={{height : "100%",width : "100%"}}
              />
              <input
                type="file"
                onChange={(e) => handleImageUploadSection1(e)}
              />
            </div>
          {/* <ZoomInDiv className="contact-img"> */}

          {/* </ZoomInDiv> */}

          {/* <RightAnimatedDiv> */}
            <div>
            <input
                type="text"
                defaultValue={section1?.description}
                onChange={(e) =>
                  setSection1({ ...section1, description: e?.target?.value })
                }
                // className="contect-us-heading"
                style={{ color: "black" }}
              />
              {/* <h2 className="cont-head-2">WE ARE HERE TO HELP</h2> */}
            </div>
          {/* </RightAnimatedDiv> */}
        </div>
      </div>





      <div className="contact-section-two pt-70 pb-0">
        <div className="container" style={{
          paddingRight: "15px",
          paddingLeft: "15px", fontFamily: '"Poppins", sans-serif', color: "#28367a"
        }}>
          {/* <ZoomInDiv> */}
            <div className=" contact-information" style={{ background: `url("/assets/img/info-bg.jpg") center top no-repeat`, backgroundSize: "cover" }}>

              <h2 style={{
                fontWeight: "600",
                lineHeight: "1.3", fontSize: "24px"
              }}>Get in touch</h2>
              <div className="touch-container">
                <div className="touch">
                  <img alt='hair' src="/assets/img/icons/location.png" />
                  <div className="c-content">
                  <input
                type="text"
                defaultValue={section2?.name}
                onChange={(e) =>
                  setSection2({ ...section2, name: e?.target?.value })
                }
                // className="contect-us-heading"
                style={{ color: "black" }}
              />
              <input
                type="text"
                defaultValue={section2?.address}
                onChange={(e) =>
                  setSection2({ ...section2, address: e?.target?.value })
                }
                // className="contect-us-heading"
                style={{ color: "black" }}
              />
                  </div>
                </div>
                <div className="touch">
                  <img alt='hair' src="/assets/img/icons/contact-icon.png" />
                  <div className="c-content">
                  <input
                type="text"
                defaultValue={section2?.phone}
                onChange={(e) =>
                  setSection2({ ...section2, phone: e?.target?.value })
                }
                // className="contect-us-heading"
                style={{ color: "black" }}
              />
              <input
                type="text"
                defaultValue={section2?.email}
                onChange={(e) =>
                  setSection2({ ...section2, email: e?.target?.value })
                }
                // className="contect-us-heading"
                style={{ color: "black" }}
              />
                  </div>
                </div>
                <div className="touch">
                  <img alt='hair' src="/assets/img/icons/time.png" />
                  <div className="c-content">
                  <input
                type="text"
                defaultValue={section2?.time1}
                onChange={(e) =>
                  setSection2({ ...section2, time1: e?.target?.value })
                }
                // className="contect-us-heading"
                style={{ color: "black" }}
              />
              <input
                type="text"
                defaultValue={section2?.time2}
                onChange={(e) =>
                  setSection2({ ...section2, time2: e?.target?.value })
                }
                // className="contect-us-heading"
                style={{ color: "black" }}
              />
                  </div>
                </div>
              </div>
            </div>
          {/* </ZoomInDiv> */}
        </div>
      </div>


      <div className="contect-input container " id ="section3">

        {/* <RightAnimatedDiv> */}
        <div className="d-flex flex-column">
        <input
                type="text"
                defaultValue={section3?.title}
                onChange={(e) =>
                  setSection3({ ...section3, title: e?.target?.value })
                }
                // className="contect-us-heading"
                style={{ color: "black" }}
              />
            <div className="d-flex flex-column"> 
            <img
                alt="hair"
                src={section3?.img}
                style={{height : "100%",width : "100%"}}
              />
              <input
                type="file"
                onChange={(e) => handleImageUploadSection3(e)}
              />
            </div>

            {
                section3?.data?.map((item,i) => {
                    return(
                        <>
                                  <p className="text-list">
            <span>{"0"+(i+1)}</span>        <input
                type="text"
                defaultValue={item?.desc}
                onChange={(e) =>
                {
                    let inputData = section3?.data.map(item => ({ ...item }));
                    inputData[i].desc = e?.target?.value
                    setSection3({...section3,data : inputData});
                }
                }
                // className="contect-us-heading"
                style={{ color: "black" }}
              />
          </p>
                        </>
                    )
                })
            }
          {/* <p className="text-list">
            <span>01</span>Complete online Hair test
          </p>
          <p className="text-list">
            {" "}
            <span>02</span>Take a virtual consultation with Dermatologist
          </p>
          <p className="text-list">
            <span>03</span> Get your detailed hair analysis report
          </p>
          <p className="text-list">
            <span>04</span>Get a customised hair growth solution with lifestyle
            advice at your doorstep
          </p> */}
        </div>

        {/* </RightAnimatedDiv> */}
      </div>
      <ToastContainer  position="bottom-right"/>

    </>
  );
}

export default BookAppointmentEdit;
