const axios = require("axios")
const base = "http://localhost:4002"

class TvController {
  static async getAll(req, res, next) {
    axios({
      method: "GET",
      url: base + "/tv",
    })

      .then(({ data }) => {
        res.status(200).json({ tvseries: data.tvseries })
      })

      .catch( ({ response }) => {
        res.json({ error: { status: response.status, msg: response.statusText } })
      })
  }
}

module.exports = TvController