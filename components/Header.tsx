import uniqid from 'uniqid';
import Link from 'next/link';
import { useRouter } from 'next/router';

const paths = [
    {
        key: uniqid(),
        text: 'Main',
        path: '/',
    },
    {
        key: uniqid(),
        text: 'About',
        path: '/about',
    },
];

export const Header = () => {
    const router = useRouter();

    return (
        <header className='flex bg-gray-500 justify-center w-full'>
            <nav className='flex text-4xl gap-4'>
                {paths.map(({ key, text, path }) => (
                    <Link key={key} href={path}>
                        <a
                            className={
                                router.pathname === path ? 'font-bold' : ''
                            }
                        >
                            {text}
                        </a>
                    </Link>
                ))}
            </nav>
        </header>
    );
};
