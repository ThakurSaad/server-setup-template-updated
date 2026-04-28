const auth = require("../../middleware/auth");
const express = require("express");
const ManageController = require("./manage.controller");
const config = require("../../../config");

const router = express.Router();

router
  .post(
    "/add-terms-conditions",
    auth(config.auth_level.admin),
    ManageController.addTermsConditions
  )
  .get("/get-terms-conditions", ManageController.getTermsConditions)
  .delete(
    "/delete-terms-conditions",
    auth(config.auth_level.admin),
    ManageController.deleteTermsConditions
  )
  .post(
    "/add-privacy-policy",
    auth(config.auth_level.admin),
    ManageController.addPrivacyPolicy
  )
  .get("/get-privacy-policy", ManageController.getPrivacyPolicy)
  .delete(
    "/delete-privacy-policy",
    auth(config.auth_level.admin),
    ManageController.deletePrivacyPolicy
  )
  .post(
    "/add-about-us",
    auth(config.auth_level.admin),
    ManageController.addAboutUs
  )
  .get("/get-about-us", ManageController.getAboutUs)
  .delete(
    "/delete-about-us",
    auth(config.auth_level.admin),
    ManageController.deleteAboutUs
  )
  .post("/add-faq", auth(config.auth_level.admin), ManageController.addFaq)
  .get("/get-faq", ManageController.getFaq)
  .delete(
    "/delete-faq",
    auth(config.auth_level.admin),
    ManageController.deleteFaq
  )
  .post(
    "/add-contact-us",
    auth(config.auth_level.admin),
    ManageController.addContactUs
  )
  .get("/get-contact-us", ManageController.getContactUs)
  .delete(
    "/delete-contact-us",
    auth(config.auth_level.admin),
    ManageController.deleteContactUs
  );

module.exports = router;
