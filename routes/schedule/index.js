const router = require("express").Router();
const schedule = require("./schedule");

router.get("/schedule/today", schedule.getTodaySchedule);
router.get("/schedule", schedule.getSchedule);

module.exports = router;
