const Redis = require("ioredis")
const axios = require("axios")
const redis = new Redis()
const base = "http://localhost:4002"

class TvController {
  static async getAll(req, res, next) {
    redis.get("tvseries")
    .then(result => {
      if(!result) throw "gofetchnewdata"

      res.status(200).json({ movies: JSON.parse(result)})
    })

    .catch(() => { //jika redis error atau hasil null, fecth
      axios({
        method: "GET",
        url: base + "/tv"
      })

      .then(({ data }) => {
        redis.set("tvseries", JSON.stringify(data.tvseries))

        res.status(200).json({ tvseries: data.tvseries })
      })

      .catch(({ response }) => {
        res.status(response.status || 500).json({ msg: response.data.msg || "Internal Server Error" })
      })
    })
  }

  static async getOne(req, res, next) {
    axios({
      method: "GET",
      url: base + "/tv/" + req.params.id
    })

      .then(({ data }) => {
        res.status(200).json({ tv: data.tv })
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
      tags: req.body.tags //separated by comma
    }

    axios({
      method: "PUT",
      url: base + "/tv/" + req.params.id,
      data: input
    })

      .then(({ data }) => {
        redis.del("tvseries")
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
      tags: req.body.tags //separated by comma
    }

    axios({
      method: "POST",
      url: base + "/tv",
      data: input
    })

      .then(({ data }) => {
        redis.del("tvseries")
        res.status(201).json(data)
      })

      .catch( ({ response }) => {
        res.status(response.status || 500).json({ msg: response.data.msg || "Internal Server Error" })
      })
  }

  static async delete(req, res, next) {
    axios({
      method: "DELETE",
      url: base + "/tv/" + req.params.id ,
    })

      .then(({ data }) => {
        redis.del("tvseries")
        res.status(200).json(data)
      })

      .catch( ({ response }) => {
        res.status(response.status || 500).json({ msg: response.data.msg || "Internal Server Error" })
      })
  }
}

module.exports = TvController