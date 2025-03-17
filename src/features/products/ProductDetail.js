// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProductByIdAsync, selectProductById } from './productSlice';
// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import Navbar from '../nav/Navbar';
// import ProductDetailSlider from './ProductDetailSlider';
// import './ProductDetail.css';
// import Product from '../product-list/Product'
// import ShoppingFeature from '../shopping-feature/ShoppingFeature'
// import Footer from '../footer/Footer'

// let product= {
//   "_id": "6692475ed7dbd0102b1175f0",
//   "name": "Dr Avinash",
//   "price": 45,
//   "description": "descricption",
//   "kit": [],
//   "src": [
//       "https://res.cloudinary.com/drkpwvnun/image/upload/v1720862558/hair-assessment/t8y8gzj6l73sixihotva.jpg",
//       "https://res.cloudinary.com/drkpwvnun/image/upload/v1720732501/hair-assessment/apqmltj5ixnbgxsjxm0q.jpg",
//       "https://res.cloudinary.com/drkpwvnun/image/upload/v1720504980/hair-assessment/lknibvme4r6jkikgx0mh.jpg"

//   ],
//   "longDes": "<h1>Long des</h1>",
//   "stock": "660",
//   "userReview": [],
//   "discount": "4",
//   "__v": 0
// }

// function ProductDetail() {
// const [select,setSelect]=useState(product.src[0])

//   const dispatch = useDispatch();
//   const params = useParams();
//   // const product = useSelector(selectProductById);
//   const [quantity, setQuantity] = useState(1); // Initialize quantity state with 1

//   // useEffect(() => {
//   //   dispatch(fetchProductByIdAsync(params.id));
//   // }, [dispatch, params.id]);

//   // Function to handle incrementing quantity
//   const incrementQuantity = () => {
//     setQuantity(prevQuantity => prevQuantity + 1);
//   };

//   // Function to handle decrementing quantity
//   const decrementQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(prevQuantity => prevQuantity - 1);
//     }
//   };

//   console.log(product);

//   return (
//     <Navbar>
//       <div className="barr">
//         <div className="container">
//           <h4 className="hoem">Home &gt; Product &gt; {product?.title}</h4>
//         </div>
//       </div>
//       <div className='container'>
//         <div className='product-section'>
//           <div className='product-image'>
//             <img style={{maxWidth:'100%'}}  src={select} alt={product?.title} />
//             <div style={{display:'flex', alignItems:"center"}}>
//               {product.src.map((item)=><img onClick={()=>setSelect(item)} style={{width:"50px",height:'50px'}} src={item}/>)}
//             </div>
//             </div>
//           <div className='product-detail'>
//             <h1>{product?.name}</h1>
//             <p>{product?.description}</p>

//             <div className="quantity-input">
//             <h1>Price Rs {product?.price}</h1>

//              <div className='cout-cont'> <input type="number" value={quantity} readOnly />
//              <div className='count-item'> <button onClick={incrementQuantity}>+</button>
//                <button onClick={decrementQuantity}>-</button></div></div>
//             </div>
//            <div> <button className="shop-btn1 btn-222">Buy Now</button>
//             <button  className="shop-btn1 btn-33">Add to cart</button></div>
//           </div>
//         </div>
//       </div>
//       <div className='container detail-cont'>
//         <h1>Product Detail</h1>
//         {/* <p>{}</p> */}
//         <div dangerouslySetInnerHTML={{ __html: product.longDes }} />
//       </div>
//       {/* <div className='container'>
//         <img  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFaQLv4xMAdfKo3N6F-5QgGB3sv0hkxxkGJRtdSB6DyA&s'/>
//       </div> */}
//       <Product/>
//       <ShoppingFeature/>
//       <Footer/>
//     </Navbar>
//   );
// }

// export default ProductDetail;
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProductByIdAsync, selectProductById } from './productSlice';
// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import Navbar from '../nav/Navbar';
// import ProductDetailSlider from './ProductDetailSlider';
// import './ProductDetail.css';
// import Product from '../product-list/Product';
// import ShoppingFeature from '../shopping-feature/ShoppingFeature';
// import Footer from '../footer/Footer';

// let product = {
//   "_id": "6692475ed7dbd0102b1175f0",
//   "name": "Dr Avinash",
//   "price": 45,
//   "description": "descricption",
//   "kit": [],
//   "src": [
//     "https://res.cloudinary.com/drkpwvnun/image/upload/v1720862558/hair-assessment/t8y8gzj6l73sixihotva.jpg",
//     "https://res.cloudinary.com/drkpwvnun/image/upload/v1720732501/hair-assessment/apqmltj5ixnbgxsjxm0q.jpg",
//     "https://res.cloudinary.com/drkpwvnun/image/upload/v1720504980/hair-assessment/lknibvme4r6jkikgx0mh.jpg"
//   ],
//   "longDes": "<h1>Long des</h1>",
//   "stock": "660",
//   "userReview": [],
//   "discount": "4",
//   "__v": 0
// };

