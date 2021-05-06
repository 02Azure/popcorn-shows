const { getDatabase } = require("../mongodb-config")

class MovieController {
  static async getAll(req, res) {
    try {
      let movies  = await getDatabase("movies").find().toArray()
      
      res.json({ movies })

    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = MovieController