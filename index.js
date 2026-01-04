const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require('method-override');



app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));

app.use(express.static(path.join(__dirname , "public")));

let posts = [
  {
    "id": uuidv4(),
    "username": "dharmik_dev",
    "content": "I am learning backend development with Node.js. Can someone explain REST APIs in simple terms with a real example?"
  },
  {
    "id": uuidv4(),
    "username": "code_with_amit",
    "content": "I already know basic Node.js. Which framework is better for performance and jobs?"
  },
  {
    "id": uuidv4(),
    "username": "js_ninja",
    "content": "I see app.use() everywhere. How exactly does middleware control request and response flow?"
  },
  {
    "id": uuidv4(),
    "username": "backend_buddy",
    "content": "Should I start with MongoDB or MySQL while learning backend development?"
  }
];


app.get("/posts" ,(req , res) => {
    res.render("index" , {posts});
});

app.get("/" ,(req , res) => {
    res.send("hi");
});

app.get("/posts/new", (req ,res) => {
    res.render("new");
});

app.post("/posts" , (req , res) => {
    let {username , content} = req.body;
    let id = uuidv4();
    posts.push({id , username , content});
    res.redirect("/posts");
});

app.get("/posts/:id" , (req , res) => {
  let {id} = req.params;
  console.log(id);
  let post = posts.find(p => p.id === id);
  res.render("show" , {post});
  console.log(post);
});

app.patch("/posts/:id" ,(req , res) => {
  let {id} = req.params;
  let newcontent  = req.body.content;
  let post = posts.find(p => p.id === id);
  post.content = newcontent;
  console.log(post);
  res.redirect("/posts");
});

app.get("/posts/:id/edit" , (req ,res) => {
  let {id} = req.params;
   let post = posts.find(p => p.id === id);
   res.render("edit" , {post});
})

app.delete("/posts/:id" , (req ,res) => {
  let {id} = req.params;
   posts = posts.filter(p => p.id !== id);
   res.redirect("/posts");
})
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});