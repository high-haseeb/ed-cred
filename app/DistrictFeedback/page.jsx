
import DistrictInformation from '@/Components/District/DistrictInfo'
import Header from '@/Components/District/Header'
import FeedbackRatings from '@/Components/District/Rating'
import Footer from '@/Components/Footer'
import React from 'react'

const page = () => {
  return (
    <>
    <Header/>
    <DistrictInformation/>
    <FeedbackRatings/>
    <Footer/>
    </>
  )
}

export default page