const cors = require('cors')
const express = require('express')
const { connectdb } = require("./mongodb-config")
const app = express()
const port = process.env.PORT || 3000
const index = require("./routes")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", index)

connectdb()
  .then(() => {
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`)
    })
  })

  .catch(err => {
    console.log(err)
  })
