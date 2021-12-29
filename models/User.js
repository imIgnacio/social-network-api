const { Schema, model } = require('mongoose');
import { isEmail } from 'validator';

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: ture,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [ isEmail, 'invalid email' ]
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],

    friends: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;
