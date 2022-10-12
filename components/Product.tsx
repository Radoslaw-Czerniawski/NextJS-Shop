import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { useRouter } from 'next/router';

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
        <Link href={`/products/item/${id}`}>
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
    data: { title, thumbnailUrl, thumbnailAlt, description, rating },
}: ProductDetailsProps) => {
    const id = useRouter().query.productId as string | undefined;
    const productId = useMemo(
        () => (id !== undefined && !isNaN(parseInt(id)) ? parseInt(id) : null),
        [id]
    );

    if (productId === null) {
        return <span>Something went wrong...</span>;
    }

    return (
        <>
            <div className='flex flex-col items-center h-full max-w-2xl mx-auto'>
                <h2 className='p-4 text-3xl mt-6 font-bold text-center'>
                    {title}
                </h2>
                <div className='relative mt-8 flex-grow w-full h-[600px]'>
                    <Image
                        layout='fill'
                        objectFit='contain'
                        src={thumbnailUrl}
                        alt={thumbnailAlt}
                    />
                </div>
                <p className='flex items-center p-4 text-center flex-grow'>
                    {description}
                </p>
                <span className='text-cyan-700 text-3xl flex-grow font-extrabold'>
                    {rating}
                </span>
            </div>
            <div className='flex justify-center border items-center text-2xl '>
                <Link href={`../${Math.ceil(productId / 25)}`}>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                        Go Back
                    </button>
                </Link>
            </div>
        </>
    );
};
