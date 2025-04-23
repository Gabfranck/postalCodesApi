import db from "../models/index.js";

const PostalCodes = db.postalCodes;
const Op = db.Sequelize.Op;

export const findAll = async (req, res) => {
  const postalCode = req.query.code;
  const country = req.query.country;

  if (!country || !postalCode) {
    res.status(400).send({
      message: "Country and postal code are required",
    });
    return;
  }

  try {
    const data = await PostalCodes.findAll({
      attributes: ["postalCode", "city", "country"],
      where: {
        country: country,
        postalCode: { [Op.like]: `%${postalCode}%` },
      },
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
