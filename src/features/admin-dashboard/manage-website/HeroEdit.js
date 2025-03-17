import React, { useEffect, useState } from 'react';
import '../../hero-section/Hero.css'
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../AdminNavbar';
import { useSelector } from 'react-redux';
import BASE_URL from '../../../Config';



export default function HeroEdit({section1,
  setSection1}) {

    const navigate = useNavigate();
    const [selectedHero, setSelectedHero] = useState(1);
    const [data, setData] = useState([]);
    const [hairTestButtonText, setHairTestButtonText] = useState("TAKE HAIR TEST");
    const [bookAppointmentButtonText, setBookAppointmentButtonText] = useState("BOOK AN APPOINTMENT");


    const handlesetDataChange =  async (value,i,type) => {
      let inputData;
      if (type == "image") {
        try {
          const element = value;
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
          inputData = data.map(item => ({ ...item }));
          console.log("wsefwee",imageData,inputData)
          value = imageData.imageUrl;
          console.log("smrkjgioe",inputData,value,i,inputData[i][type])
          inputData[i][type] = imageData.imageUrl;
          setData(inputData);
          // return imageArr;
        } catch (error) {
          // toast.error("Error uploading image.");
          console.error("Error:", error);
          return [];
          throw error;
        }
      } else {
        inputData =  data.map(item => ({ ...item }));
        console.log("smrkjgioe",inputData,value,i,inputData[i][type])
        inputData[i][type] = value;
        setData(inputData);
      }

      setSection1({...section1,data : inputData})
      
    };  
    // const addsetDataChange = () => {
    //   setData([...data,""]);
    // };  
    // const removesetDatatChange = (ind) => {
    //   let input = data;
    //   let new1 = input?.filter((e,i) => i != ind);
    //   setData(new1);
    // };  

    useEffect(() => {
      setData(section1?.data)

    },[section1])

  
    const handleHairTestTextChange = (e) => {
      setHairTestButtonText(e.target.value);
    };
  
    const handleBookAppointmentTextChange = (e) => {
      setBookAppointmentButtonText(e.target.value);
    };



    const handleImageUpload = async (e,ind) => {
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
            let inputData = section1?.socialImg?.map(item => item);
            console.log("moerofer",inputData)
            inputData[ind] = imageData.imageUrl;
            setSection1({...section1,socialImg : inputData})
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
    <div className='icon-wrap'>
      <div className='main-hero'>
        {
          data?.map((e,ind) => {
            return (
              <div
                className={`hero-section ${
                  selectedHero == ind + 1 ? "active1" : ""
                }`}
              >
                <div className="wrapper">
                  <div className="hero-container container">
                    <div className="hero-content">
                      <div className="hero-heading">
                        <input
                          type="text"
                          defaultValue={e?.title}
                          onChange={(e) =>
                            handlesetDataChange(e?.target?.value, ind, "title")
                          }
                          className="editable-input"
                        />
                        <input
                          type="text"
                          defaultValue={e?.description}
                          onChange={(e) =>
                            handlesetDataChange(
                              e?.target?.value,
                              ind,
                              "description"
                            )
                          }
                          className="editable-input"
                        />
                        <div className="hero-btn">
                          <input
                            type="button"
                            value={hairTestButtonText}
                            className="btn primary"
                            onChange={handleHairTestTextChange}
                          />
                          <input
                            type="button"
                            value={bookAppointmentButtonText}
                            className="btn"
                            onChange={handleBookAppointmentTextChange}
                          />
                        </div>
                      </div>
                      <div className="Edit-Image">
                        {" "}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handlesetDataChange(
                              e.target.files[0],
                              ind,
                              "image"
                            )
                          }
                        />
                        <img
                          className="hero-image"
                          src={e?.image}
                          alt="Hair Growth"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }
        {/* <div className={`hero-section ${selectedHero === 1 ? 'active1' : ''}`}>
          <div className='wrapper'>
            <div className='hero-container container'>
              <div className='hero-content'>
                <div className='hero-heading'>
                  <input
                    type="text"
                    value={spanText}
                    onChange={handleSpanChange}
                    className='editable-input'
                  />
                  <input
                    type="text"
                    value={h2Text}
                    onChange={handleH2Change}
                    className='editable-input'
                  />
                  <input
                    type="text"
                    value={headingText}
                    onChange={handleHeadingChange}
                    className='editable-input'
                  />
                  <div className='hero-btn'>
                    <input
                      type="button"
                      value={hairTestButtonText}
                     
                      className='btn primary'
                      onChange={handleHairTestTextChange}
                    />
                    <input
                      type="button"
                      value={bookAppointmentButtonText}
                    
                      className='btn'
                      onChange={handleBookAppointmentTextChange}
                    />
                  </div>
                </div>
               <div className='Edit-Image'> <input type="file" accept="image/*" />
                <img  className='hero-image' src='/uploads/admprhero-banner.png' alt='Hair Growth' /></div>
              </div>
            </div>
          </div>
        </div>
        <div className={`hero-section ${selectedHero === 2 ? 'active1' : ''}`}>
          <div className='wrapper'>
            <div className='hero-container container'>
              <div className='hero-content'>
                <div className='hero-heading'>
                  <input
                    type="text"
                    value={spanText}
                    onChange={handleSpanChange}
                    className='editable-input'
                  />
                  <input
                    type="text"
                    value={h2Text}
                    onChange={handleH2Change}
                    className='editable-input'
                  />
                  <input
                    type="text"
                    value={headingText}
                    onChange={handleHeadingChange}
                    className='editable-input'
                  />
                  <div className='hero-btn'>
                    <input
                      type="button"
                      value={hairTestButtonText}
                      onClick={() => navigate('/hair-test')}
                      className='btn primary'
                      onChange={handleHairTestTextChange}
                    />
                    <input
                      type="button"
                      value={bookAppointmentButtonText}
                      onClick={() => navigate('/book')}
                      className='btn'
                      onChange={handleBookAppointmentTextChange}
                    />
                  </div>
                </div>
                <div className='Edit-Image'> <input type="file" accept="image/*" />
                <img  className='hero-image' src='/uploads/admprhero-banner-two.png' alt='Hair Growth' /></div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="radio-buttons3">
          <label>
            <input
              type="radio"
              value={1}
              checked={selectedHero === 1}
              onChange={() => setSelectedHero(1)}
            />
          </label>
          <label>
            <input
              type="radio"
              value={2}
              checked={selectedHero === 2}
              onChange={() => setSelectedHero(2)}
            />
          </label>
        </div>
      </div>
      <div className='icon-abs'>
        {section1?.socialImg?.map((e,ind) => {
          return(
            <div>
              <img src = {e} style={{width:"25px",height:"25px"}} />
              <input
      type="file"
      accept="image/*"
      onChange={(e) => handleImageUpload(e,ind)}
      style={{width : "95px"}}
    />
            </div>
          )
        })}
        {/* <FaFacebook size={25} />
        <FaWhatsapp size={25} /> */}
      </div>
    </div>
  </>
  )
}
