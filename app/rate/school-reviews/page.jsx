import Footer from '@/components/Footer';
import Header from '@/components/School/Header';
import FeedbackRatings from '@/components/School/Rating';
import SchoolInformationForm from '@/components/School/SchoolInfoForm';
import React from 'react'

const SchoolReviewPage = () => {
    return (
        <>
            <Header/>
            <SchoolInformationForm/>
            <FeedbackRatings/>
            <Footer/>
        </>
    )
}

export default SchoolReviewPage;
