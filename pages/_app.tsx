import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { Layout } from '../components/Layout';

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
    return (
        <SessionProvider session={pageProps.session}>
            <QueryClientProvider client={client}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </QueryClientProvider>
        </SessionProvider>
    );
}

export default MyApp;
