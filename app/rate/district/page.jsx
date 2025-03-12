import RateHeader from '@/components/common/RateHeader';
import DistrictInformation from '@/components/District/DistrictInfo';
import FeedbackRatings from '@/components/District/Rating';
import Footer from '@/components/common/Footer';
import Navbar from '@/components/Landing/Navbar';
import React from 'react';

const DirectorPage = () => {
    return (
        <div className='w-full overflow-x-hidden'>
            <Navbar />
            <RateHeader 
                title='Most Recent Reviews'
                description='Please Rate Each Item on a Scale of 1 - 10. Top Rating = 10 Your review will be posted anonymously unless you expressly tell us otherwise'
            />
            <DistrictInformation/>
            <FeedbackRatings/>
            <Footer/>
        </div>
    )
}

export default DirectorPage;
