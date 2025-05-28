import React, { useState } from "react";
import "../trust-section/Trust.css";
import { HiSpeakerWave } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";

function TrustEdit({ section2, setSection2 }) {
  const [googleReviews, setGoogleReviews] = useState("");
  const [channels, setChannels] = useState("");
  const [clients, setClients] = useState("");

  return (
    <>
      <div className="trust-container d-flex">
        <div className="trust">
          <div>{/* <FcGoogle size={50} /> */}</div>
          <div>
            <div>
              <input
                type="text"
                defaultValue={section2?.num1}
                onChange={e =>
                  setSection2({ ...section2, num1: e?.target?.value })
                }
                placeholder="Enter number"
              />
            </div>
            <div className="trust-text">Google reviews</div>
          </div>
        </div>
        <div className="trust">
          <div>
            <img alt="hair" src="/uploads/r-icon2.png" />
          </div>
          <div>
            <div>
              <input
                type="text"
                defaultValue={section2?.num2}
                onChange={e =>
                  setSection2({ ...section2, num2: e?.target?.value })
                }
                placeholder="Enter number"
              />
            </div>
            <div className="trust-text">Published in Channels</div>
          </div>
        </div>
        <div className="trust">
          <div>
            <img alt="hair" src="/uploads/r-icon3.png" />
          </div>
          <div>
            <div>
              <input
                type="text"
                defaultValue={section2?.num3}
                onChange={e =>
                  setSection2({ ...section2, num3: e?.target?.value })
                }
                placeholder="Enter number"
              />
            </div>
            <div className="trust-text">Happy Clients</div>
          </div>
        </div>
        <div className="trust">
          <div>
            <img alt="hair" src="/uploads/r-icon4.png" />
          </div>
          <div>
            <div>
              {" "}
              <input
                type="text"
                defaultValue={section2?.num4}
                onChange={e =>
                  setSection2({ ...section2, num4: e?.target?.value })
                }
                placeholder="Enter number"
              />
            </div>
            <div className="trust-text">Guaranteed Result</div>
          </div>
        </div>
      </div>
      <hr></hr>
    </>
  );
}

export default TrustEdit;
