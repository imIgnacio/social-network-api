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
  async createThought(req, res) {
      try{
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate({ _id: req.body.userId },{ $push: { thoughts: thought } },{ new: true });

        res.status(200).json(thought);
      }catch(err){
          res.status(500).json(err);
      }
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No such thought exists' })
        : res.status(200).json({ message: "Thought removed successfullly" })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { thoughtText: req.body.thoughtText, username: req.body.username }, { new: true })
    .then((thought) => {
      !thought
        ? res.status(400).json({ message: 'No thought found' })
        : res.status(200).json(thought)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  // Create a reaction for a thought
  createReaction(req, res) {  
      
    Thought.findOneAndUpdate( { _id: req.params.thoughtId }, { $push: { reactions: req.body } }, { new: true } )
    .then((thought) => {
        res.status(200).json(thought);
    })
    .catch(err => res.json(err));
  },
  // Delete a reation from a thought
  deleteReaction(req, res) {
    return;
  }
};
