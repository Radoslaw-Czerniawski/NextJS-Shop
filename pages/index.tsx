import React from 'react';
import { Main } from '../components/Main';
import { Product } from '../components/Product';

const DATA = {
    description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quiesse dolorum iste veritatis porro ratione aliquid vel mollitia voluptatum deleniti laborum obcaecati numquam sit, culpa ipsam officia saepe quis.',
    thumbnailUrl: 'https://picsum.photos/id/1060/536/354',
    thumbnailAlt: 'random photo',
    rating: 4.5,
};

export type DataType = typeof DATA;

const Home = () => {
    return (
        <Main>
            <Product data={DATA} />
        </Main>
    );
};

export default Home;
