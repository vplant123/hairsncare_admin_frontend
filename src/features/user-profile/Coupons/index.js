import React, { useEffect, useState } from "react";
import "./index.css";
import Sidebar from "../Sidebar";
import Navbar from "../../nav/Navbar";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../../footer/Footer";
import BASE_URL from "../../../Config";
import moment from "moment";
const fetchApiUrl = `${BASE_URL}/admin/getCoupons`;

export default function Coupons(props) {
  let { cart, setCart } = props;
  const [coupons, setCoupons] = useState([]);
  let storedUserData = JSON.parse(localStorage?.getItem("User343"));
  const [selectedHero, setSelectedHero] = useState(1);

  useEffect(() => {
    fetch(fetchApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: storedUserData?.logedInUser?.accessToken,
      },
      //   body: JSON.stringify({ userId: storedUserData?.logedInUser?.user?._id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCoupons(data.data);
      })
      .catch((error) => console.error("Error fetching coupons:", error));
  }, []);


  useEffect(() => {
    let timeout = setTimeout(
      () =>
        setSelectedHero((prevIndex) =>
          prevIndex+1 == 3 ? 1 : prevIndex + 1,
        ),
      5000,
    );

    return () => {
      clearTimeout(timeout);
    };
  }, [selectedHero]);

  return (
    <Navbar cart={cart} setCart={setCart}>
      <Sidebar>
        <div
          class="container"
          style={{ display: "flex", alignItems: "center",flexDirection : "column" }}
        >
          {coupons?.map((it, ind) => {
            return (
              <>
                {ind + 1 == selectedHero ? (
                  <div class="coupon-card">
                    <img
                      src="https://res.cloudinary.com/drkpwvnun/image/upload/v1725596233/hair-assessment/bhwlkkh2ul9dig5hnelp.png"
                      class="logo-coupon"
                    />
                    <h3>
                        {
                            it?.percent 
                        }% flat off on {
                            it?.type == 1 ? "Hair Test" :  it?.type == 2 ? "all Products" : "all Products and Hair Test"
                        }
                      <br />
                    </h3>
                    <di class="coupon-row">
                      <span id="cpnCode">{it?.code}</span>
                      <span id="cpnBtn" onClick={() => {
                        navigator.clipboard.writeText(it?.code)
                        toast.success("copy to clipboard")
                      }}>Copy Code</span>
                    </di>
                    <p>Valid Till: {moment(it?.validity).format("ll")}</p>
                    <div class="circle1"></div>
                    <div class="circle2"></div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            );
          })}

          <div>
            <ul
              className="slick-dots"
              role="tablist"
              style={{ marginTop: "30px" }}
            >
              {coupons?.map((section, indx) => (
                <li
                  key={`${indx + 1}`}
                  className={selectedHero === indx + 1 ? "slick-active" : ""}
                  onClick={() => setSelectedHero(indx + 1)}
                >
                  <button type="button" role="button">
                    {indx + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ToastContainer position="bottom-right" />
      </Sidebar>
      {/* <Footer /> */}
    </Navbar>
  );
}
