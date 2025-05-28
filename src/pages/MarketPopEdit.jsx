import React from "react";
import './rx-section/rx.css'
import { useSelector } from "react-redux";
const BASE_URL = "https://backend.hairsncares.com/api/v1";
// import BASE_URL from '../../Config';
function MarketPopEdit({ section12, setSection12 }) {
  const handleImageUpload = async (e, type) => {
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
      setSection12(imageData.imageUrl);
      // return imageArr;
    } catch (error) {
      // toast.error("Error uploading image.");
      console.error("Error:", error);
      return [];
      throw error;
    }
  };

  return (
    <div className="rx-container d-flex">
      <div>
        <img
          alt="hair"
          className="animate__animated animate__fadeInLeft"
          src={section12}
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => handleImageUpload(e, "img")}
          style={{ width: "95px" }}
        />
      </div>
    </div>
  );
}

export default MarketPopEdit;
