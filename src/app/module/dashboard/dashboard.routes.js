const auth = require("../../middleware/auth");
const express = require("express");
const DashboardController = require("./dashboard.controller");
const config = require("../../../config");

const router = express.Router();

router

  // overview ========================
  .get(
    "/total-overview",
    auth(config.auth_level.admin),
    DashboardController.totalOverview
  )
  .get("/revenue", auth(config.auth_level.admin), DashboardController.revenue);

module.exports = router;
