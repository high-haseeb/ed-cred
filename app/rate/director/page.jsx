import DirectorInformation from '@/components/DirectorReport/DirectorInfo';
import FeedbackRatings from '@/components/DirectorReport/Rating';
import Navbar from '@/components/Landing/Navbar';
import Footer from '@/components/common/Footer';
import RateHeader from '@/components/common/RateHeader';
import React from 'react';

const DirectorPage = () => {
  return (
        <div className='w-full overflow-x-hidden'>
            <Navbar />
            <RateHeader 
                title='Director Report Card'
                description='Your Director Report will be posted anonymously unless you expressly tell us otherwise'
            />
            <DirectorInformation/>
            <FeedbackRatings/>
            <Footer/>
        </div>
  )
}

export default DirectorPage;
