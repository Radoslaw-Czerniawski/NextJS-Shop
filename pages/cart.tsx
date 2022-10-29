import React from 'react';
import { ProductListItem } from '../components/Product';
import { useCartApi, useCartItems } from '../context/CartContext';

type Props = {};

const Cart = (props: Props) => {
    const cartState = useCartItems();
    const { removeItem } = useCartApi();
    console.log(cartState);

    return (
        <ul className='flex flex-col items-center gap-2 pt-4'>
            {cartState.items.map(
                ({ id, title, thumbnailAlt, thumbnailUrl, amount }) => (
                    <li key={id} className='flex items-center gap-4'>
                        <div className=' bg-white flex flex-col w-full flex-grow drop-shadow border-1 max-w-lg mb-2 h-54'>
                            <ProductListItem
                                data={{
                                    id,
                                    thumbnailAlt,
                                    thumbnailUrl,
                                    title,
                                }}
                            />
                        </div>
                        <span className='whitespace-nowrap'>
                            amount: {amount ?? '1'}
                        </span>
                        <button
                            className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
                            onClick={() => removeItem(id)}
                        >
                            remove
                        </button>
                    </li>
                )
            )}
        </ul>
    );
};

export default Cart;
