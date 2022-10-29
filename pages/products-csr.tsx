import React, { useMemo } from 'react';
import { ProductListItem } from '../components/Product';
import { useQuery } from 'react-query';
import { Pagination } from '../components/Pagination';
import { useRouter } from 'next/router';
import { fetchData } from '../utils/fetchData';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { StoreApiResponse } from '../Types/StoreApi';

const ProductsCRSPage = () => {
    const session = useSession();

    if (session.status === 'unauthenticated') {
        Router.replace('/auth/login');
    }

    const page = useRouter().query.page as string | undefined;
    const pageNumber = useMemo(
        () =>
            page !== undefined && !isNaN(parseInt(page)) ? parseInt(page) : 1,
        [page]
    );
    const offsetNumber = useMemo(() => pageNumber * 25 - 25, [pageNumber]);

    const { data, isError } = useQuery<StoreApiResponse[] | Error>(
        ['products-csr', offsetNumber],
        () =>
            fetchData<StoreApiResponse[]>(
                `https://naszsklep-api.vercel.app/api/products?take=25&offset=${offsetNumber}`
            )
    );

    if (data instanceof Error || isError) {
        return <span>Something went wrong...</span>;
    }

    return (
        <>
            <ul className='flex flex-col items-center gap-2 pt-4'>
                {data?.map(({ id, title, image }) => (
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
            <Pagination resultsAmount={4000} href={'/products-csr?page='} />
        </>
    );
};

export default ProductsCRSPage;
