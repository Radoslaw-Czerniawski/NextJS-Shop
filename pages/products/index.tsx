import { InferGetStaticPropsType } from 'next';
import React from 'react';
import { Pagination } from '../../components/Pagination';
import { ProductListItem } from '../../components/Product';

const ProductsPage = ({
    data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            <ul className='flex flex-col items-center gap-2 pt-4'>
                {data.map(({ id, title, image, description, rating }) => (
                    <li
                        key={id}
                        className=' bg-white flex flex-col w-full flex-grow drop-shadow border-1 max-w-2xl mb-2'
                    >
                        <ProductListItem
                            data={{
                                id,
                                title,
                                thumbnailAlt: title,
                                thumbnailUrl: image,
                            }}
                        />
                    </li>
                ))}
            </ul>
            <Pagination href='/products/' resultsAmount={4000} />
        </>
    );
};

export default ProductsPage;

export const getStaticProps = async () => {
    const req = await fetch(
        `https://naszsklep-api.vercel.app/api/products?take=25`
    );
    const data: StoreApiResponse[] = await req.json();

    return {
        props: {
            data,
        },
    };
};

export interface StoreApiResponse {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}
