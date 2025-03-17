import React, { useEffect } from 'react'
import Navbar from '../features/nav/Navbar'
import HairTest from '../features/hair-test/HairTest'
import ShoppingFeature from '../features/shopping-feature/ShoppingFeature'
import Footer from '../features/footer/Footer'

export default function HairTestPage(props) {


  useEffect(() => {
    if(props?.setTitle) props?.setTitle(window.location.pathname)
  },[])


  return (
   <Navbar>
    <HairTest/>
    <ShoppingFeature/>
    <Footer/>
   </Navbar>
  )
}
