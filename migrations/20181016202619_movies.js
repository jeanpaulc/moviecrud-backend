
exports.up = (knex, Promise) => {
  return knex.schema.createTable('movies', table => {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments('id')
    table.string('title').notNullable().defaultTo('')
    table.string('director').notNullable().defaultTo('')
    table.integer('year').notNullable().defaultTo(0)
    table.decimal('rating', 2, 1).notNullable().defaultTo(0)
    table.string('poster_url').notNullable().defaultTo('')
    table.timestamps(true, true)
  })
}
exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('movies')
}
