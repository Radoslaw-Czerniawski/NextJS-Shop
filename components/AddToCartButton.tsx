import React, { useCallback } from 'react';
import { useCartApi } from '../context/CartContext';

type Props = {
    item: ProductListItem;
    classes?: string;
};

export const AddToCartButton = ({ item, classes }: Props) => {
    const { addItem } = useCartApi();
    const handleClick = useCallback(() => {
        addItem(item);
    }, [item]);

    return (
        <button
            onClick={handleClick}
            className={`transition-all transform active:scale-95 duration-75 bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-2xl ${
                classes ?? ''
            }`}
        >
            Add to Cart
        </button>
    );
};
