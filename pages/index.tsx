import Image from 'next/image';

const Home = () => {
    return (
        <main className='flex flex-col gap-10 flex-grow max-w-2xl mx-auto p-6 sm:grid sm:grid-cols-2 sm:gap-6'>
            <div className='w-full h-auto justify-center'>
                <Image
                    className='w-full'
                    src='https://picsum.photos/id/1060/536/354'
                    alt='random photo'
                />
            </div>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non qui
                esse dolorum iste veritatis porro ratione aliquid vel mollitia
                voluptatum deleniti laborum obcaecati numquam sit, culpa ipsam
                officia saepe quis.
            </p>
        </main>
    );
};

export default Home;
