import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className='grid grid-rows-[auto_1fr_auto] min-h-screen'>
            <QueryClientProvider client={client}>
                <Header />
                <Component {...pageProps} />
                <Footer />
            </QueryClientProvider>
        </div>
    );
}

export default MyApp;
