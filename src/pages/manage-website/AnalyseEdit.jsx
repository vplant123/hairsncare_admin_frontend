import React, { useState } from "react";
import '../hair-analysis/HairAnalysis.css';
import { useNavigate } from "react-router-dom";
const BASE_URL = "https://backend.hairsncares.com/api/v1";

export default function AnalyseEdit({ section7, setSection7 }) {
  const navigate = useNavigate();

  // State for heading, paragraph, and image
  const [heading, setHeading] = useState("Hair Analysis");
  const [paragraph, setParagraph] = useState(
    "Experience a new era of AI-driven hair analysis tool, in synergy with skilled dermatologists, delivering personalized solutions for your hair"
  );
  const [image, setImage] = useState("/IMG_20240418_201628.png");

  // Handler for image upload
  const handleImageUpload = async e => {
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
      setSection7({ ...section7, img: imageData.imageUrl });
      // return imageArr;
    } catch (error) {
      // toast.error("Error uploading image.");
      console.error("Error:", error);
      return [];
      throw error;
    }
  };

  return (
    <div className="hair-analysis row d-flex">
      <div className="ana anakkk">
        <img alt="hair" src={section7?.img} />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button
          onClick={() => document.querySelector('input[type="file"]').click()}
          className="btn"
        >
          UPLOAD
        </button>
      </div>
      <div className="ana">
        <input
          type="text"
          defaultValue={section7?.title}
          onChange={e => setSection7({ ...section7, title: e.target.value })}
          className="heading-input"
        />
        <textarea
          defaultValue={section7?.desc}
          onChange={e => setSection7({ ...section7, desc: e.target.value })}
          className="paragraph-textarea"
        />
        <div className="hero-btn">
          <button
            onClick={() => navigate("/hair-test")}
            className="btn primary"
          >
            TAKE HAIR TEST
          </button>
          <button onClick={() => navigate("/book")} className="btn">
            BOOK AN APPOINTMENT
          </button>
        </div>
      </div>
    </div>
  );
}
