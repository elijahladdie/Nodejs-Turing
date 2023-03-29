const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
//express app
const app = express();

// conecting to mongoDB
const dbURL =
"mongodb+srv://Laddie:elia123@nodecruster.0zxfi3j.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(dbURL)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
// Register EJS
app.set("view engine", "ejs");

/* app.use((req,res,next)=>{
*     console.log("New Request Made");
*     console.log("Host",req.hostname);
*     console.log("Path",req.path);
*     console.log("Method",req.method);
*     next();
 });
 */

// Middleware and static files

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "New Bog",
    snippet: "About my new blog",
    body: "more about my new blog",
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get('/all-blog',(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.send(result)
        })
    .catch((err)=>{
        console.log(err)
    })
})
app.get('/single-blog',(req,res)=>{
    Blog.findById('6300a91a297f9abf738247ac')
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes

app.use("/blogs", blogRoutes);

// 404 Page
app.use((req, res) => {
  // res.status(404).sendFile('./views/404.html',{root:__dirname});
  res.status(404).render("404", { title: "404" });
});
