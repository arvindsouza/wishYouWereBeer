const mongoose = require('mongoose');

var beerSchema = mongoose.Schema({
    beerName: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    img: {
        type: String
    }
})

const beer = module.exports = mongoose.model('beers', beerSchema, 'BeersList');

module.exports.GetBeers = function(callback){
    beer.find(callback);
}

module.exports.updateBeer = function(id, rating, callback){
    beer.findByIdAndUpdate(id, {$set: {rating: rating}}, callback);
}

module.exports.addBeer = function(newBeer, callback){
    newBeer.save(callback);
}

module.exports.deleteBeer = function(id, callback){
    beer.deleteOne({_id:id}, callback);
}