export default (sequelize, Sequelize) => {
  const PostalCodes = sequelize.define(
    "postal_codes",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      postal_code: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      country_code: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      admin_name_1: {
        type: Sequelize.STRING,
      },
      admin_name_2: {
        type: Sequelize.STRING,
      },
      admin_name_3: {
        type: Sequelize.STRING,
      },
      longitude: {
        type: Sequelize.FLOAT,
      },
      latitude: {
        type: Sequelize.FLOAT,
      },
    },
    {
      timestamps: false,
      indexes: [
        {
          name: "country_city_index",
          using: "BTREE",
          fields: ["country_code", { name: "city", order: "ASC" }],
        },
        {
          name: "postalCode_country_city_index",
          using: "BTREE",
          fields: ["country_code", "postal_code", { name: "city", order: "ASC" }],
        },
      ],
    }
  );

  return PostalCodes;
};
