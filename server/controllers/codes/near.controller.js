import db from "../../models/index.js";

const sequelize = db.sequelize;

export const findAll = async (req, res) => {
  const coord = req.query.coord;
  const countries = req.query.countries;
  const radius = req.query.radius;

  if (!coord) {
    res.status(400).send({
      message: "countries and postal code are required",
    });
    return;
  }

  try {
    const data = await sequelize.query(
      `SELECT *
      FROM postal_codes
      WHERE ST_DWithin(geom::geography,ST_SetSRID(ST_MakePoint(:lat,:lng),4326)::geography, :radius * 1000) ${
        countries ? "AND country_code IN (:countries)" : ""
      } LIMIT 100`,
      {
        type: sequelize.QueryTypes.SELECT,
        replacements: {
          lat: Number(coord.split(",")[0]),
          lng: Number(coord.split(",")[1]),
          radius: radius ? radius : 10,
          countries: countries ? countries.split(",").map((c) => c.toUpperCase()) : null,
        },
      }
    );

    const result = data.reduce((acc, item) => {
      const itemKey = `${item.postal_code}-${item.admin_name_1}-${item.admin_name_2}-${item.admin_name_3}-${item.country_code}`;

      if (!acc[itemKey]) {
        acc[itemKey] = { ...item, cities: [] };
      }
      const cities = acc[itemKey].cities ?? [];

      acc[itemKey].cities = [...cities, item.city];

      delete acc[itemKey].city_ascii;
      delete acc[itemKey].city;
      delete acc[itemKey].geom;
      delete acc[itemKey].id;

      return acc;
    }, {});

    res.send(Object.values(result));
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving postal codes.",
    });
  }
};

export default {
  findAll,
};
