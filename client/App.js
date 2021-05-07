import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, Text, View } from 'react-native'
import { ApolloProvider } from "@apollo/client/react"
import client from "./graphql"
import { useQuery, gql } from "@apollo/client"
//testing
const GET_MOVIES = gql`
  query getMovies {
    movies {
      _id
      title
      poster_path
    }
  }
`

const GET_TVSERIES = gql`
  query getTvseries {
    tvseries {
      _id
      title
      poster_path
    }
  }
`

const GET_MOVIE_BYID = gql`
  query getMovieById {
    movie (_id: "6093dd06e5f8282ad155f1bb") {
      title
      popularity
    }
}
`

const GET_TV_BYID = gql`
  query getTvById {
    tv (_id: "60951511df8eeae2843e5459") {
      title
      popularity
    }
}
`

export default function App() {
  return (
    <ApolloProvider client={ client }>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
        <Movies />
        <Tvseries />
        <Movie />
        <Tv />
      </View>
    </ApolloProvider>
  );
}

function Movies() {
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <p>Loading....</p>
  if (error) return <p>Error :(</p>


  
  return(
    <View>
      <Text>GET ALL MOVIES</Text>
      <Text>{ JSON.stringify(data) }</Text>
    </View>
  )
}

function Tvseries() {
  const { loading, error, data } = useQuery(GET_TVSERIES);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return(
    <View>
      <Text>GET ALL TVSERIES</Text>
      <Text>{ JSON.stringify(data) }</Text>
    </View>
  )   
}

function Movie() {
  const { loading, error, data } = useQuery(GET_MOVIE_BYID);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return(
    <View>
      <Text>GET MOVIE</Text>
      <Text>{ JSON.stringify(data) }</Text>
    </View>
  )   
}

function Tv() {
  const { loading, error, data } = useQuery(GET_TV_BYID);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return(
    <View>
      <Text>GET ONE TV</Text>
      <Text>{ JSON.stringify(data) }</Text>
    </View>
  )   
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
