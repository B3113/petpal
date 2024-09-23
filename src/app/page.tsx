import React from 'react'
import Navbar from './_components/navbar'
import Home from './_components/home'
import Adoption from './_components/adoption'
import Aboutus from './_components/aboutus'
import Contact from './_components/contact'

export default function page() {
  return (
    <div>
      <Navbar/>
      <Home/>
      <Adoption/>
      <Aboutus/>
      <Contact/>
      </div>
  )
}

