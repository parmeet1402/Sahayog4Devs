const express = require("express");
const passport = require("passport");
const UserSkill = require("../models/UserSkill");
const Codechef = require("../models/Codechef");
const validateMatchInput = require("../../validation/match");

const router = express.Router();

// <------------ test route --------->
// Route  --> GET api/match/test
// Desc   --> Tests match route
// Access --> Public
router.get("/test", (req, res) => res.json({ message: "match works" }));

// Route  --> POST api/match/
// Desc   --> returns match percentage wrt to performance
// Access --> Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMatchInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    if (req.body.choice === "performance") {
      //get details of all users
      Codechef.find().then(users => {
        const user = users.filter(usr => usr.email === req.user.email)[0];
        const otherUsers = users.filter(user => user.email !== req.user.email);
        //RequiredSkill.findOne({ email: req.user.email }).then(requirement => {
        //const userRequirement = requirement.requiredSkill;
        const userRequirement = req.body.requiredSkill;
        UserSkill.find().then(otherusersskills => {
          let matchedUsers = [];
          const otherUsersSkills = otherusersskills.filter(
            user => user.email !== req.user.email
          );
          for (let otherUser of otherUsers) {
            //find location score
            let currentLocationScore = 0;
            if (otherUser.country === user.country) {
              currentLocationScore = 1;
              if (otherUser.state === user.state) {
                currentLocationScore = 2;
                if (otherUser.city === user.city) {
                  currentLocationScore = 3;
                }
              }
            }

            //find peroformance score
            let ratingDifference =
              Math.abs(parseInt(user.rating) - parseInt(otherUser.rating)) /
              1000;
            let ratingMatchScore = Math.abs(3 - ratingDifference);

            otherUser.rank = otherUser.rank == 0 ? 1000000 : otherUser.rank;
            user.rank = user.rank == 0 ? 1000000 : user.rank;
            let rankDifference =
              Math.abs(parseInt(user.rank) - parseInt(otherUser.rank)) / 10000;
            let rankMatchScore;
            if (rankDifference > 3) {
              rankMatchScore = 0;
            } else {
              rankMatchScore = Math.abs(3 - rankDifference);
            }

            if (user.band === "UnRated") {
              user.band = "0$";
            }
            if (otherUser.band === "UnRated") {
              otherUser.band = "0$";
            }
            let bandDifference =
              Math.abs(
                parseInt(user.band.slice(0, user.band.length - 1)) -
                  parseInt(otherUser.band.slice(0, otherUser.band.length - 1))
              ) / 4;
            let bandMatchScore = 3 - bandDifference;
            let currentPerformanceScore =
              bandMatchScore + rankMatchScore + ratingMatchScore;

            // find skillset score
            let languageMatchScore =
              otherUser.language === user.language ? 2 : 0;

            let skillsMatch, skillsetMatchScore;
            for (let otherUserSkill of otherUsersSkills) {
              skillsMatch = otherUserSkill.skills.includes(userRequirement);

              if (skillsMatch === true) {
                skillsetMatchScore = 4;
              } else {
                skillsetMatchScore = 0;
              }
            }
            let currentSkillsetScore = languageMatchScore + skillsetMatchScore;

            let matchPercentage =
              ((currentLocationScore +
                currentPerformanceScore +
                currentSkillsetScore) /
                18) *
              100;

            //push to matchedUsers
            matchedUsers.push({
              email: otherUser.email,
              name: otherUser.name,
              codechefId: otherUser.id,
              currentLocationScore: currentLocationScore,
              currentPerformanceScore: currentPerformanceScore,
              currentSkillsetScore: currentSkillsetScore,
              matchPercentage: matchPercentage
            });
          }
          //find finalmatch
          let max = 0;
          let finalMatchedUser;
          for (let userss of matchedUsers) {
            if (userss.matchPercentage > max) {
              max = userss.matchPercentage;
              finalMatchedUser = userss;
            }
          }

          if (!finalMatchedUser) {
            errors.match = "No match found";
            return res.status(404).json(errors);
          }
          res.json(finalMatchedUser);
        });
      });
    } else if (req.body.choice === "location") {
      //get details of all users
      Codechef.find().then(users => {
        const user = users.filter(usr => usr.email === req.user.email)[0];
        const otherUsers = users.filter(user => user.email !== req.user.email);
        //RequiredSkill.findOne({ email: req.user.email }).then(requirement => {
        //const userRequirement = requirement.requiredSkill;
        const userRequirement = req.body.requiredSkill;
        UserSkill.find().then(otherusersskills => {
          let matchedUsers = [];
          const otherUsersSkills = otherusersskills.filter(
            user => user.email !== req.user.email
          );
          for (let otherUser of otherUsers) {
            //find location score
            let currentLocationScore = 0;
            if (otherUser.country === user.country) {
              currentLocationScore = 3;
              if (otherUser.state === user.state) {
                currentLocationScore = 6;
                if (otherUser.city === user.city) {
                  currentLocationScore = 9;
                }
              }
            }

            //find peroformance score
            let ratingDifference =
              Math.abs(parseInt(user.rating) - parseInt(otherUser.rating)) /
              1000;

            let ratingMatchScore = Math.abs(1 - ratingDifference);
            otherUser.rank = otherUser.rank == 0 ? 1000000 : otherUser.rank;
            user.rank = user.rank == 0 ? 1000000 : user.rank;

            let rankDifference =
              Math.abs(parseInt(user.rank) - parseInt(otherUser.rank)) / 10000;
            let rankMatchScore;
            if (rankDifference > 3) {
              rankMatchScore = 0;
            } else {
              rankMatchScore = Math.abs(1 - rankDifference);
            }
            if (user.band === "UnRated") {
              user.band = "0$";
            }
            if (otherUser.band === "UnRated") {
              otherUser.band = "0$";
            }
            let bandDifference =
              Math.abs(
                parseInt(user.band.slice(0, user.band.length - 1)) -
                  parseInt(otherUser.band.slice(0, otherUser.band.length - 1))
              ) / 4;
            let bandMatchScore = Math.abs(1 - bandDifference);

            let currentPerformanceScore =
              bandMatchScore + rankMatchScore + ratingMatchScore;

            // find skillset score
            let languageMatchScore =
              otherUser.language === user.language ? 2 : 0;

            let skillsMatch, skillsetMatchScore;
            for (let otherUserSkill of otherUsersSkills) {
              skillsMatch = otherUserSkill.skills.includes(userRequirement);

              if (skillsMatch === true) {
                skillsetMatchScore = 4;
              } else {
                skillsetMatchScore = 0;
              }
            }
            let currentSkillsetScore = languageMatchScore + skillsetMatchScore;

            let matchPercentage =
              ((currentLocationScore +
                currentPerformanceScore +
                currentSkillsetScore) /
                18) *
              100;

            //push to matchedUsers
            matchedUsers.push({
              email: otherUser.email,
              name: otherUser.name,
              codechefId: otherUser.id,
              currentLocationScore: currentLocationScore,
              currentPerformanceScore: currentPerformanceScore,
              currentSkillsetScore: currentSkillsetScore,
              matchPercentage: matchPercentage
            });
          }
          //find finalmatch
          let max = 0;
          let finalMatchedUser;
          for (let userss of matchedUsers) {
            if (userss.matchPercentage > max) {
              max = userss.matchPercentage;
              finalMatchedUser = userss;
            }
          }
          if (!finalMatchedUser) {
            errors.match = "No match found";
            return res.status(404).json(errors);
          }
          res.json(finalMatchedUser);
        });
      });
    } else if (req.body.choice === "skillset") {
      //get details of all users
      Codechef.find().then(users => {
        const user = users.filter(usr => usr.email === req.user.email)[0];
        const otherUsers = users.filter(user => user.email !== req.user.email);
        const userRequirement = req.body.requiredSkill;
        UserSkill.find().then(otherusersskills => {
          let matchedUsers = [];
          const otherUsersSkills = otherusersskills.filter(
            user => user.email !== req.user.email
          );
          for (let otherUser of otherUsers) {
            //find location score
            let currentLocationScore = 0;
            if (otherUser.country === user.country) {
              currentLocationScore = 1;
              if (otherUser.state === user.state) {
                currentLocationScore = 2;
                if (otherUser.city === user.city) {
                  currentLocationScore = 3;
                }
              }
            }

            //find peroformance score
            let ratingDifference =
              Math.abs(parseInt(user.rating) - parseInt(otherUser.rating)) /
              1000;

            let ratingMatchScore = Math.abs(2 - ratingDifference);
            otherUser.rank = otherUser.rank == 0 ? 1000000 : otherUser.rank;
            user.rank = user.rank == 0 ? 1000000 : user.rank;

            let rankDifference =
              Math.abs(parseInt(user.rank) - parseInt(otherUser.rank)) / 10000;
            let rankMatchScore;
            if (rankDifference > 3) {
              rankMatchScore = 0;
            } else {
              rankMatchScore = Math.abs(2 - rankDifference);
            }
            if (user.band === "UnRated") {
              user.band = "0$";
            }
            if (otherUser.band === "UnRated") {
              otherUser.band = "0$";
            }
            let bandDifference =
              Math.abs(
                parseInt(user.band.slice(0, user.band.length - 1)) -
                  parseInt(otherUser.band.slice(0, otherUser.band.length - 1))
              ) / 4;
            let bandMatchScore = 2 - bandDifference;

            let currentPerformanceScore =
              bandMatchScore + rankMatchScore + ratingMatchScore;
            // find skillset score
            let languageMatchScore =
              otherUser.language === user.language ? 3 : 0;
            let skillsMatch, skillsetMatchScore;
            for (let otherUserSkill of otherUsersSkills) {
              skillsMatch = otherUserSkill.skills.includes(userRequirement);
              if (skillsMatch === true) {
                skillsetMatchScore = 6;
              } else {
                skillsetMatchScore = 0;
              }
            }
            let currentSkillsetScore = languageMatchScore + skillsetMatchScore;

            let matchPercentage =
              ((currentLocationScore +
                currentPerformanceScore +
                currentSkillsetScore) /
                18) *
              100;

            //push to matchedUsers
            matchedUsers.push({
              email: otherUser.email,
              name: otherUser.name,
              codechefId: otherUser.id,
              currentLocationScore: currentLocationScore,
              currentPerformanceScore: currentPerformanceScore,
              currentSkillsetScore: currentSkillsetScore,
              matchPercentage: matchPercentage
            });
          }
          //find finalmatch
          let max = 0;
          let finalMatchedUser;
          for (let userss of matchedUsers) {
            if (userss.matchPercentage > max) {
              max = userss.matchPercentage;
              finalMatchedUser = userss;
            }
          }

          if (!finalMatchedUser) {
            errors.match = "No match found";
            return res.status(404).json(errors);
          }

          res.json(finalMatchedUser);
        });
      });
    }
  }
);
module.exports = router;
