var express = require('express');
var router = express.Router();

const Celebrity = require('../models/Celebrity')

router.get('/add-celebrity', (req,res,next) =>{
    res.render('celebrities/new-celebrity')
})

router.post('/add-celebrity', (req,res,next) =>{

    let {name, occupation, catchPhrase} = req.body;

    Celebrity.findOne({
        name: name
    })
    .then(foundCelebrity => {
        if(foundCelebrity){
            res.render('celebrities/new-celebrity', {errorMessage: 'celebrity already exists. try again.'})
        }else{
            Celebrity.create({
                name, 
                occupation, 
                catchPhrase
            })
            .then((createdCelebrity) => {
                console.log('Created celebrity ===>',createdCelebrity);
                res.redirect('/all-celebrities')
            })
        }
    })
    .catch(error => {
        console.log(error)
        next(error)
    })

})

router.get('/all-celebrities', (req, res, next) => {

    Celebrity.find() //getting all celebrities as array.
    .then((celebrities) => {
            console.log('Found Celebrities', celebrities);
            res.render('celebrities/celebrities.hbs',{celebrities})
        })
    .catch(err => {
        console.log(err);
        next(err);
    })

})

module.exports = router;
