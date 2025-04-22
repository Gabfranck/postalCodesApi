export default (sequelize, Sequelize) => {
  const PostalCodes = sequelize.define(
    "postal_codes",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      postalCode: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      country: {
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
          fields: ["country", { name: "city", order: "ASC" }],
        },
        {
          name: "postalCode_country_city_index",
          using: "BTREE",
          fields: ["postalCode", "country", { name: "city", order: "ASC" }],
        },
      ],
    }
  );

  return PostalCodes;
};
