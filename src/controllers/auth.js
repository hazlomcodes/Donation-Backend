import { Op } from "sequelize";
import User from "../models/user";


export async function login(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username: { [Op.eq]: username } } });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }
  const validPassword = await user.comparePassword(password);
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid credentials." });
  }
  const token = user.generateToken();
  res.json({ token, user: user.toJSON() });
}
