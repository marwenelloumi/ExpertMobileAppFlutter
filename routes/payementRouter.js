var express = require('express');
var router = express.Router();
const jwt =require('jsonwebtoken')
const Payment = require('../model/payment')
const ews = require('../model/expertWorkspace')

//get list payments for connected user
router.get('/:id',async (req,res) => {

    try{
        payments = await Payment.find({expertWorkspace:req.params.id })
        res.json(payements)
  
    } catch(err){
        res.status(500).json({message:err.message})
    }
  })
//create honoraire
router.post('/:id',async(req,res) => {
    try {
      await ews.countDocuments({expertWorkspace:req.params.id},async(err,count)=>{
        if (count !== 1) {
        return res.status(404).json({ message: 'workspace does not exsit' })
        }
        else {
        
        const payement  = new Payment({
            expertWorkspace:req.params.id,
            name: req.body.name,
          email :req.body.email,
          address : req.body.addressn
          
  
        })
        try {
          const newUtilisateur = await utilisateur.save()
          res.status(201).json(newUtilisateur)
        } 
        catch (err) {
          res.status(400).json({ message: err.message })
        }
  
      }
      })
    } 
    catch (err) {
      return res.status(500).json({ message: err.message })
    }
  })
  module.exports = router;