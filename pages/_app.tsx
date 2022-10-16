import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { Main } from '../components/Main';

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
    return (
        <SessionProvider session={pageProps.session}>
            <QueryClientProvider client={client}>
                <div className='grid grid-rows-[auto_1fr] min-h-screen'>
                    <Header />
                    <Main>
                        <Component {...pageProps} />
                    </Main>
                </div>
            </QueryClientProvider>
        </SessionProvider>
    );
}

export default MyApp;
