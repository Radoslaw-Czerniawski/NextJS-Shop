import Image from 'next/image';
import React from 'react';
import { DataType } from '../pages';

interface ProductProps {
    data: DataType;
}

export const Product = React.memo<ProductProps>(
    ({ data: { description, rating, thumbnailAlt, thumbnailUrl } }) => (
        <>
            <div className='w-full h-auto justify-center'>
                <Image
                    width={536}
                    height={354}
                    className='w-full'
                    src={thumbnailUrl}
                    alt={thumbnailAlt}
                />
            </div>
            <div className='flex flex-col gap-5'>
                <p>{description}</p>
                <div className='text-cyan-700 font-extrabold'>{rating}</div>
            </div>
        </>
    )
);
Product.displayName = 'Product';
