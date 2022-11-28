import React from 'react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { ProductDetails } from '../../../components/Product';
import { InferGetStaticPathsType } from '../[page]';
import { serialize } from 'next-mdx-remote/serialize';
import { apolloClient } from '../../../graphql/apolloClient';
import {
    GetProductDetailsBySlugDocument,
    GetProductDetailsBySlugQuery,
    GetProductDetailsBySlugQueryVariables,
    GetProductsSlugsDocument,
    GetProductsSlugsQuery,
} from '../../../generated/graphql';

const ProductIdPage = ({
    data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    if (!data) {
        return <span>Something went wrong...</span>;
    }

    console.log(data);

    return (
        <ProductDetails
            data={{
                slug: data.slug,
                description: data.description,
                rating: data.price,
                thumbnailAlt: data.name,
                thumbnailUrl: data.images[0].url,
                name: data.name,
                longDescription: data.longDescription,
            }}
        />
    );
};

export default ProductIdPage;

export const getStaticPaths = async () => {
    const { data, error } = await apolloClient.query<GetProductsSlugsQuery>({
        query: GetProductsSlugsDocument,
    });

    if (error || !data) throw new Error("Couldn't get product slugs!");

    return {
        paths: data.products.map(({ slug }) => ({
            params: {
                productId: slug,
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

    const { data, error } = await apolloClient.query<
        GetProductDetailsBySlugQuery,
        GetProductDetailsBySlugQueryVariables
    >({
        variables: {
            slug: params.productId,
        },
        query: GetProductDetailsBySlugDocument,
    });

    if (!data.product || error) return { props: {}, notFound: true };

    return {
        props: {
            data: {
                ...data.product,
                longDescription: await serialize(data.product.description),
            },
        },
        revalidate: 86400,
    };
};
