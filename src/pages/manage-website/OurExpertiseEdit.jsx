import React, { useState } from "react";
const BASE_URL = "https://backend.hairsncares.com/api/v1";
import '../our-expertise/OurExpertise.css';
// import BeforeAfter from '../before-after/BeforeAfter';
// import Footer from '../footer/Footer';
// import Faq from '../our-specialist/faq/Faq';
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

export default function OurExpertise({
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
  section7,
  setSection7,
}) {
  const [data, setData] = useState({
    expertiseTitle: "OUR EXPERTISE",
    expertiseDescription:
      "We use only the best quality materials on the market in order to provide the best products to our patients.",
    servicesTitle: "Our Services",
    services: [
      {
        title: "Hair Transplant",
        items: [
          {
            title: "MHI Hair Transplant",
            description:
              "AI-driven hair analysis tool, in skilled dermatologists, delivering personalized solutions for your hair",
            image: "/images2/img_admprcore_pic_1_png_4.png",
          },
          {
            title: "MHI Hair Transplant",
            description:
              "AI-driven hair analysis tool, in skilled dermatologists, delivering personalized solutions for your hair",
            image: "/images2/img_admprcore_pic_1_png.png",
          },
        ],
      },
      {
        title: "Hair Loss Procedure",
        items: [
          {
            title: "V-Grow",
            description:
              "AI-driven hair analysis tool, in skilled dermatologists, delivering personalized solutions for your hair",
            image: "/images2/img_admprcore_pic_1_png_3.png",
          },
          {
            title: "Biotin PRP",
            description:
              "AI-driven hair analysis tool, in skilled dermatologists, delivering personalized solutions for your hair",
            image: "/images2/img_admprcore_pic_1_png_5.png",
          },
          {
            title: "GFC PRP",
            description:
              "AI-driven hair analysis tool, in skilled dermatologists, delivering personalized solutions for your hair",
            image: "/images2/img_admprcore_pic_1_png.png",
          },
          {
            title: "Stem Cell PRP",
            description:
              "AI-driven hair analysis tool, in skilled dermatologists, delivering personalized solutions for your hair",
            image: "/images2/img_admprcore_pic_1_png_146x169.png",
          },
          {
            title: "QR678",
            description:
              "AI-driven hair analysis tool, in skilled dermatologists, delivering personalized solutions for your hair",
            image: "/images2/img_admprcore_pic_1_png_1.png",
          },
          {
            title: "Laser Grow",
            description:
              "AI-driven hair analysis tool, in skilled dermatologists, delivering personalized solutions for your hair",
            image: "/images2/img_admprcore_pic_1_png_2.png",
          },
        ],
      },
      {
        title: "Our Procedure",
        items: [
          {
            title: "V Cover",
            description:
              "AI-driven hair analysis tool, in skilled dermatologists, delivering personalized solutions for your hair",
            image: "/images2/img_admprcore_pic_1_png_6.png",
          },
          {
            title: "V Fix",
            description:
              "AI-driven hair analysis tool, in skilled dermatologists, delivering personalized solutions for your hair",
            image: "/images2/img_admprcore_pic_1_png_7.png",
          },
        ],
      },
    ],
    expertiseImage: "/images2/img_hair_transplant.png",
  });

  const handleInputChange = (e, sectionIndex, itemIndex, key) => {
    const newData = { ...data };
    if (itemIndex !== undefined) {
      newData.services[sectionIndex].items[itemIndex][key] = e.target.value;
    } else {
      newData[sectionIndex][key] = e.target.value;
    }
    setData(newData);
  };

  const handleImageUpload = (e, sectionIndex, itemIndex) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newData = { ...data };
        if (itemIndex !== undefined) {
          newData.services[sectionIndex].items[itemIndex].image = reader.result;
        } else {
          newData[sectionIndex].image = reader.result;
        }
        setData(newData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    console.log(data);
    // Handle the JSON object submission (e.g., send it to a server)
  };

  const handleImageUploadSection1 = async (e, type, ind) => {
    const file = e.target.files[0];

    try {
      const element = file;
      const formData = new FormData();
      formData.append("image", element);

      const imageResponse = await fetch(`${BASE_URL}/hair-tests/upload-image`, {
        method: "POST",
        body: formData,
      });
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
        let inputData = section3?.data.map(item => ({ ...item }));
        inputData[ind][type] = imageData.imageUrl;
        setSection3({ ...section3, data: inputData });
        // return imageArr;
      } catch (error) {
        // toast.error("Error uploading image.");
        console.error("Error:", error);
        return [];
        throw error;
      }
    } else {
      let inputData = section3?.data.map(item => ({ ...item }));
      inputData[ind][type] = e?.target?.value;
      setSection3({ ...section3, data: inputData });
    }
  };

  const handleImageUploadSection4 = async (e, type, ind) => {
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
        let inputData = section4?.data.map(item => ({ ...item }));
        inputData[ind][type] = imageData.imageUrl;
        setSection4({ ...section4, data: inputData });
        // return imageArr;
      } catch (error) {
        // toast.error("Error uploading image.");
        console.error("Error:", error);
        return [];
        throw error;
      }
    } else {
      let inputData = section4?.data.map(item => ({ ...item }));
      inputData[ind][type] = e?.target?.value;
      setSection4({ ...section4, data: inputData });
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
        inputData[ind][type] = imageData.imageUrl;
        setSection5({ ...section5, data: inputData });
        // return imageArr;
      } catch (error) {
        // toast.error("Error uploading image.");
        console.error("Error:", error);
        return [];
        throw error;
      }
    } else {
      let inputData = section5?.data.map(item => ({ ...item }));
      inputData[ind][type] = e?.target?.value;
      setSection5({ ...section5, data: inputData });
    }
  };

  const handleImageUploadSection6 = async (e, type, ind) => {
    const file = e.target.files[0];

    try {
      const element = file;
      const formData = new FormData();
      formData.append("image", element);

      const imageResponse = await fetch(`${BASE_URL}/hair-tests/upload-image`, {
        method: "POST",
        body: formData,
      });
      if (!imageResponse.ok) {
        // toast.error("Error uploading images.");
        throw new Error("Network response was not ok");
      }
      const imageData = await imageResponse.json();
      setSection6({ img: imageData.imageUrl });
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
      <div className="about-us">
        <div className="">
          <div className="our-expertise-container">
            <div>
              <input
                type="text"
                defaultValue={section1?.title}
                onChange={e =>
                  setSection1({ ...section1, title: e?.target?.value })
                }
                // className="contect-us-heading"
              />
            </div>
            <div className="iman">
              <img alt="hair" src={section1?.image} />
              <input
                type="file"
                accept="image/*"
                onChange={e => handleImageUploadSection1(e, "image", 0)}
              />
              {/* <button onClick={() => document.querySelector('input[type="file"]').click()} className='btn'>UPLOAD IMAGE</button> */}
            </div>
            <div className="tes-alig">
              <textarea
                value={section1?.description}
                onChange={e =>
                  setSection1({ ...section1, description: e?.target?.value })
                }
                className="sub-had-2"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="trust-head d-flex left_animation">
        <p>
          <textarea
            type="text"
            defaultValue={section2?.num1}
            onChange={e => setSection2({ ...section2, num1: e?.target?.value })}
            // className="contect-us-heading"
          />
        </p>
        <p>
          <textarea
            type="text"
            defaultValue={section2?.num2}
            onChange={e => setSection2({ ...section2, num2: e?.target?.value })}
            // className="contect-us-heading"
          />
        </p>
      </div>

      <div className="trust-head1">
        <h1>
          {" "}
          <textarea
            type="text"
            defaultValue={section3?.title}
            onChange={e =>
              setSection3({ ...section3, title: e?.target?.value })
            }
            // className="contect-us-heading"
          />
        </h1>
        <div className="our-expertise-section our-ex ps-8  ">
          {section3?.data.map((item, itemIndex) => (
            <div key={itemIndex} className="item-2 our-ex2">
              <div className="item-21 animate__backInLeft">
                <img alt="hair" src={item?.img} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleImageUploadSection3(e, "img", itemIndex)}
                />
                <input
                  type="text"
                  defaultValue={item?.title}
                  onChange={e =>
                    handleImageUploadSection3(e, "title", itemIndex, "title")
                  }
                  className="item-h1"
                />
                <ReactQuill
                  defaultValue={item?.desc}
                  onChange={e => {
                    let p = {
                      target: {
                        value: e,
                      },
                    };
                    handleImageUploadSection3(p, "desc", itemIndex);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="trust-head1">
        <h1>
          <textarea
            type="text"
            defaultValue={section4?.title}
            onChange={e =>
              setSection4({ ...section4, title: e?.target?.value })
            }
            // className="contect-us-heading"
          />
        </h1>
        <div className="our-expertise-section our-ex ps-8">
          {section4?.data?.map((item, itemIndex) => (
            <div key={itemIndex} className="item-2 our-ex2">
              <div className="item-21 animate__backInLeft">
                <img alt="hair" src={item?.img} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleImageUploadSection4(e, "img", itemIndex)}
                />
                <input
                  type="text"
                  defaultValue={item?.title}
                  onChange={e =>
                    handleImageUploadSection4(e, "title", itemIndex)
                  }
                  className="item-h1"
                />
                <ReactQuill
                  defaultValue={item?.desc}
                  onChange={e => {
                    let p = {
                      target: {
                        value: e,
                      },
                    };
                    handleImageUploadSection4(p, "desc", itemIndex);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="trust-head1">
        <h1>
          <textarea
            type="text"
            defaultValue={section5?.title}
            onChange={e =>
              setSection5({ ...section5, title: e?.target?.value })
            }
            // className="contect-us-heading"
          />
        </h1>
        <div className="our-expertise-section our-ex ps-8">
          {section5?.data?.map((item, itemIndex) => (
            <div key={itemIndex} className="item-2 our-ex2">
              <div className="item-21 animate__backInLeft">
                <img alt="hair" src={item?.img} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleImageUploadSection5(e, "img", itemIndex)}
                />
                <input
                  type="text"
                  defaultValue={item?.title}
                  onChange={e =>
                    handleImageUploadSection5(e, "title", itemIndex)
                  }
                  className="item-h1"
                />
                <ReactQuill
                  defaultValue={item?.desc}
                  onChange={e => {
                    let p = {
                      target: {
                        value: e,
                      },
                    };
                    handleImageUploadSection5(p, "desc", itemIndex);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <BeforeAfter />
      <Faq />
      <Footer /> */}
      <div className="image-coverr">
        <img alt="hair" src={section6?.img} />
        <input
          type="file"
          accept="image/*"
          onChange={e => handleImageUploadSection6(e, "img", 0)}
        />
      </div>

      <div className="faq-container p-6">
        {section7?.map((faq, index) => (
          <div className="faq-item" key={index}>
            <h3 className="faq-question">
              {faq?.title}
              <ReactQuill
                defaultValue={faq?.title}
                onChange={e => {
                  console.log("jeworjo", e);
                  let inputData = section7?.map(item => ({ ...item }));
                  inputData[index]["title"] = e;
                  setSection7(inputData);
                }}
              />
            </h3>
            {<div className="faq-answer">{faq?.desc}</div>}
          </div>
        ))}
      </div>
    </>
  );
}
