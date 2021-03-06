const express = require("express");
const router = express.Router();
const Box = require("../models/Box");
const User = require("../models/User");
const Comment = require("../models/Comments");
const ensureLogin = require("connect-ensure-login");
/* GET home page */
// router.get('/', (req, res, next) => {
//   res.render('index');
// });

module.exports = router;

// Show box after params search:
router.post("/filter-box", (req, res, next) => {
  const currentUser = req.user;
  console.log(req.body);
  // console.log(req.user)
  const {
    dropBar,
    openBox,
    juniorClass,
    kidsClass,
    affiliate,
    saturdayOpen,
    sundayOpen
  } = req.body;
  // arrTagsWanted = tagsWanted.split(',');
  // arrTagsNotWanted = tagsNotWanted.split(',');
  // numberDays = +days;
  // tripBudget = budget;

  Box.find({
    $and: [
      {
        dropBar: {
          $eq: dropBar
        }
      },
      {
        openBox: {
          $eq: openBox
        }
      },
      {},
      {
        juniorClass: {
          $eq: juniorClass
        }
      },
      {
        kidsClass: {
          $eq: kidsClass
        }
      },
      {
        affiliate: {
          $eq: affiliate
        }
      },
      {
        "schedule.saturday.open": {
          $eq: saturdayOpen
        }
      },
      {
        "schedule.sunday.open": {
          $eq: sundayOpen
        }
      }
    ]
  })
    .populate("user")
    .then(data => {
      let numberOfBoxes = {};
      let cities = data.map(box => (box = box.city));
      let defCities = cities.filter(city => {
        if (numberOfBoxes[city.name]) {
          numberOfBoxes[city.name] += 1;
          return false;
        } else {
          numberOfBoxes[city.name] = 1;
          return true;
        }
      });

      for (city in numberOfBoxes) {
        defCities.forEach(city1 => {
          if (city1.name === city) {
            city1.total = numberOfBoxes[city];
          }
        });
      }

      const searchParams = {
        dropBar,
        openBox,
        juniorClass,
        kidsClass,
        affiliate,
        saturdayOpen,
        sundayOpen
      };
      let dataPayload = {
        defCities,
        searchParams,
        currentUser
      };

      res.json(dataPayload);
    })
    .catch(err => res.json(req.body));
});

// Show box after filtering params with city:
router.post("/filter-box/box", (req, res, next) => {
  const currentUser = req.user;
  console.log(req.body);
  const {
    cityName,
    dropBar,
    openBox,
    juniorClass,
    kidsClass,
    affiliate,
    saturdayOpen,
    sundayOpen
  } = req.body;
  // arrTagsWanted = tagsWanted.split(',');
  // arrTagsNotWanted = tagsNotWanted.split(',');
  // numberDays = +days;
  // tripBudget = budget;

  Box.find({
    $and: [
      {
        city: cityName
      },
      {
        dropBar: {
          $eq: dropBar
        }
      },
      {
        openBox: {
          $eq: openBox
        }
      },
      {},
      {
        juniorClass: {
          $eq: juniorClass
        }
      },
      {
        kidsClass: {
          $eq: kidsClass
        }
      },
      {
        affiliate: {
          $eq: affiliate
        }
      },
      {
        "schedule.saturday.open": {
          $eq: saturdayOpen
        }
      },
      {
        "schedule.sunday.open": {
          $eq: sundayOpen
        }
      }
    ]
  })
    .populate("user")
    .then(box => {
      let dataPayload = {
        box,
        currentUser
      };
      res.json(dataPayload);
    })
    .catch(err => console.log(err));
});

//findBoxes
router.get("/search/:box", (req, res, next) => {
  Box.find({
    $or: [
      { boxName: new RegExp(req.params.box, "gi") },
      { city: new RegExp(req.params.box, "gi") }
    ]
  })
    .then(Box => {
      res.json(Box);
    })
    .catch(err => console.log(err));
});

//Filter box by city
router.get("/filter-box/:cityName/boxes", (req, res, next) => {
  const currentUser = req.user;
  console.log(req.params.cityName);
  Box.find({
    city: req.params.cityName
  })
    .populate("user")
    .then(boxes => {
      let dataPayload = {
        boxes,
        currentUser
      };
      res.json(dataPayload);
    })
    .catch(err => console.log(err));
});

// Show all box:
router.get("/all-box", (req, res, next) => {
  const currentUser = req.user;
  Box.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        model: "User"
      }
    })

    .then(boxes => {
      let dataPayload = {
        boxes,
        currentUser
      };
      res.json(dataPayload);
    })
    .catch(err => console.log(err));
});

// Show details of specific plan:
let idBoxDetails;
router.get("/filter-box/:idBox/details", (req, res, next) => {
  idBoxDetails = req.params.idBox;
  const currentUser = req.user;
  Box.findById(idBoxDetails)
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        model: "User"
      }
    })
    .then(boxDetails => {
      let dataPayload = {
        boxDetails,
        currentUser
      };
      res.json(dataPayload);
    })
    .catch(err => console.log(err));
});

// // This is used by axios request for markers on map:
// router.get('/box/details/api', (req, res, next) => {
//   Box.findById(idBoxDetails)
//     .populate('user')
//     .then(data => res.json(data))
//     .catch(err => console.log(err));
// });

// Show user's profile page:  ensureLogin.ensureLoggedIn(),
router.get("/users/:id", (req, res, next) => {
  const currentUser = req.user;
  const userParams = req.params.id;

  User.findById(userParams)
    .then(user => {
      let userFound = user;
      Comment.find({
        user: user._id
      }).then(userComments => {
        let owner;
        currentUser
          ? userFound.id === currentUser.id
            ? (owner = true)
            : (owner = false)
          : (owner = false);
        let dataPayload;
        if (userComments.length === 0) {
          dataPayload = {
            userFound,
            currentUser,
            owner
          };
        } else {
          dataPayload = {
            userFound,
            userComments,
            currentUser,
            owner
          };
        }
        res.json(dataPayload);
      });
    })
    .catch(err => console.log(err));
});

router.post("/deleteComment", (req, res, user) => {
  console.log("back");
  console.log(req.body.comment);
  let { comment } = req.body;
  console.log(comment._id);
  // Comment.findByIdAndDelete(req.params.id)
  //   .then(res.redirect(`/users/${req.user.id}`))
  //   .catch(err => console.log(err));
});

//add comment to the database and push the id to the user and box
router.post("/addComment", (req, res, next) => {
  // let userId = req.body._id;
  let comment = req.body.commentForm;
  let boxId = req.body.boxId;
  let userId = req.body.user._id;
  let commentId;

  Comment.create({
    comment: comment,
    user: userId
  })
    .then(comment => {
      return (commentId = comment._id);
    })
    .then(comment =>
      User.updateOne(
        { _id: userId },
        {
          $push: {
            comments: comment._id
          }
        }
      )
    )
    .then(() =>
      Box.updateOne(
        { _id: boxId },
        {
          $push: {
            comments: commentId
          }
        }
      )
    )
    .catch(err => console.log(err));
});
