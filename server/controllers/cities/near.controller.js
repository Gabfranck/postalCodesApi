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
      `SELECT *, ST_DistanceSphere(geom, ST_SetSRID(ST_MakePoint(:lat,:lng), 4326)) as distance
      FROM postal_codes
      WHERE ST_DWithin(geom::geography,ST_SetSRID(ST_MakePoint(:lat,:lng),4326)::geography, :radius * 1000) ${
        countries ? "AND country_code IN (:countries)" : ""
      } ORDER BY distance`,
      {
        type: sequelize.QueryTypes.SELECT,
        replacements: {
          lng: Number(coord.split(",")[0]),
          lat: Number(coord.split(",")[1]),
          radius: radius ? radius : 10,
          countries: countries ? countries.split(",").map((c) => c.toUpperCase()) : null,
        },
      }
    );

    const result = data.reduce((acc, item) => {
      const itemKey = `${item.city_ascii}-${item.admin_name_1}-${item.admin_name_2}-${item.admin_name_3}-${item.country_code}`;

      if (!acc[itemKey]) {
        acc[itemKey] = { ...item, postal_codes: [] };
      }
      const postalCodes = acc[itemKey].postal_codes ?? [];

      acc[itemKey].postal_codes = [...postalCodes, item.postal_code];

      delete acc[itemKey].postal_code;
      delete acc[itemKey].city_ascii;
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
