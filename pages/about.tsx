import React from 'react';

interface AboutProps {}

const AboutPage = (props: AboutProps) => {
    return (
        <>
            <div className='flex justify-center items-center h-full'>
                <span className='font-bold text-4xl'>About Page</span>
            </div>
        </>
    );
};

export default AboutPage;
