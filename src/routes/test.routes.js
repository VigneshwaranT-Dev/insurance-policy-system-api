const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/index");

router.get("/admin-only", protect, authorize("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

module.exports = router;
