const axios = require("axios")
const base = "http://localhost:4001"

class MovieController {
  static async getAll(req, res, next) {
    axios({
      method: "GET",
      url: base + "/movies",
    })

      .then(({ data }) => {
        res.status(200).json({ movies: data.movies })
      })

      .catch(({ response }) => {
        res.status(response.status || 500).json({ msg: response.data.msg || "Internal Server Error" })
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
        res.status(200).json(data)
      })

      .catch( ({ response }) => {
        res.status(response.status || 500).json({ msg: response.data.msg || "Internal Server Error" })
      })
  }
}

module.exports = MovieController