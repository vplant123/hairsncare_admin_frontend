import React, { useEffect, useState } from 'react'
import Navbar from '../features/nav/Navbar'
import Products from '../features/products/Products'
import ShoppingFeature from '../features/shopping-feature/ShoppingFeature'
import SliderImage from '../features/video-slider/SliderImage'
import Footer from '../features/footer/Footer'
import { ToastContainer } from 'react-toastify'
import MiniCart from './MiniCart'

function ProductPage(props) {


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


  let {cart,
    setCart} = props;

    useEffect(() => {
      console.log("sfoerjore")
    },[cart])
    const [isCartOpen, setIsCartOpen] = useState(false);
    const toggleCart = () => {
      setIsCartOpen(!isCartOpen);
    };

  return (
    <div style={{position:"relative"}}> 
        <Navbar cart = {cart}  
    setCart = {setCart}>
      <MiniCart isOpen={isCartOpen} onClose={toggleCart} cart = {cart} 
    setCart = {setCart} />

            <Products cart={cart} setCart={setCart} toggleCart = {toggleCart}/>
            <ShoppingFeature/>
            <SliderImage/>
            <Footer/>
            <ToastContainer position="bottom-right"/> 
        </Navbar>

    </div>
  )
}

export default ProductPage