import React from 'react';

interface MainProps {
    children: React.ReactNode;
}

export const Main = ({ children }: MainProps) => {
    return (
        <>
            <main className='grid grid-rows-[auto_65px]'>{children}</main>
        </>
    );
};
