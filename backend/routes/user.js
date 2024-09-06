const express = require('express');
const { loginUser, signupUser, getUsers, deleteUser, updateUser } = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth');
const User = require('../models/userModel');


const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// get all users route
router.get('/users', requireAuth, getUsers);

// delete user route
router.delete('/users/:id', requireAuth, deleteUser);

// update user route
router.put('/users/:id', requireAuth, updateUser);




// Update user information
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update user information with data from request body
    this.password = updateObj.password || this.password;
    this.Nom = updateObj.Nom || this.Nom;
    this.Prenom = updateObj.Prenom || this.Prenom;
    this.Tlf = updateObj.Tlf || this.Tlf;

    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});



module.exports = router;
