const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  console.log("here")
  isExist = users.find(user => user.username === req.body.username )
  if(!req.body.username || !req.body.password) res.status(400)
  if(isExist) res.status(400)
   users.push({
    username: req.body.username,
    password: req.body.password
  })
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  const data = JSON.parse(JSON.stringify(books))
  return res.status(300).json({message: data});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const book = JSON.parse(JSON.stringify(books))
  console.log(req.params.isbn);
  data = book.filter(bk => bk.isbn === Number(req.params.isbn))
  return res.status(300).json({message: data});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const book = JSON.parse(JSON.stringify(books))
    console.log(req.params.isbn);
    data = book.filter(bk => bk.author === req.params.author)
    return res.status(300).json({message: data});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const book = JSON.parse(JSON.stringify(books))
    console.log(req.params.isbn);
    data = book.filter(bk => bk.title === req.params.title)
    return res.status(300).json({message: data});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const book = JSON.parse(JSON.stringify(books))
    console.log(req.params.isbn);
    data = book.find(bk => bk.isbn === Number(req.params.isbn))
    return res.status(300).json({message: data.reviews});
});

module.exports.general = public_users;
