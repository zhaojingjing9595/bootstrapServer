import User from '../models/userModel.js';

export const signUp = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ Client_Id: username });
    if (user) {
      res.status(401);
      throw new Error('This username already exists!');
    } else {
        const newUser = new User({ Client_Id: username, Client_Password: password });
        await newUser.save();
      res.send(newUser)
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ Client_Id: username });
    if (user && user.matchPassword(password)) {
      res.send(user);
    } else {
      res.status(401);
      throw new Error('Invalid username or password!');
    }
  } catch (error) {
    next(error);
  }
};


