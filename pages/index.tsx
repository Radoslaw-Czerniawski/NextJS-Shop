import Image from 'next/image';
import React from 'react';

interface DataProps {
    data: typeof DATA;
}

const DATA = {
    description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quiesse dolorum iste veritatis porro ratione aliquid vel mollitia voluptatum deleniti laborum obcaecati numquam sit, culpa ipsam officia saepe quis.',
    thumbnailUrl: 'https://picsum.photos/id/1060/536/354',
    thumbnailAlt: 'random photo',
    rating: 4.5,
};

const Product = React.memo<DataProps>(
    ({ data: { description, rating, thumbnailAlt, thumbnailUrl } }) => (
        <>
            <div className='w-full h-auto justify-center'>
                <Image
                    width={536}
                    height={354}
                    className='w-full'
                    src={thumbnailUrl}
                    alt={thumbnailAlt}
                />
            </div>
            <div className='flex flex-col gap-5'>
                <p>{description}</p>
                <div className='text-cyan-700 font-extrabold'>{rating}</div>
            </div>
        </>
    )
);
Product.displayName = 'Product';

const Home = () => {
    return (
        <main className='flex flex-col gap-10 flex-grow max-w-2xl mx-auto p-6 sm:grid sm:grid-cols-2 sm:gap-6'>
            <Product data={DATA} />
        </main>
    );
};

export default Home;
