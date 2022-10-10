import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head lang='pl' />
            <body className='bg-gray-300 antialiased'>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
