import React, { useEffect, useState } from 'react'
import './MiniCart.css'; // Import your custom styles for the cart
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems } from '../features/products/CartSlice';
import BASE_URL from '../Config';
import { toggleLogin } from '../features/login/LoginSlice';
import { useNavigate } from 'react-router-dom';
import { Login } from '@mui/icons-material';
import SignUp from '../features/signup/SignUp';

function MiniCart({ isOpen, onClose,cart,setCart }) {


      const [cartItemsNew, setCartItemsNew] = useState([]);

      const cartItems = useSelector((state) => state.cart.items);
    
      let storedUserData = JSON.parse(localStorage?.getItem("User343"));
      const showLogin = useSelector((state) => state.login.showLogin);

      const userId = storedUserData?.logedInUser?.user._id;
    
      const dispatch = useDispatch();
      const [loader, setLoader] = useState(false);


      useEffect(() => {
        if(!storedUserData?.logedInUser){
          setCartItemsNew(cart)
        }
        else setCartItemsNew(cartItems)
      },[cartItems,cart])

  const removeFromCart = async (id,_id) => {

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


  const updateQuantity = (id, quantity) => {

    if(!storedUserData?.logedInUser){
        let c = cart.map((e) => ({...e}));
        let f = c?.findIndex((w) => w?.item?._id == id);
        if((f || f == "0") && f != -1){
          c[f].quantity = c[f]?.quantity + 1;
          console.log("jreijf",c[f].quantity)
        }

        setCart(c);
        console.log("jreijf",f,c,id)
        localStorage.setItem("cart", JSON.stringify(c));
        return;
      }
  
    else {setCartItemsNew(cartItemsNew.map(item => 
      item?.item?._id == id ? { ...item, quantity: Math.max(1, quantity) } : item
    ));
}
  };
  const [showLogin1,setShowLogin1]= useState(false)

  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    dispatch(toggleLogin());
  };
  const handleSignupClick = () => {
    setShowSignup(!showSignup);
  };

  const handleAddToCart = async () => {
    let data = cartItemsNew?.map((e) => {
      return {
        item  : e?.item,
        quantity : e?.quantity,
      };
    });
    if(!storedUserData?.logedInUser){
        navigate("/cart")
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
<div className={`mini-cart ${isOpen && cartItemsNew?.length > 0 ? 'open' : ''}`}>
      <div className="mini-cart-header">
        <h3>Your Cart</h3>
        <button onClick={onClose} className="close-btn">&times;</button>
      </div>
      <div className="mini-cart-content">
        {cartItemsNew?.length > 0 ? (
          cartItemsNew?.map((item, index) => (
            <div key={index} className="mini-cart-item">
              <img src={item?.item?.src?.[0]} alt={item?.item?.name} />
              <div>
                <div>{item?.item?.name}</div>
                <div className="cart-item-actions">
                <input 
                  type="number" 
                  value={item?.quantity} 
                  onChange={(e) => {
                     console.log("kokokroo",e.target.value)
                    updateQuantity(item?.item?._id, e.target.value)
                  }} 
                />
                <button className="remove" onClick={() => removeFromCart(item?._id,item?.item?._id)}>{loader ? "Loading" : "Remove"}</button>
              </div>                <div>Price: {item?.item?.price?.toFixed(2) - parseFloat(item?.item?.discount || 0)}</div>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <div className="mini-cart-footer">
        <button className="checkout-btn" onClick={handleAddToCart} >Proceed to Checkout</button>
      </div>
      {showLogin && <Login onClose={handleLoginClick} />}
      {showSignup && <SignUp onClose={handleSignupClick} />}
    </div>
  )
}

export default MiniCart