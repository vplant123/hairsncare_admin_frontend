import React, { useState } from 'react';
import BASE_URL from '../../../Config';
// import './Before.css';

function BeforeAfterEdit({section10,
  setSection10}) {
  const [selectedFiles, setSelectedFiles] = useState([null, null, null, null]);
  const [cur, setCur] = useState(1);

  const handleFileChange = (index, event) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles[index] = event.target.files[0];
    setSelectedFiles(newSelectedFiles);
  };

  const handleImageUpload = async (e,type,ind) => {
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
          let inputData = section10?.data.map(item => ({ ...item }));
          inputData[ind][type] = imageData.imageUrl;
          setSection10({...section10,data : inputData});
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
      <div className="before container row">


        {
          section10?.data?.map((e,ind) => {
            return(
              <>
              {(cur == ind || cur == ind+1) ?           <div
            class={`col-lg-6 wow animate__animated animate__bounceInDown  ${
              cur == 1 ? "slick-current" : ""
            } ${cur == 1 ? "slick-active" : ""}`}
            // style={{ width: "640px" }}
          >
            <div className="dem0-container">
              <div className='d-flex flex-column'>
              <img
                alt="hair"
                src={e?.img1}
                style={{ width: "250px" }}
              />
                       <input
      type="file"
      accept="image/*"
      onChange={(e) => handleImageUpload(e,"img1",ind)}
      style={{width : "95px"}}
    />
              </div>
              <div className='d-flex flex-column'>
              <img
                alt="hair"
                src={e?.img2}
                style={{ width: "250px" }}
              />
                                     <input
      type="file"
      accept="image/*"
      onChange={(e) => handleImageUpload(e,"img2",ind)}
      style={{width : "95px"}}
    />
</div>

            </div>
          </div> : <></>}
              </>
            )
          })


        }



        {/* {cur == 1 ? (
          <div
            class={`col-lg-6 wow animate__animated animate__bounceInDown  ${
              cur == 1 ? "slick-current" : ""
            } ${cur == 1 ? "slick-active" : ""}`}
            style={{ width: "640px" }}
          >
            <div className="dem0-container">
              <img
                alt="hair"
                src={content?.section10?.data?.[0]?.img1}
              />
              <img
                alt="hair"
                src={content?.section10?.data?.[0]?.img2}
              />
            </div>
          </div>
        ) : (
          <></>
        )}

        {cur == 1 || cur == 2 ? (
          <div
            class={`col-lg-6 wow animate__animated animate__bounceInDown  ${
              cur == 1 ? "slick-current" : ""
            } ${cur == 1 ? "slick-active" : ""}`}
            style={{ width: "640px" }}
          >
            <div className="dem0-container">
              <img
                alt="hair"
                src="/assets/img/Before After 2/Female After 2.png"
              />
              <img
                alt="hair"
                src="/assets/img/Before After 2/Female After 2.png"
              />
            </div>
          </div>
        ) : (
          <></>
        )}

        {cur == 2 || cur == 3 ? (
          <div
            class={`col-lg-6 wow animate__animated animate__bounceInDown ${
              cur == 1 ? "slick-current" : ""
            } ${cur == 1 ? "slick-active" : ""}`}
            style={{ width: "640px" }}
          >
            <div className="dem0-container">
              <img
                alt="hair"
                src="/assets/img/Before After 3/Female before 3.png"
              />
              <img
                alt="hair"
                src="/assets/img/Before After 3/female After 3.png"
              />
            </div>
          </div>
        ) : (
          <></>
        )}

        {cur == 3 || cur == 4 ? (
          <div
            class="col-lg-6 wow animate__animated animate__bounceInDown  slick-current slick-active"
            style={{ width: "640px" }}
          >
            <div className="dem0-container">
              <img
                alt="hair"
                src="/assets/img/Before after 4/Before Male 4.jpg"
              />
              <img
                alt="hair"
                src="/assets/img/Before after 4/After Male 4.jpg"
              />
            </div>
          </div>
        ) : (
          <></>
        )}

        {cur == 5 || cur == 4 ? (
          <div
            class="col-lg-6 wow animate__animated animate__bounceInDown  slick-current slick-active"
            style={{ width: "640px" }}
          >
            <div className="dem0-container">
              <img
                alt="hair"
                src="/assets/img/Before After 5/Hairloss-Treatment-Before1.jpg"
              />
              <img
                alt="hair"
                src="/assets/img/Before After 5/Hairloss-Treatment-After1.jpg"
              />
            </div>
          </div>
        ) : (
          <></>
        )}

        {cur == 5 || cur == 6 ? (
          <div
            class="col-lg-6 wow animate__animated animate__bounceInDown  slick-current slick-active"
            style={{ width: "640px" }}
          >
            <div className="dem0-container">
              <img alt="hair" src="/assets/img/Before after 6/before  6 .jpg" />
              <img alt="hair" src="/assets/img/Before after 6/After 6.jpg" />
            </div>
          </div>
        ) : (
          <></>
        )}

        {cur == 6 || cur == 7 ? (
          <div
            class="col-lg-6 wow animate__animated animate__bounceInDown  slick-current slick-active"
            style={{ width: "640px" }}
          >
            <div className="dem0-container">
              <img alt="hair" src="/assets/img/Before after 6/before  6 .jpg" />
              <img alt="hair" src="/assets/img/Before after 6/After 6.jpg" />
            </div>
          </div>
        ) : (
          <></>
        )}

        {cur == 7 || cur == 8 ? (
          <div
            class="col-lg-6 wow animate__animated animate__bounceInDown  slick-current slick-active"
            style={{ width: "640px" }}
          >
            <div className="dem0-container">
              <img alt="hair" src="/assets/img/Before After 7/Before 7.jpg" />
              <img alt="hair" src="/assets/img/Before After 7/After 7.jpg" />
            </div>
          </div>
        ) : (
          <></>
        )}

        {cur == 8 || cur == 9 ? (
          <div
            class="col-lg-6 wow animate__animated animate__bounceInDown  slick-current slick-active"
            style={{ width: "640px" }}
          >
            <div className="dem0-container">
              <img alt="hair" src="/assets/img/Before After 8/Before 8.jpg" />
              <img alt="hair" src="/assets/img/Before After 8/after 8.jpg" />
            </div>
          </div>
        ) : (
          <></>
        )}

        {cur == 9 || cur == 10 ? (
          <div
            class="col-lg-6 wow animate__animated animate__bounceInDown  slick-current slick-active"
            style={{ width: "640px" }}
          >
            <div className="dem0-container">
              <img
                alt="hair"
                src="/assets/img/Before After 9/Before 9 .jpg"
                style={{ width: "250px" }}
              />
              <img
                alt="hair"
                src="/assets/img/Before After 9/After 9.jpg"
                style={{ width: "250px" }}
              />
            </div>
          </div>
        ) : (
          <></>
        )}

        {cur == 10 || cur == 11 ? (
          <div
            class="col-lg-6 wow animate__animated animate__bounceInDown  slick-current slick-active"
            style={{ width: "640px" }}
          >
            <div className="dem0-container">
              <img
                alt="hair"
                src="/assets/img/Before after 10/Before Male 4.jpg"
              />
              <img alt="hair" src="/assets/img/Before after 10/After 10.jpg" />
            </div>
          </div>
        ) : (
          <></>
        )}

        {cur == 11 || cur == 12 ? (
          <div
            class="col-lg-6 wow animate__animated animate__bounceInDown  slick-current slick-active"
            style={{ width: "640px" }}
          >
            <div className="dem0-container">
              <img alt="hair" src="/assets/img/Before after 11/Before 11.jpg" />
              <img
                alt="hair"
                src="/assets/img/Before after 11/After 11.jpg"
                style={{ width: "200px" }}
              />
            </div>
          </div>
        ) : (
          <></>
        )} */}
      </div>

      <ul class="slick-dots" role="tablist" style={{ marginTop: "30px" }}>
        <li
          class={cur == 1 ? "slick-active" : ""}
          aria-hidden="false"
          role="presentation"
          aria-selected={cur == 1}
          aria-controls={cur}
          id={cur}
          onClick={() => setCur(1)}
        >
          <button type="button" data-role="none" role="button" tabindex="0">
            1
          </button>
        </li>
        <li
          class={cur == 2 ? "slick-active" : ""}
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
          <button type="button" data-role="none" role="button" tabindex="0">
            2
          </button>
        </li>
        <li
          class={cur == 3 ? "slick-active" : ""}
          aria-hidden="false"
          role="presentation"
          aria-selected={cur == 3}
          aria-controls={cur}
          id={cur}
          onClick={() => setCur(3)}
        >
          <button type="button" data-role="none" role="button" tabindex="0">
            3
          </button>
        </li>
        <li
          class={cur == 4 ? "slick-active" : ""}
          aria-hidden="false"
          role="presentation"
          aria-selected={cur == 4}
          aria-controls={cur}
          id={cur}
          onClick={() => setCur(4)}
        >
          <button type="button" data-role="none" role="button" tabindex="0">
            4
          </button>
        </li>
        <li
          class={cur == 5 ? "slick-active" : ""}
          aria-hidden="false"
          role="presentation"
          aria-selected={cur == 5}
          aria-controls={cur}
          id={cur}
          onClick={() => setCur(5)}
        >
          <button type="button" data-role="none" role="button" tabindex="0">
            5
          </button>
        </li>
        <li
          class={cur == 6 ? "slick-active" : ""}
          aria-hidden="false"
          role="presentation"
          aria-selected={cur == 6}
          aria-controls={cur}
          id={cur}
          onClick={() => setCur(6)}
        >
          <button type="button" data-role="none" role="button" tabindex="0">
            6
          </button>
        </li>
        <li
          class={cur == 7 ? "slick-active" : ""}
          aria-hidden="false"
          role="presentation"
          aria-selected={cur == 7}
          aria-controls={cur}
          id={cur}
          onClick={() => setCur(7)}
        >
          <button type="button" data-role="none" role="button" tabindex="0">
            7
          </button>
        </li>
        <li
          class={cur == 8 ? "slick-active" : ""}
          aria-hidden="false"
          role="presentation"
          aria-selected={cur == 8}
          aria-controls={cur}
          id={cur}
          onClick={() => setCur(8)}
        >
          <button type="button" data-role="none" role="button" tabindex="0">
            8
          </button>
        </li>

        <li
          class={cur == 9 ? "slick-active" : ""}
          aria-hidden="false"
          role="presentation"
          aria-selected={cur == 9}
          aria-controls={cur}
          id={cur}
          onClick={() => setCur(9)}
        >
          <button type="button" data-role="none" role="button" tabindex="0">
            9
          </button>
        </li>

        <li
          class={cur == 10 ? "slick-active" : ""}
          aria-hidden="false"
          role="presentation"
          aria-selected={cur == 10}
          aria-controls={cur}
          id={cur}
          onClick={() => setCur(10)}
        >
          <button type="button" data-role="none" role="button" tabindex="0">
            10
          </button>
        </li>
        <li
          class={cur == 11 ? "slick-active" : ""}
          aria-hidden="false"
          role="presentation"
          aria-selected={cur == 11}
          aria-controls={cur}
          id={cur}
          onClick={() => setCur(11)}
        >
          <button type="button" data-role="none" role="button" tabindex="0">
            11
          </button>
        </li>
      </ul>
    </div>
  );
}

export default BeforeAfterEdit;
