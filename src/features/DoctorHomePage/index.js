import React, { useEffect, useState } from "react";
import "./index.css";
import { useSelector } from "react-redux";
import useDivInView, {
  LEFT_VARIANTS,
  RIGHT_VARIANTS,
  TRANSITION,
} from "../../hooks/useDivInView";
import { motion } from "framer-motion";
import BASE_URL from "../../Config";
import { toast } from "react-toastify";
import { useMediaQuery } from "@mui/material";


const MediaImage = ({ src, index }) => {
  const [ref, control] = useDivInView();
  return (
    <motion.img
      alt="hair"
      src={src}
      ref={ref}
      animate={control}
      initial="hidden"
      variants={RIGHT_VARIANTS}
      transition={{
        ...TRANSITION,
        delay: index * 0.2,
      }}
    />
  );
};
function DoctorHomepage() {
  const [cur, setCur] = useState(1);

  const content = useSelector((state) => state.content.home);
  console.log("jojkeor", content);

  useEffect(() => {
    let timeout = setTimeout(
      () =>
        setCur((prevIndex) =>
          prevIndex == content?.section5?.length - 2 ? 1 : prevIndex + 1
        ),
      5000
    );

    return () => {
      clearTimeout(timeout);
    };
  }, [cur]);
  const [doctors, setDoctors] = useState([]);
  const isLargeScreen = useMediaQuery("(min-width:1200px)");
  const isMobile = useMediaQuery("(max-width: 768px)");

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/admin/all-doctor-Data?isSpec=1`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      console.log("vejorj", jsonData);
      setDoctors(jsonData?.data);
    } catch (error) {
      // toast.error("Error fetching doctors: " + error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [slide, setSlide] = useState(3);
  const [slide1, setSlide1] = useState(2);

  useEffect(() => {
    if (isLargeScreen) {
      setSlide(2);
      setSlide1(2);
    } else {
      setSlide(0);
      setSlide1(0);
    }
  }, [isMobile, isLargeScreen]);

  return (
    <div class="container">
      <div className="row" style={{margin : "50px 0px 50px 0"}}>
        <div className="col-12 col-md-4 d-flex flex-column">
          <p class="text-blk heading-text">Meet our dream team</p>
          {/* <p class="text-blk sub-heading-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo
            enim risus sit nullam aliquam. Mattis.
          </p> */}
        </div>
        <div className="col-12 col-md-8 d-flex flex-column">
          {/* <div>
            <p class="text-blk team-name">Management Team</p>
          </div> */}
          <div className="row">
            {
              doctors?.slice(0, content?.section3?.length - slide1)
              .map((e, ind) => {
                return(
                  <div className="col-12 col-sm-6 col-md-4" style={{fontWeight : "600"}}>
                  <div style={{    padding: "10px"}} className="d-flex flex-column">
                  <img class="team-member-image" src={e?.image}/>
                  <p class="text-blk">
                      {e?.name}
                    </p>
                    <p class="text-blk">
                      {e?.degree}
                    </p>
                  </div>
    
                </div>
                )
              })
            }

            {/* <div className="col-12 col-sm-6 col-md-4">
            <div style={{    padding: "10px"}} className="d-flex flex-column">
              <img class="team-member-image" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET3.jpg"/>
              <p class="text-blk">
                  Gustavo Workman
                </p>
                <p class="text-blk">
                  CEO
                </p>
              </div>

            </div>
            <div className="col-12 col-sm-6 col-md-4">
            <div style={{    padding: "10px"}} className="d-flex flex-column">
              <img class="team-member-image" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET3.jpg"/>
              <p class="text-blk">
                  Gustavo Workman
                </p>
                <p class="text-blk">
                  CEO
                </p>
              </div>

            </div> */}
          </div>
        </div>
        <ul class="slick-dots" role="tablist" style={{ marginTop: "30px" }}>
        {doctors
          ?.slice(0, content?.section3?.length - slide1)
          .map((e, ind) => {
            return (
              <li
                class={cur === ind + 1 ? "slick-active" : ""}
                aria-hidden="false"
                role="presentation"
                aria-selected={cur == ind + 1}
                aria-controls={cur}
                id={cur}
                onClick={() => setCur(ind + 1)}
              >
                <button
                  type="button"
                  data-role="none"
                  role="button"
                  tabindex="0"
                >
                  {ind + 1}
                </button>
              </li>
            );
          })}
      </ul>
      </div>
    </div>
  );
}

export default DoctorHomepage;
