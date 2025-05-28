import { useEffect, useRef, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import "./Slider.css";
import { useSelector } from "react-redux";
const BASE_URL = "https://backend.hairsncares.com/api/v1";

const images = [
  {
    url: "./admprslide1.jpg",
    youtube:
      "https://www.youtube.com/embed/i3JI37i0w1U?si=JUs7JMUIn8N3FoCv&amp;controls=0",
  },
  {
    url: "./admprslide2.jpg",
    youtube:
      "https://www.youtube.com/embed/Bo-2FVfaQEk?si=XdrMnN3-SA-FO2T6&amp;controls=0",
  },
  {
    url: "./slide2.jpg",
    youtube:
      "https://www.youtube.com/embed/Ii5u6eqMs1A?si=Tfa24tE_-_FwCvWa&amp;controls=0",
  },
  {
    url: "./slide3.jpg",
    youtube:
      "https://www.youtube.com/embed/Qz2djE-XT48?si=xNPg9wSf10sLnN13&amp;controls=0",
  },
  {
    url: "./slide4.jpg",
    youtube:
      "https://www.youtube.com/embed/K3DaLoRWHno?si=pour-lFzp2JY-6qG&amp;controls=0",
  },
];

const ITEM_DISTANCE = 200;
const ITEM_ANGLE = -45;
const CENTER_ITEM_POP = 500;
const CENTER_ITEM_DISTANCE = 80;

function SliderImageEdit({ section11, setSection11 }) {
  const el = useRef(null);
  const [yurl, setYurl] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // State to track the selected image index

  // Help function to set element style transform property
  function setTransform(el, xpos, zpos, yAngle) {
    el.style.transform = `translateX(${xpos}px) translateZ(${zpos}px) rotateY(${yAngle}deg)`;
  }

  // Target an item, bring it to center
  function target(index) {
    const items = el.current.children;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      // Center item position and angle
      if (i === index) setTransform(item, 0, CENTER_ITEM_POP, 0);
      // Left items position and angle
      else if (i < index) {
        setTransform(
          item,
          (i - index) * ITEM_DISTANCE - CENTER_ITEM_DISTANCE,
          0,
          -ITEM_ANGLE
        );
      }
      // Right items position and angle
      else
        setTransform(
          item,
          (i - index) * ITEM_DISTANCE + CENTER_ITEM_DISTANCE,
          0,
          ITEM_ANGLE
        );
    }
  }

  const handlePlay = ud => {
    setYurl(ud);
    setShowPopup(true);
  };

  const handleRadioChange = index => {
    setSelectedImageIndex(index);
    target(index); // Move the selected image to the center
  };

  const handleImageUpload = async (e, type, ind) => {
    if (type == "url") {
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
        let inputData = section11?.map(item => ({ ...item }));
        inputData[ind][type] = imageData.imageUrl;
        setSection11(inputData);
        // return imageArr;
      } catch (error) {
        // toast.error("Error uploading image.");
        console.error("Error:", error);
        return [];
        throw error;
      }
    } else {
      let inputData = section11?.map(item => ({ ...item }));
      inputData[ind][type] = e?.target?.value;
      setSection11(inputData);
    }
  };

  return (
    <div className="main-container">
      <h1 className="cover-head ">Customer Stories</h1>
      <div className="container1 my-4 d-flex">
        <div className="coverflow" ref={el}>
          {section11?.map((it, index) => (
            <div
              onClick={() => target(index)}
              key={index}
              style={{ backgroundImage: `url(${it.url})` }}
              className="coverflow-item"
            >
              <div
                className="play-button"
                onClick={() => handlePlay(it.youtube)}
              >
                <FaPlayCircle size={50} />
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={e => handleImageUpload(e, "url", index)}
                style={{ width: "95px" }}
              />
              <input
                defaultValue={it?.youtube}
                onChange={e => handleImageUpload(e, "youtube", index)}
              />
            </div>
          ))}
        </div>
        {showPopup && (
          <div className="popup1">
            <iframe
              title="YouTube Video"
              width="560"
              height="350"
              src={yurl}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <h2 onClick={() => setShowPopup(false)}>X</h2>
          </div>
        )}
      </div>
      <div className="radio-buttons">
        {section11?.map((_, index) => (
          <input
            key={index}
            type="radio"
            id={`image${index}`}
            name="images"
            checked={selectedImageIndex === index}
            onChange={() => handleRadioChange(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default SliderImageEdit;
