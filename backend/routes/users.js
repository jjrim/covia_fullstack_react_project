const router = require('express').Router();
let User = require('../models/user.model');


/**
 * Basic understanding of routing and connecting between the backend and the front end was learned from
 * 
 * https://www.youtube.com/watch?v=7CqJlxBYj-M
 * Jay
 */
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const score = req.body.score;


  const newUser = new User({username, score});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