// function ProductDetail() {
//   const [select, setSelect] = useState(product.src[0]);
//   const dispatch = useDispatch();
//   const params = useParams();
//   const [quantity, setQuantity] = useState(1);
//   const [reviews, setReviews] = useState(product.userReview);
//   const [newReview, setNewReview] = useState({
//     userName: '',
//     rating: '',
//     comment: ''
//   });

//   const handleReviewInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewReview({
//       ...newReview,
//       [name]: value
//     });
//   };

//   const handleReviewSubmit = (e) => {
//     e.preventDefault();
//     setReviews([...reviews, newReview]);
//     setNewReview({
//       userName: '',
//       rating: '',
//       comment: ''
//     });
//   };

//   const incrementQuantity = () => {
//     setQuantity(prevQuantity => prevQuantity + 1);
//   };

//   const decrementQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(prevQuantity => prevQuantity - 1);
//     }
//   };

//   console.log(product);

//   return (
//     <Navbar>
//       <div className="barr">
//         <div className="container">
//           <h4 className="hoem">Home &gt; Product &gt; {product?.title}</h4>
//         </div>
//       </div>
//       <div className='container'>
//         <div className='product-section'>
//           <div className='product-image'>
//             <img style={{ maxWidth: '100%' }} src={select} alt={product?.title} />
//             <div style={{ display: 'flex', alignItems: "center" }}>
//               {product.src.map((item, index) => (
//                 <img key={index} onClick={() => setSelect(item)} style={{ width: "50px", height: '50px' }} src={item} alt={`Product Image ${index + 1}`} />
//               ))}
//             </div>
//           </div>
//           <div className='product-detail'>
//             <h1>{product?.name}</h1>
//             <p>{product?.description}</p>
//             <div className="quantity-input">
//               <h1>Price Rs {product?.price}</h1>
//               <div className='cout-cont'>
//                 <input type="number" value={quantity} readOnly />
//                 <div className='count-item'>
//                   <button onClick={incrementQuantity}>+</button>
//                   <button onClick={decrementQuantity}>-</button>
//                 </div>
//               </div>
//             </div>
//             <div>
//               <button className="shop-btn1 btn-222">Buy Now</button>
//               <button className="shop-btn1 btn-33">Add to cart</button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className='container detail-cont'>
//         <h1>Product Detail</h1>
//         <div dangerouslySetInnerHTML={{ __html: product.longDes }} />
//       </div>
//       <div className='container review-section'>
//         <h2>Reviews</h2>
//         {reviews.length > 0 ? (
//           <ul className='review-list'>
//             {reviews.map((review, index) => (
//               <li key={index} className='review-item'>
//                 <p><strong>{review.userName}</strong></p>
//                 <p>Rating: {review.rating}</p>
//                 <p>{review.comment}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No reviews yet.</p>
//         )}
//         <h3>Add a Review</h3>
//         <form onSubmit={handleReviewSubmit} className='review-form'>
//           <div className='form-group'>
//             <label>Name: </label>
//             <input
//               type="text"
//               name="userName"
//               value={newReview.userName}
//               onChange={handleReviewInputChange}
//               required
//             />
//           </div>
//           <div className='form-group'>
//             <label>Rating: </label>
//             <input
//               type="number"
//               name="rating"
//               value={newReview.rating}
//               onChange={handleReviewInputChange}
//               min="1"
//               max="5"
//               required
//             />
//           </div>
//           <div className='form-group'>
//             <label>Comment: </label>
//             <textarea
//               name="comment"
//               value={newReview.comment}
//               onChange={handleReviewInputChange}
//               required
//             />
//           </div>
//           <button type="submit" className='submit-review-btn'>Submit Review</button>
//         </form>
//       </div>
//       <Product />
//       <ShoppingFeature />
//       <Footer />
//     </Navbar>
//   );
// }

// export default ProductDetail;
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../nav/Navbar";
import ProductDetailSlider from "./ProductDetailSlider";
import "./ProductDetail.css";
import Product from "../product-list/Product";
import ShoppingFeature from "../shopping-feature/ShoppingFeature";
import Footer from "../footer/Footer";
import BASE_URL from "../../Config";
import FaqProducts from "./FaqProduct";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin } from "../login/LoginSlice";
import { FaPlayCircle } from "react-icons/fa";
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Button } from "reactstrap";
import { getCartItems } from "./CartSlice";
import ReactImageMagnify from 'react-image-magnify';
import zIndex from "@mui/material/styles/zIndex";

import { useMediaQuery } from "@mui/material";
import ReactPaginate from "react-paginate";

const findNearestWhitespace = (str, index) => {
  let left = index;
  let right = index;

  while (left > 0 && str[left] !== " ") {
    left--;
  }

  while (right < str.length && str[right] !== " ") {
    right++;
  }

  // Choose the closer whitespace
  if (index - left < right - index) {
    return left;
  } else {
    return right;
  }
};


