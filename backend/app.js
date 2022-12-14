const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const saucesRoutes = require('./routes/sauces')
const userRoutes = require('./routes/user');
const path = require('path');

const app = express();
app.use(express.json());

//Permet d'éviter les erreurs dû au CORS et au source différente 
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials','true')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', '*');
  next();
})

//Permet la connection au server Mongodb
mongoose.connect('mongodb+srv://JorisFerrari:Yj32nx75@cluster0.gn4neqo.mongodb.net/test',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


//execute les routes
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
module.exports= app;