const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { usernames, emails, getRandomThought } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing Thoughts
  await Thought.deleteMany({});

  // Drop existing students
  await User.deleteMany({});

  // Create empty array to hold the users
  const users = [];
  const thoughts = [];

  // Loop 20 times -- add users to the users array and thoughts to thoughts array
  for (let i = 0; i < 20; i++) {
    const username = usernames[i];
    const email = emails[i];
    const thought = getRandomThought();

    users.push({ username, email, });
    thoughts.push({thought, username,});
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // Add Thoughts to the collection and await the results
  await Thought.collection.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
