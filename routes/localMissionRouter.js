var express = require('express');
const mongoose = require("mongoose");
var router = express.Router();
const jwt = require('jsonwebtoken')
const Mission = require('../model/mission')
const Insurance = require('../model/insurance')


router.post('/', async (req, res) => {

    console.log(req.body)
    try {
        

        let insuranceID = req.body.insurance._id

      
        let agencyID = req.body.agency._id
    
        
        let mission = new Mission({
            missionNumber:"", //traitement,
            missionDate: Date().now,
      
            //expertWorkspace:
            insuranceCompany:insuranceID,
            insuranceAgency:agencyID
           // honoraire:
        })
        mission.save()
        res.send(mission)

    } catch (err) {
        console.log(err.message )
        res.status(500).json({ message: err.message })
    }
})

module.exports = router;