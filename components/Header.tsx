import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useCartItems } from '../context/CartContext';

const paths = [
    {
        text: 'Products',
        name: 'products',
        path: '/products/1',
    },
    {
        text: 'Products-CSR',
        name: 'products-csr',
        path: '/products-csr/?page=1',
    },
];

const passiveClassName =
    'header__link hover:bg-transparent border-0 hover:text-primary-700 p-0  dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:hover:bg-transparent dark:border-gray-700';

const activeClassName = `${passiveClassName} font-bold`;

export const Header = () => {
    const router = useRouter();
    const routerPath = useMemo(
        () => router.asPath.split('/').filter((el) => el !== ''),
        [router.asPath]
    );
    const { status } = useSession();
    const cartItemsAmount = useCartItems().amountTotal;

    return (
        <header className='flex justify-center w-full shadow-sm'>
            <nav className='flex justify-between items-center px-4 py-2.5 w-full border-b bg-white border-gray-200 dark:bg-gray-800'>
                {status === 'unauthenticated' ? (
                    <Link href='/auth/login'>
                        <a className='header__link dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white text-xs sm:text-lg'>
                            Login
                        </a>
                    </Link>
                ) : (
                    <a
                        href='#'
                        className='header__link dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white text-xs sm:text-lg'
                        onClick={() => signOut()}
                    >
                        Logout
                    </a>
                )}

                <ul className='flex gap-2 flex-row text-s sm:text-2xl sm:gap-8'>
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

                <div className='flex gap-2 items-center'>
                    <span className='text-xs sm:text-sm'>
                        {cartItemsAmount === 0 ? '' : cartItemsAmount}
                    </span>
                    <div className='transition-all duration-100 cursor-pointer hover:scale-90 w-6 h-6'>
                        <Link href='/cart' className='hover:scale-95'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};
