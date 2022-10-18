import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';

type LayoutProps = {
    children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
    const path = useRouter().pathname.split('/');

    const isFooter = useMemo(
        () => !path.includes('products') && !path.includes('products-csr'),
        [path]
    );

    return (
        <div className='grid grid-rows-[auto_1fr_65px] min-h-screen'>
            <Header />
            <Main>{children}</Main>
            {isFooter && <Footer />}
        </div>
    );
};
