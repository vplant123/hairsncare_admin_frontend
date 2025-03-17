import React, { useEffect, useState } from "react";
import "./index.css"; // Import your custom styles for the cart
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../products/CartSlice";
import BASE_URL from "../../../Config";
import { toggleLogin } from "../../login/LoginSlice";
import { useNavigate } from "react-router-dom";
import { Login } from "@mui/icons-material";
import SignUp from "../../signup/SignUp";
import { FaSearch } from "react-icons/fa";
import MultiRangeSlider from "multi-range-slider-react";
import { NavLink } from "react-router-dom";

function FilterProduct({
  isOpen,
  onClose,
  cart,
  setCart,
  minValue,
  maxValue,
  onInput,
  rating,
  setRating,setType
}) {
  const navigate = useNavigate();
  const [cartItemsNew, setCartItemsNew] = useState([]);

  const cartItems = useSelector((state) => state.cart.items);

  let storedUserData = JSON.parse(localStorage?.getItem("User343"));
  const showLogin = useSelector((state) => state.login.showLogin);

  const userId = storedUserData?.logedInUser?.user._id;

  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (!storedUserData?.logedInUser) {
      setCartItemsNew(cart);
    } else setCartItemsNew(cartItems);
  }, [cartItems, cart]);

  const removeFromCart = async (id, _id) => {
    if (!storedUserData?.logedInUser) {
      let c = cart?.map((item) => ({ ...item }));
      let f = c?.filter((w) => w?.item?._id != _id);
      console.log("jreijf", f, c, _id);

      setCart(f);
      setCartItemsNew(f);
      localStorage.setItem("cart", JSON.stringify(f));

      return;
      // toast.error(`Please Login First`);
    }

    try {
      setLoader(true);
      const response = await fetch(
        `${BASE_URL}/cart/delete-cart?userId=${userId}&id=${_id}`,
        {
          method: "POST",
          headers: {
            Authorization: storedUserData?.logedInUser?.accessToken,
            "Content-Type": "application/json",
          },
        }
      );
      setLoader(false);
      if (response.ok) {
        const result = await response.json();
        // toast.success("review created successfully");
        console.log("review created successfully:", result);
        dispatch(getCartItems(storedUserData?.logedInUser?.user?._id));
      } else {
        console.error("Failed to create review:", response.statusText);
      }
    } catch (error) {
      setLoader(false);
      console.error("Error:", error);
    }
    // setCartItemsNew(cartItemsNew.filter(item => item._id != id));
  };

  const updateQuantity = (id, quantity) => {
    if (!storedUserData?.logedInUser) {
      let c = cart.map((e) => ({ ...e }));
      let f = c?.findIndex((w) => w?.item?._id == id);
      if ((f || f == "0") && f != -1) {
        c[f].quantity = c[f]?.quantity + 1;
        console.log("jreijf", c[f].quantity);
      }

      setCart(c);
      console.log("jreijf", f, c, id);
      localStorage.setItem("cart", JSON.stringify(c));
      return;
    } else {
      setCartItemsNew(
        cartItemsNew.map((item) =>
          item?.item?._id == id
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        )
      );
    }
  };

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setStatus(true);
      try {
        const response = await fetch(
          `${BASE_URL}/admin/product?search=${search}`
        );
        const data = await response.json();
        setProducts(data.message); // Adjust according to your API response structure
        setStatus(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setStatus(false);
      }
    };

    if (search) {
      let timeout = setTimeout(() => {
        fetchProducts();
      }, 250);
      return () => {
        clearTimeout(timeout);
      };
    } else setProducts([]);
  }, [search]);

  return (
    <div className={`filter-cart ${isOpen ? "open" : ""}`}>
      <div className="mini-cart-header">
        <h3>Filters </h3>
        <button onClick={onClose} className="close-btn">
          &times;
        </button>
      </div>
      <div className="filter-price-1 col-12">
        <h4>BY PRICE</h4>
        <MultiRangeSlider
          min={0}
          max={50000}
          step={21}
          minValue={minValue}
          maxValue={maxValue}
          onInput={onInput}
        />
        <h4>
          Rs {minValue} - Rs {maxValue}
        </h4>
      </div>

      <div className="fiter-rating-1 col-12">
        <h4>BY RATING</h4>
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
        <label className="rating-lebel">
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
      </div>

      <div
            className={`nav-link show`}
            style={{
              zIndex: 1,
              position: "relative",
              width : "100%" 
            }}
          >
            <a>
              <NavLink onClick={() => setType(0)} activeClassName="active">
                Relevant Products
              </NavLink>
            </a>
            <a className="who-we-link">
              <NavLink onClick={() => setType(1)} activeClassName="active">
                Popular Products
              </NavLink>
            </a>
            <a>
              <NavLink onClick={() => setType(2)} activeClassName="active">
                Latest Products
              </NavLink>
            </a>
            <a>
              <NavLink onClick={() => setType(3)} activeClassName="active">
                Kits
              </NavLink>
            </a>
          </div>

      {/* <div className="mini-cart-footer">
        <button className="checkout-btn" onClick={handleAddToCart} >Proceed to Checkout</button>
      </div> */}
    </div>
  );
}

export default FilterProduct;
