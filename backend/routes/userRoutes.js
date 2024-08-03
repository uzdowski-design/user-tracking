const express = require('express');
const axios = require('axios');
const User = require('../models/user');
const router = express.Router();

router.post('/new', async (req, res) => {
  try {
    const response = await axios.get(
      'https://random-data-api.com/api/v2/users'
    );
    const userData = response.data;

    const newUser = new User({
      userId: userData.id,
      userName: userData.first_name + ' ' + userData.last_name,
      avatar: userData.avatar
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

router.post('/scroll', async (req, res) => {
  try {
    const { userId } = req.body;
    await User.updateOne({ userId }, { scrolledToImage: true });
    res.status(200).json({ message: 'Scroll event tracked' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});

router.get('/report', async (req, res) => {
  try {
    const users = await User.find();
    const totalUsers = users.length;
    const scrolledUsers = users.filter((user) => user.scrolledToImage).length;
    const scrollPercentage = (scrolledUsers / totalUsers) * 100;

    res.status(200).json({
      totalUsers,
      scrollPercentage
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching report', error });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ accessedAt: -1 });

    res.status(200).json({
      users
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all users data', error });
  }
});

module.exports = router;
