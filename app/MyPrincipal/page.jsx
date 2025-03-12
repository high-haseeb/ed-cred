import Footer from '@/Components/Footer'
import Header from '@/Components/Principle/Header'
import PrincipalInformation from '@/Components/Principle/PrincipalInfo'
import FeedbackRatings from '@/Components/Principle/Rating'

import React from 'react'

const page = () => {
  return (
    <>
    <Header/>
    <PrincipalInformation/>
    <FeedbackRatings/>
    <Footer/>
    </>
  )
}

export default page