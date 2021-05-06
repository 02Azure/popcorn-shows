const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const index = require("./routes")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(index)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
