import React, { useEffect, useState } from "react";
import "./Review.css";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import useDivInView from "../../hooks/useDivInView";

let data = [
  {
    src: "/assets/img/home/user.png",
    name: "KANAV RISHI",
    rating: 4,
    massage:
      "I am absolutely thrilled with the results I can't thank you enough for creating such fantastic products...",
    logo: "/assets/img/google-icon.webp",
  },
  {
    src: "/assets/img/home/user.png",
    name: "KANAV RISHI",
    rating: 4,
    massage:
      "I am absolutely thrilled with the results I can't thank you enough for creating such fantastic products...",
    logo: "/assets/img/google-icon.webp",
  },
  {
    src: "/assets/img/home/user.png",
    name: "KANAV RISHIN",
    rating: 4,
    massage:
      "I am absolutely thrilled with the results I can't thank you enough for creating such fantastic products...",
    logo: "/assets/img/google-icon.webp",
  },
  {
    src: "/assets/img/home/user.png",
    name: "KANAV RISHIU",
    rating: 4,
    massage:
      "I am absolutely thrilled with the results I can't thank you enough for creating such fantastic products...",
    logo: "/assets/img/google-icon.webp",
  },
  {
    src: "/assets/img/home/user.png",
    name: "KANAV RISHIO",
    rating: 4,
    massage:
      "I am absolutely thrilled with the results I can't thank you enough for creating such fantastic products...",
    logo: "/assets/img/google-icon.webp",
  },
  {
    src: "/assets/img/home/user.png",
    name: "KANAV RISHI",
    rating: 4,
    massage:
      "I am absolutely thrilled with the results I can't thank you enough for creating such fantastic products...",
    logo: "/assets/img/google-icon.webp",
  },
  {
    src: "/assets/img/home/user.png",
    name: "KANAV RISHI",
    rating: 4,
    massage:
      "I am absolutely thrilled with the results I can't thank you enough for creating such fantastic products...",
    logo: "/assets/img/google-icon.webp",
  },
];

const ReviewItem = ({ item }) => {
  const [ref1, control1] = useDivInView();
  return (
    <motion.div
      ref={ref1}
      initial="hidden"
      variants={{
        visible: {
          opacity: 1,
          x: 0,
        },
        hidden: {
          opacity: 0,
          x: 100,
        },
      }}
      transition={{ duration: 1, delay: 1 }}
      animate={control1}
      className="col-12 col-md-4"
      onClick={() => window.open("https://g.co/kgs/E5n3zxY")}
    >
      <div className="review-loop" style={{height: "330px"}}>
        <img src={item?.img} alt={item?.name} style={{width: "60px",
    height: "60px"}} />
        <div className="review-person-name">{item?.name}</div>

        <ul style={{ padding: 0 }} className="review-star-google">
          <div className="ltn__comment-item clearfix">
            <div className="ltn__commenter-comment">
              <div className="product-ratting">
                {item?.rating !== "0" ? (
                  <ul className="horizontal-list">
                    {[...Array(5)].map((_, i) => (
                      <li key={i}>
                        <a href="#">
                          <i
                            className={
                              item?.rating > i
                                ? "fas fa-star star-review-1"
                                : "far fa-star star-review-1-inactive"
                            }
                          ></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="horizontal-list">
                    {[...Array(5)].map((_, i) => (
                      <li key={i}>
                        <a href="#">
                          <i
                            className={"far fa-star star-review-1-inactive"}
                          ></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </ul>

        <div className="review-person-msg" style={{    maxHeight: "95px",height: "95px",
    overflowY: "scroll"}}>{item?.desc}</div>

        <div className="logo-container">
          <img
            src="/assets/img/google-icon.webp"
            alt="Google Logo"
            style={{ width: "20px" }}
          />
          <span style={{ color: "#999999", margin: "0 0 0 10px" }}>
            {item?.time}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

function Review() {
  const [cur, setCur] = useState(1);

  const content = useSelector((state) => state.content.home);

  const isLargeScreen = useMediaQuery("(min-width:1200px)");
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    let timeout = setTimeout(
      () =>
        setCur((prevIndex) =>
          prevIndex === content?.section3?.length - 2 ? 1 : prevIndex + 1,
        ),
      5000,
    );

    return () => {
      clearTimeout(timeout);
    };
  }, [cur]);
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
    <div className="container row" style={{ marginTop: "50px" }}>
      {content?.section3
        ?.slice(cur - 1, cur - 1 + (slide + 1))
        ?.map?.((item, index) => (
          <ReviewItem key={index} item={item} />
        ))}

      <ul class="slick-dots" role="tablist" style={{ marginTop: "30px" }}>
        {content?.section3
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
  );
}

export default Review;
