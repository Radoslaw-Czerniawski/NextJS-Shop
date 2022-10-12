import React from 'react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { ProductDetails } from '../../../components/Product';
import { StoreApiResponse } from '../[page]';
import Link from 'next/link';

const ProductIdPage = ({
    data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    if (!data) {
        return <span>Something went wrong...</span>;
    }

    return (
        <ProductDetails
            data={{
                id: data.id,
                description: data.description,
                rating: data.rating.rate,
                thumbnailAlt: data.title,
                thumbnailUrl: data.image,
                title: data.title,
            }}
        />
    );
};

export default ProductIdPage;

export const getStaticPaths = async () => {
    const req = await fetch(
        'https://naszsklep-api.vercel.app/api/products?take=250'
    );
    const data: StoreApiResponse[] = await req.json();

    const paths = data.map(({ id }) => ({
        params: {
            productId: `${id}`,
        },
    }));

    return {
        paths,
        fallback: 'blocking',
    };
};

export const getStaticProps = async ({
    params,
}: GetStaticPropsContext<{ productId: string }>) => {
    if (!params?.productId) {
        return {
            props: {},
            NOTFOUND: true,
        };
    }

    const req = await fetch(
        `https://naszsklep-api.vercel.app/api/products/${params.productId}`
    );
    const data: StoreApiResponse = await req.json();

    return {
        props: {
            data,
        },
    };
};

export type InferGetStaticPaths<T> = T extends () => Promise<{
    paths: Array<{ params: infer R }>;
}>
    ? { params?: R }
    : never;
