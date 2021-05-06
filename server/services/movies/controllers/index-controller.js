const Movie = require("../models/Movie")

class Controller {
  static async getAll(req, res, next) {
    try {
      let movies = await Movie.getAll()
      
      res.status(200).json({ movies })

    } catch(err) {
      res.status(err.code || 500).json({ msg: err.msg || "Internal Server Error" })
    }
  }

  static async getOne(req, res, next) {
    try {
      let movie = await Movie.getOne(req.params.id)

      if(!movie) throw { code: 404, msg: "Movie with that id is not found" }
      res.status(200).json({ movie })

    } catch(err) {
      res.status(err.code || 500).json({ msg: err.msg || "Internal Server Error" })
    }
  }

  static async edit(req, res, next) {
    let input = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: +req.body.popularity,
      tags: req.body.tags.split(",") //separated by comma
    }

    try {
      let result = await Movie.edit(req.params.id, input)
      
      if(!result.modifiedCount) throw { code: 404, msg: "Movie with that id is not found" }
      res.status(200).json({ msg: "Movie has been successfully updated" })
      
    } catch(err) {
      res.status(err.code || 500).json({ msg: err.msg || "Internal Server Error" })
    }
  }

  static async add(req, res, next) {
    let input = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: +req.body.popularity,
      tags: req.body.tags.split(",") //separated by comma
    }

    try {
      await Movie.add(input)

      res.status(201).json({ msg: "New movie has been successfully added" })
      
    } catch(err) {
      res.status(err.code || 500).json({ msg: err.msg || "Internal Server Error" })
    }
  }

  static async delete(req, res, next) {
    try {
      let result = await Movie.delete(req.params.id)

      if(!result.deletedCount) throw { code: 404, msg: "Movie with that id is not found" }

      res.status(200).json({ msg: "Movie has been successfully deleted" })

    } catch(err) {
      res.status(err.code || 500).json({ msg: err.msg || "Internal Server Error" })
    }
  }
}

module.exports = Controller