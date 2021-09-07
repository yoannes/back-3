const jwt = require("jsonwebtoken")
const User = require("../models/User")

const secret = "SuperSecretKey"

const jwtSign = (obj) => {
  return jwt.sign(obj, secret)
}

const jwtAuthenticate = async (req, res, next) => {
  try {
    const auth = req.headers.authorization.split(" ")
    if (auth[0] !== "Bearer") {
      return res.sendStatus(401)
    }

    const decoded = jwt.verify(auth[1], secret)

    const user = await User.query().findById(decoded.id)
    if (user) {
      req.decodedToken = decoded
      req.user = user
      return next()
    }
  } catch (error) {
    console.warn(error)
  }

  return res.sendStatus(401)
}

module.exports = {
  jwtSign,
  jwtAuthenticate,
}
