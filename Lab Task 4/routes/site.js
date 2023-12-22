var express = require("express");
var router = express.Router();
const Product = require("../models/product");

// Define a route for the home page
router.get('/', (req, res) => {
  console.log(req.session.user)
    res.render('index', {layout: './layouts/site-layout', isLandingPage: true, user: req.session.user}); // Render the 'index' view
  });

router.get('/all', async (req, res) =>{
    let products = await Product.find();
    res.render('./site/collection', {layout: './layouts/site-layout', isLandingPage: false, products, user: req.session.user})
  });
  
router.get('/necklace', async (req, res) =>{
    let products = await Product.find({type: 'Necklace'});
    res.render('./site/collection', {layout: './layouts/site-layout', isLandingPage: false, products, user: req.session.user})
  });

router.get('/ammara', async(req, res) =>{
    let products = await Product.find({collections: 'Ammara'});
    res.render('./site/collection', {layout: './layouts/site-layout', isLandingPage: false, products, user: req.session.user})
  });

router.get('/engagement', async (req, res) =>{
    let products = await Product.find({type: 'Engagement Ring'});
    res.render('./site/collection', {layout: './layouts/site-layout', isLandingPage: false, products, user: req.session.user})
  });

router.get('/rings', async (req, res) =>{
    let products = await Product.find({type: 'Ring'});
    res.render('./site/collection', {layout: './layouts/site-layout', isLandingPage: false, products, user: req.session.user})
  });

router.get('/earrings', async (req, res) =>{
    let products = await Product.find({type: 'Earring'});
    res.render('./site/collection', {layout: './layouts/site-layout',isLandingPage: false, products, user: req.session.user})
  });
  
router.get('/cart', async (req, res) =>{
  let cart = req.cookies.cart;
  if (!cart) {
    cart = []
  }
  res.render('./site/cart', {layout: './layouts/site-layout',isLandingPage: false, user: req.session.user, cart:cart  })
})

router.get('/cart/:id', async (req, res) =>{
  console.log(req.params.id)
  const product = await Product.findById(req.params.id);
  console.log(product)
  let cart = [];
  if(req.cookies.cart) {
    cart = req.cookies.cart;
  }
  cart.push(product)
  res.cookie("cart", cart)
  res.redirect('/all')
  // res.render("./admin/update_form", {layout: './layouts/admin-layout', product});
});

module.exports = router;