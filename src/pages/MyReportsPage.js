import React, { useEffect } from 'react'
import Navbar from '../features/nav/Navbar'
import UserProfile from '../features/user-profile/UserProfile'
import UserReports from '../features/user-profile/UserReports'
import Cart from '../features/user-profile/Cart'
import Footer from '../features/footer/Footer'

export default function MyReportsPages(props) {

  useEffect(() => {
    if (props?.setTitle) props?.setTitle(window.location.pathname)
  }, [])


  let storedUserData = localStorage?.getItem("User343");
  let User = JSON.parse(storedUserData)?.logedInUser?.user;
  return (
    <>
      {
        User ? <Navbar><UserReports />
        </Navbar> : <Cart />

      }

    </>

  )
}
