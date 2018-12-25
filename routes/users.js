const express = require('express');
const router = express.Router();

// const { check, validationResult } = require('express-validator/check');
// const 
const bcrypt = require('bcryptjs');
const passport = require('passport');

let User = require('../models/user');

router.get('/register', function(req, res){
    res.render('register');
});

router.post('/register', function(req, res){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const password_confirm = req.body.password_confirm;
    // console.log(username, email, password, password_confirm);

    req.checkBody('username', 'Имя рользователя не введено').notEmpty();
    // check('username').notEmpry();
    req.checkBody('email', 'Не указан e-mail').notEmpty();
    req.checkBody('email', 'E-mail имеет не правильный формат').isEmail();
    req.checkBody('password', 'Не введен пароль').notEmpty();
    req.checkBody('password_confirm', 'Введенные пароли не совпадают').equals(req.body.password);
   
    let errors = req.validationErrors();


    if(errors){
        console.log(errors);
        res.render('register', {
            errors: errors
        });
    } else {
        let newUser = new User({
            username: username,
            email: email,
            password: password
        });
        bcrypt.genSalt(10, function(err, salt){
            if(err){
                console.log(err);
                return;
            }
            bcrypt.hash(newUser.password, salt, function(err, hash){
                if(err){
                    console.log(err);
                    return;
                }
                newUser.password = hash;
                newUser.save(function(err){
                    if(err){
                        console.log(err);
                        return;
                    }
                    req.flash('success', 'Вы зарегистрированы');
                    res.redirect('/user/login');
                });
            });
        });
        
    }

    return;    
});


router.get('/login', function(req, res){
    res.render('login');
});

router.post('/login', function(req, res, next){
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'You are logged out!');
    res.redirect('/user/login');
});



module.exports = router;