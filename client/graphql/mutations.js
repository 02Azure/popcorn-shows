import { gql } from "@apollo/client"

export const ADD_MOVIE = gql`
  mutation addNewMovie(
    $title: String,
    $overview: String,
    $poster_path: String,
    $popularity: Float,
    $tags: String
    ) {
    addMovie(
      title: $title, 
      overview: $overview, 
      poster_path: $poster_path, 
      popularity: $popularity, 
      tags: $tags
    ) {
      msg
    } 
  }
`

export const EDIT_MOVIE = gql`
  mutation editOneMovie(
    $_id: ID,
    $title: String,
    $overview: String,
    $poster_path: String,
    $popularity: Float,
    $tags: String
  ) {
    editMovie(
      _id: $_id
      title: $title, 
      overview: $overview, 
      poster_path: $poster_path, 
      popularity: $popularity, 
      tags: $tags
    ) {
      msg
    }
  }
`
export const DELETE_MOVIE = gql`
  mutation deleteOneMovie($_id: ID) {
    deleteMovie(_id: $_id) {
      msg
    }
  }
`

export const ADD_TV = gql`
  mutation addNewTv(
    $title: String,
    $overview: String,
    $poster_path: String,
    $popularity: Float,
    $tags: String
  ) {
    addTv(
      title: $title, 
      overview: $overview, 
      poster_path: $poster_path, 
      popularity: $popularity, 
      tags: $tags
    ) {
      msg
    } 
  }
`
export const EDIT_TV = gql`
  mutation editOneTv(
    $_id: ID,
    $title: String,
    $overview: String,
    $poster_path: String,
    $popularity: Float,
    $tags: String
  ) {
    editTv(
      _id: $_id
      title: $title, 
      overview: $overview, 
      poster_path: $poster_path, 
      popularity: $popularity, 
      tags: $tags
    ) {
      msg
    }
  }
`

export const DELETE_TV = gql`
  mutation deleteOneTv($_id: ID) {
    deleteTv(_id: $_id) {
      msg
    }
  }
`


