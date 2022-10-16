import React from 'react';
import { Footer } from '../components/Footer';

interface AboutProps {}

const AboutPage = (props: AboutProps) => {
    return (
        <>
            <div className='flex justify-center items-center'>
                <span className='font-bold text-4xl'>About Page</span>
            </div>
            <Footer />
        </>
    );
};

export default AboutPage;
