let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let PORT = 3001;
let app= express();


mongoose.connect('mongodb://localhost:27017/pottyPooper', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("Public"));

app.get("/", function(req, res){
    res.send("HOME")
})

app.listen(PORT, function(){
    console.log("Connected to http://localhost:" + PORT)
})
