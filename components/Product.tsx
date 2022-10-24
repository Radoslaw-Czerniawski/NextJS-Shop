import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { useRouter } from 'next/router';

interface ProductListItemProps {
    data: ProductListItem;
}

export const ProductListItem = ({
    data: { id, title, thumbnailUrl, thumbnailAlt },
}: ProductListItemProps) => (
    <>
        <h2 className='bg-slate-200 rounded-b-lg p-4 text-2xl font-bold shadow z-10 text-center'>
            {title}
        </h2>
        <Link href={`/products/item/${id}`}>
            <a className='bg-wh pb-4 pt-4'>
                <Image
                    layout='responsive'
                    width={21}
                    height={9}
                    objectFit='contain'
                    src={thumbnailUrl}
                    alt={thumbnailAlt}
                />
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
                <h2 className='text-3xl mt-10 font-bold text-center'>
                    {title}
                </h2>
                <div className='relative bg-white mt-10 h-auto w-full'>
                    <Image
                        layout='responsive'
                        objectFit='contain'
                        width={1}
                        height={1}
                        src={thumbnailUrl}
                        alt={thumbnailAlt}
                    />
                </div>
                <p className='p-6 flex items-center flex-grow text-xl text-center '>
                    {description}
                </p>
                <span className='text-cyan-700 text-3xl flex-grow font-extrabold'>
                    {rating}
                </span>
            </div>
            <div className='fixed bottom-0 h-[65px] w-full mx-auto select-none flex justify-center border items-center text-2xl'>
                <Link href={`../${Math.ceil(productId / 25)}`}>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                        Go Back
                    </button>
                </Link>
            </div>
        </>
    );
};
