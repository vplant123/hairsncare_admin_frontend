import React, { useEffect, useState } from 'react'
import './index.css'; // Import your custom styles for the cart
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems } from '../products/CartSlice';
import BASE_URL from '../../Config';
import { toggleLogin } from '../login/LoginSlice';
import { useNavigate } from 'react-router-dom';
import { Login } from '@mui/icons-material';
import SignUp from '../signup/SignUp';
import { FaSearch } from 'react-icons/fa';

function SearchProduct({ isOpen, onClose,cart,setCart }) {




    const navigate = useNavigate();
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



  const [search,setSearch] = useState("")
  const [status, setStatus] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    
    const fetchProducts = async () => {
      setStatus(true);
      try {
        const response = await fetch(`${BASE_URL}/admin/product?search=${search}`);
        const data = await response.json();
        setProducts(data.message); // Adjust according to your API response structure
        setStatus(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setStatus(false);
      }
    };

    if(search) {
        let timeout = setTimeout(() => {
            fetchProducts();

          }, 250);
          return () => {
            clearTimeout(timeout);
        };  
    }   
    else setProducts([])
  }, [search]);


  return (
<div className={`mini-cart ${isOpen ? 'open' : ''}`}>
      <div className="mini-cart-header">
        <h3>SEARCH OUR SITE        </h3>
        <button onClick={onClose} className="close-btn">&times;</button>
      </div>
      <div className='d-flex' style={{justifyContent : "center",margin : "20px 0 0 0",width:"100%"}}>
        <div style={{position : "relative",    margin: "0 20px 0 20px",width:"100%"}}>
        <input placeholder="Search" style={{width:"100%"}} onChange={(e)=>setSearch(e?.target?.value)} />
        <FaSearch size={20} className='search-icon' />
        </div>

      </div>
      <div class="search_header__prs fwb cd" style={{
    marginTop: "25px"
}}><span class="h_result dn">Search Result:</span>
		</div>
      <div className="mini-cart-content">
        {!status? (products?.length > 0 ? (
          products?.map((item, index) => (
            <div className="d-flex" style={{ gap: "10px",margin : "25px 0 25px 0",cursor:"pointer" }} onClick={(it) => navigate(`/product-detail/${item?._id}`)}>
              <div className="d-flex">
                <img
                  style={{ width: "70px", height: "70px" }}
                  src={item?.src?.[0]}
                />
              </div>
              <div className="d-flex flex-column">
              <div className="seacrh-product-name" style={{fontWeight : "700"}}>{item?.name}</div>
              <div className='d-flex' >
              <div
                  style={{
                    textDecoration: "line-through",
                    fontSize : "14px",
                    color: "#aaa",
                  }}
                  className="buyNow-product-name"
                >
                  ₹ {parseFloat(item?.price || 0)}
                </div>
                <div className="buyNow-product-name"                   style={{
                    fontSize : "14px",
                  }}>
                  ₹{" "}
                  {parseFloat(item?.price || 0) -
                    parseFloat(item?.discount || 0)}
                </div>
                </div>
              </div>
            </div>
          ))
        ): <p>No Result Found</p>): (
          <p>loading...</p>
        )}
      </div>
      {/* <div className="mini-cart-footer">
        <button className="checkout-btn" onClick={handleAddToCart} >Proceed to Checkout</button>
      </div> */}
    </div>
  )
}

export default SearchProduct