function ProductDetail(props) {

  useEffect(() => {
    if(props?.setTitle) props?.setTitle(window.location.pathname)
  },[])

  let {cart,
    setCart} = props;
  const isMobile = useMediaQuery("(max-width: 768px)");


  const content = useSelector((state) => state.content.customerVideos);
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.onscroll = () => {
        let currentScrollPos = window.pageYOffset - 700;
        let maxScroll = (document.body.scrollHeight - window.innerHeight); 
        console.log("nmkmsen",document.body.scrollHeight,window.innerHeight,currentScrollPos)
        if (currentScrollPos > 0 && currentScrollPos < maxScroll) {
          setIsVisible(true)
          // console.log(currentScrollPos)
        } else {
          setIsVisible(false)
        }
      }
    }
  }, [window.pageYOffset]);


  const [select, setSelect] = useState("0");
  const targetDivRef = useRef(null);
  const scrollToDiv = () => {
    if (targetDivRef.current) {
        targetDivRef.current.scrollIntoView({ behavior: "smooth" });
    }
};

  // useEffect(() => {
  //   let timeout;
    
  //   if(product){
  //     timeout =     setTimeout(
  //       () =>
  //         setSelect((prevIndex) =>
  //           prevIndex == (product?.src?.length-1) ? 0 : prevIndex + 1
  //         ),
  //       5000
  //     );
  //   }


  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [select]);
  const [readMore,setReadMore]=useState(-1)
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
  const [isZoomed, setIsZoomed] = useState(false);

  let storedUserData = JSON.parse(localStorage?.getItem("User343"));
  const userId = storedUserData?.logedInUser?.user._id;
  console.log("nsjneifhiewh", storedUserData, userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openSection, setOpenSection] = useState(null);

  const handleToggle = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const [openSection2, setOpenSection2] = useState(null);

  const handleToggle2 = (section) => {
    setOpenSection2(openSection2 === section ? null : section);
  };


  const [cur, setCur] = useState(0);

  // const [slide1,setSlide1] = useState(0)

  const fetchReview = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/get-review/${params.id}`);
      const data = await response.json();
      console.log("mkjeor", data);
      setReviews(data?.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  let pageCount =
  reviews?.length % 5 ==0
    ? reviews?.length / 5
    : Math.floor(reviews?.length / 5) + 1;

    console.log("srjie",pageCount,reviews)

  const handleLoginClick = () => {
    dispatch(toggleLogin());
  };

  const handleTestHair = () => {
    storedUserData ? navigate("/hair-test") : handleLoginClick();
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/product/${params.id}`);
        const data = await response.json();
        const productData = data.message[0];
        setProduct(productData);
        setSelect(0);
        // setReviews(productData.userReview);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
    fetchReview();
  }, [params.id]);

  const handleReviewInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: value,
    });
  };
  console.log("jkcoiejro",reviews?.length)
  const [cur1, setCur1] = useState(0);


  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    // setReviews([...reviews, newReview]);
    // setNewReview({
    //   userName: '',
    //   rating: '',
    //   comment: ''
    // });
    if (!userId ) {
      toast.error("login required");
      return false;
    }

    try {
      setLoader(true);
      let data1 = {
        rating: newReview?.rating,
        comment: newReview?.comment,
        name: newReview?.userName,
        productId: params.id,
      };
      const response = await fetch(`${BASE_URL}/users/add-review`, {
        method: "POST",
        headers: {
          Authorization: storedUserData.logedInUser.accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data1),
      });
      setLoader(false);
      if (response.ok) {
        const result = await response.json();
        toast.success("review created successfully");
        console.log("review created successfully:", result);
        // setReviews({
        //   userName: '',
        //   rating: '',
        //   comment: '',
        // })
        await fetchReview();
      } else {
        toast.error(`Failed to create review: ${response.statusText}`);
        console.error("Failed to create review:", response.statusText);
      }
    } catch (error) {
      setLoader(false);
      toast.error("Please logout and login again with valid credentials.");
      console.error("Error:", error);
    }
  };

  
  function setTransform(el, xpos, zpos, yAngle) {
    el.style.transform = `translateX(${xpos}px) translateZ(${zpos}px) rotateY(${yAngle}deg)`;
  }
  const ITEM_DISTANCE = 200;
const ITEM_ANGLE = -45;
const CENTER_ITEM_POP = 500;
const CENTER_ITEM_DISTANCE = 80;
const el = useRef(null);

  function target(index) {
    const items = el.current.children;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      // Center item position and angle
      if (i === index)
        setTransform(item, 0, CENTER_ITEM_POP, 0);
      // Left items position and angle
      else if (i < index) {
        setTransform(item, (i - index) * ITEM_DISTANCE - CENTER_ITEM_DISTANCE, 0, -ITEM_ANGLE);
      }
      // Right items position and angle
      else
        setTransform(item, (i - index) * ITEM_DISTANCE + CENTER_ITEM_DISTANCE, 0, ITEM_ANGLE);
    }
  }
  const [yurl, setYurl] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const handlePlay = (ud) => {
    console.log("smrfj",ud)
    setYurl(ud);
    setShowPopup(true);
  }

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }


  console.log("momvoer",cur,cur+4)

  const handleBuyNow = async () => {
    let data = {
      item: product,
      quantity: quantity,
    };
    if(!storedUserData?.logedInUser){

      let c = cart
      let f = c?.findIndex((w) => w?.item?._id == product?._id);
      if(f != -1){
        c[f].quantity = c[f]?.quantity + 1;
      }
      else{
        c.push(data);
      }
      setCart(c);
      localStorage.setItem("cart", JSON.stringify(c));
      toast.success("product added to cart");
      return;
      // toast.error(`Please Login First`);
    }
    try {
      setLoader(true);
      const response = await fetch(
        `${BASE_URL}/cart/add-cart?userId=${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: storedUserData?.logedInUser?.accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      setLoader(false);
      if (response.ok) {
        const result = await response.json();
        dispatch(getCartItems(storedUserData.logedInUser.user._id));
        navigate("/cart")
        console.log("review created successfully:", result);
        // navigate("/cart");
      } else {
        console.error("Failed to create review:", response.statusText);
      }
    } catch (error) {
      setLoader(false);
      console.error("Error:", error);
    }
  };

  const handleAddToCart = async () => {
    let data = {
      item: product,
      quantity: quantity,
    };
    if(!storedUserData?.logedInUser){

      let c = cart
      let f = c?.findIndex((w) => w?.item?._id == product?._id);
      if(f != -1){
        c[f].quantity = c[f]?.quantity + 1;
      }
      else{
        c.push(data);
      }
      setCart(c);
      localStorage.setItem("cart", JSON.stringify(c));
      toast.success("product added to cart");
      return;
      // toast.error(`Please Login First`);
    }
    try {
      setLoader(true);
      const response = await fetch(
        `${BASE_URL}/cart/add-cart?userId=${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: storedUserData?.logedInUser?.accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      setLoader(false);
      if (response.ok) {
        const result = await response.json();
        dispatch(getCartItems(storedUserData.logedInUser.user._id));
        navigate("/create-order")
        console.log("review created successfully:", result);
        // navigate("/cart");
      } else {
        console.error("Failed to create review:", response.statusText);
      }
    } catch (error) {
      setLoader(false);
      console.error("Error:", error);
    }
  };


  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  let disPercent = ((parseFloat(product?.discount || 0)/parseFloat(product?.price)) * 100)?.toFixed(0)



  return (
    <>
      <Navbar cart={cart} setCart={setCart} />
      <div className="barr2" style={{ backgroundColor: "#005cad" }}>
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
              style={{ margin: "10px 0 10px 0", gap: "12px" }}
            >
              <span class="ltn__secondary-color">
                <i class="fas fa-home"></i>
              </span>
              <div onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
                Home
              </div>
            </div>
            <div style={{ margin: "10px 0 10px 0" }}>{">"}</div>
            <div
              style={{ margin: "10px 0 10px 0", cursor: "pointer" }}
              onClick={() => navigate("/shop")}
            >
              Shop
            </div>
            <div style={{ margin: "10px 0 10px 0" }}>{">"}</div>
            <div style={{ margin: "10px 0 10px 0", cursor: "pointer" }}>
              {isMobile ? (product?.name?.length> 15 ? product?.name?.substring(0,15)+"..." : product?.name) : product?.name}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="product-section row">
          <div className="product-image col-12 col-md-6" style={{    position: "relative"}}>
            {/* <TransformWrapper
      defaultScale={1}
      defaultPositionX={100}
      defaultPositionY={100}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <React.Fragment>
                    <TransformComponent>
          <img 
              style={{ maxWidth: "100%", height: "400px" }}
              src={product?.src[select]}
              alt={product?.name}
            />
          </TransformComponent> */}
            {/* <div className="tools" style={{    display: "flex",
    justifyContent: "end",gap: "17px"}}>
            <Button onClick={() => zoomIn()} style={{background: "white",
    color: "black",
    fontSize: "25px",padding: 0}}>+</Button>
            <Button onClick={() => zoomOut()} style={{background: "white",
    color: "black",
    fontSize: "25px",    padding: 0}}>-</Button>
          </div> */}
            {/* 
        </React.Fragment>
      )}
    </TransformWrapper> */}
            {/* <img 
              style={{ maxWidth: "100%", height: "400px" }}
              src={product?.src[select]}
              alt={product?.name}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            /> */}

            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: product?.src[select],
                },
                largeImage: {
                  src: product?.src[select],
                  width: 1200,
                  height: 1200,
                },
              }}
              imageClassName="img-magnify"
              enlargedImageContainerStyle={{ zIndex: 10,width:"100%",height:"100%" }}
              // imageStyle={{ maxWidth: "100%", height: "400px" }} 
            />
                        {disPercent && disPercent != "0" ? (
                          <div style={{ position: "absolute",top : 0,    width: "71px",
                            height: "40px" }}>
                            <span class="tc nt_labels pa pe_none cw" style={{height: "100%",
    display: "flex"}}>
                              <span class="onsale nt_label" style={{width : "100%",fontSize : "18px"}}>
                                <span>-{disPercent + "%"}</span>
                              </span>
                            </span>
                          </div>
                        ) : (
                          <></>
                        )}

            <ul class="slick-dots" role="tablist" style={{ marginTop: "30px" }}>
              {product?.src?.map((e, ind) => {
                return (
                  <li
                    class={select == ind ? "slick-active" : ""}
                    aria-hidden="false"
                    role="presentation"
                    aria-selected={select == ind}
                    aria-controls={select}
                    id={select}
                    onClick={() => setSelect(ind)}
                  >
                    <button
                      type="button"
                      data-role="none"
                      role="button"
                      tabindex="0"
                    >
                      {ind}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div style={{ display: "flex", alignItems: "center" }}>
              {product?.src.map((item, index) => (
                <img
                  key={index}
                  onClick={() => setSelect(index)}
                  style={{
                    width: "50px",
                    height: "50px",
                    margin: "0 15px 0 0px",
                    opacity: select == index ? 1 : 0.5,
                  }}
                  src={item}
                  alt={`Product Image ${index}`}
                />
              ))}
            </div>
          </div>
          <div className="product-detail col-12 col-md-6">
            <h1>{product?.name}</h1>
            <p>{product?.shortDes}</p>
            <div className="d-flex" style={{ gap: "20px" }}>
              <ul style={{ padding: 0 }}>
                <div class="ltn__comment-item clearfix">
                  <div class="ltn__commenter-comment">
                    <div class="product-ratting">
                      {product?.review != "0" ? (
                        <ul className="horizontal-list">
                          <li>
                            <a href="#">
                              <i
                                class={
                                  product?.review > 0
                                    ? "fas fa-star star-review"
                                    : "far fa-star star-review-inactive"
                                }
                              ></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i
                                class={
                                  product?.review > 1
                                    ? "fas fa-star star-review"
                                    : "far fa-star star-review-inactive"
                                }
                              ></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i
                                class={
                                  product?.review > 2
                                    ? "fas fa-star star-review"
                                    : "far fa-star star-review-inactive"
                                }
                              ></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i
                                class={
                                  product?.review > 3
                                    ? "fas fa-star star-review"
                                    : "far fa-star star-review-inactive"
                                }
                              ></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i
                                class={
                                  product?.review > 4
                                    ? "fas fa-star star-review"
                                    : "far fa-star star-review-inactive"
                                }
                              ></i>
                            </a>
                          </li>
                        </ul>
                      ) : (
                        <ul className="horizontal-list">
                          <li>
                            <a href="#">
                              <i class={"far fa-star star-review-inactive"}></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class={"far fa-star star-review-inactive"}></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class={"far fa-star star-review-inactive"}></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class={"far fa-star star-review-inactive"}></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class={"far fa-star star-review-inactive"}></i>
                            </a>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </ul>
              <div style={{ fontSize: "18px" }} className="d-flex">
                <div>{reviews?.length}</div>
                <div
                  style={{
                    margin: "0px 0 0 10px",
                    fontWeight: "700",
                    cursor:"pointer "
                  }}
                  onClick={scrollToDiv}
                >
                  Reviews
                </div>
              </div>
            </div>

            <div className="quantity-input">
              <h1>
                Price ₹{" "}
                {(parseFloat(product?.price || 0) -
                  parseFloat(product?.discount || 0))?.toFixed(0)}
              </h1>
              <div style={{ textDecoration: "line-through", fontSize: "20px" }}>
                ₹{parseFloat(product?.price || 0)?.toFixed(0)}
              </div>
              <div className="cout-cont">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <div className="negative-sign" onClick={decrementQuantity}>
                    -
                  </div>
                  <div style={{ width: "2rem", height: "2rem" }}>
                    <input
                      type="text"
                      style={{ width: "100%", textAlign: "center" }}
                      value={quantity}
                      readOnly
                    />
                  </div>
                  <div className="plus-sign" onClick={incrementQuantity}>
                    +
                  </div>
                </div>
                {/* <div className="count-item" style={{ padding: "10px" }}>
                  <button onClick={incrementQuantity}>+</button>
                  <button onClick={decrementQuantity}>-</button>
                </div> */}
              </div>
            </div>
            <div className="d-flex .shop-btn1">
              <div
                className="d-flex shop-btn1 btn-222"
                style={{ cursor: "pointer" }}
                onClick={() => handleAddToCart()}
              >
                <img
                  src="/assets/img/buy-icon.png"
                  style={{
                    width: "28px",
                    height: "28px",
                    margin: "5px 0 0 10px",
                  }}
                />
                <div className="" style={{ margin: "8px 0 0 17px" }}>
                  Buy Now
                </div>
              </div>

              <div
                className="d-flex shop-btn1 btn-33"
                style={{ cursor: "pointer" }}
                onClick={() => handleBuyNow()}
              >
                <img
                  src="/assets/img/cart-icon.png"
                  style={{
                    width: "28px",
                    height: "28px",
                    margin: "5px 0 0 10px",
                  }}
                />
                <div className="" style={{ margin: "8px 0 0 17px" }}>
                  Add to cart
                </div>
              </div>
            </div>
            <div className="d-flex flex-column">
              <div className="hilight">Highlights:</div>
              <div
                className="hilight2"
                dangerouslySetInnerHTML={{ __html: product?.highlights }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container detail-cont">
        <h1>Product Detail</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: product?.longDes
              ?.slice(
                0,
                findNearestWhitespace(
                  product?.longDes,
                  Math.floor(product?.longDes?.length / 2)
                )
              )
              ?.trim(),
          }}
        />
        <div style={{ textAlign: "center", margin: "2rem 0 2rem 0" }}>
          <img
            style={{ width: "100%" }}
            src="/assets/img/banner/Product Page - Static Banner.png"
          />
        </div>
        <div
          style={{ margin: "0 0 35px 0" }}
          dangerouslySetInnerHTML={{
            __html: product?.longDes
              ?.slice(
                findNearestWhitespace(
                  product?.longDes,
                  Math.floor(product?.longDes?.length / 2)
                )
              )
              ?.trim(),
          }}
        />
        <div class="ingredient-section pt-60 pb-60">
          <div class="container">
            <div class="row" style={{ gap: 0 }}>
              <div class="col-lg-6 col-md-6">
                <h3 class="animated fadeIn">Ingredients</h3>
                <div
                  style={{ margin: "0 0 50px 0" }}
                  dangerouslySetInnerHTML={{ __html: product?.ingredientMain }}
                />
                <div class=" ingredient-section faq-section pb-60">
                  <div class="container">
                    <div class="row" style={{ padding: 0 }}>
                      <div class="col-lg-12 col-md-12">
                        <div class="benefit-accordian ingredient-accordian">
                          <div id="accordion_2">
                            {product?.ingredient?.map((e) => {
                              return (
                                <div class="card">
                                  <h6
                                    class="ltn__card-title collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#${e?._id}`}
                                    aria-expanded={openSection === e?._id}
                                    onClick={() => handleToggle(e?._id)}
                                  >
                                    {e?.title}
                                  </h6>
                                  <span></span>
                                  <div
                                    id={e?._id}
                                    className={`accordion-collapse collapse ${
                                      openSection === e?._id ? "show" : ""
                                    }`}
                                    data-bs-parent="#accordion_2"
                                    //
                                  >
                                    <div class="card-body">
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: e?.desc,
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <img
                  src="/assets/img/Ingredient-pic.jpg"
                  alt=""
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row" style={{ gap: 0, padding: "2rem" }}>
          <div class="col-lg-2">
            <h3 class="animated fadeIn">Benefits</h3>
          </div>
          <div class="col-lg-10">
            {/* <div dangerouslySetInnerHTML={{ __html: product?.benefits }} /> */}
            <div
              style={{ margin: "0 0 50px 0" }}
              dangerouslySetInnerHTML={{ __html: product?.benefitsMain }}
            />

            <div class="benefit-accordian ingredient-accordian">
              <div id="accordion_2">
                {product?.benefits?.map((e) => {
                  return (
                    <div class="card">
                      <h6
                        class="ltn__card-title collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${e?._id}`}
                        aria-expanded={openSection2 === e?._id}
                        onClick={() => handleToggle2(e?._id)}
                      >
                        {e?.title}
                      </h6>
                      <span></span>
                      <div
                        id={e?._id}
                        className={`accordion-collapse collapse ${
                          openSection2 === e?._id ? "show" : ""
                        }`}
                        data-bs-parent="#accordion_2"
                        //
                      >
                        <div class="card-body">
                          <div dangerouslySetInnerHTML={{ __html: e?.desc }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{ margin: "50px 0 50px 0" }}
          // dangerouslySetInnerHTML={{ __html: product.longDes }}
        />
      </div>

      <div class="review pt-0">
        <div class="container">
          <div
            class="col-lg-12"
            style={{ margin: "0 0 50px 0" }}
            onClick={handleTestHair}
          >
            <img
              src="/assets/img/product-details--banner-doctor-recommend.png"
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                overflow: "hidden",
              }}
            />
          </div>
          <div class="col-lg-12" ref={targetDivRef}>
            <div class="ltn__shop-details-tab-content-inner">
              <h3 class="mb-30 animated fadeIn">
                Customer Reviews{" "}
                <a
                  class="write"
                  onClick={() => setOpenReview(true)}
                  style={{ cursor: "pointer" }}
                >
                  write a review
                </a>
              </h3>
              <div class="ltn__comment-area mb-30">
                <div class="ltn__comment-inner">
                  <ul>
                    {reviews?.slice(cur, cur + 5)?.map((e, i) => {
                      return (
                        <li
                          className="ltn-main"
                          style={{ border: i == 0 ? "none" : "" }}
                        >
                          <div class="ltn__comment-item clearfix">
                            <div class="ltn__commenter-img">{e?.name[0]}</div>
                            <div class="ltn__commenter-comment">
                              <div class="product-ratting">
                                <ul className="horizontal-list">
                                  <li>
                                    <a href="#">
                                      <i
                                        style={{ color: "#FFB800" }}
                                        class={
                                          e?.rating > 0
                                            ? "fas fa-star"
                                            : "far fa-star"
                                        }
                                      ></i>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <i
                                        style={{ color: "#FFB800" }}
                                        class={
                                          e?.rating > 1
                                            ? "fas fa-star"
                                            : "far fa-star"
                                        }
                                      ></i>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <i
                                        style={{ color: "#FFB800" }}
                                        class={
                                          e?.rating > 2
                                            ? "fas fa-star"
                                            : "far fa-star"
                                        }
                                      ></i>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <i
                                        style={{ color: "#FFB800" }}
                                        class={
                                          e?.rating > 3
                                            ? "fas fa-star"
                                            : "far fa-star"
                                        }
                                      ></i>
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <i
                                        style={{ color: "#FFB800" }}
                                        class={
                                          e?.rating > 4
                                            ? "fas fa-star"
                                            : "far fa-star"
                                        }
                                      ></i>
                                    </a>
                                  </li>
                                  <li style={{ marginLeft: "10px" }}>
                                    <span>
                                      {moment(e?.createdAt).format(
                                        "DD/MM/YYYY"
                                      )}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <h6 style={{ fontSize: "1.2rem" }}>
                                <div href="#">{e?.name}</div>
                              </h6>
                            </div>
                          </div>
                          <div style={{ fontSize: "17px" }}>{e?.comment?.length > 50 ?
                          <div className="d-flex">{readMore  == i ? e?.comment : e?.comment?.substring(0,50)}
                          <div onClick={() => setReadMore(i)}>
                          &nbsp; &nbsp;...Read More
                          </div>
                          </div> : e?.comment}</div>
                        </li>
                      );
                    })}
                  </ul>

                  <ul
                    class="slick-dots"
                    role="tablist"
                    style={{ marginTop: "30px" }}
                  >
                    {/* {reviews
                      ?.slice(0, Math.ceil(reviews?.length / 4))
                      .map((e, ind) => {
                        return (
                          <li
                            class={cur / 4 == ind ? "slick-active" : ""}
                            aria-hidden="false"
                            role="presentation"
                            aria-selected={cur / 4 == ind}
                            aria-controls={cur}
                            id={cur}
                            onClick={() => setCur(ind * 4)}
                          >
                            <button
                              type="button"
                              data-role="none"
                              role="button"
                              tabindex="0"
                            >
                              {ind + 4}
                            </button>
                          </li>
                        );
                      })} */}

<div className="reactPagination" style={{display: "flex",
    justifyContent: "center"}}>
          <ReactPaginate
            breakLabel="..."
            nextLabel=" >"
            onPageChange={(event) => {
              setCur(event.selected * 5)
              // console.log("sjiorjfre",event.selected)
              // setSelectedPage(event.selected)
          
            }}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            // forcePage={selectedPage} 
            previousLabel="<"
            renderOnZeroPageCount={null}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openReview ? (
        <div className="container review-section">
          <h3>Add a Review</h3>
          <form onSubmit={handleReviewSubmit} className="review-form">
            <div className="form-group">
              <label>Name: </label>
              <input
                type="text"
                name="userName"
                value={newReview.userName}
                onChange={handleReviewInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Rating: </label>
              <input
                type="number"
                name="rating"
                value={newReview.rating}
                onChange={handleReviewInputChange}
                min="1"
                max="5"
                required
              />
            </div>
            <div className="form-group">
              <label>Comment: </label>
              <textarea
                name="comment"
                value={newReview.comment}
                onChange={handleReviewInputChange}
                required
              />
            </div>
            <button
              type="submit"
              className="submit-review-btn"
              // disabled={userId ? false : true}
            >
              {loader ? "Loading" : "Submit Review"}
            </button>
          </form>
        </div>
      ) : (
        <></>
      )}
      {/* <div>
        <img
          style={{
            height: "100%",
            width: "100%",
            padding: "2% 11%",
          }}
          src="/assets/img/banner/HappyCutomer.png"
          alt=""
        />
      </div> */}

      <div className="container">
        <div
          class="story-slider slick-current slick-active happy-customer"
          ref={el}
        >
          {content?.section1?.map((it, index) => {
            return (
              <>
                {cur1 == index ? (
                  <div class="row">
                    <div class="col-md-6 col-12">
                      <h2>
                        <span>Stories by our</span> Happy Customers
                      </h2>

                      <h4>{it?.name}</h4>
                      <p>{it?.title}</p>
                    </div>
                    <div
                      class="col-md-6 col-12"
                      style={{ position: "relative" }}
                    >
                      <div
                        onClick={() => target(index)}
                        key={index}
                        style={{
                          backgroundImage: `url(${it.url})`,
                          position: "relative",
                          height: "300px",
                        }}
                        className="coverflow-item-1 cust-video"
                      >
                        <div
                          className="play-button"
                          onClick={() => handlePlay(it?.videoUrl)}
                        >
                          <FaPlayCircle size={50} />
                        </div>
                        {showPopup && (
                          <div style={{ position: "absolute" }}>
                            <iframe
                              title="YouTube Video"
                              width="500"
                              height="300"
                              src={yurl}
                              frameBorder="0"
                              allowFullScreen
                            ></iframe>
                            <h2
                              onClick={() => setShowPopup(false)}
                              style={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                cursor: "pointer",
                              }}
                            >
                              X
                            </h2>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            );
          })}
        </div>

        <ul class="slick-dots" role="tablist" style={{ marginTop: "30px" }}>
          {content?.section1
            ?.slice(0, content?.section3?.length)
            .map((e, ind) => {
              return (
                <li
                  class={cur1 == ind ? "slick-active" : ""}
                  aria-hidden="false"
                  role="presentation"
                  aria-selected={cur1 == ind}
                  aria-controls={cur1}
                  id={cur1}
                  onClick={() => setCur1(ind)}
                >
                  <button
                    type="button"
                    data-role="none"
                    role="button"
                    tabindex="0"
                  >
                    {ind}
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
      <div
        className="buyNow-main-div"
        ref={componentRef}
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        <div className="container">
          {isMobile ? (
            <div className="d-flex" style={{justifyContent : "end", margin: "12px 0 12px 0",gap : "10px"}}>
                              <div className="cout-cont">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    <div className="negative-sign" onClick={decrementQuantity}>
                      -
                    </div>
                    <div style={{ width: "2rem", height: "2rem" }}>
                      <input
                        type="text"
                        style={{
                          width: "100%",
                          textAlign: "center",
                          height: "100%",
                        }}
                        value={quantity}
                        readOnly
                      />
                    </div>
                    <div className="plus-sign" onClick={incrementQuantity}>
                      +
                    </div>
                  </div>
                </div>
                <div
                  className="d-flex shop-btn1 btn-33"
                  style={{ cursor: "pointer",marginTop : 0 }}
                  onClick={() => handleBuyNow()}
                >
                  <img
                    src="/assets/img/cart-icon.png"
                    style={{
                      width: "28px",
                      height: "28px",
                      margin: "5px 0 0 10px",
                    }}
                  />
                  <div className="" style={{ margin: "8px 0 0 17px" }}> 
                    Add to cart
                  </div>
                </div>
            </div>
          ) : (
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div className="d-flex" style={{ gap: "10px" }}>
                <img
                  style={{ width: "70px", height: "70px" }}
                  src={product?.src?.[0]}
                />
                <div className="buyNow-product-name">{product?.name}</div>
              </div>
              <div className="d-flex" style={{ gap: "10px" }}>
                <div
                  style={{
                    textDecoration: "line-through",
                    fontSize: "20px",
                    color: "#aaa",
                  }}
                  className="buyNow-product-name"
                >
                  ₹ {parseFloat(product?.price || 0)?.toFixed(0)}
                </div>
                <div className="buyNow-product-name">
                  ₹{" "}
                  {(parseFloat(product?.price || 0) -
                    parseFloat(product?.discount || 0))?.toFixed(0)}
                </div>

                <div className="cout-cont">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    <div className="negative-sign" onClick={decrementQuantity}>
                      -
                    </div>
                    <div style={{ width: "2rem", height: "2rem" }}>
                      <input
                        type="text"
                        style={{
                          width: "100%",
                          textAlign: "center",
                          height: "100%",
                        }}
                        value={quantity}
                        readOnly
                      />
                    </div>
                    <div className="plus-sign" onClick={incrementQuantity}>
                      +
                    </div>
                  </div>
                </div>
                <div
                  className="d-flex shop-btn1 btn-33"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleBuyNow()}
                >
                  <img
                    src="/assets/img/cart-icon.png"
                    style={{
                      width: "28px",
                      height: "28px",
                      margin: "5px 0 0 10px",
                    }}
                  />
                  <div className="" style={{ margin: "8px 0 0 17px" }}>
                    Add to cart
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Product cart={cart} setCart={setCart}/>
      <ShoppingFeature />
      <FaqProducts product={product} />
      <Footer />
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default ProductDetail;
