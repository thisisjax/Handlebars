var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

//Set up all routes
router.get("/", function(req, res) {
  console.log("home route hit")
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  })
});

router.post("/api/burgers", function(req, res) {
  buger.create([
    "burger_name", "devoured"
  ], [
    req.body.name, 0
  ], function(result) {
    res.direct("/");
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// router.delete("/api/burgers/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   burger.delete(condition, function(result) {
//     if (result.affectedRows == 0) {
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });


// Export routes for server.js to use.
module.exports = router;
