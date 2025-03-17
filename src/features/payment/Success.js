// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./Success.css"; // Import the CSS file for this component
// import Navbar from "../nav/Navbar";

// function Success() {
//   const navigate = useNavigate();

// const handleSuccess=()=>navigate('/')
//   return (
//     <Navbar>
//         <div className="success-container">
//       <h3 className="success-header">Payment Successful</h3>
//       <h3 className="success-header">After a thorough study and evaluation, doctor will generate your hair analysis report.       </h3>

//       <h3 className="success-header">You can view that report in your MY REPORT section. 
//       </h3>

//       <h3 className="success-header">You will get a notification for the same.
//       </h3>
//       <h3 className="success-header">Stay tuned for your customized hair care plan!
//       </h3>

//       <p onClick={handleSuccess} className="success-button">Exit (Go to Homepage)
//       </p>
//     </div>
//     </Navbar>
//   );
// }

// export default Success;


import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Success.css"; // Import the CSS file for this component
import Navbar from "../nav/Navbar";

function Success() {
  const navigate = useNavigate();
  const params = useParams();

const handleSuccess=()=>navigate('/')
  return (
    <Navbar>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-5">
            <div class="message-box _success">
              <i class="fa fa-check-circle" aria-hidden="true"></i>
              <h2> {params?.id == 1 ? "Your payment was successful" : "Your Order Placed Successfully"} </h2>
              {params?.id == 1 ?               <p className="success-1">
                {" "}
                After a thorough study and evaluation, doctor will generate your
                hair analysis report.
                <br /> You can view that report in your MY REPORT section.{" "}
                <br />
                You will get a notification for the same. <br /> Stay tuned for
                your customized hair care plan!{" "}
              </p> : <></>}

            </div>
            <div>
              {" "}
              <div
                onClick={handleSuccess}
                className="success-button"
                style={{ textAlign: "center" }}
              >
                Exit (Go to Homepage)
              </div>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

export default Success;