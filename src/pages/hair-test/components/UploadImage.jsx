import React, { useEffect, useState } from "react";
import BASE_URL from "../../../Config";
import { toast } from "react-toastify";

const ScalpPopup = ({
  setBanner,
  nextStep,
  male,
  name,
  email,
  phoneNumber,
  selectedOptionP,
  selectedOptions,
  selectedOptions1,
  selectedOptions4,
  selectedOptions3,
  setTestId,
  testId,
}) => {
  const [file, setFile] = useState([""]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState("");
  const [error, setError] = useState(false);
  const handleFileChange = (e, ind) => {
    console.log("kjsorjkf",e.target.files)
    if (e.target.files?.length > 1) {
      setFile([...file, ...e.target.files]);
    } else {
      let f = file?.map((e) => ({...e}));
      f[ind] = e.target.files[0];
      console.log("jfjroe",f)
      // Accept only one file
      setFile(f);
    }
  };

  const removeFromImage = (ind) => {
      let f = [...file];
      let c = f?.filter((x,indx) => indx!=ind)
      if(c?.length == 0){
        console.log("jij4rie")
        setFile([""]);
      }
      // Accept only one file
      else {
        console.log("rfeihri",c,f)
        setFile([...c]);
      }

  };

  const addMoreImage = () => {
    // Accept only one file
    setFile([...file, ""]);
  };

  let storedUserData = JSON.parse(localStorage.getItem("User343"));
  // console.log(storedUserData.logedInUser.accessToken,"userdata")
  console.log(storedUserData, "jdks");
  const uploadFiles = async ({ setBanner }) => {
    // nextStep()
    console.log("wjenrjnwei", file?.length);

    setLoading(true);
    const token = storedUserData.logedInUser.accessToken;


    if (file?.length > 0) {
      try {
        let p = [];
        for (let index = 0; index < file?.length; index++) {
          const element = file[index];
          if (element) {
            console.log("jsorjoje", file);
            const formData = new FormData();
            formData.append("image", element);

            const response = await fetch(
              `${BASE_URL}/hair-tests/upload-image`,
              {
                method: "POST",

                body: formData,
              }
            );
            if (!response.ok) {
              continue;
              // throw new Error("Network response was not ok");
            } else {
              const responseData = await response.json();
              p.push(responseData);
            }
          }
        }
        console.log("jnieiji",p);
        if (p?.length < 1) {
          throw new Error("Network response was not ok");
        } else {
          try {
            const response = await fetch(
              `${BASE_URL}/hair-tests/createHairTestForUserStepWise`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token,
                },
                body: JSON.stringify({
                  id: testId,
                  data: {
                    UploadedImage: p,
                    userId: storedUserData.logedInUser.user._id,
                  },
                }),
                // body: JSON.stringify(data)
              }
            );

            if (!response.ok) {
              toast.error("Please logout and login again with valid credentials.");
              throw new Error("Network response was not ok");
            } else {
              const responseData = await response.json();
              setShow(true);
              toast.success("Successfull");
              nextStep();
              console.log(responseData, "huhserwuhuh");
              setTestId(responseData?.data?._id);
            }

            // Handle the response data as needed
          } catch (error) {
            console.error(
              "There was a problem with the fetch operation:",
              error.message
            );
          }
        }
      } catch (error) {
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
      }
    } else {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(
    () => setBanner("/assets/img/SELF-HAIR-ANALYSIS-TEST-female.jpg"),
    []
  );
  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="successicon">
          <div className="text-center">
            <img src="/assets/img/thumb.png" alt="Thumb Icon" />
          </div>
          <p>
            <b>
              Awesome, A big thank you for answering all your questions
              patiently!
            </b>
            <br />
            Your input is crucial in tailoring the best care for your hair.
            <br />
            We're excited to analyze the results and provide you with the best
            personalized solutions.
            <br />
            One last step to finalize your submission.
            <br />
            Upload Your Scalp and hair pic as shown in the following format.
          </p>
        </div>
        <div className="upload-img text-center" style={{ margin: "15px 0" }}>
          {/* male */}
          <img
            src={
              male
                ? "/assets/img/uploadpic.jpg"
                : "/assets/img/femaleupload.jpg"
            }
            alt="Upload Image"
          />
        </div>
        <h5 className="modal-title mb-3" id="exampleModalLabel">
          Upload Your Scalp Image
        </h5>
        <form id="fileUploadForm" encType="multipart/form-data" method="post">
          <div className="form-group">
            {file?.map((e, i) => {
              return (
                <>
                  <label htmlFor="fileInput" className="mb-2">
                    Select Image :
                  </label>
                  {/* <input
                    type="file"
                    className="form-control"
                    id="fileInput"
                    title="ultraSound"
                    accept="image/*"
                    multiple
                    onChange={(x) => handleFileChange(x, i)}
                  /> */}

<div style={{    position: "relative",display : "flex"}}>
  <div style={{width : "80%"}}>
  <input
        type="text"
        value={e?.name || ""}
        placeholder="Choose a file..."
        readOnly
        // onClick={handleClick}
        style={{ cursor: 'pointer' }}
      />
      <input
        type="file"
        id="fileInput"
        multiple 
        style={{ position: "absolute",
          top: 0, 
          left: 0,
          /* z-index: 0; */
          opacity: 0,
          width: "80%" }}
        onChange={(x) => handleFileChange(x, i)}
        />
  </div>

  <div style={{width : "20%",margin:"6px"}}> 
 {e?.name ?  <button type="button" onClick={() => removeFromImage(i)} >{"Remove"} </button> : <></>}
  </div>

</div>

                </>
              );
            })} 
          </div>
          {/* <div
            className="inputBoxCust3-1 Prescription Required*"
            style={{ width: "110px", cursor: "pointer",color:"#FFFFFF" }}
            onClick={() => addMoreImage()}
          >
            Add More
          </div> */}
          <div id="errorMessages" style={{ color: "red" }}>
            {error && "Please select a image to upload"}
          </div>
          <button
            disabled={loading}
            type="button"
            className="btn btn-primary mt-4"
            onClick={uploadFiles}
            id="uploadButton"
          >
            {loading ? "Please Wait" : "Upload Image"}
          </button>
          {show && <h2>Successfull</h2>}
        </form>
        <div id="thankYouText" style={{ display: "none" }}>
          <p>
            <b>Once again, thank you for your participation.</b>
            <br />
            Now your online hair test is completed!
            <br />
            Your responses and submitted photos are now in the hands of our
            Hairsncares specialists for evaluation.
            <br />
            You are requested to take an Online Video Consultation with our
            Dermatologist!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScalpPopup;
