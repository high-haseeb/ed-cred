import Footer from '@/Components/Footer'
import Header from '@/Components/School/Header'
import FeedbackRatings from '@/Components/School/Rating'
import SchoolInformationForm from '@/Components/School/SchoolInfoForm'
import React from 'react'

const page = () => {
  return (
    <>
    <Header/>
    <SchoolInformationForm/>
    <FeedbackRatings/>
    <Footer/>
    </>
  )
}

export default page