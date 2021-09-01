const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const routerV1 = require("./router/v1")

app.use(bodyParser.json())
app.use(cors())

app.use(routerV1)

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})
