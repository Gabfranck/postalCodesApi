import "dotenv/config";
import express from "express";
import cors from "cors";

import db from "./models/index.js";

import codeRoutes from "./routes/codes.routes.js";
import citiesRoutes from "./routes/cities.routes.js";

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to PostalCodesAPI" });
});

codeRoutes(app);
citiesRoutes(app);

// set port, listen for requests
const PORT = process.env.API_PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
