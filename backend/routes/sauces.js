const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauce');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

//definit les routes et permet l'utilisation de l'auhentification et du sauvgarde d'image
router.get('/', auth, saucesCtrl.getAllSauce);
router.post('/', auth, multer, saucesCtrl.createSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.post('/:id/like',auth, saucesCtrl.likeSauce);
module.exports = router;
