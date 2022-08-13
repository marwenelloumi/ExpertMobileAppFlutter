var express = require('express');
var router = express.Router();
const jwt =require('jsonwebtoken')

const Honoraire = require('../model/honoraire')

router.get('/:id',async (req,res) => {

    try{
        honoraire = await Honoraire.findById({id:req.params.id }).populate("payments")
        res.json(honoraire)
  
    } catch(err){
        res.status(500).json({message:err.message})
    }
  })

  router.put('/:id', function(req, res, next) {
    Honoraire.findByIdAndUpdate(
        req.params.id, 
        {$set: req.body}
        ).populate("payements")
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