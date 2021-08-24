const { Model } = require("objection")
const knex = require("../db/knex")

Model.knex(knex)

class Type extends Model {
  static get tableName() {
    return "types"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["type"],
      properties: {
        id: { type: "integer" },
        type: { type: "string", minLength: 1, maxLength: 45 },
      },
    }
  }

  // static get relationMappings() {}

  // static get modifiers() {}
}

module.exports = Type
