import React from 'react';
import Header from '@/components/common/Header';
import EdCredSection from './EdCredSection';
import Footer from '@/components/common/Footer';
import TopBar from '../Dashboard/TopBar';
import Navbar from '../Landing/Navbar';

const About = () => {
    return (
        <div className='w-full h-auto p-0 m-0 overflow-x-hidden'>
            <Navbar />
            <Header
                title='About Us'
                description='Join us in shaping a more transparent, accountable, and growth-oriented educational experience for all.'
            />
            <EdCredSection/>
            <Footer/>
        </div>
    )
}

export default About;
