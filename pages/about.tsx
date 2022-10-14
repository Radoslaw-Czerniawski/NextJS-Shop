import React from 'react';
import { Footer } from '../components/Footer';
import { Main } from '../components/Main';

interface AboutProps {}

const AboutPage = (props: AboutProps) => {
    return (
        <>
            <Main>
                <span className='font-bold text-2xl'>About Page</span>
            </Main>
            <Footer />
        </>
    );
};

export default AboutPage;
