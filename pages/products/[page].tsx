import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import React from 'react';
import { Pagination } from '../../components/Pagination';
import { ProductListItem } from '../../components/Product';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { apolloClient } from '../../graphql/apolloClient';
import {
    GetProductsListDocument,
    GetProductsListQuery,
    GetProductsListQueryVariables,
} from '../../generated/graphql';

const ProductsPage = ({
    data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const session = useSession();

    if (session.status === 'unauthenticated') {
        Router.replace('/auth/login');
    }

    return (
        <>
            <ul className='flex flex-col items-center gap-2 pt-4'>
                {data?.products.map(({ slug, name, images }) => (
                    <li
                        key={slug}
                        className=' bg-white flex flex-col w-full flex-grow drop-shadow border-1 max-w-2xl mb-2'
                    >
                        <ProductListItem
                            data={{
                                slug,
                                name,
                                thumbnailAlt: name,
                                thumbnailUrl: images[0].url,
                            }}
                            isButton={true}
                        />
                    </li>
                ))}
            </ul>
            <Pagination resultsAmount={5} href='/products/' />
        </>
    );
};

export default ProductsPage;

export const getStaticPaths = async () => {
    const pages = Array.from({ length: 1 }, (_, i) => ({
        page: i + 1,
    }));

    return {
        paths: pages.map(({ page }) => ({
            params: {
                page: `${page}`,
            },
        })),
        fallback: 'blocking',
    };
};

export const getStaticProps = async ({
    params,
}: GetStaticPropsContext<InferGetStaticPathsType<typeof getStaticPaths>>) => {
    const offset =
        params?.page !== undefined && !isNaN(parseInt(params.page))
            ? parseInt(params.page) * 25 - 25
            : 25;

    const { data, error } = await apolloClient.query<
        GetProductsListQuery,
        GetProductsListQueryVariables
    >({
        variables: {
            first: 25,
            offset: offset,
        },
        query: GetProductsListDocument,
    });

    if (!data.products || error) return { props: {}, notFound: true };

    return {
        props: {
            data,
        },
        revalidate: 86400,
    };
};

export type InferGetStaticPathsType<T> = T extends () => Promise<{
    paths: Array<{ params: infer R }>;
}>
    ? R
    : never;
