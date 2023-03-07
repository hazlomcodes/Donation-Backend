import { Op } from "sequelize";
import { findOne } from "../models/user";

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await findOne({ where: { username } });
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
