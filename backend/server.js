require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const updateBalanceRoute = require('./routes/updateBalance');
const buyTdcRoutes = require('./routes/buyTdc'); // Import the buyTdc routes
const User = require ('./models/userModel')
const session = require('express-session');





// express app
const app = express()


app.get("/bonjour", (req, res) => {
  res.send("Bonjour!");
});

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})


app.use(session({
  secret: 'my1secretkey',
  resave: false,
  saveUninitialized: true
}));




//routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)
//app.use('/api/updateBalance', updateBalanceRoute);
//app.use('/api/buyTdc', buyTdcRoutes);



// get all users
app.get("/users", async (req, res) => {
  try {
    const results = await User.find({});
    res.send(results);
  } catch (err) {
    console.log(err);
  }
});


//get user by email
app.get("/user", async (req, res) => {
  const email = req.query.email;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error retrieving user" });
  }
});



      // update user 
      app.put("/maj/:email" , async (req, res) =>{
  
        try {
            await User.findOneAndUpdate({email: req.params.email},{
            
              Nom : req.body.Nom,
              Prenom : req.body.Prenom ,
              Tlf : req.body.Tlf
            });
            res.send("mise à jour avec succès ! ");
        }
        catch (err) {
            console.log(err);
        }
    });


// Achat TDC by email
app.put("/update-solde/:email", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      { $inc: { Solde: Number(req.body.Solde) } },
      { new: true } // Returns the updated document
    );
    
    console.log(user); // add this line to check the value of user
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Purchase successful!", solde: user.Solde });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred during the purchase." });
  }
});



// vente TDC   
app.put("/update-soldeV/:email", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      { $inc: { Solde: -Number(req.body.Solde) } },
      { new: true }
    );

    console.log(user);

    res.json({ message: "Sale successful!", solde: user.Solde });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "An error occurred while selling." });
  }
});


    
app.post('/transfer', async (req, res) => {
  const { amount, recipientEmail, senderEmail } = req.body;
  console.log('Transfer request received:', { amount, senderEmail, recipientEmail });

  try {
    // Retrieve user data for sender and recipient
    const sender = await User.findOne({ email: senderEmail });
    const recipient = await User.findOne({ email: recipientEmail });
    console.log('Sender:', sender);
    console.log('Recipient:', recipient);

    if (!sender || !recipient) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    // Check that sender has enough funds to make transfer
    if (sender.Solde < amount) {
      console.log('Insufficient funds');
      return res.status(400).json({ error: 'Insufficient funds' });
    }

// Update sender's account balance
sender.Solde = Number(sender.Solde) - Number(amount);
await sender.save();

// Update recipient's account balance
recipient.Solde = Number(recipient.Solde) + Number(amount);
await recipient.save();


    console.log('Transfer successful');
    return res.status(200).json({ message: 'Transfer successful' });
  } catch (error) {
    console.error(error);
    console.log('Server error:', error.message);
    return res.status(500).json({ error: 'Server error' });
  }
});






//admin avtiver compte
app.put("/update-statut/:email", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      { statut: req.body.statut },
      { new: true }
    );

    console.log(user);

    res.json({ message: "Statut mis à jour avec succès!", statut: user.statut });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour du statut." });
  }
});

app.get("/user/statut", async (req, res) => {
  const email = req.query.email;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send({ statut: user.statut });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});






app.post('/charge', async (req, res) => {
  const { amount, id } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'USD',
      description: 'Example payment',
      payment_method: id,
      confirm: true,
    });

    console.log(payment);

    res.json({ message: 'Payment successful' });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Payment successful' });
  }
});



// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })