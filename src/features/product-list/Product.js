import React, { useEffect, useState } from 'react';
import './Product.css';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../Config';
import { useMediaQuery } from '@mui/material';
import useDivInView, { RIGHT_VARIANTS, TRANSITION } from '../../hooks/useDivInView';
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getCartItems } from '../products/CartSlice';

let data = [
  {
    src: "/assets/img/product/1.png",
    name: "Hair Vitamin with Biotin",
    rating: 4,
    massage: "100% make a type specimen book. It has survived not only centuries,",
    logo: "/assets/img/google-icon.webp"
  },
  {
    src: "/assets/img/product/2.png",
    name: "Gummies with Biotin",
    rating: 4,
    massage: "100% make a type specimen book. It has survived not only centuries,",
    logo: "/assets/img/google-icon.webp"
  },
  {
    src: "/assets/img/product/3.png",
    name: "Vitamin D",
    massage: "100% make a type specimen book. It has survived not only centuries,",
    rating: 4,
    logo: "/assets/img/google-icon.webp"
  },
  {
    src: "/assets/img/product/4.png",
    name: "Hair Shampoo",
    rating: 4,
    massage: "100% make a type specimen book. It has survived not only centuries,",
    logo: "/assets/img/google-icon.webp"
  }
];

const ProductCard = ({ product, index,cart,
  setCart }) => {

  const navigate = useNavigate();
  const [ref, control] = useDivInView();
  let disPercent = ((parseFloat(product?.discount || 0)/parseFloat(product?.price)) * 100)?.toFixed(0)

  let storedUserData = JSON.parse(localStorage?.getItem("User343"));
  const dispatch = useDispatch();

  const scrollToTop = () =>{ 
    window.scrollTo({ 
      top: 0,  
      behavior: 'smooth'
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    }); 
  }; 


  const handleAddToCart = async () => {
    let data = {
      item: product,
      quantity: 1,
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
      // setLoader(true);
      const response = await fetch(
        `${BASE_URL}/cart/add-cart?userId=${storedUserData.logedInUser.user._id}`,
        {
          method: "POST",
          headers: {
            Authorization: storedUserData?.logedInUser?.accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      // setLoader(false);
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
      // setLoader(false);
      console.error("Error:", error);
    }
  };

  return (
    <motion.div
      ref={ref}
      animate={control}
      initial="hidden"
      variants={RIGHT_VARIANTS}
      transition={
        {
          ...TRANSITION,
          delay: index * 0.2
        }
      }
      style={{ cursor: 'pointer' }}
      className="col-12 col-md-4 "
    >
      <div className="product-card" style={{ height: '450px', justifyContent: 'space-between' }}>
        <div>
        {disPercent && disPercent != "0" ? (
                          <div style={{ position: "absolute",zIndex:1 }}>
                            <span class="tc nt_labels pa pe_none cw">
                              <span class="onsale nt_label">
                                <span>-{disPercent + "%"}</span>
                              </span>
                            </span>
                          </div>
                        ) : ( 
                          <></>
                        )}{" "}
          <img src={product.src?.[0]} alt={product.name} style={{ height: '200px' }}       onClick={() => {
            scrollToTop();
            navigate('/product-detail/' + product._id)}
          }
 />
        </div>
        <div className="d-flex flex-column">
          <div
            style={{
              textAlign: 'center',
              fontSize: '1rem',
              fontWeight: '500',
            }}
            onClick={() => {
              scrollToTop();
              navigate('/product-detail/' + product._id)}
            }
          >
            {product.name}
          </div>
          <div
            style={{
              display:"flex",
              textAlign: 'center',
              fontSize: '1rem',
              fontWeight: '500',
              justifyContent:"center",
              gap : "10px"
            }}
            onClick={() => {
              scrollToTop();
              navigate('/product-detail/' + product._id)}
            }
          >
            ₹ {parseFloat(product?.price || 0) - parseFloat(product?.discount || 0)}
          {product?.discount ?   <div
                                className="product-price-des"
                                style={{
                                  paddingLeft: "10px",
                                  fontWeight: "600",
                                }}
                              >
                                ₹{parseFloat(product.price)}
                              </div> : <></>}
          </div>
          <ul style={{ padding: 0,display:"flex",justifyContent: "center",margin : "0" }}>
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
                                                  ? "fas fa-star star-review-1"
                                                  : "far fa-star star-review-1-inactive"
                                              }
                                            ></i>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <i
                                              class={
                                                product?.review > 1
                                                  ? "fas fa-star star-review-1"
                                                  : "far fa-star star-review-1-inactive"
                                              }
                                            ></i>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <i
                                              class={
                                                product?.review > 2
                                                  ? "fas fa-star star-review-1"
                                                  : "far fa-star star-review-1-inactive"
                                              }
                                            ></i>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <i
                                              class={
                                                product?.review > 3
                                                  ? "fas fa-star star-review-1"
                                                  : "far fa-star star-review-1-inactive"
                                              }
                                            ></i>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <i
                                              class={
                                                product?.review > 4
                                                  ? "fas fa-star star-review-1"
                                                  : "far fa-star star-review-1-inactive"
                                              }
                                            ></i>
                                          </a>
                                        </li>
                                      </ul>
                                    ) : (
                                      <ul className="horizontal-list">
                                        <li>
                                          <a href="#">
                                            <i
                                              class={
                                                "far fa-star star-review-1-inactive"
                                              }
                                            ></i>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <i
                                              class={
                                                "far fa-star star-review-1-inactive"
                                              }
                                            ></i>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <i
                                              class={
                                                "far fa-star star-review-1-inactive"
                                              }
                                            ></i>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <i
                                              class={
                                                "far fa-star star-review-1-inactive"
                                              }
                                            ></i>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <i
                                              class={
                                                "far fa-star star-review-1-inactive"
                                              }
                                            ></i>
                                          </a>
                                        </li>
                                      </ul>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </ul>
          <div className="btn-container" style={{margin : 0}}  onClick={() => handleAddToCart()}
          >
            <button className="btn primary">ADD TO CART</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProductList = ({ products, cur, slide,cart,
  setCart}) => {
  return (
    <div className="col-12 row">
      {products?.slice(cur, cur + (slide + 1))?.map((item, index) => (
        <ProductCard key={index} product={item} index={index} cart={cart}
        setCart={setCart}  />
      ))}
    </div>
  );
};



const Pagination = ({ products, cur, setCur, slide1 }) => {
  return (
    <ul className="slick-dots" role="tablist" style={{ marginTop: '30px' }}>
      {products?.slice(0, products?.length - slide1).map((e, ind) => {
        return (
          <li
            key={ind}
            className={cur === ind + 1 ? 'slick-active' : ''}
            role="presentation"
            aria-selected={cur === ind + 1}
            onClick={() => setCur(ind + 1)}
          >
            <button type="button" data-role="none" role="button">
              {ind + 1}
            </button>
          </li>
        );
      })}
    </ul>
  );
};


function Product(props) {
  const navigate = useNavigate();
  const handleViewAll = () => {
    navigate('/shop');
  };
  let {cart,
    setCart} = props;

  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('idle');
  const [cur, setCur] = useState(1);

  

  useEffect(() => {
    let timeout = setTimeout(
      () =>
        setCur((prevIndex) =>
          prevIndex === products?.length - 2 ? 1 : prevIndex + 1
        ),
      5000
    );

    return () => {
      clearTimeout(timeout);
    };
  }, [cur]);

  useEffect(() => {
    const fetchProducts = async () => {
      setStatus('loading');
      try {
        const response = await fetch(`${BASE_URL}/admin/product?review=4`);
        const data = await response.json();
        setProducts(data.message); // Adjust according to your API response structure
        setStatus('idle');
      } catch (error) {
        console.error('Error fetching products:', error);
        setStatus('error');
      }
    };

    fetchProducts();
  }, []);

  const isLargeScreen = useMediaQuery('(min-width:1200px)');
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [slide, setSlide] = useState(2);
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
    <div>
      <h1
        className="product-title animate__animated animate__fadeIn"
        style={{ fontSize: '2rem', fontWeight: '700' }}
      >
        Our Products
      </h1>
      <div className="product-container container row">
        <ProductList products={products} cur={cur} slide={slide} cart={cart}
setCart={setCart} />
        <Pagination products={products} cur={cur} setCur={setCur} slide1={slide1} />
      </div>
      <div
        className="view-all-product animate__animated animate__fadeInDown"
        style={{ animationDelay: '0.2s' }}
      >
        <button
          onClick={handleViewAll}
          className="btn primary"
          style={{ background: '#4b555c', color: 'white' }}
        >
          VIEW ALL PRODUCTS
        </button>
      </div>
    </div>
  );
}

export default Product;
