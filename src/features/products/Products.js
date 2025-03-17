import React, { useEffect, useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import "./Products.css";
import Product from "./ProductList";
import { FaArrowRight } from "react-icons/fa";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from '@mui/material';
import FilterProduct from "./FilterProduct";

const Products = (props) => {
  const [minValue, set_minValue] = useState(0);
  const [maxValue, set_maxValue] = useState(50000);
  const [rating, setRating] = useState("");
  const [type, setType] = useState(0);
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const isLargeScreen = useMediaQuery('(min-width:1200px)');

  const handleMobileMenuToggle = () => {
    console.log("jojeojfer",showMobileMenu)
    setShowMobileMenu(!showMobileMenu);
  };
  let {cart,
    setCart} = props;

  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  return (
    <>
      <div className="barr" style={{ backgroundColor: "#005cad" }}>
        <div className="container">
          <div
            className="d-flex"
            style={{
              fontSize: "18px",
              gap: "12px",
              color: "white",
              fontWeight: "500",
            }}
          >
            <div
              className="d-flex"
              style={{ margin: "10px 0 0 0", gap: "12px" }}
            >
              <span class="ltn__secondary-color">
                <i class="fas fa-home"></i>
              </span>
              <div onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
                Home
              </div>
            </div>
            <div style={{ margin: "10px 0 0 0" }}>{">"}</div>
            <div style={{ margin: "10px 0 0 0", cursor: "pointer" }}>Shop</div>
          </div>
        </div>
      </div>
      <div className="container-Products container">
        <div className="col-12 col-md-3">
          {/* Content for the first column */}
          {isLargeScreen && <h4 className="filter-price-heading">FILTER BY PRICE</h4>}
          <div className="row">
            {isLargeScreen && <div className="filter-price col-12">
              <h4>PRICE</h4>
              <MultiRangeSlider
                min={0}
                max={50000}
                step={21}
                minValue={minValue}
                maxValue={maxValue}
                onInput={(e) => {
                  handleInput(e);
                }}
              />
              <h4>
                Rs {minValue} - Rs {maxValue}
              </h4>
            </div>}
            {isLargeScreen && <div className="fiter-rating col-12">
              <h4>FILTER BY RATING</h4>
              <label className="rating-lebel">
                <input
                  type="checkbox"
                  value="4plus"
                  checked={rating == 4}
                  onClick={() => {
                    if (rating == 4) setRating("");
                    else setRating(4);
                  }}
                />
                4 Stars and Above
              </label>
              <label className="rating-lebel">
                <input
                  type="checkbox"
                  value="below3"
                  checked={rating == 3}
                  onClick={() => {
                    if (rating == 3) setRating("");
                    else setRating(3);
                  }}
                />
                3 Stars and Above
              </label>
              <label className="rating-lebel">
                <input
                  type="checkbox"
                  value="below3"
                  checked={rating == 2}
                  onClick={() => {
                    if (rating == 3) setRating("");
                    else setRating(3);
                  }}
                />
                2 Stars and Above
              </label>
              <label className="rating-lebel lavel">
                <input
                  type="checkbox"
                  value="below3"
                  checked={rating == 1}
                  onClick={() => {
                    if (rating == 3) setRating("");
                    else setRating(3);
                  }}
                />
                1 Stars and Above
              </label>
            </div>}
            <div className="col-12">
              <img
                alt="hair"
                src="/assets/img/banner-2.png"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-9 mainProduct">
          {isLargeScreen && <div className="sortBylist">
            <ul className="nav-tabs" id="myTab" role="tablist">
              <li>
                <a href="#" className="text-uppercase">
                  Sort By:
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className={`nav-link-1 ${type == 0 ? "active" : ""}`}
                  id="relevant-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#relevant"
                  href="#"
                  role="tab"
                  aria-controls="relevant"
                  aria-selected="true"
                  onClick={() => setType(0)}
                  style={{
                    padding: "5px 0 0 10px",
                  }}
                >
                  Relevant Products<span className="arrow-down"></span>
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className={`nav-link-1 ${type == 1 ? "active" : ""}`}
                  id="popular-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#popular"
                  href="#"
                  role="tab"
                  aria-controls="popular"
                  aria-selected="false"
                  onClick={() => setType(1)}
                  style={{
                    padding: "5px 0 0 10px",
                  }}
                >
                  Popular Products{" "}
                  <span className="arrow-down arrow-down-one"></span>
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className={`nav-link-1 ${type == 2 ? "active" : ""}`}
                  id="latest-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#latest"
                  href="#"
                  role="tab"
                  aria-controls="latest"
                  aria-selected="false"
                  onClick={() => setType(2)}
                  style={{
                    padding: "5px 0 0 10px",
                  }}
                >
                  Latest Products
                  <span className="arrow-down arrow-down-two"></span>
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className={`nav-link-1 ${type == 3 ? "active" : ""}`}
                  id="kit-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#kit"
                  href="#"
                  role="tab"
                  aria-controls="kit"
                  aria-selected="false"
                  onClick={() => setType(3)}
                  style={{
                    padding: "5px 0 0 10px",
                  }}
                >
                  Kits <span className="arrow-down arrow-down-two"></span>
                </a>
              </li>
            </ul>
          </div>}
          <div
            className="sortBylistMenu"
            onClick={handleMobileMenuToggle}
            style={{
              margin: "20px 0 20px 0",
              textDecoration: "underline",
              color: "#04c9ff !important",
            }}
          >
            Filter By :
          </div>

          {!isLargeScreen && showMobileMenu && (
            <FilterProduct
              isOpen={showMobileMenu}
              onClose={() => setShowMobileMenu(!showMobileMenu)}
              minValue={minValue}
              maxValue={maxValue}
              onInput={(e) => {
                handleInput(e);
              }}
              rating={rating}
              setRating={setRating}
              setType={setType}
            />
          )}


          <div></div>
          {/* Content for the second column */}

          <Product
            minValue={minValue}
            maxValue={maxValue}
            rating={rating}
            type={type}
            cart={cart}
            setCart={setCart}
            toggleCart={props?.toggleCart}
          />
        </div>
      </div>
    </>
  );
};

export default Products;