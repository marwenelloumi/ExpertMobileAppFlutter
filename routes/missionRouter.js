var express = require('express');
const mongoose = require("mongoose");
var router = express.Router();
const jwt = require('jsonwebtoken')
const Mission = require('../model/mission')
const Insurance = require('../model/insurance')
const Agency = require('../model/agency')
const Police = require('../model/police')
const Claim = require('../model/claim')
const Report = require('../model/report')
const Tiers = require('../model/tiers')
const Car = require('../model/car')
const axios = require('axios');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDZlZGU2YTBiYTYyNTcwYWZjZWFhYmEiLCJlbWFpbCI6InRlc3QudXNlckB1bmZyYXVkZWQuY29tIiwiaWRlbnRpZmllciI6InRlc3QudXNlckB1bmZyYXVkZWQuY29tIiwiaWF0IjoxNjU5NTU0NzkzLCJleHAiOjE2NjAxNTk1OTN9.kMqw_p3l6ZbQJNFLrtS59t2OO4UmqoLmLK4Zko_VWVc'

//router.get('/', authenticateToken, async (req, res) => {

// not complited yet
router.post('/genNumberV2', async (req, res) => {

    try {
        insurance = await Insurance.find({id:req.params.id})
        //number = generate_number
        res.json(number)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
router.post('/', async (req, res) => {

    console.log(req.body)
    try {
        

        let insuranceID = req.body.insurance.id

      
        let agencyID = req.body.agency.id
    
        let policeID = (await Police.create(req.body.police)).id

    
        let tiersID =  (await Tiers.create(req.body.tiers)).id

        let report = new Report.arguments
        report = req.body.report
        let reportID = (await Report.create(req.body.report)).id

        let car = new Car
        car = req.body.car
        let carID = (await Car.create(req.body.car)).id
        
        let claim = new Claim
        claim = req.body.claim
        claim.police = policeID
        claim.tiers = tiersID
        claim.report = reportID
        claim.car = carID
        claimID =  (await Claim.create(claim)).id
        let mission = new Mission({
            missionNumber:"", //traitement,
            description: req.body.mission.description,
            missionDate: req.body.mission.missionDate,
            type: req.body.mission.type,
            state: req.body.mission.state,
            claim:claimID,
            //expertWorkspace:
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


router.get('/', async (req, res) => {

    try {
        await updateMissions()
        missions = await Mission.find({ deleted: "false" }). populate({
        path: 'claim',
        populate: { path: 'police'}
        
      }).populate ({ path: 'claim',
      populate: { path: 'tiers'}})
      res.json(missions)
   

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: err.message })
    }
})


router.get('/archives', async (req, res) => {

    try {
        missions = await Mission.find({ deleted: "true" })
        res.json(missions)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
async function updateMissions() {
    axios.get('http://52.21.181.211:4200/mobileApp', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => {
            res.data.forEach(async function (mission) {
                let claim = new Claim
                claim._id = mission.claimId
                claim.activeStep=mission.activeStep
                claim.type = mission.type
                claim.kind = mission.kind
                claim.report = mission.report
                claim.claimDate = mission.claimDate       
                claim.claimNumber=mission.claimNumber

               
                
                
                

                let tier = new Tiers
                tier.address = mission.location
                tier.immatriculation= mission.immatriculation

                let mi = new Mission
                mi._id = mission._id
                mi.missionDate= mission.missionDate
                mi.missionNumber = mission.missionNumber
                let insuranceCompany= await Insurance.findOne({ name: mission.insurance.insuranceCompany} ).populate("agencies");
                insuranceCompany.agencies.forEach(element => {
                    if(element.name==mission.insurance.insuranceAgency)
                    mi.insuranceAgency = element.id
                    
                });
                
              
                mi.insuranceCompany = insuranceCompany.id
               

                

           
                let newpolice= await (Police.findOneAndUpdate({ contrat: mission.contratPolice}, { $set:{name: mission.namePolice
                    ,contrat:mission.contratPolice}  }, {
                    new: true,
                    upsert: true
                }));
                

          
                let newtier =await (Tiers.findOneAndUpdate({ immatriculation: tier.immatriculation}, { $set:{address : mission.location
                    ,immatriculation : mission.immatriculation} }, {
                    new: true,
                    upsert: true
                }))
                
                
               claim.police = newpolice.id
                claim.tiers = newtier.id
                 

                
                
             let newClaim = await (Claim.findOneAndUpdate({ _id: claim._id }, { $set: claim }, {
                    new: true,
                    upsert: true
                }));
                
                mi.claim = newClaim.id
          
                let newMission = await Mission.findOneAndUpdate({ _id: mi._id}, { $set: mi }, {
                    new: true,
                    upsert: true
                });
               
                
            });


        })
        .catch((error) => {
            console.log(error)
        })
}


module.exports = router;