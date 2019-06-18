const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();
app.use(express.static(__dirname + '/public'));

const port= process.env.PORT || 3000;

app.use((req,res,next)=>{
    var stamp = new Date().toString();
    
    var log= `${stamp}: ${req.url} ${req.method}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err){
            console.log("Unable to fetch");
        }

    })
    
    next();

});


// app.use((req,res,next)=>{
//     res.render("maintainence.hbs",{
//         msg:"The site is under maintainence. It will be updated soon."
//     }

//     )
// }
// );
app.get("/projects",(req,res)=>{
    res.render("projects.hbs",{
        title: "Projects",
        msg : "This page displays all the projects"
    });
}

);



app.set('viewengine','hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('scream', (text)=>{
    return text.toUpperCase();
})

app.get("/",(req,res)=>{
res.render("home.hbs",{

    title: "Home",
    msg:"Welcome to the home page"
});
});


app.get('/about',(req,res)=>{
    res.render('about.hbs',{

        title: "About",
        

    });
});



app.get('/bad',(req,res)=>{
    res.send({
        Status: "Error",
        Type: "Unable to connect"
})


}
);


app.listen(port,()=>{
    console.log(`The server is running on port ${port}.`)
});