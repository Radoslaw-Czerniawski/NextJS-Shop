import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useMemo } from 'react';
import { useRouter } from 'next/router';

const activeClass =
    'relative dark:bg-gray-800 dark:text-white z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20';

const passiveClass =
    'relative dark:bg-gray-800 dark:text-white hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex';

export const Pagination = ({
    href,
    resultsAmount,
}: {
    href: string;
    resultsAmount: number;
}) => {
    const page = useRouter().query.page as string | undefined;

    const pageNumber = useMemo(
        () =>
            page !== undefined && !isNaN(parseInt(page)) ? parseInt(page) : 1,
        [page]
    );

    const firstAndLastPage = useMemo(() => {
        const firstPage =
            pageNumber % 10
                ? Math.floor(pageNumber / 10) * 10 + 1
                : pageNumber - 9;
        const lastPage =
            Math.ceil(resultsAmount / 25) - firstPage >= 10
                ? Math.ceil(pageNumber / 10) * 10
                : Math.ceil(resultsAmount / 25);

        return [firstPage, lastPage];
    }, [pageNumber, resultsAmount]);

    const pages = useMemo(() => {
        const length = firstAndLastPage[1] - firstAndLastPage[0] + 1;
        return Array.from({ length }, (_, i) => ({
            text:
                pageNumber % 10
                    ? Math.floor(pageNumber / 10) * 10 + i + 1
                    : Math.floor((pageNumber - 1) / 10) * 10 + i + 1,
            href: `${href}${
                pageNumber % 10
                    ? Math.floor(pageNumber / 10) * 10 + i + 1
                    : Math.floor((pageNumber - 1) / 10) * 10 + i + 1
            }`,
        }));
    }, [firstAndLastPage, href]);

    return (
        <div className='fixed bottom-0 w-full mx-auto select-none'>
            <div className=' max-w-4xl mx-auto border rounded-t-xl dark:bg-gray-800 dark:text-white border-gray-200 bg-white px-4 py-3 sm:px-6'>
                <div className='flex flex-1 justify-center sm:hidden'>
                    <Link href={`${href}${pageNumber - 1}`}>
                        <a
                            onClick={(e) => {
                                pageNumber <= 1 && e.preventDefault();
                            }}
                            className={`${
                                pageNumber <= 1
                                    ? 'cursor-default'
                                    : 'cursor-pointer'
                            } relative  inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`}
                        >
                            Previous
                        </a>
                    </Link>
                    <Link href={`${href}${pageNumber + 1}`}>
                        <a
                            onClick={(e) => {
                                pageNumber >= pages.length &&
                                    e.preventDefault();
                            }}
                            className={`${
                                pageNumber >= pages.length
                                    ? 'cursor-default'
                                    : 'cursor-pointer'
                            } relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`}
                        >
                            Next
                        </a>
                    </Link>
                    <span className='absolute right-4 ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700'>
                        {pageNumber}
                    </span>
                </div>
                <div className='hidden justify-center sm:flex sm:flex-1 sm:items-center sm:justify-between'>
                    <div>
                        <p className='text-sm text-gray-700 dark:bg-gray-800 dark:text-white'>
                            Showing{' '}
                            <span className='font-medium dark:bg-gray-800 dark:text-white'>
                                {pageNumber * 25 - 24}
                            </span>{' '}
                            to{' '}
                            <span className='font-medium dark:bg-gray-800 dark:text-white'>
                                {pageNumber === Math.ceil(resultsAmount / 25)
                                    ? resultsAmount
                                    : pageNumber * 25}
                            </span>{' '}
                            of{' '}
                            <span className='font-medium dark:bg-gray-800 dark:text-white'>
                                {resultsAmount}
                            </span>{' '}
                            results
                        </p>
                    </div>
                    <div>
                        <nav
                            className='w-full dark:bg-gray-800 dark:text-white isolate inline-flex -space-x-px rounded-md shadow-sm'
                            aria-label='Pagination'
                        >
                            <Link href={`${href}${pageNumber - 1}`}>
                                <div
                                    className={`${
                                        pageNumber <= 1
                                            ? 'cursor-default'
                                            : 'cursor-pointer'
                                    } relative dark:bg-gray-800 dark:text-white inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20`}
                                    onClick={(e) => {
                                        pageNumber <= 1 && e.preventDefault();
                                    }}
                                >
                                    <span className='sr-only'>Previous</span>
                                    <ChevronLeftIcon
                                        className='h-5 w-5'
                                        aria-hidden='true'
                                    />
                                </div>
                            </Link>
                            {pages.map(({ text, href }) => (
                                <Link key={text} href={href}>
                                    <a
                                        aria-current='page'
                                        className={
                                            pageNumber === text
                                                ? activeClass
                                                : passiveClass
                                        }
                                    >
                                        {text}
                                    </a>
                                </Link>
                            ))}
                            <Link href={`${href}${pageNumber + 1}`}>
                                <div
                                    className={`${
                                        pageNumber >= resultsAmount / 25
                                            ? 'cursor-default'
                                            : 'cursor-pointer'
                                    } relative dark:bg-gray-800 dark:text-white inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20`}
                                    onClick={(e) => {
                                        pageNumber >= resultsAmount / 25 &&
                                            e.preventDefault();
                                    }}
                                >
                                    <span className='sr-only'>Next</span>
                                    <ChevronRightIcon
                                        className='h-5 w-5'
                                        aria-hidden='true'
                                    />
                                </div>
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};
