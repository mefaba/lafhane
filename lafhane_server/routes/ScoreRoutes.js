//IMPORTS
const express = require('express');
const router = express.Router();
const User = require("../models/UserModel");

//ROUTES
//GET LEADERBOARD
router.get('/', (req, res) => {
    const SelectedUser = User.findOne({"username":req.body.username})
    //console.log(SelectedUser)
    res.send("Skorun bu: " + SelectedUser.score)
});

//GET LEADERBOARD
router.get('/leaderboard', (req, res) => {
    User.find().select("username score").sort({"score": -1}).then(x=>res.send(x)).catch(err=>res.send(err))
});

//PUT
router.put('/:username', (req, res) => {
    //console.log("arttırıyoruz "+req.body.point+"userın ismi: "+req.params.username)

    res.send("request recieved ")
    User.findOneAndUpdate({ username: req.params.username },{ $inc: {'score': req.body.point }}).catch(err=>(console.log(err)))
});




module.exports = router