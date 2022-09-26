const mongoose = require('mongoose');
const MongooseErrors = require('mongoose-errors');

//model sauce
const sauceSchema = mongoose.Schema({
    userId: {type: String, require: true},
    name:{type: String, require: true},
    manufacturer:{type: String, require: true},
    description:{type: String, require: true},
    mainPepper:{type: String, require: true},
    imageUrl:{type: String, require: true},
    heat:{type: Number, require: true},
    likes: {type: Number},
    dislikes:{type: Number},
    usersLiked:{type: [String]},
    usersDisliked:{type: [String]}
});
sauceSchema.plugin(MongooseErrors);

module.exports = mongoose.model('Sauce',sauceSchema);