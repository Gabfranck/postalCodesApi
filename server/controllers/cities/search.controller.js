import db from "../../models/index.js";

const PostalCodes = db.postalCodes;
const Op = db.Sequelize.Op;

const unaccent = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

export const findAll = async (req, res) => {
  const countries = req.query.countries;
  const city = req.query.city;

  if (!countries || !city) {
    res.status(400).send({
      message: "countries and city parameters are required",
    });
    return;
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
        city_ascii: {
          [Op.like]: `%${unaccent(city)}%`,
        },
      },
      order: [
        ["city_ascii", "ASC"],
        ["postal_code", "ASC"],
      ],
    });

    const result = data.reduce((acc, item) => {
      const itemKey = `${item.city_ascii}-${item.admin_name_1}-${item.admin_name_2}-${item.admin_name_3}-${item.country_code}`;

      if (!acc[itemKey]) {
        acc[itemKey] = { ...item.dataValues, postal_codes: [] };
      }
      const postalCodes = acc[itemKey].postal_codes ?? [];

      acc[itemKey].postal_codes = [...postalCodes, item.postal_code];

      delete acc[itemKey].postal_code;
      delete acc[itemKey].city_ascii;

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
