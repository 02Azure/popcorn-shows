const cors = require('cors')
const express = require('express')
const { connectdb } = require("./config")
const app = express()
const port = process.env.PORT || 4002
const tv = require("./routes")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/tv", tv)

connectdb()
  .then(() => {
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`)
    })
  })

  .catch(err => {
    console.log(err)
  })
