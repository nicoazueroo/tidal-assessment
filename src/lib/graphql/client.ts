import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://demostore.mock.shop/api/2026-04/graphql.json',
  }),
  cache: new InMemoryCache(),
});