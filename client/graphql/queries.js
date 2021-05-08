import { gql } from "@apollo/client"

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
  query getMovieById {
    movie (_id: "6093dd06e5f8282ad155f1bb") {
      title
      popularity
    }
}
`

export const GET_TV_BYID = gql`
  query getTvById {
    tv (_id: "60951511df8eeae2843e5459") {
      title
      popularity
    }
}
`