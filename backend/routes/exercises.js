const router = require('express').Router();
let Exercise = require('../models/exercise.model');



/**
 * Basic understanding of routing and connecting between the backend and the front end was learned from
 * 
 * https://www.youtube.com/watch?v=7CqJlxBYj-M
 * Jay
 */
router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const question = req.body.question;
  const option1 = req.body.option1;
  const option2 = req.body.option2;
  const option3 = req.body.option3;
  const answer = req.body.answer;


  const newExercise = new Exercise({
    username,
    question,
    option1,
    option2,
    option3,
    answer
  });

  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.question = req.body.question;
      exercise.option1 = req.body.option1;
      exercise.option2 = req.body.option2;
      exercise.option3 = req.body.option3;
      exercise.answer = req.body.answer;



      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;