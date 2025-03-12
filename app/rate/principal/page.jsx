import Footer from '@/components/common/Footer';
import Header from '@/components/Principle/Header';
import PrincipalInformation from '@/components/Principle/PrincipalInfo';
import FeedbackRatings from '@/components/Principle/Rating';
import React from 'react'

const PrincipalPage = () => {
    return (
        <>
            <Header/>
            <PrincipalInformation/>
            <FeedbackRatings/>
            <Footer/>
        </>
    )
}

export default PrincipalPage;
