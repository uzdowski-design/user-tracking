import express, { Request, Response } from 'express';
import axios from 'axios';
import User, { IUser } from '../models/user';

const router = express.Router();

// Route to create a new user
router.post('/new', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      'https://random-data-api.com/api/v2/users'
    );
    const userData = response.data;

    const newUser = new User({
      userId: userData.id,
      userName: `${userData.first_name} ${userData.last_name}`,
      avatar: userData.avatar
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Route to update user scroll event
router.post('/scroll', async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    await User.updateOne({ userId }, { scrolledToImage: true });
    res.status(200).json({ message: 'Scroll event tracked' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});

// Route to get the report
router.get('/report', async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find();
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

// Route to get all users sorted by accessedAt
router.get('/users', async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find().sort({ accessedAt: -1 });

    res.status(200).json({
      users
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all users data', error });
  }
});

export default router;
