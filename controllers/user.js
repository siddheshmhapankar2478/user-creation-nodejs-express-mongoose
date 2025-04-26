import { User } from "../Models/User.js";

const userRegister = async (req, res) => {
  try {
    const body = req.body;
    const user = await User.create(body);
    res.json({ message: "User created", status: 200, user });
  } catch (err) {
    console.error(err);
    res.json({ message: err.message });
  }
};

export default userRegister;
