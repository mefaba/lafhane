//IMPORTS
const cron = require("node-cron");
const http = require('http');
const express = require("express")
const cors = require('cors')
const data = require("./main.js")
const socketio = require('socket.io');
const mongoose = require('mongoose')
const User = require("./models/UserModel");
require('dotenv').config(); //defalut is .env in same folder

//MIDDLEWARES
const app = express()
const server = http.createServer(app);
app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(cors())

//DATA


//SOCKETIO LOGIC
const io = socketio(server)

// schedule tasks to be run on the server
//Change Data every 1 Minute
//let currentData = data[0] //At first,  currentData will be equal first object of data.json.
//let interval = 0
//cron.schedule("*/1 * * * *", function() {
//    currentData = data[interval] // this will be data[i], each 3 minutes will change the data being sended.
//    interval++
//    console.log("running a task every minute", "interval: ", interval);
//});

 io.on('connection', (socket) => {
    //console.log('a user connected');
    socket.on("join", ({username}) => {
        /* console.log(username + " entered the game and socket id: " + socket.id); */
        const NewUser = new User({ "username": username, "socket_id":socket.id});
        NewUser.save()
       
    })
    socket.on("disconnect", () => {
        User.findOneAndDelete({"socket_id": socket.id},function (err) {console.log("disconnect " + err)})
        //console.log("user disconnected and deleted "+ socket.id)
    })
    /* let myinterval;
    if (myinterval) {
        clearInterval(myinterval);
    }
    myinterval = setInterval(() => { socket.emit("LAF_API", currentData)} , 3000); //send currentData to client every 3 second
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(myinterval);
    }); */ 
});

let counter = 0
let gameTime= 40 //180
let resultTime = 20 //20
let currentStage = "gameStage" //gameStage or resultStage

const gameInterval = setInterval(() => { 
    if(gameTime===0){
        currentStage = "resultStage"
        resultTime--
        
        if(resultTime===0){
            //counter++
            console.log(counter)
            counter===9 ? counter = 0 : counter++ // şu an sınırlı sayıda kelime olduğu için, normalde sadece counter++
            gameTime = 40
            resultTime = 20
        }
    }else{
        gameTime--
        currentStage = "gameStage"
    }
}, 1000);

app.get("/", (req,res)=>{
    res.send("Server is Running")
})


app.get("/api/remainingtime", (req,res)=>{
    /* res.json({"remainingtime": remainingtime}) */
    res.json({ "currentStage": currentStage,"gameTime": gameTime, "resultTime": resultTime})
})

app.get("/api/gametable",(req,res)=>{
    res.json({"currentData": data[counter]})
})

/* DATABASE CONNECT */

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
.then(()=>console.log("Database connected succesfully"))
.catch(err=>console.log(err))

//ROUTES
app.use('/api/users', require('./routes/UserRoutes'))
app.use('/api/scores', require('./routes/ScoreRoutes'))


//SERVER LISTEN
server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));

