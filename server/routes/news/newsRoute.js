const router = require("express").Router();
const passport = require("passport");
const theTimesUkController = require("../../routesControllers/news/theTimesUKController");
const theGuardianController = require("../../routesControllers/news/theGuardianController");
const metroController = require("../../routesControllers/news/metroController");

//! with authenticate ---------------------------
router.use(passport.authenticate("jwt", { session: false }));

// The Times UK
router.get("/thetimesuk", theTimesUkController.save);
router.get("/thetimesuk/show", theTimesUkController.list);

//The Guardian
router.get("/theguardian", theGuardianController.save);
router.get("/theguardian/show", theGuardianController.list);

//Metro
router.get("/metro", metroController.save);
router.get("/metro/show", metroController.list);

module.exports = router;
