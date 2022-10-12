import React from 'react';
import { Footer } from '../components/Footer';
import { Main } from '../components/Main';

interface AboutProps {}

const AboutPage = (props: AboutProps) => {
    return (
        <>
            <Main>About Page</Main>;
            <Footer />
        </>
    );
};

export default AboutPage;
