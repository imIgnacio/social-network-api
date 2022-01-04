const { User, Thought } = require('../models');

// Aggregate function to get the number of Users overall
const headCount = async () =>
  User.aggregate()
    .count('userCount')
    .then((numberOfUsers) => numberOfUsers);

module.exports = {
  // Get all Users
  getUsers(req, res) {
    User
    .find()
    .then(async (users) => {
      const UserObject = {
        users,
        headCount: await headCount(),
      };
      return res.json(UserObject);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
  },
  // Get a single User
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({user})
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : res.status(200).json({ message: "User removed successfullly" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Update a user
  updateUser(req, res){
    User.findOneAndUpdate({ _id: req.params.userId }, { username: req.body.username, email: req.body.email }, { new: true })
      .then((user) => {
        !user
          ? res.status(400).json({ message: 'No user found' })
          : res.status(200).json(user)
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Create a friend
  async createFriend(req, res){
    try{

      if(req.params.userId === req.params.friendId){
        return res.status(400).json({ message: 'You cannot add yourself as friend'});
      }

      let user = await User.findOne({ _id: req.params.userId })
      let friend = await User.findOne({ _id: req.params.friendId })

      if(!user){
        return res.status(400).json({ message: 'No user found'});
      }else if(!friend){
        return res.status(400).json({ message: 'No friend to add found'});
      }

      user.friends.push(friend);
      user.save();
      return res.status(200).json(user);

    }catch(err){
      res.status(500).json(err);
    }

  },
  // Delete a friend
  async deleteFriend(req, res){
    try{

      if(req.params.userId === req.params.friendId){
        return res.status(400).json({ message: 'You cannot delete yourself as friend'});
      }

      let user = await User.findOne({ _id: req.params.userId })
      let friend = await User.findOne({ _id: req.params.friendId })

      if(!user){
        return res.status(400).json({ message: 'No user found'});
      }else if(!friend){
        return res.status(400).json({ message: 'No friend to add found'});
      }

      // Remove friend from friends list
      const index = user.friends.indexOf(friend._id);
      if (index > -1) {
        user.friends.splice(index, 1);
      }

      user.save();
      return res.status(200).json(user);

    }catch(err){
      res.status(500).json(err);
    }
  },
};
