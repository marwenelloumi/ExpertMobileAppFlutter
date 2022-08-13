var express = require('express');
var router = express.Router();
const jwt =require('jsonwebtoken')
const Car = require('../model/car')
const ews = require('../model/expertWorkspace')
const Claim = require('../model/claim')
router.get('/:id',async (req,res) => {

    try{
        car = await Car.findById({id:req.params.id }).populate("claim")
        res.json(car)
  
    } catch(err){
        res.status(500).json({message:err.message})
    }
  })


  router.get('/serchCarList/:licencePlateNumber',async (req,res) => {

    try{
        car = await Car.findOne({licencePlateNumber:req.params.licencePlateNumber })
        res.json(car)
  
    } catch(err){
        res.status(500).json({message:err.message})
    }
  })

  

  router.put('/:id', function(req, res, next) {
    Car.findByIdAndUpdate(
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