const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
path = require('path');

const config = 'mongodb://localhost:27017/Beers';
const beers = require('./routes/beers');

const server = express();
const port = 4200;

const fileUpload = require('connect-multiparty');

//Connect to database
mongoose.connect(config);

mongoose.connection.on('connected', ()=>{
    console.log('connected to database ' + config );
})

//CORS
/* server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); */

server.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))


//Body Parser
server.use(bodyParser.json(
   { limit:'50mb'}
));

//Set static folder
//server.use(express.static(path.join(__dirname, 'public')));


//Routes
server.use('/beers', beers);


server.get('/', (req, res) => {
    res.send("This is a test");
    });


//Start Server
server.listen(port, () => {
    console.log('Server started on port '+ port);

  //  server.get('*', (req, res) => {
   //     res.sendFile(path.join(__dirname, 'public/index.html'));
   // })
})


