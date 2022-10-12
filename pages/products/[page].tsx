import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { Pagination } from '../../components/Pagination';
import { ProductListItem } from '../../components/Product';

const ProductsPage = ({
    data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const page = useRouter().query.page as string | undefined;
    const pageNumber = useMemo(
        () =>
            page !== undefined && !isNaN(parseInt(page)) ? parseInt(page) : 1,
        [page]
    );

    return (
        <>
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
            <Pagination href='/products/' pageNumber={pageNumber} />
        </>
    );
};

export default ProductsPage;

export const getStaticPaths = async () => {
    const pages = Array.from({ length: 10 }, (_, i) => ({
        page: i + 1,
    }));

    return {
        paths: pages.map(({ page }) => ({
            params: {
                page: `${page}`,
            },
        })),
        fallback: false,
    };
};

export const getStaticProps = async ({
    params,
}: GetStaticPropsContext<{ page: string | undefined }>) => {
    const offset =
        params?.page !== undefined && !isNaN(parseInt(params.page))
            ? parseInt(params.page) * 25 - 25
            : 25;

    const req = await fetch(
        `https://naszsklep-api.vercel.app/api/products?take=25&offset=${offset}`
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
