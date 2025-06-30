const User = require("../models/User")
const { generateToken, comparePassword } = require("../utils/auth");

async function loginUser(email, password) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");
    const token = generateToken(user.id);
    return { ...user.toObject(), id: user._id, token };
}


module.exports = { loginUser }