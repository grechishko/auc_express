const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/auc', { useNewUrlParser: true });
const db = mongoose.connection;


// Check connection
db.once('open', function(){
    console.log('Connected to MongoDB');
});
// Check for DB errors
db.on('error', function(err){
    console.log(err);
});


// Bring in Models
let Lots = require('./models/lots');




// var store = {
//         home: {
//             page: "Main page",
//             content: "Home, sweet home"
//         },
//         about: {
//             page: "About page",
//             content: "This is about page"
//         },
//         lot: {
//             page: "Страница лота",
//             content: "Лот"
//         },
//         search: {
//             page: "Поиск",
//             content: "поиск"
//         }
//     },
//     storeKeys = Object.keys(store);


app.set('view engine', 'jade');

app.use(function(req, res, next){
    console.log('%s %s', req.method, req.url);
    next();
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));


// app.get('/about', function(req, res){
//     res.render('about', {
//         page: 'About Page',
//         links: storeKeys
//     });
// });



// app.route('/new')
//     .get(function(req, res){
//         res.render('new', {
//             page: 'Add New',
//             links: storeKeys
//         });
//     })
//     .post(function(req, res){
//         let data = req.body;
//         if (data.pageurl && data.pagename && data.pagecontent) {
//             store[data.pageurl] = {
//                 page: data.pagename,
//                 content: data.pagecontent
//             };
//             storeKeys = Object.keys(store);
//         }
//         res.redirect('/');
//     });

app.get('/lots', function(req, res){
    Lots.find({}, function(err, lots){
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
    Lots.findOne({_id: id }, function(err, lot){
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
        let data = req.body;
        // if (data.pageurl && data.pagename && data.pagecontent) {
        //     store[data.pageurl] = {
        //         page: data.pagename,
        //         content: data.pagecontent
        //     };
        //     storeKeys = Object.keys(store);
        // }
        // res.redirect('/');
    });

// app.get('/:page?', function(req, res){
//     let page = req.params.page;
//     if (!page) page = 'home';
//     let data = store[page];
//     if (!data) {
//         res.redirect('/');
//         return;
//     }
//     data.links = storeKeys;
//     data.query = req.query;
//     res.render('main', data);
// });

app.get('/', function(req, res){
    res.render('main');
});














app.listen(3000, function(){
    console.log('Listnin in port 3000..');
});