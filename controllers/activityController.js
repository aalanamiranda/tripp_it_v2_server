let router = require("express").Router();
let Activity = require("../db").import("../models/activity");
let validateSession = require("../middleware/validate-session");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/", validateSession, (req, res) => {
  const activityEntry = {
    title: req.body.activity.title,
    startDate: req.body.activity.startDate,
    endDate: req.body.activity.endDate,
    description: req.body.activity.description,
    userId: req.user.id,
    tripId: req.body.activity.tripId
  };

  Activity.create(activityEntry)
    .then((activity) => res.status(200).json(activity))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/:id", validateSession, (req, res) => {
  const query = { where: { id: req.params.id } };
  Activity.destroy(query)
    .then((recordsChanged) => {
      if (recordsChanged !== 0) {
        res.status(200).json({
          message: "activity deleted!",
        });
      } else {
        res.status(200).json({
          message: "activity not found",
        });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/:id", validateSession, (req, res) => {
  const query = { where: { id: req.params.id } };
  const activityEntry = {
    title: req.body.activity.title,
    startDate: req.body.activity.startDate,
    endDate: req.body.activity.endDate,
    description: req.body.activity.description,
    userId: req.user.id,
    tripId: req.body.tripId
  };

  Activity.update(activityEntry, query)
    .then((recordsChanged) => {
        console.log(recordsChanged)
      if (recordsChanged[0] !== 0 ) {
        res.status(200).json({
          message: "activity updated!",
        });
      } else {
        res.status(200).json({
          message: "activity not found",
        });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/", validateSession, (req, res) => {
  const query = {where : { userId: req.user.id },
  include: ['trip', 'user']}
  console.log(req.user.id)
  Activity.findAll(query)
    .then((activitys) => res.status(200).json(activitys))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/:id", validateSession, (req, res) => {
  const query = { where: { id: req.params.id },
  include: ['trip', 'user']};

  Activity.findOne(query)
    .then((activity) => res.status(200).json(activity))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
