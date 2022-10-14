import React from 'react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { ProductDetails } from '../../../components/Product';
import { InferGetStaticPathsType, StoreApiResponse } from '../[page]';
import { fetchData } from '../../../utilities/fetchData';

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
    const data = await fetchData<StoreApiResponse[]>(
        'https://naszsklep-api.vercel.app/api/products?take=250'
    );

    if (data instanceof Error) throw data;

    return {
        paths: data.map(({ id }) => ({
            params: {
                productId: `${id}`,
            },
        })),
        fallback: 'blocking',
    };
};

export const getStaticProps = async ({
    params,
}: GetStaticPropsContext<InferGetStaticPathsType<typeof getStaticPaths>>) => {
    if (!params?.productId) {
        return {
            props: {},
            NOTFOUND: true,
        };
    }

    const data = await fetchData<StoreApiResponse>(
        `https://naszsklep-api.vercel.app/api/products/${params?.productId}`
    );

    if (data instanceof Error) throw data;

    return {
        props: {
            data,
        },
        revalidate: 86400,
    };
};
