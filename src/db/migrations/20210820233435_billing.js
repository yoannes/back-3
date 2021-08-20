const { createdAt, updatedAt } = require("../helpers")

exports.up = function (knex) {
  return knex.schema
    .createTable("users_pokemons", function (table) {
      table.increments("id").primary()
      createdAt(knex, table)
      updatedAt(knex, table)
      table.timestamp("deleted_at")

      table.integer("user_id").unsigned().references("id").inTable("users")
      table.integer("pokemon_id").unsigned().references("id").inTable("pokemons")
    })
    .createTable("billings", function (table) {
      table.increments("id").primary()
      createdAt(knex, table)
      updatedAt(knex, table)
      table.timestamp("deleted_at")

      table.specificType("trx_type", "bit(1)")
      table.integer("amount")
      table.integer("user_id").unsigned().references("id").inTable("users")
      table.integer("user_pokemon_id").unsigned().references("id").inTable("users_pokemons")
    })
}

exports.down = function (knex) {
  return knex.schema
    .table("users_pokemons", function (table) {
      table.dropForeign("user_id")
      table.dropForeign("pokemon_id")
    })
    .table("billings", function (table) {
      table.dropForeign("user_id")
      table.dropForeign("user_pokemon_id")
    })
    .dropTable("users_pokemons")
    .dropTable("billings")
}
