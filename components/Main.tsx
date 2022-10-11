import React from 'react';

interface MainProps {
    children: React.ReactNode;
}

export const Main = ({ children }: MainProps) => (
    <main className='flex flex-col gap-10 flex-grow max-w-2xl mx-auto p-6 sm:grid sm:grid-cols-2 sm:gap-6'>
        {children}
    </main>
);
