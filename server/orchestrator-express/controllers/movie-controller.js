const Redis = require("ioredis")
const axios = require("axios")
const redis = new Redis()
const base = "http://localhost:4001"

class MovieController {
  static async getAll(req, res, next) {
    redis.get("movies")
      .then(result => {
        if(!result) throw "gofetchnewdata"

        res.status(200).json({ movies: JSON.parse(result)})
      })

      .catch(() => { //jika redis error atau hasil null, fecth
        axios({
          method: "GET",
          url: base + "/movies"
        })

        .then(({ data }) => {
          redis.set("movies", JSON.stringify(data.movies))
          res.status(200).json({ movies: data.movies })
        })
  
        .catch(({ response }) => {
          res.status(response.status || 500).json({ msg: response.data.msg || "Internal Server Error" })
        })
      })
  }

  static async getOne(req, res, next) {
    axios({
      method: "GET",
      url: base + "/movies/" + req.params.id
    })

      .then(({ data }) => {
        res.status(200).json({ movie: data.movie })
      })

      .catch(({ response }) => {
        res.status(response.status || 500).json({ msg: response.data.msg || "Internal Server Error" })
      })
  }

  static async edit(req, res, next) {
    let input = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: +req.body.popularity,
      tags: req.body.tags
    }

    axios({
      method: "PUT",
      url: base + "/movies/" + req.params.id,
      data: input
    })

      .then(({ data }) => {
        redis.del("movies")
        res.status(200).json(data)
      })

      .catch( ({ response }) => {
        res.status(response.status || 500).json({ msg: response.data.msg || "Internal Server Error" })
      })
  }

  static async add(req, res, next) {
    let input = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: +req.body.popularity,
      tags: req.body.tags
    }

    axios({
      method: "POST",
      url: base + "/movies",
      data: input
    })

      .then(({ data }) => {
        redis.del("movies")
        res.status(201).json(data)
      })

      .catch( ({ response }) => {
        res.status(response.status || 500).json({ msg: response.data.msg || "Internal Server Error" })
      })
  }

  static async delete(req, res, next) {
    axios({
      method: "DELETE",
      url: base + "/movies/" + req.params.id ,
    })

      .then(({ data }) => {
        redis.del("movies")
        res.status(200).json(data)
      })

      .catch( ({ response }) => {
        res.status(response.status || 500).json({ msg: response.data.msg || "Internal Server Error" })
      })
  }
}

module.exports = MovieController