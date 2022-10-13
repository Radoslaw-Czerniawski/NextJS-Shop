import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

const paths = [
    {
        text: 'About',
        name: 'about',
        path: '/about/',
    },
    {
        text: 'Products',
        name: 'products',
        path: '/products/',
    },
    {
        text: 'Products-CSR',
        name: 'products-csr',
        path: '/products-csr/?page=1',
    },
];

export const Header = () => {
    const router = useRouter();
    const routerPath = useMemo(
        () => router.asPath.split('/').filter((el) => el !== ''),
        [router.pathname]
    );

    return (
        <header className='flex bg-gray-500 justify-center w-full'>
            <nav className='flex  gap-4 text-xl sm:text-4xl'>
                <Link key={'main'} href='/'>
                    <a className={router.asPath === '/' ? 'font-bold' : ''}>
                        Main
                    </a>
                </Link>
                {paths.map(({ text, path, name }) => (
                    <Link key={text} href={path}>
                        <a
                            className={
                                routerPath.includes(name) ? 'font-bold' : ''
                            }
                        >
                            {text}
                        </a>
                    </Link>
                ))}
            </nav>
        </header>
    );
};
