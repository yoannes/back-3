const { createdAt, updatedAt, foreign } = require("../helpers")

// TODO: FIX

exports.up = function (knex) {
  return knex.schema
    .createTable("pokemons", function (table) {
      table.increments("id").primary()
      createdAt(knex, table)
      updatedAt(knex, table)
      table.timestamp("deleted_at")

      table.string("name", 45).notNullable()
      table.specificType("height", "smallint")
      table.specificType("weight", "smallint")
      table.integer("price")
    })
    .createTable("pokemon_images", function (table) {
      table.increments("id").primary()
      table.string("url", 255)
      foreign(table, "pokemon_id", "pokemons")
    })
    .createTable("types", function (table) {
      table.increments("id").primary()
      table.string("type", 45)
    })
    .createTable("pokemon_types", function (table) {
      foreign(table, "pokemon_id", "pokemons")
      foreign(table, "type_id", "types")
    })
}

exports.down = function (knex) {
  return knex.schema
    .table("pokemons", function (table) {
      table.dropForeign("pokemon_id")
    })
    .table("pokemon_types", function (table) {
      table.dropForeign("pokemon_id")
      table.dropForeign("type_id")
    })
    .dropTable("pokemon_types")
    .dropTable("pokemons")
}
