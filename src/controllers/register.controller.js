const User = require("../models/User")
const { generateToken, hashPassword, comparePassword } = require("../utils/auth");


async function registerUser(username, email, password) {
    const hashedPassword = await hashPassword(password)
    const user = await User.create({ username, email, password: hashedPassword });
    const token = generateToken(user.id);
    return { ...user.toObject(), id: user._id, token };
}

module.exports = {  registerUser }