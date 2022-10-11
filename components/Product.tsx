import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ProductDetails {
    id: number;
    title: string;
    description: string;
    thumbnailUrl: string;
    thumbnailAlt: string;
    rating: number;
}

type ProductListItem = Pick<
    ProductDetails,
    'id' | 'title' | 'thumbnailAlt' | 'thumbnailUrl'
>;

interface ProductListItemProps {
    data: ProductListItem;
}

export const ProductListItem = ({
    data: { id, title, thumbnailUrl, thumbnailAlt },
}: ProductListItemProps) => (
    <>
        <h2 className='p-4 text-2xl font-bold text-center'>{title}</h2>
        <Link href={`/products/${id}`}>
            <a className='w-full h-full'>
                <div className='relative w-full h-full'>
                    <Image
                        layout='fill'
                        objectFit='contain'
                        src={thumbnailUrl}
                        alt={thumbnailAlt}
                    />
                </div>
            </a>
        </Link>
    </>
);

interface ProductDetailsProps {
    data: ProductDetails;
}

export const ProductDetails = ({
    data: { id, title, thumbnailUrl, thumbnailAlt, description, rating },
}: ProductDetailsProps) => (
    <div className='flex flex-col items-center h-full max-w-2xl mx-auto'>
        <h2 className='p-4 text-2xl font-bold text-center'>{title}</h2>
        <div className='relative flex-grow w-full h-[600px]'>
            <Image
                layout='fill'
                objectFit='contain'
                src={thumbnailUrl}
                alt={thumbnailAlt}
            />
        </div>
        <p className='flex items-center p-4 flex-grow'>{description}</p>
        <span className='text-cyan-700 text-3xl flex-grow font-extrabold'>
            {rating}
        </span>
    </div>
);
