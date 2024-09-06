const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
};

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({email, token});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

// signup a user
const signupUser = async (req, res) => {
  const {email, password, Nom, Prenom, Tlf, Date_Nais, Cin, Sexe, Solde, statut} = req.body;

  try {
    const user = await User.signup(email, password, Nom, Prenom, Tlf, Date_Nais, Cin, Sexe, Solde, statut);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({email, token, Nom, Prenom, Tlf, Date_Nais, Cin, Sexe, Solde, statut});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

// get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

// delete a user
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

// update a user
const updateUser = async (req, res) => {
  const {email, password, Nom, Prenom, Tlf, Date_Nais, Cin, Sexe, Solde} = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {email, password, Nom, Prenom, Tlf, Date_Nais, Cin, Sexe, Solde}, {new: true});
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

module.exports = { signupUser, loginUser, getUsers, deleteUser, updateUser };
