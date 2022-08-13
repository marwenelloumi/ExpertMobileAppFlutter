var express = require('express');
var router = express.Router();
const jwt =require('jsonwebtoken')

const Tiers = require('../model/tiers')

  router.put('/:id', function(req, res, next) {
    Tiers.findByIdAndUpdate(
        req.params.id, 
        {$set: req.body}
        )
    .then((err,data) => {
        if(err){
            res.status(400).send(err)
        }
        else{
            res.json(data)
        }
    })
});
module.exports = router;