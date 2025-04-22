import db from "../models/index.js";

const PostalCodes = db.postalCodes;
const Op = db.Sequelize.Op;

export const findAll = (req, res) => {
  const postalCode = req.query.postalCode;
  const country = req.query.country;

  if (!postalCode || !country) {
    res.status(400).send({
      message: "Postal code and country are required",
    });
    return;
  }

  PostalCodes.findAll({
    where: {
      country: country,
      postalCode: { [Op.iLike]: `%${postalCode}%` },
    },
    order: [["city", "ASC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving postal codes.",
      });
    });
};

export default {
  findAll,
};
