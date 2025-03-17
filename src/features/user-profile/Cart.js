import React, { useEffect, useState } from 'react';
import './Cart.css';
import Sidebar from './Sidebar'
import Navbar from '../nav/Navbar';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from 'react-router-dom';
import BASE_URL from '../../Config';
import { getCartItems } from '../products/CartSlice';
import { Login } from '@mui/icons-material';
import { toggleLogin } from '../login/LoginSlice';
import SignUp from '../signup/SignUp';
import { ToastContainer } from 'react-toastify';
import Footer from '../footer/Footer';

// Sample cart data for demonstration purposes
const sampleCart = [
  {
    id: 1,
    name: 'Aspirin',
    price: 10.00,
    quantity: 2,
    image: 'https://via.placeholder.com/80'
  },
  {
    id: 2,
    name: 'Vitamin C',
    price: 30.00,
    quantity: 1,
    image: 'https://via.placeholder.com/80'
  }
];

export default function Cart(props) {

  let {cart,
    setCart} = props;

    const [showLogin1,setShowLogin1]= useState(false)

  const [showSignup, setShowSignup] = useState(false);

  const showLogin = useSelector((state) => state.login.showLogin);

  useEffect(() => {
    if(props?.setTitle) props?.setTitle(window.location.pathname)
  },[])

  const scrollToTop = () =>{ 
    window.scrollTo({ 
      top: 0,  
      behavior: 'smooth'
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    }); 
  }; 
  useEffect(() => {
    
    if(props?.setTitle) props?.setTitle(window.location.pathname)
      scrollToTop()
  },[])

  const handleSignupClick = () => {
    setShowSignup(!showSignup);
  };

  const handleLoginClick = () => {
    dispatch(toggleLogin());
  };


  const [cartItemsNew, setCartItemsNew] = useState(sampleCart);
  const cartItems = useSelector((state) => state.cart.items);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  let storedUserData = JSON.parse(localStorage?.getItem("User343"));
  const userId = storedUserData?.logedInUser?.user._id;
  const dispatch = useDispatch();

  let updateCart = async (values) => {
    try {
      // setLoader(true)
      const response = await fetch(`${BASE_URL}/cart/update-cart?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': storedUserData.logedInUser.accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
      });
      // setLoader(false)
      if (response.ok) {
        const result = await response.json();
        dispatch(getCartItems(storedUserData?.logedInUser?.user?._id));
        // toast.success("review created successfully");
        console.log('review created successfully:', result);
        // navigate("/create-order")
      } else {
        console.error('Failed to create review:', response.statusText);
      }
    } catch (error) {
      // setLoader(false)
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    if(!storedUserData?.logedInUser){
      setCartItemsNew(cart)
    }
    else {
      let p = JSON.parse(localStorage.getItem("cart")) || [];
      if(p?.length > 0){
        let tmp = cartItems?.map((e) => ({...e})) || []

        for (let index = 0; index < p?.length; index++) {
          const element = p[index];
          let f = tmp?.findIndex((e) => e?.item?._id == element?.item?._id)
          if (f!=-1) tmp[f].quantity = parseFloat(tmp[f]?.quantity) + parseFloat(element?.quantity)
          else tmp.push({
          quantity : element?.quantity,item : element?.item})
          console.log("sjirfjp",tmp)
        }
        localStorage.setItem("cart", JSON.stringify([]));
        updateCart(tmp)
        // setCartItemsNew(tmp)
      }
      else setCartItemsNew(cartItems)
    }
  },[cartItems,cart])
  const updateQuantity = (id, quantity) => {
    console.log("mikeworjrfe",id,quantity,cartItemsNew)
    setCartItemsNew(cartItemsNew.map(item => 
      item?._id == id || item?.item?._id == id  ? { ...item, quantity: Math.max(1, quantity) } : item
    ));
    console.log("moemroj",cartItemsNew.map(item => 
      item?._id == id ? { ...item, quantity: Math.max(1, quantity) } : item
    ))
  };

  const removeFromCart = async (id,_id) => {
    console.log("srjfier",_id)
    if(!storedUserData?.logedInUser){

      let c = cart?.map((item) => ({...item}));
      let f = c?.filter((w) => w?.item?._id != _id);
      console.log("jreijf",f,c,_id)

      setCart(f);
      setCartItemsNew(f)
      localStorage.setItem("cart", JSON.stringify(f));

      return;
      // toast.error(`Please Login First`);
    }

    try {
      setLoader(true)
      const response = await fetch(`${BASE_URL}/cart/delete-cart?userId=${userId}&id=${_id}`, {
        method: 'POST',
        headers: {
          'Authorization': storedUserData?.logedInUser?.accessToken,
          'Content-Type': 'application/json'
        },
      });
      setLoader(false)
      if (response.ok) {
        const result = await response.json();
        // toast.success("review created successfully");
        console.log('review created successfully:', result);
        dispatch(getCartItems(storedUserData?.logedInUser?.user?._id));
      } else {
        console.error('Failed to create review:', response.statusText);
      }
    } catch (error) {
      setLoader(false)
      console.error('Error:', error);
    }
    // setCartItemsNew(cartItemsNew.filter(item => item._id != id));
  };

  const getTotalAmount = () => {
    return cartItemsNew.reduce((total, item) => total + (item?.item?.price - parseFloat(item?.item?.discount || 0)) * (item?.quantity || 1), 0).toFixed(0);
  };

  const handleAddToCart = async () => {
    let data = cartItemsNew?.map((e) => {
      return {
        item  : e?.item,
        quantity : e?.quantity,
      };
    });
    if(!storedUserData?.logedInUser){
      setShowLogin1(true)
      return
    }
    try {
      setLoader(true)
      const response = await fetch(`${BASE_URL}/cart/update-cart?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': storedUserData.logedInUser.accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartItemsNew),
      });
      setLoader(false)
      if (response.ok) {
        const result = await response.json();
        // toast.success("review created successfully");
        console.log('review created successfully:', result);
        scrollToTop();
        navigate("/create-order")
      } else {
        console.error('Failed to create review:', response.statusText);
      }
    } catch (error) {
      setLoader(false)
      console.error('Error:', error);
    }
  };
  return (
<Navbar cart = {cart}
    setCart = {setCart}>
<Sidebar>
<div className="cart">
  {
    cartItemsNew?.length == 0 ? <div  className='d-flex flex-column'>
    <div style={{fontSize : "25px",fontWeight : "600"}}>Your Cart is Empty</div>
    <div style={{fontSize : "18px",color: "#6ED6F4",cursor : "pointer"}} onClick={() => {
      navigate("/shop")
    }}>See all products</div>
  </div> : 
    
    !showLogin1 ? <>
          <ul className="cart-items">
        {cartItemsNew?.map(item => {
          let q = item?.quantity;
          console.log("nmkenrijnr",q)
          return(
            <li key={item?._id} className="cart-item">
              <img src={item?.item?.src?.[0]} alt={item?.item?.name} onClick={() => navigate('/product-detail/' + item?.item?._id)} style={{cursor : "pointer"}}  />
              <div className="cart-item-details">
                <h3 onClick={() => navigate('/product-detail/' + item?.item?._id)} style={{cursor : "pointer"}}>{item?.item?.name}</h3>
                <p>Price: {item?.item?.price?.toFixed(0) - parseFloat(item?.item?.discount || 0)?.toFixed(0)}</p>
              </div>
              <div className="cart-item-actions">
                <input 
                  type="number" 
                  value={q} 
                  onChange={(e) => {
                     console.log("kokokroo",e.target.value)
                    updateQuantity(item?.item?._id, e.target.value)
                  }}
                />
                <button className="remove" onClick={() => removeFromCart(item?._id,item?.item?._id)}>{loader ? "Loading" : "Remove"}</button>
              </div>
            </li>
          )
        })}
      </ul>
      <div className="cart-summary">
        <p>Total Amount: {getTotalAmount()}</p>
        <button onClick={() => {
          handleAddToCart()
        }}>Buy</button>
      </div></> : <div  className='d-flex flex-column'>
        <div style={{fontSize : "25px",fontWeight : "600"}}>Please Login/Sign Up First</div>
        <div style={{fontSize : "18px",color: "#ebe977"}} onClick={() => {
          navigate("/shop")
        }}>See all products</div>
        <div className="d-flex .shop-btn1">
              <div className="d-flex shop-btn1 btn-222" style={{cursor : "pointer"}}                   onClick={handleLoginClick}
              >
                <div
                  className=""
                  style={{ margin: "8px 0 0 17px" }}
                >
                  Login
                </div>
              </div>

              <div className="d-flex shop-btn1 btn-33" style={{cursor : "pointer"}}                   onClick={handleSignupClick}
              >
                <div
                  className=""
                  style={{ margin: "8px 0 0 17px" }}
                >
                  Sign up
                </div>
              </div>
            </div>
            {showLogin && <Login onClose={handleLoginClick} />}
            {showSignup && <SignUp onClose={handleSignupClick} />}
      </div>
  }
  

    </div>
    <ToastContainer position="bottom-right" />
</Sidebar>
{/* <Footer/> */}
</Navbar>
  );
}
