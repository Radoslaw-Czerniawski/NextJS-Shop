import React from 'react';

interface MainProps {
    children: React.ReactNode;
}

export const Main = ({ children }: MainProps) => (
    <>
        <main className='flex flex-col justify-center gap-10 flex-grow max-w-2xl mx-auto p-6'>
            {children}
        </main>
    </>
);
