const router = require("express").Router();
const meals = require("./meals");

router.get("/meal/today", meals.getTodayMeals);
router.get("/meal", meals.getMeals);

module.exports = router;
