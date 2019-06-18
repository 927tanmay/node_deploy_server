const express = require("express");

var app= express();

app.set('viewengine','hbs');

app.get('/about',(req,res)=>{
    res.render('about.hbs',{

        title: "About",
        currentYear : new Date().getFullYear()

    });
});


app.listen(3000,()=>{
    console.log("The server is running on port 3000");
});