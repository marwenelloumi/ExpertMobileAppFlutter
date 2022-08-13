var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const axios = require('axios');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDZlZGU2YTBiYTYyNTcwYWZjZWFhYmEiLCJlbWFpbCI6InRlc3QudXNlckB1bmZyYXVkZWQuY29tIiwiaWRlbnRpZmllciI6InRlc3QudXNlckB1bmZyYXVkZWQuY29tIiwiaWF0IjoxNjU5NTU0NzkzLCJleHAiOjE2NjAxNTk1OTN9.kMqw_p3l6ZbQJNFLrtS59t2OO4UmqoLmLK4Zko_VWVc'

const Insurance = require('../model/insurance')
const Agency = require('../model/agency')
router.get('/', async (req, res) => {

    try {
        insurance = await Insurance.find().populate("agencies")
        updateInsurances()
        res.json(insurance)
        

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:name', async (req, res) => {

    try {
        insurance = await Insurance.find({ name: req.params.name }).populate("agencies")
        res.json(insurance)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
async function updateInsurances() {
    axios.get('http://52.21.181.211:4200/mobileApp/insurances', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then((res) => {
            console.log(res)

            res.data.forEach(async function (insurance) {
                var insuranceName = insurance.name;
                var insuranceId = insurance._id;
                
                insurance.agencies.forEach(async function (agency) {
                    var agencyName = agency.name;
                    var agencyId = agency._id;
                    let doc = await Agency.findOneAndUpdate({ _id: agencyId }, { $set: agency }, {
                        new: true,
                        upsert: true
                    });
                    
                    await Insurance.findOneAndUpdate({ _id: insuranceId }, {$set: insurance }, {
                        new: true,
                        upsert: true
                    });
                   
                });
            });


        })
        .catch((error) => {
            console.log(error)
        })
}
module.exports = router;