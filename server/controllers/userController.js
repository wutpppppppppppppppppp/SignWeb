const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add middleware to check user role and permissions
// For example:
// const isAdmin = (req, res, next) => {
//   if (req.user.role === 'admin') {
//     next();
//   } else {
//     res.status(403).json({ message: 'Forbidden' });
//   }
// };

// Then, apply the middleware to the appropriate routes:
// router.post('/users', isAdmin, createUser);
// router.get('/users/:id', isAdmin, getUser);
// router.put('/users/:id', isAdmin, updateUser);
// router.delete('/users/:id', isAdmin, deleteUser);
// router.get('/users', getUser); // Allow all users to view users
