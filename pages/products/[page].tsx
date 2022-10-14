import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import React from 'react';
import { Pagination } from '../../components/Pagination';
import { ProductListItem } from '../../components/Product';
import { fetchData } from '../../utilities/fetchData';

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
            <Pagination resultsAmount={4000} href='/products/' />
        </>
    );
};

export default ProductsPage;

export const getStaticPaths = async () => {
    const pages = Array.from({ length: 50 }, (_, i) => ({
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

    const data = await fetchData<StoreApiResponse[]>(
        `https://naszsklep-api.vercel.app/api/products?take=25&offset=${offset}`
    );

    if (data instanceof Error) throw data;

    return {
        props: {
            data,
        },
        revalidate: 200,
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

export type InferGetStaticPathsType<T> = T extends () => Promise<{
    paths: Array<{ params: infer R }>;
}>
    ? R
    : never;
