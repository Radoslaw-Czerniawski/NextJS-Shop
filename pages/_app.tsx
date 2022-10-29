import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from 'react-query';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { DefaultSeo } from 'next-seo';

import SEO from '../next-seo.config';
import '../styles/globals.css';
import { Layout } from '../components/Layout';
import { CartContextProvider } from '../context/CartContext';

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
    return (
        <SessionProvider session={pageProps.session}>
            <QueryClientProvider client={client}>
                <CartContextProvider>
                    <Layout>
                        <DefaultSeo {...SEO} />
                        {/* we set default Head tags */}
                        <Component {...pageProps} />
                    </Layout>
                </CartContextProvider>
            </QueryClientProvider>
        </SessionProvider>
    );
}

export default MyApp;
