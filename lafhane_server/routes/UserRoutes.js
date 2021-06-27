//IMPORTS
const express = require('express');
const router = express.Router();
const User = require("../models/UserModel");


//ROUTES
//GET
router.get('/', (req, res) => {
    //console.log("al sana user")
});

//ADD
router.post('/', (req, res) => {
    User.exists({"username":req.body.username})
    .then(db_response=>res.send(db_response))
    .catch(err=>console.log("err "+err))
    /* const NewUser = new User({ username: req.body.username });
    NewUser.save()
    .then(() => res.send('NewUser is saved succesfully.'))
    .catch(err=> res.status(400).json('Cant save User '+ err)) */
    /* res.send("maintaining") */
    
});


//DELETE
router.delete('/', (req, res) => {
    console.log("geldi: " +  req.body.username)
    User.deleteOne({ username: req.body.username })
    .then(()=>res.send("User is deleted"))
    .catch(err=> res.status(400).json('Cant delete User '+ err))
});


module.exports = router