import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { shorturl ,getOriginalUrl} from './controllers/url.js'; 


const app = express();
app.use(express.static(path.join(path.resolve(),'public')));// to set the static file

app.use(express.urlencoded({extended:true}));

mongoose
  .connect("mongodb+srv://Shivam:shivam12@cluster.fg12tqg.mongodb.net/", {
    dbname: "NodeJS_Mastery_course",
  })
  .then(() => {
    console.log("Connected to MongoDB");
  });

//rendering Ejs file
app.get("/",(req,res)=>{
    res.render("index.ejs",{shortUrl: null});
})

//shorting the url logic
app.post("/shorten",shorturl);

// redirecting to original url using short code :- dynamic routing
app.get("/:shortCode",getOriginalUrl);




const Port = 3000;
app.listen(Port,()=>{
    console.log(`server is running on http://localhost:${Port}`);
})