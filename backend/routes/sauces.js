const express = require('express');
const router = express.Router();
const Thing = require('../models/Thing');

router.post('/sauces',(req, res, next)=>{
    delete req.body._id;
      const thing = new Thing({
        ...req.body
      });
      thing.save()
      .then(()=> res.status(201).json({message:'objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
      next();
  });
  
router.put('/:id', (req, res,next)=>{
    Thing.updateOne({_id: req.params.id},{...req.body, _id: req.params.id})
    .then(()=> res.status(200).json({message: 'objet modifié'}))
    .catch(error => res.status(400).json({error}));
  });

  module.exports = router;
