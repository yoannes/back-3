const User = require("../../models/User")

const get = async (req, res) => {
  const response = { status: "ERROR" }

  console.log("[->]...", req.user)

  const user = await User.query().where({ name: req.body.username })
  if (!user) {
    response.status = "USER_NOT_FOUND"
    return res.status(401).json(response)
  }

  response.status = "OK"
  response.results = user

  return res.json(response)
}

module.exports = get
