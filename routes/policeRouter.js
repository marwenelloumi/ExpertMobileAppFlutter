var express = require('express');
var router = express.Router();
const jwt =require('jsonwebtoken')

const Police = require('../model/police')

  router.put('/:id', function(req, res, next) {
    Police.findByIdAndUpdate(
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