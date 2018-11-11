var User = require("..//models/user").User;

const login = async (req, res) => {
  const { userData } = req.body;

  try {
    let user = await User.findOne({ username: userData.username });

    if (user && user.isValidPassword(userData.password)) {
      res.json({ user: user.toAuthJSON() });
    } else {
      res.status(400).json({ errors: { global: "Invalid credentials" } });
    }
  } catch (e) {
    res.status(400).json({ errors: { global: "Invalid credentials" } });
  }
};

const signup = async (req, res) => {
  const { userData } = req.body;

  var user = new User();

  user.username = userData.username;
  user.setPassword(userData.password);
  try {
    let savedUser = await user.save();

    res.json({ user: user.toAuthJSON() });
  } catch (e) {
    res.status(400).json({ errors: { global: "Invalid credentials" } });
  }
};

var userController = {
  login,
  signup
};

module.exports = userController;
