const { Thought, User } = require('../models');

module.exports = {
  // Get all Thoughts
  getThoughts(req, res) {
    Thought
    .find()
    .then((thoughts) => {
      const thoughtObject = {
        thoughts,
      };
      return res.json(thoughtObject);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
  },
  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({thought})
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
    .then((thought) => res.json(thought))
    .catch((err) => res.status(500).json(err));
  },
  // Delete a thought
  deleteThought(req, res) {
    return;
  },
  // Update a thought
  updateThought(req, res) {
    return;
  }
};
