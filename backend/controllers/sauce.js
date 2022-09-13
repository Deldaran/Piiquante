const Thing = require('../models/Thing');
const fs = require('fs');

exports.deleteSauce = (req, res, next) => {
    Thing.findOne({ _id: req.params.id})
    .then(thing => {
        if (thing.userId != req.auth.userId) {
            res.status(401).json({message: 'Not authorized'});
        } else {
            const filename = thing.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Thing.deleteOne({_id: req.params.id})
                    .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                    .catch(error => res.status(401).json({ error }));
            });
        }
    })
    .catch( error => {
        res.status(500).json({ error });
    });
  };
  
  exports.getAllSauce = (req, res, next) => {
    Thing.find().then(
      (things) => {

        res.status(200).json(things);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

exports.getOneSauce = (req, res, next) => {
    Thing.findOne({
      _id: req.params.id
    }).then(
      (thing) => {
        res.status(200).json(thing);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };

exports.createSauce = (req, res, next)=>{
    console.log(req.body);
    const thingObject = JSON.parse(req.body.sauce);
    delete thingObject.userId;
    const sauce = new Thing({
        ...thingObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes:0 ,
        dislikes:0,
        usersLiked:'[]',
        usersDisliked:'[]'
    });
    sauce.save()
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
 };

 exports.modifySauce = (req, res, next) => {
    const thingObject = req.file ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete thingObject._userId;
    Thing.findOne({_id: req.params.id})
        .then((thing) => {
            if (thing.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Thing.updateOne({ _id: req.params.id}, { ...thingObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };
 