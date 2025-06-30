const User = require("../models/User")

async function me(context) {
    if (!context.userId) throw new Error("Not authenticated")
    return await User.findById(context.userId)
}

module.exports = me