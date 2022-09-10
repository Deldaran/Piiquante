const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb+srv://JorisFerrari:<Ferrari06>@cluster0.gn4neqo.mongodb.net/test',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use ((req, res, next) =>{
    console.log('requête reçus');
    next();
});

app.use((req, res, next) =>{
    res.status(201);
    next();
});

app.use((req, res, next) =>{
    res.json({ message: 'Votre requête a bien était reçue'});
});

app.use ((req, res) =>{
    console.log('requête reçus et réponse envoyer')
});

app.use('/api/auth', userRoutes);

module.exports= app;