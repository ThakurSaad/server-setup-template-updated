const auth = require("../../middleware/auth");
const express = require("express");
const { ENUM_USER_ROLE } = require("../../../util/enum");
const ManageController = require("./manage.controller");

const router = express.Router();

router
  .post(
    "/add-terms-conditions",
    auth(ENUM_USER_ROLE.ADMIN),
    ManageController.addTermsConditions
  )
  .get("/get-terms-conditions", ManageController.getTermsConditions)
  .delete(
    "/delete-terms-conditions",
    auth(ENUM_USER_ROLE.ADMIN),
    ManageController.deleteTermsConditions
  )
  .post(
    "/add-privacy-policy",
    auth(ENUM_USER_ROLE.ADMIN),
    ManageController.addPrivacyPolicy
  )
  .get("/get-privacy-policy", ManageController.getPrivacyPolicy)
  .delete(
    "/delete-privacy-policy",
    auth(ENUM_USER_ROLE.ADMIN),
    ManageController.deletePrivacyPolicy
  )
  .post(
    "/add-about-us",
    auth(ENUM_USER_ROLE.ADMIN),
    ManageController.addAboutUs
  )
  .get("/get-about-us", ManageController.getAboutUs)
  .delete(
    "/delete-about-us",
    auth(ENUM_USER_ROLE.ADMIN),
    ManageController.deleteAboutUs
  )
  .post("/add-faq", auth(ENUM_USER_ROLE.ADMIN), ManageController.addFaq)
  .get("/get-faq", ManageController.getFaq)
  .delete("/delete-faq", auth(ENUM_USER_ROLE.ADMIN), ManageController.deleteFaq)
  .post(
    "/add-contact-us",
    auth(ENUM_USER_ROLE.ADMIN),
    ManageController.addContactUs
  )
  .get("/get-contact-us", ManageController.getContactUs)
  .delete(
    "/delete-contact-us",
    auth(ENUM_USER_ROLE.ADMIN),
    ManageController.deleteContactUs
  );

module.exports = router;
