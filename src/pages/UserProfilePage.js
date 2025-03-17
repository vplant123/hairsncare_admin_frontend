import React, { useEffect } from 'react'
import Navbar from '../features/nav/Navbar'
import UserProfile from '../features/user-profile/UserProfile'

export default function UserProfilePage(props) {

  useEffect(() => {
    if(props?.setTitle) props?.setTitle(window.location.pathname)
  },[])


  return (
   <Navbar>
    <UserProfile/>
   </Navbar>
  )
}
