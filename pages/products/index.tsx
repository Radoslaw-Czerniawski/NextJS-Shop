import { InferGetStaticPropsType } from 'next';
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
    const offsetNumber = useMemo(() => pageNumber * 25 - 25, [pageNumber]);

    return (
        <>
            <ul className='flex flex-col items-center gap-2'>
                {data.map(({ id, title, image, description, rating }) => (
                    <li
                        key={id}
                        className='flex flex-col w-full flex-grow shadow-xl border-2 max-w-2xl pb-5'
                    >
                        <ProductListItem
                            data={{
                                id,
                                title,
                                thumbnailAlt: title,
                                thumbnailUrl: image,
                            }}
                        ></ProductListItem>
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
