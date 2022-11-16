import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { NextSeo } from 'next-seo';
import { getBasePath } from '../utils/config';
import { CustomReactMarkdown } from './CustomReactMarkdown';
import { AddToCartButton } from './AddToCartButton';
import Router from 'next/router';

interface ProductListItemProps {
    data: ProductListItem;
    isButton?: boolean;
}

export const ProductListItem = ({
    data: { id, title, thumbnailUrl, thumbnailAlt },
    isButton,
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
        <div className='flex justify-start'>
            {isButton && (
                <AddToCartButton
                    item={{
                        id,
                        title,
                        thumbnailAlt,
                        thumbnailUrl,
                    }}
                    classes='mb-2 origin-bottom-left rounded-none rounded-tr-lg mb-0'
                />
            )}
        </div>
    </>
);

interface ProductDetailsProps {
    data: ProductDetails;
}

export const ProductDetails = ({
    data: {
        id,
        title,
        thumbnailUrl,
        thumbnailAlt,
        description,
        longDescription,
        rating,
    },
}: ProductDetailsProps) => {
    return (
        <>
            <NextSeo
                title={title}
                description={description}
                canonical={`${getBasePath()}/products/item/${id}/`}
                openGraph={{
                    url: `https://naszsklep-api.vercel.app/api/products/${id}`,
                    title,
                    description,
                    images: [
                        {
                            url: thumbnailUrl,
                            alt: thumbnailUrl,
                            type: 'image/jpeg',
                        },
                    ],
                    siteName: 'Next Shop',
                }}
            />
            <div className='flex text-center flex-col items-center h-full max-w-2xl mx-auto'>
                <h1 className='text-3xl mt-10 font-bold text-center'>
                    {title}
                </h1>
                <div className='relative bg-white mt-10 h-auto w-full'>
                    <Image
                        layout='responsive'
                        objectFit='contain'
                        width={16}
                        height={9}
                        src={thumbnailUrl}
                        alt={thumbnailAlt}
                    />
                </div>
                <article className='flex flex-col bg-slate-100 text-s text-left p-3 rounded-lg my-6 prose lg:prose-lg'>
                    <CustomReactMarkdown>{longDescription}</CustomReactMarkdown>
                </article>
                <span className='text-cyan-700 pb-2 text-3xl flex-grow font-extrabold'>
                    {rating}
                </span>
            </div>
            <div className='fixed gap-10 bg-white bottom-0 h-[65px] w-full mx-auto select-none flex justify-center border items-center text-2xl'>
                <AddToCartButton
                    item={{ id, title, thumbnailAlt, thumbnailUrl }}
                />
                <button
                    onClick={() => Router.back()}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >
                    Go Back
                </button>
            </div>
        </>
    );
};
