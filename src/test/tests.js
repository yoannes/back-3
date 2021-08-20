const knex = require("../db/knex")
const expect = require("chai").expect
const server = require("../server")

// npm i -D chai mocha nodemon sqlite3
const TEST_TIMEOUT = 5000

const init = () => {
  describe("Tests", function () {
    this.timeout(TEST_TIMEOUT)

    before((done) => {
      knex.migrate
        .latest()
        .then(() => knex.seed.run())
        .then(() => done())
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
  })
}

init()

const sum = (a, b) => a + b
