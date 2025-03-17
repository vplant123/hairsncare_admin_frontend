import React, { useEffect } from 'react'
import Navbar from '../features/nav/Navbar'
import BookAppointment from '../features/book-appointment/BookAppointment'
import ShoppingFeature from '../features/shopping-feature/ShoppingFeature'
import Footer from '../features/footer/Footer'

function BookAppointmentPage(props) {
  useEffect(() => {
    if(props?.setTitle) props?.setTitle(window.location.pathname)
  },[])
  return (
    <Navbar>
        <BookAppointment/>
        <ShoppingFeature/>
        <Footer/>
    </Navbar>
  )
}

export default BookAppointmentPage