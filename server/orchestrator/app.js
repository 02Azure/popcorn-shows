const { ApolloServer, gql } = require("apollo-server")
const { default: axios } = require("axios")
const Redis = require("ioredis")
const redis = new Redis()

const baseMovie = "http://localhost:4001"
const baseTv = "http://localhost:4002"

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Tv {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }
  
  #success message on add/update/delete
  type Message {
    msg: String
  }

  type Query {
    movies: [Movie]
    movie(_id: ID): Movie
    tvseries: [Tv]
    tv(_id: ID): Tv
  }

  type Mutation {
    addMovie(
      title: String,
      overview: String,
      poster_path: String,
      popularity: Float,
      tags: String
    ): Message

    deleteMovie(_id: ID): Message

    editMovie(
      _id: ID,
      title: String,
      overview: String,
      poster_path: String,
      popularity: Float,
      tags: String
    ): Message

    addTv(
      title: String,
      overview: String,
      poster_path: String,
      popularity: Float,
      tags: String
    ): Message

    deleteTv(_id: ID): Message

    editTv(
      _id: ID,
      title: String,
      overview: String,
      poster_path: String,
      popularity: Float,
      tags: String
    ): Message
  }
`

const resolvers = {
  Query: {
    movies: () => {
      return redis.get("movies")
        .then(movies => {
          if(movies) return JSON.parse(movies)

          throw "movies cache not found"
        })

        .catch(() => {
          return axios({
            method: "GET",
            url: baseMovie + "/movies"
          })
            .then(({ data }) => {
              redis.set("movies", JSON.stringify(data.movies))
              return data.movies
            })
          
            .catch(({ response }) => {
              throw response.data.msg
            })
        })
    },

    movie: (parent, args) => {
      const { _id } = args

      return axios({
        method: "GET",
        url: baseMovie + "/movies/" + _id
      })
        .then(({ data }) => {
          return data.movie
        })
      
        .catch(({ response }) => {
          throw response.data.msg
        })
    },

    tvseries: () => {
      return redis.get("tvseries")
        .then(tvseries => {
          if(tvseries) return JSON.parse(tvseries)

          throw "tvseries cache not found"
        })

        .catch(() => {
          console.log('hrs fetch tv')
          return axios({
            method: "GET",
            url: baseTv + "/tv"
          })
            .then(({ data }) => {
              redis.set("tvseries", JSON.stringify(data.tvseries))
              return data.tvseries
            })
          
            .catch(({ response }) => {
              throw response.data.msg
            })
        })
    },

    tv: (parent, args) => {
      const { _id } = args

      return axios({
        method: "GET",
        url: baseTv + "/tv/" + _id
      })
        .then(({ data }) => {
          return data.tv
        })
      
        .catch(({ response }) => {
          throw response.data.msg
        })
    }
  },

  Mutation: {
    addMovie: (parent, args) => {
      const { title, overview, poster_path, popularity, tags } = args
      const input = {
        title, 
        overview,
        poster_path,
        popularity,
        tags
      }

      return axios({
        method: "POST",
        url: baseMovie + "/movies",
        data: input
      })
        .then(({ data }) => {
          redis.del("movies")
          return data
        })
      
        .catch(err => {
          return err.response.data
        })
    },

    deleteMovie: (parent, args) => {
      const { _id } = args

      return axios({
        method: "DELETE",
        url: baseMovie + "/movies/" + _id
      })
        .then(({ data }) => {
          redis.del("movies")
          return data
        })
      
        .catch(err => {
          return err.response.data
        })
    },

    editMovie: (parent, args) => {
      const { _id, title, overview, poster_path, popularity, tags } = args
      const input = {
        title, 
        overview,
        poster_path,
        popularity,
        tags
      }

      return axios({
        method: "PUT",
        url: baseMovie + "/movies/" + _id,
        data: input
      })
        .then(({ data }) => {
          redis.del("movies")
          return data
        })
      
        .catch(err => {
          return err.response.data
        })
    },

    addTv: (parent, args) => {
      const { title, overview, poster_path, popularity, tags } = args
      const input = {
        title, 
        overview,
        poster_path,
        popularity,
        tags
      }

      return axios({
        method: "POST",
        url: baseTv + "/tv",
        data: input
      })
        .then(({ data }) => {
          redis.del("tvseries")
          return data
        })
      
        .catch(err => {
          return err.response.data
        })
    },

    deleteTv: (parent, args) => {
      const { _id } = args

      return axios({
        method: "DELETE",
        url: baseTv + "/tv/" + _id
      })
        .then(({ data }) => {
          redis.del("tvseries")
          return data
        })
      
        .catch(err => {
          return err.response.data
        })
    },

    editTv: (parent, args) => {
      const { _id, title, overview, poster_path, popularity, tags } = args
      const input = {
        title, 
        overview,
        poster_path,
        popularity,
        tags
      }

      return axios({
        method: "PUT",
        url: baseTv + "/tv/" + _id,
        data: input
      })
        .then(({ data }) => {
          redis.del("tvseries")
          return data
        })
      
        .catch(err => {
          return err.response.data
        })
    },
  }
}

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
})