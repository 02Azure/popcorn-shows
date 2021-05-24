import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://192.168.100.2:4000/',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          movies: {
            merge(existing, incoming) {
              return incoming
            }
          },
          tvseries: {
            merge(existing, incoming) {
              return incoming
            }
          }
        }  
      }
    }
  })
})

export default client