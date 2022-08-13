var express = require('express');
var router = express.Router();
const jwt =require('jsonwebtoken')
const Utilisateur = require('../model/user')
/* GET users listing. */
/*router.get('/',async (req,res) => {
  try{
     const utilisateurs= await Utilisateur.find()
     res.json(utilisateurs)
 
   } 
   catch(err){
     res.status(500).json({message:err.message})
   }
 })*/
//Getting All
router.get('/',authenticateToken,async (req,res) => {

  try{
    Utilisateurs = await Utilisateur.findOne({userEmail:res.utilisateur.email })
      res.json(Utilisateurs)

  } catch(err){
      res.status(500).json({message:err.message})
  }
})

 async function authenticateToken(req,res,next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401);
  jwt.verify(token,process.env.ACCSESS_TOKEN_KEY,async(err,utilisateur)=> {
      if(err) return res.sendStatus(403)
      req.utilisateur=utilisateur
      try {
          utilisateur = await Utilisateur.findOne({email:req.utilisateur.email })
     
      } 
      catch (err) {
          return res.status(500).json({ message: err.message })
      }
      res.utilisateur = utilisateur
      next()
  })
}
module.exports = router;
