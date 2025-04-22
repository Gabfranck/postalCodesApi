import db from "../models/index.js";

const PostalCodes = db.postalCodes;
const Op = db.Sequelize.Op;

export const findAll = async (req, res) => {
  const postalCode = req.query.code;
  const country = req.query.country;
  const city = req.query.city;

  if (!country) {
    res.status(400).send({
      message: "Country is required",
    });
    return;
  }

  if (!postalCode && !city) {
    res.status(400).send({
      message: "Postal code or city are required",
    });
    return;
  }

  if (postalCode && city) {
    res.status(400).send({
      message: "Postal code and city cannot be provided at the same time",
    });
    return;
  }

  try {
    let condition = {
      country: country,
    };

    if (postalCode) {
      condition.postalCode = { [Op.like]: `%${postalCode}%` };
    }

    if (city) {
      condition.city = { [Op.iLike]: `%${city}%` };
    }

    const data = await PostalCodes.findAll({
      where: condition,
      order: [["city", "ASC"]],
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
