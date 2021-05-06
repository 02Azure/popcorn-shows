const Movie = require("../models/Movie")

class MovieController {
  static async getAll(req, res, next) {
    try {
      let movies  = await Movie.getAll()
      
      res.status(200).json({ movies })

    } catch(err) {
      res.status(err.code || 500).json({ msg: err.msg || "Internal Server Error" })
    }
  }

  static async getOne(req, res, next) {
    try {
      let movie = await Movie.getOne(req.params.id)

      res.status(200).json({ movie })

    } catch(error) {
      res.status(err.code || 500).json({ msg: err.msg || "Internal Server Error" })
    }
  }

  static async edit(req, res, next) {
    let input = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster.path,
      popularity: req.body.popularity,
      tags: req.body.tags.split(",") //separated by comma
    }

    try {
      let editedMovie = await Movie.edit(req.params.id, input)

      res.status(200).json({ movie: editedMovie })
      
    } catch(error) {
      res.status(err.code || 500).json({ msg: err.msg || "Internal Server Error" })
    }
  }

  static async add(req, res, next) {
    let input = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster.path,
      popularity: req.body.popularity,
      tags: req.body.tags.split(",") //separated by comma
    }

    try {
      let newMovie = await Movie.add(input)

      res.status(201).json({ movie: newMovie })
      
    } catch(error) {
      res.status(err.code || 500).json({ msg: err.msg || "Internal Server Error" })
    }
  }

  static async delete(req, res, next) {
    try {
      await Movie.delete(req.params.id)
      
      res.status(200).json({ msg: "Movie has been successfully deleted" })

    } catch(error) {
      res.status(err.code || 500).json({ msg: err.msg || "Internal Server Error" })
    }
  }
}

module.exports = MovieController