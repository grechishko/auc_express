const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// App Init
const app = express();
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DB
mongoose.connect('mongodb://localhost/auc', { useNewUrlParser: true });
const db = mongoose.connection;
db.once('open', function(){
    console.log('Connected to MongoDB');
});
db.on('error', function(err){
    console.log(err);
});


// Models
let Lot = require('./models/lot');





// Middleware
app.use(function(req, res, next){
    console.log('%s %s', req.method, req.url);
    next();
});



app.get('/lots', function(req, res){
    Lot.find({}, function(err, lots){
        if (err) {
            console.log(err);
            return;
        }
        // console.log(lots[0]._id);
        res.render('lots', {
            page: 'Лоты',
            lots: lots
        });
    });
});

// Lot page
app.get('/lots/:id', function(req, res){
    let id = req.params.id;  
    console.log('id: ' + id);
    if (!id) {
        res.redirect('/lots');
        return;
    }
    Lot.findOne({_id: id }, function(err, lot){
        if (err) {
            console.log('Error:\n')
            console.log(err);
            return;
        }
        let tmp = lot;
        console.log(tmp.name, tmp.id, tmp.description, tmp.price);
        console.log('\n' + tmp.images_urls[0]);
       
        res.render('lot', tmp);
    });
});

app.route('/signup')
    .get(function(req, res){
        res.render('signup', {
        });
    })
    .post(function(req, res){
        // let data = req.body;        
    });


app.route('/add')
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


app.get('/', function(req, res){
    res.render('main');
});


app.listen(3000, function(){
    console.log('Listnin in port 3000..');
});