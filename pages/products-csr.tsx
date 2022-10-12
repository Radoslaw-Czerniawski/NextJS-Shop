import React, { useMemo } from 'react';
import { ProductListItem } from '../components/Product';
import { useQuery } from 'react-query';
import { StoreApiResponse } from './products/[page]';
import { Pagination } from '../components/Pagination';
import { useRouter } from 'next/router';

const queryFetch = async (
    offsetNumber: number
): Promise<StoreApiResponse[]> => {
    const req = await fetch(
        `https://naszsklep-api.vercel.app/api/products?take=25&offset=${offsetNumber}`
    );
    const res = req.json();

    return res;
};

const ProductsCRSPage = () => {
    const page = useRouter().query.page as string | undefined;
    const pageNumber = useMemo(
        () =>
            page !== undefined && !isNaN(parseInt(page)) ? parseInt(page) : 1,
        [page]
    );
    const offsetNumber = useMemo(() => pageNumber * 25 - 25, [pageNumber]);

    const { data } = useQuery(['products-csr', offsetNumber], () =>
        queryFetch(offsetNumber)
    );

    return (
        <>
            <ul className='flex flex-col items-center gap-2'>
                {data?.map(({ id, title, image }) => (
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
            <Pagination resultsAmount={4000} href={'/products-csr?page='} />
        </>
    );
};

export default ProductsCRSPage;
