const User = require('../models/User');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Compare plain passwords
    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Success
    res.status(200).json({
      message: 'Login successful',
      role: user.role,
      name: user.name,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { loginUser };
