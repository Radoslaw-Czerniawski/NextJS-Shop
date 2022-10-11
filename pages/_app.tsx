import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className='bg-teal-100'>
            <div className='grid grid-rows-[auto_1fr_auto] min-h-screen'>
                <Header />
                <Component {...pageProps} />
                <Footer />
            </div>
        </div>
    );
}

export default MyApp;
