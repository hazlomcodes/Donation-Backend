const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class User extends Model {
  async comparePassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  generateToken() {
    const payload = { userId: this.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
  }

  toJSON() {
    const values = { ...this.get() };
    delete values.password;
    return values;
  }
}

User.init(
  {
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    paranoid: true,
  }
);

User.addHook("beforeSave", async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

module.exports = User;