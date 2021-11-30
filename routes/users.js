const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  try {
    //res.json(users.getMultiple(req.query.page));
    console.log("successful");
    res.json({ message: "successful" });
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
});

module.exports = router;
