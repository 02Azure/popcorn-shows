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

      .catch( ({ response }) => {
        res.json({ error: { status: response.status, msg: response.statusText } })
      })
  }
}

module.exports = MovieController