let router = require("express").Router();
let Trip = require("../db").import("../models/trip");
let validateSession = require("../middleware/validate-session");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/", validateSession, (req, res) => {
  const tripEntry = {
    title: req.body.trip.title,
    departLoc: req.body.trip.departLoc,
    arrivalLoc: req.body.trip.arrivalLoc,
    startDate: req.body.trip.startDate,
    endDate: req.body.trip.endDate,
    travelMethod: req.body.trip.travelMethod,
    reason: req.body.trip.reason,
    description: req.body.trip.description,
    userId: req.user.id
  };

  Trip.create(tripEntry)
    .then((trip) => res.status(200).json(trip))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/:id", validateSession, (req, res) => {
  const query = { where: { id: req.params.id } };
  Trip.destroy(query)
    .then((recordsChanged) => {
      if (recordsChanged !== 0) {
        res.status(200).json({
          message: "trip deleted!",
        });
      } else {
        res.status(200).json({
          message: "trip not found",
        });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/:id", validateSession, (req, res) => {
  const query = { where: { id: req.params.id } };
  const tripEntry = {
    title: req.body.trip.title,
    departLoc: req.body.trip.departLoc,
    arrivalLoc: req.body.trip.arrivalLoc,
    startDate: req.body.trip.startDate,
    endDate: req.body.trip.endDate,
    travelMethod: req.body.trip.travelMethod,
    reason: req.body.trip.reason,
    description: req.body.trip.description,
    userId: req.user.id
  };

  Trip.update(tripEntry, query)
    .then((recordsChanged) => {
        console.log(recordsChanged)
      if (recordsChanged[0] !== 0 ) {
        res.status(200).json({
          message: "trip updated!",
        });
      } else {
        res.status(200).json({
          message: "trip not found",
        });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/", validateSession, (req, res) => {
  const query = {where : { userId: req.user.id }, include: 'user' }
  Trip.findAll(query)
    .then((trips) => res.status(200).json(trips))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/:id", validateSession, (req, res) => {
  const query = { where: { id: req.params.id }, include: 'user' };

  Trip.findOne(query)
    .then((trip) => res.status(200).json(trip))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
