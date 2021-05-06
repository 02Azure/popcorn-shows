const Tv = require("../models/Tv")

class Controller {
  static async getAll(req, res, next) {
    try {
      let tvseries = await Tv.getAll()
      
      res.status(200).json({ tvseries })

    } catch(err) {
      res.status(err.code || 500).json({ msg: err.msg || "Internal Server Error" })
    }
  }

  static async getOne(req, res, next) {
    try {
      let tv = await Tv.getOne(req.params.id)

      if(!tv) throw { code: 404, msg: "Tv with that id is not found" }
      res.status(200).json({ tv })

    } catch(err) {
      console.log(err)
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
      let result = await Tv.edit(req.params.id, input)
      
      if(!result.modifiedCount) throw { code: 404, msg: "Tv with that id is not found" }
      res.status(200).json({ msg: "Tv has been successfully updated" })
      
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
      await Tv.add(input)

      res.status(201).json({ msg: "New tv has been successfully added" })
      
    } catch(err) {
      res.status(err.code || 500).json({ msg: err.msg || "Internal Server Error" })
    }
  }

  static async delete(req, res, next) {
    try {
      let result = await Tv.delete(req.params.id)

      if(!result.deletedCount) throw { code: 404, msg: "Tv with that id is not found" }

      res.status(200).json({ msg: "Tv has been successfully deleted" })

    } catch(err) {
      res.status(err.code || 500).json({ msg: err.msg || "Internal Server Error" })
    }
  }
}

module.exports = Controller