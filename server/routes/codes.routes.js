import search from "../controllers/codes/search.controller.js";
import near from "../controllers/codes/near.controller.js";

import express from "express";

export default (app) => {
  const router = express.Router();

  // Retrieve all Tutorials
  router.get("/search", search.findAll);
  router.get("/near", near.findAll);

  app.use("/codes", router);
};
