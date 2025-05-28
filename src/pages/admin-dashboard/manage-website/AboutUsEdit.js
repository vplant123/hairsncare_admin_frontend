import React, { useState } from "react";
// import "./About.css";
import { useNavigate } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import BASE_URL from "../../../Config";

const initialContent = {
  section1: {
    heading: "ABOUT US",
    image: "/assets/img/about/about-banner.png",
    subHeading: "HAVE EXPERT ADVICE FROM OUR",
    mainHeading: "PROFESSIONAL TEAM",
  },
  section2: {
    heading: "Welcome to HairsN<span className='h1-span'>Cares</span>",
    description: `
      At Hairsncares, we believe that healthy, lustrous, beautiful hair is a reflection of overall well-being.
      We understand the emotional impact that hair loss and thinning can have on individuals. Our mission is to provide the latest, effective,
      affordable solutions and support to help our clients regain their confidence and restore their hair's vitality.
    `,
    image: "/IMG_20240425_085350.jpg",
  },
  section3: {
    heading: "Our Journey",
    steps: [
      {
        number: "01",
        subHeading: "Personal Passion and Experience:",
        description: `
          Hairsncares was inspired by the founder, Dr. Amit Agarkar's personal journey and his deep commitment to holistic hair care.
          As an esteemed Trichologist and Hair Transplant Surgeon in India, he sought effective and reliable solutions for his patients' hair care needs.
        `,
        image: "/IMG_20240425_100125.png",
      },
      {
        number: "02",
        subHeading: "Development of Advanced Solutions:",
        description: `
          Dr. Agarkar's journey led to the creation of advanced and holistic hair care solutions with a strong track record of success.
          These solutions form the core of Hairsncares' offerings.
        `,
      },
      {
        number: "03",
        subHeading: "Addressing the Gap:",
        description: `
          Dr. Agarkar identified a significant gap in the availability of comprehensive resources and personalized guidance for individuals dealing with hair loss.
          He aimed to bridge this gap by establishing a platform that offers precise hair analysis and tailors treatment plans to suit each individual's specific requirements.
        `,
      },
      {
        number: "04",
        subHeading: "Creating a Team for Change:",
        description: `
          With a shared vision to transform the approach to hair care, Dr. Amit Agarkar assembled a team of dedicated professionals, including renowned specialists in hair health.
          Together, they founded Hairsncares as a comprehensive resource and destination for individuals seeking expert guidance and proven solutions to combat hair loss and thinning.
        `,
      },
    ],
  },
  section4: {
    heading: "Our Comprehensive Approach",
    description: `
      At Hairsncares, we understand that every individual's hair health journey is unique.
      That's why we offer a seamless and convenient online hair test. With just a few simple steps, you can take the hair test on our website,
      providing us with valuable insights into your hair and scalp condition. Once you've completed the hair test, our advanced algorithm analyzes the data
      and generates a comprehensive report detailing your hair health status. This report forms the foundation of your personalized holistic treatment plan
      including medicine, diet, stress & lifestyle care designed to tackle hair loss or thinning effectively.
    `,
    image: "/uploads/approach.png",
  },
  section5: {
    heading: "Core Principles for hair care",
    items: [
      {
        image: "/uploads/admprcore-pic-1.png",
        buttonLabel: "Modern Medicine",
        description: `
          Proven Treatment for Hair Loss/Thinning: We believe in evidence-based approaches, and our recommended treatments are backed by scientific research and proven results.
          Our panel of experienced doctors ensures thorough assessment of your hair & overall health to offer advanced, effective, affordable and safe treatment,
          empowering our clients to make informed decisions about their hair health.
        `,
      },
      {
        image: "/uploads/admprcore-pic-3.png",
        buttonLabel: "Diet",
        description: `
          We understand that proper nutrition plays a vital role in maintaining healthy hair. Our approach emphasizes the importance of a protein-rich diet and essential vitamins like E, D, biotin, etc.
          We provide personalized dietary recommendations that boost hair growth and overall well-being.
        `,
      },
      {
        image: "/uploads/admprcore-pic-2.png",
        buttonLabel: "Healthy Lifestyle",
        description: `
          At Hairsncares, we recognize the significance of adopting a healthy lifestyle for optimal hair health.
          We educate our clients about the importance of avoiding harmful practices such as smoking, excessive drinking, and damaging hairstyling techniques.
          We provide guidance on proper hair care practices, including shampooing, conditioning, and oil treatments, to promote healthier and stronger hair.
        `,
      },
      {
        image: "/uploads/core-pic-4.png",
        buttonLabel: "Stress Management",
        description: `
          We acknowledge that stress can significantly impact hair health. Our holistic approach extends beyond physical treatments and incorporates stress management techniques such as exercise,
          meditation, and exploring new hobbies. We also offer dietary recommendations that help manage stress levels, as a balanced mind contributes to healthy hair.
        `,
      },
    ],
  },
  section6: {
    heading: "Our Commitment",
    description: `
      At Hairsncares, we are committed to providing an empowering and supportive environment for our clients.
      Through our user-friendly website, individuals can easily take a hair test online, receive personalized analysis,
      and access expert treatment recommendations for their hair care journey. We offer the option of virtual consultations with our esteemed doctors,
      ensuring personalized attention and guidance throughout the process.
    `,
    items: [
      {
        subHeading: "Our Vision",
        image: "/assets/img/about/vission.png",
        description: `
          To reach out to people across the world aspiring to have enhanced hair regrowth with better results and make it possible for them with our customized holistic treatment plans.
        `,
      },
      {
        subHeading: "Our Goal",
        image: "/assets/img/about/mission.png",
        description: `
          To provide advanced, affordable, result-oriented hair care solutions and to cater clients worldwide.
        `,
      },
    ],
  },
};

