import { ApolloClient, InMemoryCache } from '@apollo/client';
import { getDBPath } from '../utils/config';

export const apolloClient = new ApolloClient({
    uri: getDBPath(),
    cache: new InMemoryCache(),
});
