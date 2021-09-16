const request = require("supertest")
const expect = require("chai").expect
const knex = require("../db/knex")
const knexfile = require("../db/knexfile")
const server = require("../server")

// npm i -D chai mocha nodemon sqlite3 supertest
const TEST_TIMEOUT = 5000

const user = {
  id: "",
  name: "Fulano",
  username: "fulano",
  pwd: "123456",
  token: "",
}

const init = () => {
  describe("Tests", function () {
    this.timeout(TEST_TIMEOUT)

    before((done) => {
      knex.migrate
        .latest()
        .then(() => knex.seed.run())
        .then(() => done())
        .catch((err) => done(err))
    })

    it("Nome do teste", (done) => {
      expect("a").equal("a")
      expect("a").equal("a")
      done()
    })

    it("Validar soma", (done) => {
      expect(sum(1, 2)).equal(3)
      done()
    })

    it("Signup", (done) => {
      request(server)
        .post("/v1/signup")
        .send({ username: user.username, pwd: user.pwd, name: user.name })
        .then((res) => {
          // console.log("[Signup]...", res.body)
          expect(res.body.status).equal("OK")
          expect(res.body.result.id).not.equal("")
          expect(res.body.result.token).not.equal("")
          expect(res.body.result.name).equal(user.name)

          user.id = res.body.result.id
          user.token = res.body.result.token

          done()
        })
    })

    it("Signup - No username", (done) => {
      request(server)
        .post("/v1/signup")
        .send({})
        .then((res) => {
          // console.log("[Signup]...", res.body)
          expect(res.statusCode).equal(400)
          expect(res.body.status).equal("NO_USERNAME")
          done()
        })
    })

    it("Signup - No name", (done) => {
      request(server)
        .post("/v1/signup")
        .send({ username: user.username })
        .then((res) => {
          // console.log("[Signup]...", res.body)
          expect(res.statusCode).equal(400)
          expect(res.body.status).equal("NO_NAME")
          done()
        })
    })

    it("Signup - No password", (done) => {
      request(server)
        .post("/v1/signup")
        .send({ username: user.username, name: user.name })
        .then((res) => {
          // console.log("[Signup]...", res.body)
          expect(res.statusCode).equal(400)
          expect(res.body.status).equal("NO_PWD")
          done()
        })
    })

    it("Login", (done) => {
      request(server)
        .post("/v1/login")
        .send({ username: user.username, pwd: user.pwd })
        .then((res) => {
          // console.log("[Login]...", res.body)

          expect(res.body.status).equal("OK")
          expect(res.body.result.id).not.equal("")
          expect(res.body.result.token).not.equal("")
          expect(res.body.result.name).equal(user.name)

          done()
        })
    })

    it("Login - No user", (done) => {
      request(server)
        .post("/v1/login")
        .send({ pwd: user.pwd })
        .then((res) => {
          // console.log("[Login]...", res.body)
          expect(res.statusCode).equal(400)
          expect(res.body.status).equal("NO_USERNAME")

          done()
        })
    })

    it("Login - No pwd", (done) => {
      request(server)
        .post("/v1/login")
        .send({ username: user.username })
        .then((res) => {
          // console.log("[Login]...", res.body)
          expect(res.statusCode).equal(400)
          expect(res.body.status).equal("NO_PWD")

          done()
        })
    })

    it("Login - user not found", (done) => {
      request(server)
        .post("/v1/login")
        .send({ username: "wrongUser", pwd: user.pwd })
        .then((res) => {
          // console.log("[Login]...", res.body)
          try {
            expect(res.statusCode).equal(401)
            expect(res.body.status).equal("USER_NOT_FOUND")
            done()
          } catch (err) {
            done(err)
          }
        })
    })

    it("Login - wrong pwd", (done) => {
      request(server)
        .post("/v1/login")
        .send({ username: user.username, pwd: "user.pwd" })
        .then((res) => {
          // console.log("[Login]...", res.body)
          try {
            expect(res.statusCode).equal(401)
            expect(res.body.status).equal("WRONG_PWD")
            done()
          } catch (err) {
            done(err)
          }
        })
    })
  })
}

init()

const sum = (a, b) => a + b
