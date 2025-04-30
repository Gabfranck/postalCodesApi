import db from "../../models/index.js";

const PostalCodes = db.postalCodes;
const Op = db.Sequelize.Op;

export const findAll = async (req, res) => {
  const postalCode = req.query.code;
  const countries = req.query.countries;
  const exact = req.query.exact;

  if (!countries || !postalCode) {
    res.status(400).send({
      message: "countries and postal code are required",
    });
    return;
  }

  let postalCodeCondition = { [Op.like]: `%${postalCode}%` };
  if (exact === "true") {
    postalCodeCondition = postalCode;
  }
  try {
    const data = await PostalCodes.findAll({
      attributes: [
        "postal_code",
        "city",
        "country_code",
        "admin_name_1",
        "admin_name_2",
        "admin_name_3",
        "longitude",
        "latitude",
        "city_ascii",
      ],
      where: {
        country_code: { [Op.in]: countries.split(",").map((c) => c.toUpperCase()) },
        postal_code: postalCodeCondition,
      },
      order: [
        ["city_ascii", "ASC"],
        ["postal_code", "ASC"],
      ],
    });

    const result = data.reduce((acc, item) => {
      const itemKey = `${item.postal_code}-${item.admin_name_1}-${item.admin_name_2}-${item.admin_name_3}-${item.country_code}`;

      if (!acc[itemKey]) {
        acc[itemKey] = { ...item.dataValues, cities: [] };
      }
      const cities = acc[itemKey].cities ?? [];

      acc[itemKey].cities = [...cities, item.city];

      delete acc[itemKey].city_ascii;
      delete acc[itemKey].city;

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
