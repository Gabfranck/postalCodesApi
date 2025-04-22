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
    }
  );

  return PostalCodes;
};
