const User = require('../models/userModel');

async function updateBalance(userId, amount) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.Solde += amount;
    await user.save();

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
}

module.exports = { updateBalance };
