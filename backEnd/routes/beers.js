const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const upload = multer({
    dest: 'uploads/'
})

const Beers = require('../models/beersList');

module.exports = router;

router.get('/showList', (req, res, next) => {
    Beers.GetBeers((err, allBeers) => {
        if(err) console.log(err);
        else
{        res.json(allBeers);
    console.log('Success');
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
    console.log(req.body);
    let newBeer = new Beers({
        beerName: req.body.beerName,
        rating: req.body.rating,
        desc: req.body.desc,
        img: req.body.img[0].name
    })

    Beers.addBeer(newBeer, (err, res) => {
        if(err)
        console.log(err);
 
    })
    res.send('Success');
})

router.post('/deleteBeer', (req,res) => {
    let id = req.body.id;
console.log(id);
    Beers.deleteBeer(id, (err,res) => {
        if(err) console.log(err);
    })
    res.send('Success');
})