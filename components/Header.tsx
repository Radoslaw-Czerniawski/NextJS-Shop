import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

const paths = [
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

const passiveClassName =
    'hover:bg-transparent border-0 hover:text-primary-700 p-0 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:hover:bg-transparent dark:border-gray-700';

const activeClassName = passiveClassName + ' font-bold';

export const Header = () => {
    const router = useRouter();
    const routerPath = useMemo(
        () => router.asPath.split('/').filter((el) => el !== ''),
        [router.asPath]
    );

    return (
        <header className='flex justify-center w-full shadow-sm'>
            <nav className='flex justify-center border-b bg-white border-gray-200  py-2.5 w-full dark:bg-gray-800'>
                <ul className='flex gap-2 flex-row sm:text-2xl sm:gap-8'>
                    <Link key={'main'} href='/'>
                        <a
                            className={
                                router.asPath === '/'
                                    ? activeClassName
                                    : passiveClassName
                            }
                        >
                            Home
                        </a>
                    </Link>
                    {paths.map(({ text, path, name }) => (
                        <Link key={text} href={path}>
                            <a
                                className={
                                    routerPath.includes(name)
                                        ? activeClassName
                                        : passiveClassName
                                }
                            >
                                {text}
                            </a>
                        </Link>
                    ))}
                </ul>
            </nav>

            {/* <nav className='flex  gap-4 text-xl sm:text-4xl'>
                <Link key={'main'} href='/'>
                    <a className={router.asPath === '/' ? 'font-bold' : ''}>
                        Home
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
            </nav> */}
        </header>
    );
};
