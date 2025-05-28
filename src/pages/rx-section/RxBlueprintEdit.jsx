import React from "react";
import "./rx.css";
import { useSelector } from "react-redux";

const BASE_URL = "https://backend.hairsncares.com/api/v1";

function RxBlueprintEdit({ section8, setSection8 }) {
  // Use optional chaining to avoid error if state.content is undefined
  const content = useSelector(state => state.content?.home);

  console.log("jojkeor", content);

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];

    try {
      const formData = new FormData();
      formData.append("image", file);

      const imageResponse = await fetch(`${BASE_URL}/hair-tests/upload-image`, {
        method: "POST",
        body: formData,
      });

      if (!imageResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const imageData = await imageResponse.json();

      if (type === "subImg") {
        setSection8({ ...section8, subImg: imageData.imageUrl });
      } else if (type === "img") {
        setSection8({ ...section8, img: imageData.imageUrl });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      // Optional: handle error display here
    }
  };

  return (
    <div className="rx-container container">
      <div>
        <h2 style={{ fontSize: "2rem", fontWeight: "700" }}>
          <input
            type="text"
            defaultValue={section8?.mainTitle}
            onChange={e =>
              setSection8({ ...section8, mainTitle: e.target.value })
            }
            className="editable-input"
          />
        </h2>
        <img
          alt="hair"
          className="animate__animated animate__fadeInLeft"
          src={section8?.img}
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => handleImageUpload(e, "img")}
          style={{ width: "95px" }}
        />
      </div>
      <div className="animate__backInRight">
        <img alt="hair" src={section8?.subImg} />
        <input
          type="file"
          accept="image/*"
          onChange={e => handleImageUpload(e, "subImg")}
          style={{ width: "95px" }}
        />
      </div>
    </div>
  );
}

export default RxBlueprintEdit;
