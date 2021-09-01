const express = require("express")

const router = express.Router()

router.get("", (req, res) => {
  res.send("Chamadas V1")
})

router.post("/login", (req, res) => {
  res.send(req.body)
})

router.get("/users", (req, res) => {
  res.json({
    params: req.params,
    body: req.body,
  })
})

router.get("/users/:userId", (req, res) => {
  console.log("[]...", req.params, req.query)
  res.json({
    params: req.params,
    body: req.body,
  })
})

module.exports = router
