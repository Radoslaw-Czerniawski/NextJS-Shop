import React from 'react';
import { Footer } from '../components/Footer';
import { Main } from '../components/Main';

const Home = () => {
    return (
        <>
            <Main>
                <span className='font-bold text-2xl'>Main Page</span>
            </Main>
            <Footer />
        </>
    );
};

export default Home;
