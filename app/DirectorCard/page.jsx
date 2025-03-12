import DirectorInformation from '@/Components/DirectorReport/DirectorInfo'
import Header from '@/Components/DirectorReport/Header'
import FeedbackRatings from '@/Components/DirectorReport/Rating'
import Footer from '@/Components/Footer'
import React from 'react'

const page = () => {
  return (
    <>
    <Header/>
    <DirectorInformation/>
    <FeedbackRatings/>
    <Footer/>
    </>
  )
}

export default page