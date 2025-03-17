import React, { useEffect } from 'react'
import Navbar from '../features/nav/Navbar'
import OurSpecialist from '../features/our-specialist/OurSpecialist'
import Footer from '../features/footer/Footer'
import { useSelector } from 'react-redux'

function OurSpecialistsPage(props) {

  useEffect(() => {
    if(props?.setTitle) props?.setTitle(window.location.pathname)
  },[])

  const content = useSelector((state) => state.content.specialist);


  return (
    <div>
        <Navbar>
          {content ? <><OurSpecialist/>
            <Footer/></> : <></>}
        </Navbar>
    </div>
  )
}

export default OurSpecialistsPage