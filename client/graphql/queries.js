import { gql } from "@apollo/client"

export const GET_MOVIES_AND_TVSERIES = gql`
  query getMoviesAndTvseries {
    movies {
      _id
      title
      poster_path
      popularity
    }
    tvseries {
      _id
      title
      poster_path
      popularity
    }
  }
`

export const GET_MOVIES = gql`
  query getMovies {
    movies {
      _id
      title
      poster_path
      popularity
    }
  }
`

export const GET_TVSERIES = gql`
  query getTvseries {
    tvseries {
      _id
      title
      poster_path
      popularity
    }
  }
`

export const GET_MOVIE_BYID = gql`
  query getMovieById($_id: ID) {
    movie(_id: $_id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const GET_TV_BYID = gql`
  query getTvById($_id: ID) {
    tv(_id: $_id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
}
`