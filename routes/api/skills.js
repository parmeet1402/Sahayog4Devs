const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const UserSkill = require("../models/UserSkill");
const RequiredSkill = require("../models/RequiredSkill");
const validateRequiredSkillsInput = require("../../validation/requiredSkills");
const validateUserSkillsInput = require("../../validation/userSkills");
const router = express.Router();

// <------------ test route --------->
// Route  --> GET api/skills/test
// Desc   --> Tests skills route
// Access --> Public
router.get("/test", (req, res) => res.json({ message: "skills works" }));

// Route  --> POST api/skills/user
// Desc   --> add user skills
// Access --> Private
router.post(
  "/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateUserSkillsInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    let userSkill = new UserSkill({
      email: req.user.email,
      name: req.user.name,
      interest: req.user.interest,
      skills: req.body.skills
    });

    UserSkill.findOne({ email: req.user.email }).then(skill => {
      if (skill) {
        //update
        UserSkill.findOneAndUpdate(
          { email: req.user.email },
          { $set: userSkill },
          { new: true }
        ).then(skill => res.json(skill));
      } else {
        userSkill
          .save()
          .then(skills => res.json(skills))
          .catch(err => res.status(400).json(err));
      }
    });
  }
);

// Route  --> GET api/skills/user
// Desc   --> view user skills
// Access --> Private
router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    UserSkill.findOne({ email: req.user.email })
      .then(skills => {
        if (!skills) {
          errors.noSkills = "No skills selected";
          return res.status(404).json(errors);
        }
        res.json(skills);
      })
      .catch(err => res.status(404).json(err));
  }
);

// Route  --> POST api/skills/required
// Desc   --> add required skills
// Access --> Private
router.post(
  "/required",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRequiredSkillsInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    let requiredSkill = new RequiredSkill({
      email: req.user.email,
      name: req.user.name,
      interest: req.user.interest,
      requiredSkills: req.body.requiredSkills.split(",")
    });
    requiredSkill
      .save()
      .then(skills => res.json(skills))
      .catch(err => res.status(400).json(err));
  }
);

// Route  --> GET api/skills/required
// Desc   --> view required skills
// Access --> Private
router.get(
  "/required",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    RequiredSkill.findOne({ email: req.user.email })
      .then(reqSkill => {
        if (!reqSkill) {
          return res.status(404).json("Required skill not selected");
        }
        res.json(reqSkill);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
