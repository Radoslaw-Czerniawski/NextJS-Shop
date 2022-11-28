import { useSession } from 'next-auth/react';
import Router from 'next/router';
import React from 'react';
import { ProductListItem } from '../components/Product';
import { useCartApi, useCartItems } from '../context/CartContext';

type Props = {};

const Cart = (props: Props) => {
    const session = useSession();

    if (session.status === 'unauthenticated') {
        Router.replace('/auth/login');
    }

    const cartState = useCartItems();
    const { removeItem } = useCartApi();
    console.log(cartState);

    if (cartState.amountTotal === 0) {
        return (
            <div className='w-full h-full flex justify-center items-center '>
                <span className='text-4xl line-1  anim-typewriter shrink-1 max-w-[340px]'>
                    Your cart is empty... 🤔
                </span>
            </div>
        );
    }

    return (
        <ul className='flex flex-col items-center gap-4 pt-4'>
            {cartState.items.map(
                ({ slug, name, thumbnailAlt, thumbnailUrl, amount }) => (
                    <li
                        key={slug}
                        className='flex items-center justify-center gap-4 w-full border-b last:border-b-0'
                    >
                        <div className=' bg-white flex flex-col flex-grow drop-shadow border-1 max-w-lg mb-4 h-54'>
                            <ProductListItem
                                data={{
                                    slug,
                                    thumbnailAlt,
                                    thumbnailUrl,
                                    name,
                                }}
                            />
                        </div>
                        <span className='whitespace-nowrap'>
                            amount: {amount ?? '1'}
                        </span>
                        <button
                            className='flex gap-1 items-center bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-2 border border-gray-400 rounded shadow'
                            onClick={() => removeItem(slug)}
                        >
                            remove
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-4 h-4'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                                />
                            </svg>
                        </button>
                    </li>
                )
            )}
        </ul>
    );
};

export default Cart;
