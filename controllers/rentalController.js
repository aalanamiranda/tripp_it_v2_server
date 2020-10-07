let router = require("express").Router();
let Rental = require("../db").import("../models/rental");
let validateSession = require("../middleware/validate-session");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/", validateSession, (req, res) => {
  const rentalEntry = {
    agency: req.body.rental.agency,
    item: req.body.rental.item,
    startDate: req.body.rental.startDate,
    endDate: req.body.rental.endDate,
    description: req.body.rental.description,
    userId: req.user.id,
    tripId: req.body.rental.tripId,
    activityId: req.body.rental.activityId
  };

  Rental.create(rentalEntry)
    .then((rental) => res.status(200).json(rental))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/:id", validateSession, (req, res) => {
  const query = { where: { id: req.params.id } };
  Rental.destroy(query)
    .then((recordsChanged) => {
      if (recordsChanged !== 0) {
        res.status(200).json({
          message: "rental deleted!",
        });
      } else {
        res.status(200).json({
          message: "rental not found",
        });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/:id", validateSession, (req, res) => {
  const query = { where: { id: req.params.id } };
  const rentalEntry = {
    agency: req.body.rental.agency,
    item: req.body.rental.item,
    startDate: req.body.rental.startDate,
    endDate: req.body.rental.endDate,
    description: req.body.user.description,
    userId: req.user.id,
    tripId: req.body.rental.tripId,
    activityId: req.body.rental.activityId
  };

  Rental.update(rentalEntry, query)
    .then((recordsChanged) => {
        console.log(recordsChanged)
      if (recordsChanged[0] !== 0 ) {
        res.status(200).json({
          message: "rental updated!",
        });
      } else {
        res.status(200).json({
          message: "rental not found",
        });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/", validateSession, (req, res) => {
  const query = {where : { userId: req.user.id },
  include: ['trip', 'user', 'activity']}
  Rental.findAll(query)
    .then((rentals) => res.status(200).json(rentals))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/:id", validateSession, (req, res) => {
  const query = { where: { id: req.params.id },
  include: ['trip', 'user', 'activity'] };

  Rental.findOne(query)
    .then((rental) => res.status(200).json(rental))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
