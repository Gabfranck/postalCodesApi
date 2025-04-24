"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("postal_codes", "city_ascii", {
      type: Sequelize.STRING,
    });
    await queryInterface.sequelize.query("CREATE EXTENSION IF NOT EXISTS unaccent;");
    await queryInterface.sequelize.query(
      "UPDATE postal_codes SET city_ascii = unaccent(lower(city)) WHERE city_ascii IS NULL"
    );

    await queryInterface.removeIndex("postal_codes", "country_city_index");
    await queryInterface.removeIndex("postal_codes", "postalCode_country_city_index");

    await queryInterface.addIndex("postal_codes", {
      name: "country_city_index",
      using: "BTREE",
      fields: ["country_code", { name: "city_ascii", order: "ASC" }],
    });

    await queryInterface.addIndex("postal_codes", {
      name: "postalCode_country_city_index",
      using: "BTREE",
      fields: ["country_code", "postal_code", { name: "city_ascii", order: "ASC" }],
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("postal_codes", "city_ascii");
    await queryInterface.sequelize.query("DROP EXTENSION IF EXISTS unaccent;");

    await queryInterface.removeIndex("postal_codes", "country_city_index");
    await queryInterface.removeIndex("postal_codes", "postalCode_country_city_index");

    await queryInterface.addIndex("postal_codes", {
      name: "country_city_index",
      using: "BTREE",
      fields: ["country_code", { name: "city", order: "ASC" }],
    });

    await queryInterface.addIndex("postal_codes", {
      name: "postalCode_country_city_index",
      using: "BTREE",
      fields: ["country_code", "postal_code", { name: "city", order: "ASC" }],
    });
  },
};
