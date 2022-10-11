import { InferGetStaticPropsType } from 'next';
import React from 'react';
import { ProductListItem } from '../components/Product';

const ProductsPage = ({
    data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <ul className='flex flex-col items-center gap-2'>
            {data.map(({ id, title, image, description, rating }) => (
                <li
                    key={id}
                    className='flex flex-col w-full flex-grow shadow-xl border-2 max-w-2xl h-96 pb-5'
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
    );
};

export default ProductsPage;

export const getStaticProps = async () => {
    const req = await fetch('https://fakestoreapi.com/products/');
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
