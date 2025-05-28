import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BASE_URL = "https://backend.hairsncares.com/api/v1";
// import { toast } from "react-toastify";
// import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
// import { FaPlayCircle } from "react-icons/fa";

function HappyCustomer({ section1, setSection1 }) {
  const content = useSelector(state => state.content.customerVideos);

  const [select, setSelect] = useState("0");

  const [product, setProduct] = useState(null);
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    userName: "",
    rating: "",
    comment: "",
  });
  const [loader, setLoader] = useState(false); // New state for discount
  const [openReview, setOpenReview] = useState(false);

  let storedUserData = JSON.parse(localStorage?.getItem("User343"));
  const userId = storedUserData?.logedInUser?.user._id;
  console.log("nsjneifhiewh", storedUserData, userId);

  // const [slide1,setSlide1] = useState(0)

  const handleImageUploadSection1 = async (e, type, ind) => {
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
        let inputData = section1?.map(item => ({ ...item }));
        inputData[ind][type] = imageData.imageUrl;
        setSection1(inputData);
        // return imageArr;
      } catch (error) {
        // toast.error("Error uploading image.");
        console.error("Error:", error);
        return [];
        throw error;
      }
    } else {
      let inputData = section1?.map(item => ({ ...item }));
      inputData[ind][type] = e?.target?.value;
      setSection1(inputData);
    }
  };

  return (
    <>
      <div className="container">
        <div class="story-slider slick-current slick-active happy-customer">
          {section1?.map((it, index) => {
            return (
              <>
                <div class="row">
                  <div class="col-md-6 col-12 d-flex flex-column">
                    <input
                      type="text"
                      defaultValue={it?.name}
                      onChange={e =>
                        handleImageUploadSection1(e.target.value, "name", index)
                      }
                      // className="contect-us-heading"
                    />
                    <input
                      type="text"
                      defaultValue={it?.title}
                      onChange={e =>
                        handleImageUploadSection1(
                          e.target.value,
                          "title",
                          index
                        )
                      }
                      // className="contect-us-heading"
                    />

                    <div>
                      Youtube link :
                      <input
                        type="text"
                        defaultValue={it?.videoUrl}
                        onChange={e =>
                          handleImageUploadSection1(
                            e.target.value,
                            "videoUrl",
                            index
                          )
                        }
                        // className="contect-us-heading"
                      />
                    </div>
                  </div>
                  <div class="col-md-6 col-12" style={{ position: "relative" }}>
                    <div
                      // onClick={() => target(index)}
                      key={`customer-item-${index}`}
                      style={{
                        backgroundImage: `url(${it.url})`,
                        position: "relative",
                        height: "300px",
                        width: "500px",
                      }}
                      className="coverflow-item-1"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e =>
                          handleImageUploadSection1(e, "url", index)
                        }
                      />
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default HappyCustomer;
