const Tv = require("../models/Tv")

class TvseriesController {
  static async getAll(req, res, next) {
    try {
      let tvseries = await Tv.getAll()
      
      res.json({ tvseries })

    } catch(err) {
      res.status(err.code || 500).json({ msg: err.msg || "Internal Server Error" })
    }
  }

  static async getOne(req, res, next) {
    try {
      let tv = await Tv.getOne(req.params.id)

      res.status(200).json({ tv })

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
      let editedTv = await Tv.edit(req.params.id, input)

      res.status(200).json({ tv: editedTv })
      
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
      let newTv = await Tv.add(input)

      res.status(201).json({ tv: newTv })
      
    } catch(error) {
      res.status(err.code || 500).json({ msg: err.msg || "Internal Server Error" })
    }
  }

  static async delete(req, res, next) {
    try {
      await Tv.delete(req.params.id)
      
      res.status(200).json({ msg: "Tv has been successfully deleted" })

    } catch(error) {
      res.status(err.code || 500).json({ msg: err.msg || "Internal Server Error" })
    }
  }
}

module.exports = TvseriesController