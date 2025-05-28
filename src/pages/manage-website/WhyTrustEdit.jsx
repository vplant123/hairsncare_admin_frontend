import React, { useState } from "react";
const BASE_URL = "https://backend.hairsncares.com/api/v1";
import '../why-trust-hair-care/WhyTrustHairCare.css';

const handleImageUpload = async (e, setSection4, section4, ind, type) => {
  if (type == "icon") {
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
      let inputData = section4?.data.map(item => ({ ...item }));
      inputData[ind]["icon"] = imageData.imageUrl;
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
    inputData[ind]["text"] = e?.target?.value;
    setSection4({ ...section4, data: inputData });
  }
};

const CareItem = ({ imgSrc, text, opacity, setSection4, section4, ind }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      borderRadius: "100%",
      alignItems: "center",
      justifyContent: "center",
      height: "170px",
      color:"black",
    }}
  >
    <img
      src={imgSrc}
      width={"50px"}
      height={"50px"}
      alt={text}
      // style={{ width: '95px', position: 'absolute', opacity: "1" }}
    />
    <input
      type="file"
      accept="image/*"
      onChange={e => handleImageUpload(e, setSection4, section4, ind, "icon")}
      style={{ width: "95px" }}
    />
    <div
      className="font-trust"
      style={{ color: "#fff", fontSize: "12px", fontWeight: "bold" }}
    >
      <input
        type="text"
        defaultValue={text}
        onChange={e => handleImageUpload(e, setSection4, section4, ind, "")}
        className="editable-input"
        style={{ width: "75px" }}
      />
    </div>
  </div>
);

export default function WhyTrustEdit({ section4, setSection4 }) {
  const [title, setTitle] = useState("Why trust Hairs N Cares");
  const [description, setDescription] = useState(
    "Trust Hairsncares professionals for hair loss management because of their expertise, personalized care, and a proven track record of delivering effective solutions, ensuring your hair's health and your confidence."
  );

  return (
    <div className="row d-flex haircare">
      <div className="trust-care">
        <input
          type="text"
          defaultValue={section4?.title}
          onChange={e => setSection4({ ...section4, title: e?.target?.value })}
          className="title-input"
        />
        <br />
        <br />
        <textarea
          defaultValue={section4?.desc}
          onChange={e => setSection4({ ...section4, desc: e?.target?.value })}
          className="description-textarea"
        />
      </div>

      <div className="trust-care carr1">
        <div className="care2">
          {section4?.data?.slice(0, 3).map((item, index) => (
            <CareItem
              key={item?._id}
              imgSrc={item?.icon}
              text={item?.text}
              opacity={"0.2"}
              ind={index}
              section4={section4}
              setSection4={setSection4}
            />
          ))}
        </div>
        <div className="care2">
          {section4?.data?.slice(3).map((item, index) => (
            <CareItem
              key={item?._id}
              imgSrc={item?.icon}
              text={item?.text}
              opacity={"0.2"}
              ind={index}
              section4={section4}
              setSection4={setSection4}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
