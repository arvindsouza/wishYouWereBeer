const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');

const Beers = require('../models/beersList');

module.exports = router;

router.get('/showList', (req, res, next) => {
    Beers.GetBeers((err, allBeers) => {
        if(err) console.log(err);
        else
{        res.json(allBeers);
    console.log(allBeers);
}    })
})

router.post('/updateBeer', (req, res, next) => {
    let id = req.body.id;
    let rating = req.body.rating;

    Beers.updateBeer(id, rating ,(err, res) => {
        if(err)
        console.log('err');
    })
})

router.post('/addBeer', (req, res) => {
    let newBeer = new Beers({
        beerName: req.body.beerName,
        rating: req.body.rating,
        desc: req.body.desc
    })

    Beers.addBeer(newBeer, (err, res) => {
        if(err)
        console.log(err);
 
    })
    res.send('Success');
})