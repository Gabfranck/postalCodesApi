import db from "../models/index.js";

const PostalCodes = db.postalCodes;
const Op = db.Sequelize.Op;

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
      ],
      where: {
        country_code: { [Op.in]: countries.split(",").map((c) => c.toUpperCase()) },
        city: { [Op.iLike]: `%${city}%` },
      },
      order: [
        ["city", "ASC"],
        ["postal_code", "ASC"],
      ],
    });

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving postal codes.",
    });
  }
};

export default {
  findAll,
};
