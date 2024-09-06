const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  Nom: {
    type: String,
    required: false,
  },
  Prenom: {
    type: String,
    required: false,
  },
  Tlf: {
    type: String,
    required: false, 
  }, 
  Date_Nais: {
    type: Date,
    required: false,
  },
  Cin: {
    type: String,
    required: false,
  },
  Sexe: {
    type: String,
    required: false,
  },
  Solde: {
    type: Number,
    default: 0,
  },
  statut: {
    type: String,
    enum: ['active', 'inactive', 'new'],
    default: 'new',
    required: false
  },

})

// static signup method
userSchema.statics.signup = async function(email, password, Nom, Prenom, Tlf, Date_Nais, Cin, Sexe, Solde, statut) {

  // validation
  if (!email || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ 
    email, 
    password: hash, 
    Nom, 
    Prenom, 
    Tlf, 
    Date_Nais, 
    Cin, 
    Sexe, 
    Solde: 0 ,
    statut
  })

  return user
}


// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

// Define a method to update user information
userSchema.methods.updateInfo = async function (updateObj) {
  try {
    // Update user information with data from updateObj
    this.password = updateObj.password || this.password;
    this.Nom = updateObj.Nom || this.Nom;
    this.Prenom = updateObj.Prenom || this.Prenom;
    this.Tlf = updateObj.Tlf || this.Tlf;

    await this.save();
    return this;
  } catch (error) {
    console.log(error);
    throw new Error('Error updating user information');
  }
};

module.exports = mongoose.model('User', userSchema)
