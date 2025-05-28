import React, { useState } from "react";
const BASE_URL = "https://backend.hairsncares.com/api/v1";
import '../before-after/Before.css';

function BeforeAfterEdit({ section10, setSection10 }) {
  const [selectedFiles, setSelectedFiles] = useState([null, null, null, null]);
  const [cur, setCur] = useState(1);

  const handleFileChange = (index, event) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles[index] = event.target.files[0];
    setSelectedFiles(newSelectedFiles);
  };

  const handleImageUpload = async (e, type, ind) => {
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
      let inputData = section10?.data.map(item => ({ ...item }));
      inputData[ind][type] = imageData.imageUrl;
      setSection10({ ...section10, data: inputData });
      // return imageArr;
    } catch (error) {
      // toast.error("Error uploading image.");
      console.error("Error:", error);
      return [];
      throw error;
    }
  };

  return (
    <div>
      <h1
        className="product-title animate__animated animate__fadeInLeft"
        style={{ fontWeight: "700", fontSize: "2.3rem" }}
      >
        {section10?.title}
      </h1>
      <div className="before container row d-flex ">
        {section10?.data?.map((e, ind) => {
          return (
            <div key={`before-after-${ind}`} className="before-after-item row">
              {cur == ind || cur == ind + 1 ? (
                <div
                  className={`col-lg-6 wow animate__animated animate__bounceInDown  ${
                    cur == 1 ? "slick-current" : ""
                  } ${cur == 1 ? "slick-active" : ""}`}
                >
                  <div className="dem0-container ">
                    <div className="d-flex flex-column">
                      <img
                        alt="hair"
                        src={e?.img1}
                        style={{ width: "250px" }}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => handleImageUpload(e, "img1", ind)}
                        style={{ width: "95px" }}
                      />
                    </div>
                    <div className="d-flex flex-column">
                      <img
                        alt="hair"
                        src={e?.img2}
                        style={{ width: "250px" }}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => handleImageUpload(e, "img2", ind)}
                        style={{ width: "95px" }}
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}

        
      </div>

      <ul className="slick-dots" role="tablist" style={{ marginTop: "30px" }}>
        <li
          className={cur == 1 ? "slick-active" : ""}
          aria-hidden="false"
          role="presentation"
          aria-selected={cur == 1}
          aria-controls={cur}
          id={cur}
          onClick={() => setCur(1)}
        >
          <button type="button" data-role="none" role="button" tabIndex="0">
            1
          </button>
        </li>
        <li
          className={cur == 2 ? "slick-active" : ""}
          aria-hidden="false"
          role="presentation"
          aria-selected={cur == 2}
          aria-controls={cur}
          id={cur}
          onClick={() => {
            console.log("mfierj");
            setCur(2);
          }}
        >
          <button type="button" data-role="none" role="button" tabIndex="0">
            2
          </button>
        </li>
        <li
          className={cur == 3 ? "slick-active" : ""}
          aria-hidden="false"
          role="presentation"
          aria-selected={cur == 3}
          aria-controls={cur}
          id={cur}
          onClick={() => setCur(3)}
        >
          <button type="button" data-role="none" role="button" tabIndex="0">
            3
          </button>
        </li>
        <li
          className={cur == 4 ? "slick-active" : ""}
          aria-hidden="false"
          role="presentation"
          aria-selected={cur == 4}
          aria-controls={cur}
          id={cur}
          onClick={() => setCur(4)}
        >
          <button type="button" data-role="none" role="button" tabIndex="0">
            4
          </button>
        </li>
        <li
          className={cur == 5 ? "slick-active" : ""}
          aria-hidden="false"
          role="presentation"
          aria-selected={cur == 5}
          aria-controls={cur}
          id={cur}
          onClick={() => setCur(5)}
        >
          <button type="button" data-role="none" role="button" tabIndex="0">
            5
          </button>
        </li>
        <li
          className={cur == 6 ? "slick-active" : ""}
          aria-hidden="false"
          role="presentation"
          aria-selected={cur == 6}
          aria-controls={cur}
          id={cur}
          onClick={() => setCur(6)}
        >
          <button type="button" data-role="none" role="button" tabIndex="0">
            6
          </button>
        </li>
        <li
          className={cur == 7 ? "slick-active" : ""}
          aria-hidden="false"
          role="presentation"
          aria-selected={cur == 7}
          aria-controls={cur}
          id={cur}
          onClick={() => setCur(7)}
        >
          <button type="button" data-role="none" role="button" tabIndex="0">
            7
          </button>
        </li>
        <li
          className={cur == 8 ? "slick-active" : ""}
          aria-hidden="false"
          role="presentation"
          aria-selected={cur == 8}
          aria-controls={cur}
          id={cur}
          onClick={() => setCur(8)}
        >
          <button type="button" data-role="none" role="button" tabIndex="0">
            8
          </button>
        </li>

        <li
          className={cur == 9 ? "slick-active" : ""}
          aria-hidden="false"
          role="presentation"
          aria-selected={cur == 9}
          aria-controls={cur}
          id={cur}
          onClick={() => setCur(9)}
        >
          <button type="button" data-role="none" role="button" tabIndex="0">
            9
          </button>
        </li>

        <li
          className={cur == 10 ? "slick-active" : ""}
          aria-hidden="false"
          role="presentation"
          aria-selected={cur == 10}
          aria-controls={cur}
          id={cur}
          onClick={() => setCur(10)}
        >
          <button type="button" data-role="none" role="button" tabIndex="0">
            10
          </button>
        </li>
        <li
          className={cur == 11 ? "slick-active" : ""}
          aria-hidden="false"
          role="presentation"
          aria-selected={cur == 11}
          aria-controls={cur}
          id={cur}
          onClick={() => setCur(11)}
        >
          <button type="button" data-role="none" role="button" tabIndex="0">
            11
          </button>
        </li>
      </ul>
    </div>
  );
}

export default BeforeAfterEdit;
