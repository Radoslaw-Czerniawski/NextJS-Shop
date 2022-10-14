import React, { useMemo } from 'react';
import { ProductListItem } from '../components/Product';
import { useQuery } from 'react-query';
import { StoreApiResponse } from './products/[page]';
import { Pagination } from '../components/Pagination';
import { useRouter } from 'next/router';
import { fetchData } from '../utilities/fetchData';

const ProductsCRSPage = () => {
    const page = useRouter().query.page as string | undefined;
    const pageNumber = useMemo(
        () =>
            page !== undefined && !isNaN(parseInt(page)) ? parseInt(page) : 1,
        [page]
    );
    const offsetNumber = useMemo(() => pageNumber * 25 - 25, [pageNumber]);

    const { data } = useQuery<StoreApiResponse[] | Error>(
        ['products-csr', offsetNumber],
        () =>
            fetchData<StoreApiResponse[]>(
                `https://naszsklep-api.vercel.app/api/products?take=25&offset=${offsetNumber}`
            )
    );

    if (data instanceof Error || data === undefined) {
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