export default function AboutUsEdit({
  section1,
  setSection1,
  section2,
  setSection2,
  section3,
  setSection3,
  section4,
  setSection4,
  section5,
  setSection5,
  section6,
  setSection6,
}) {
  const navigate = useNavigate();
  const [content, setContent] = useState(initialContent);
  const [uploadedImages, setUploadedImages] = useState({});

  const handleTextChange = (e, section, key, itemIndex) => {
    const value = e.target.value;
    setContent((prevContent) => {
      const updatedContent = { ...prevContent };
      if (itemIndex !== undefined) {
        updatedContent[section].steps[itemIndex][key] = value;
      } else {
        updatedContent[section][key] = value;
      }
      return updatedContent;
    });
  };

  const handleImageUpload = (e, section, itemIndex) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImages((prev) => ({
          ...prev,
          [`${section}-${itemIndex}`]: reader.result,
        }));
        setContent((prevContent) => {
          const updatedContent = { ...prevContent };
          if (itemIndex !== undefined) {
            updatedContent[section].steps[itemIndex].image = reader.result;
          } else {
            updatedContent[section].image = reader.result;
          }
          return updatedContent;
        });
      };
      reader.readAsDataURL(file);
    }
  };





  const handleImageUploadSection1 = async (e, type, ind) => {
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
      setSection1({ ...section1, image: imageData.imageUrl });
      // return imageArr;
    } catch (error) {
      // toast.error("Error uploading image.");
      console.error("Error:", error);
      return [];
      throw error;
    }
  };


  const handleImageUploadSection2 = async (e, type, ind) => {
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
      setSection2({ ...section2, img: imageData.imageUrl });
      // return imageArr;
    } catch (error) {
      // toast.error("Error uploading image.");
      console.error("Error:", error);
      return [];
      throw error;
    }
  };



  const handleImageUploadSection3 = async (e, type, ind) => {
    if (type == "img") {
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
        setSection2({ ...section3, img: imageData.imageUrl });
        // return imageArr;
      } catch (error) {
        // toast.error("Error uploading image.");
        console.error("Error:", error);
        return [];
        throw error;
      }
    }

    else {
      let inputData = section3?.data.map(item => ({ ...item }));
      inputData[ind][type] = e?.target?.value;
      console.log("nsjeorjte", inputData, e, type, ind)
      setSection3({ ...section3, data: inputData });
    }

  };


  const handleImageUploadSection4 = async (e) => {
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
      setSection4({ ...section4, img: imageData.imageUrl });
      // return imageArr;
    } catch (error) {
      // toast.error("Error uploading image.");
      console.error("Error:", error);
      return [];
      throw error;
    }
  };

  const handleImageUploadSection5 = async (e, type, ind) => {
    if (type == "img") {
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
        let inputData = section5?.data.map(item => ({ ...item }));
        inputData[ind][type] = imageData.imageUrl
        setSection5({ ...section5, data: inputData });
        // return imageArr;
      } catch (error) {
        // toast.error("Error uploading image.");
        console.error("Error:", error);
        return [];
        throw error;
      }
    }
    else {
      let inputData = section5?.data.map(item => ({ ...item }));
      inputData[ind][type] = e?.target?.value;
      setSection5({ ...section5, data: inputData });
    }
  };



  const handleImageUploadSection6 = async (e, type, ind) => {
    if (type == "icon") {
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
        let inputData = section6?.data.map(item => ({ ...item }));
        inputData[ind][type] = imageData.imageUrl
        setSection6({ ...section6, data: inputData });
        // return imageArr;
      } catch (error) {
        // toast.error("Error uploading image.");
        console.error("Error:", error);
        return [];
        throw error;
      }
    }
    else {
      let inputData = section6?.data.map(item => ({ ...item }));
      inputData[ind][type] = e?.target?.value;
      setSection6({ ...section6, data: inputData });
    }
  };

  return (
    <>
      <div className="about-us">
        <div className="container">
          <div className="about-us-container">
            <div>
              <input
                type="text"
                defaultValue={section1?.title}
                onChange={(e) =>
                  setSection1({ ...section1, title: e?.target?.value })
                }
                className="contect-us-heading"
                style={{ color: "black" }}
              />
            </div>
            <div>
              <img
                alt="hair"
                src={uploadedImages["section1-0"] || section1?.image}
              />
              <input
                type="file"
                onChange={(e) => handleImageUploadSection1(e)}
              />
            </div>
            <div>
              <ReactQuill
                defaultValue={section1?.description}
                onChange={(e) =>
                  setSection1({ ...section1, description: e?.target?.value })
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="about-section-2 container">
        <div className="item-2">
          <input
            type="text"
            defaultValue={section2?.title}
            onChange={(e) =>
              setSection2({ ...section2, title: e?.target?.value })
            }
            className="container-2-heading"
          />
          <textarea
            defaultValue={section2?.shortDesc}
            onChange={(e) =>
              setSection2({ ...section2, shortDesc: e?.target?.value })
            }
          />
          <textarea
            defaultValue={section2?.longDesc}
            onChange={(e) =>
              setSection2({ ...section2, longDesc: e?.target?.value })
            }
          />
        </div>
        <div className="image-2">
          <img alt="hair" src={uploadedImages["section2-0"] || section2?.img} />
          <input type="file" onChange={(e) => handleImageUploadSection2(e)} />
        </div>
      </div>
      <div className="section-3-wrapper">
        <div className="container">
          <div>
            <input
              type="text"
              defaultValue={section3?.title}
              onChange={(e) =>
                setSection3({ ...section3, title: e?.target?.value })
              }
              className="content-3-heading"
            />
          </div>
          <div className="content-3">
            <div className="content-container">
              <img alt="hair" src={section3?.img} />
              <input
                type="file"
                onChange={(e) => handleImageUploadSection3(e, "img", 0)}
              />
            </div>
            <div className="d-flex flex-column">
              {section3?.data?.map((step, ind) => {
                return (
                  <div className="content-item">
                    <div>
                      <input
                        type="text"
                        defaultValue={step?.title}
                        onChange={(e) =>
                          handleImageUploadSection3(e, "title", ind)
                        }
                        className="content-sub-item"
                      />
                      <ReactQuill
                        defaultValue={step?.desc}
                        onChange={(e) =>
                          handleImageUploadSection3({
                            target: {
                              value: e
                            }
                          }, "desc", ind)
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="about-container-3 container">
        <div className="container-3-item">
          <img alt="hair" src={section4.img} />
          <input type="file" onChange={(e) => handleImageUploadSection4(e)} />
          <input
            type="text"
            defaultValue={section4?.title}
            onChange={(e) => setSection4({ ...section4, title: e?.target?.value })
            }
            className="content-sub-item"
          />
          <ReactQuill
            defaultValue={section4?.desc}
            onChange={(e) =>
              setSection4({ ...section4, desc: e })
            }
          />
        </div>
      </div>
      <div className="about-container-4 container">
        <div className="container-4-item">
          <input
            type="text"
            defaultValue={section5?.title}
            onChange={(e) => setSection5({ ...section5, title: e?.target?.value })}
          />
          {section5?.data?.map((item, index) => (
            <div key={index} className="container-4-item">
              <img
                alt="hair"
                src={item?.img}
              />
              <input
                type="file"
                onChange={(e) => handleImageUploadSection5(e, "img", index)}
              />
              <input
                type="text"
                defaultValue={item?.title}
                onChange={(e) =>
                  handleImageUploadSection5(e, "title", index)
                }
              />
              <textarea
                defaultValue={item?.desc}
                onChange={(e) =>
                  handleImageUploadSection5(e, "desc", index)
                }
              />
            </div>
          ))}
        </div>
      </div>
      <div className="about-container-5 container">
        <div className="container-5-item">
          <input
            type="text"
            defaultValue={section6?.title}
            onChange={(e) => setSection6({ ...section6, title: e?.target?.value })}
          />

          <ReactQuill
            defaultValue={section6?.desc}
            onChange={(e) => setSection6({ ...section6, desc: e })}

          />
          {section6?.data?.map((item, index) => (
            <div key={index} className="container-5-item">
              <img
                alt="hair"
                src={item?.icon}
                style={{ background: "black" }}
              />
              <input
                type="file"
                onChange={(e) => handleImageUploadSection6(e, "icon", index)}
              />
              <input
                type="text"
                defaultValue={item?.title}
                onChange={(e) =>
                  handleImageUploadSection6(e, "title", index)
                }
              />
              <textarea
                defaultValue={item?.desc}
                onChange={(e) =>
                  handleImageUploadSection6(e, "desc", index)
                }
              />


            </div>
          ))}
        </div>
      </div>
    </>
  );
}
