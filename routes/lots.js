const express = require('express');
const router = express.Router();

const Lot = require('../models/lot');




router.get('/', function(req, res){
    Lot.find({}, function(err, lots){
        if (err) {
            console.log(err);
            return;
        }
        res.render('lots', {
            lots: lots
        });
    });
});

router.route('/add')
    .get(function(req, res){
        res.render('add', {
        });
    })
    .post(function(req, res){
        let data = req.body;        
        console.log(data);

        let newLot = new Lot();
        newLot.name = data.name;
        newLot.description = data.description;
        newLot.price = data.price;
        newLot.save(function(err){
            if(err){
                console.log(err);
                return;
            }
            res.redirect('/lots');
        })        
        return;
    });

// Lot page
router.get('/:id', function(req, res){
    Lot.findById(req.params.id, function(err, lot){
        if (err) {
            res.redirect('/lots');
            return;
        }       
        res.render('lot_page', lot);
    });
});

module.exports = router;