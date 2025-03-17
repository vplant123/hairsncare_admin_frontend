import React, { useEffect } from 'react'
import Navbar from '../features/nav/Navbar'
import OurExpertise from '../features/our-expertise/OurExpertise'
import { useSelector } from 'react-redux'

export default function OurExpertisePage(props) {
  
  useEffect(() => {
    if(props?.setTitle) props?.setTitle(window.location.pathname)
  },[])

  const content = useSelector((state) => state.content.expertise);

  return (
    <Navbar>
        {content ? <OurExpertise/> : <></>}
    </Navbar>
  )
}
