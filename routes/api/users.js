let accessToken, access_token1;
const express = require("express");
const User = require("../models/User");
const Codechef = require("../models/Codechef");
const bCrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const nodemailer = require("nodemailer");
const request = require("request");
const validateLoginInput = require("../../validation/login");
const validateRegisterInput = require("../../validation/register");
const validateVerifyInput = require("../../validation/verify");

//set up a route
const router = express.Router();

//global variables
let rand = 0;
let email = "";
let smtpTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: require("../../config/keys").email,
    clientId: require("../../config/keys").emailClientId,
    clientSecret: require("../../config/keys").emailClientSecret,
    refreshToken: require("../../config/keys").emailRefreshToken,
    accessToken: require("../../config/keys").emailAccessToken
  }
});

// <------ test route -------->
// Route  --> GET api/users/test
// Desc   --> Tests users route
// Access --> Public
router.get("/test", (req, res) => res.json({ message: "User works" }));

// Route  --> POST api/users/register
// Desc   --> Registers user
// Access --> Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        codechefId: req.body.codechefId,
        email: req.body.email,
        password: req.body.password,
        interest: req.body.interest
      });
      // encrypts the password and saves it in user object
      bCrypt.genSalt(10, (err, salt) => {
        bCrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => res.status(400).json(err));
        });
      });
      //-------email otp-----
      rand = Math.floor(Math.random() * 10000 + 54);
      email = req.body.email;
      let mailOptions = {
        from: require("../../config/keys").email,
        to: req.body.email,
        subject: "Please confirm your Sahayog 4 Devs Account",
        html: `Hi ${req.body.name},<br> Your otp is ${rand}`
      };
      smtpTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
      });

      //making post request to get client credentials from codechef's server
      request.post(
        {
          url: "https://api.codechef.com/oauth/token",
          form: {
            grant_type: "client_credentials",
            scope: "public",
            client_id: require("../../config/keys").ccClientId,
            client_secret: require("../../config/keys").ccClientSecret,
            redirect_uri: require("../../config/keys").ccRedirectURI
          },
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0",
            "Content-Type": "application/x-www-form-urlencoded"
          }
        },
        (err, req, body) => {
          if (err) throw err;
          let accessTokens = `Bearer ${
            JSON.parse(body).result.data.access_token
          }`;
          getUserData(accessTokens);
        }
      );

      function getUserData(accessTokens) {
        // making get request to fetch details from codechef's server
        url = "https://api.codechef.com/users/" + req.body.codechefId;
        let options = {
          url: url,
          headers: {
            Authorization: accessTokens
          }
        };
        function callback(error, response, body) {
          if (error) throw error;
          const parsedBody = JSON.parse(body);
          if (parsedBody.result.data.code === 9003) {
            errors.codechefId = "Incorrect codechef Id";
            return errors;
          } else {
            const codechefData = new Codechef({
              email: req.body.email,
              name: req.body.name,
              id: req.body.codechefId,
              language: parsedBody.result.data.content.language,
              country: parsedBody.result.data.content.country.name,
              state: parsedBody.result.data.content.state.name,
              city: parsedBody.result.data.content.city.name,
              rating: parsedBody.result.data.content.ratings.allContest,
              rank:
                parsedBody.result.data.content.rankings.allContestRanking
                  .global,
              band: parsedBody.result.data.content.band
            });
            codechefData
              .save()
              .then(user => console.log(user))
              .catch(err => console.log(errors));
          }
        }
        request(options, callback);
      }
    }
  });
});

// Route  --> POST api/users/verify
// Desc   --> verifies user using OTP
// Access --> Public
router.post("/verify", (req, res) => {
  const { errors, isValid } = validateVerifyInput(req.body);

  if (!isValid) {
    return req.status(400).json(errors);
  }
  const userEnteredOtp = req.body.rand;
  if (parseInt(userEnteredOtp) == rand) {
    User.findOneAndUpdate({ email: email }, { isActivated: true }).then(
      user => {
        res.json(user);
      }
    );
  } else {
    errors.rand = "Incorrect OTP";
    res.status(400).json(errors);
  }
});

// Route  --> POST api/users/login/
// Desc   --> login for users
// Access --> Public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //check for validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  //find user by email id
  User.findOne({ email }).then(user => {
    //check for email address
    if (!user) {
      errors.email = "user not found";
      return res.status(404).json(errors);
    }

    if (!user.isActivated) {
      errors.email = "account not activated";
      return res.status(404).json(errors);
    }
    //compare passwords
    bCrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //create jwt payload
        const payload = {
          codechefId: user.codechefId,
          name: user.name,
          id: user.id,
          interest: user.interest
        };

        //sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({ success: "true", token: "Bearer " + token });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// Route  --> GET api/users/current
// Desc   --> returns current user
// Access --> Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      interest: req.user.interest,
      isActivated: req.user.isActivated
    });
  }
);

module.exports = router;
