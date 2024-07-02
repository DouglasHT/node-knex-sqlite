/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("produtos", (tbl) => {
    tbl.increments("id");
    tbl.string("descricao", 255).notNullable();
    tbl.string("marca", 255).notNullable();
    tbl.float("preco").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("produtos");
};
