var express = require("express");
var router = express.Router();
const Product = require("../../models/product");

router.get("/", (req, res) => {
    res.render('admin-index', {layout: './layouts/admin-layout.ejs'})
});

router.get('/all', async (req, res) =>{
    let products = await Product.find();
    res.render('./admin/all', {layout: './layouts/admin-layout', products})
  });

router.get("/all/:page?", async (req, res) => {
    let page = req.params.page ? req.params.page : 1;
    page = Number(page);
    let pageSize = 1;
    let products = await Product.find()
      .limit(pageSize)
      .skip((page - 1) * pageSize);
    let productCount = await Product.countDocuments();
    let totalPages = Math.ceil(productCount / pageSize);
    res.render("./admin/all", { layout: './layouts/admin-layout', products, page ,totalPages,});
  });

router.get('/delete', async (req, res) =>{
    let products = await Product.find();
    res.render('./admin/delete', {layout: './layouts/admin-layout', products})
  });

router.get("/delete/:id", async (req, res) => {
    console.log(req.params.id)
    const product = await Product.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
});

router.get('/update', async (req, res) =>{
  let products = await Product.find();
  res.render('./admin/update', {layout: './layouts/admin-layout', products})
});

router.get('/update/:id', async (req, res) =>{
  console.log(req.params.id)
  const product = await Product.findById(req.params.id);
  res.render("./admin/update_form", {layout: './layouts/admin-layout', product});
});

router.post("/update/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;
  product.type = req.body.type
  await product.save();
  res.redirect("/admin");
});

router.get('/add', (req, res) =>{
  res.render('./admin/add', {layout: './layouts/admin-layout'})
});

router.post("/add", async (req, res) => {
  // let error = Book.validate(req.body);
  // if (error) {
  //   req.session.flash = { type: "success", message: error.details[0].message };
  //   return res.redirect("back");
  // }
  let product = new Product(req.body);
  await product.save();
  // req.session.flash = { type: "success", message: "Book Saved!" };
  res.redirect("/admin");
});

router.get('/logout', (req, res) =>{
  req.session.user = null;
  req.session.results=null;
  res.redirect('/');
});

router.get("/calculate", (req, res) =>{
  const results = req.session.results || [];
  res.render('./admin/calculator', {layout: './layouts/admin-layout', results})
});

router.post("/calculate", async (req, res) => {
  let results = req.session.results || [];
  let {op1, operation, op2 } = req.body;
  let result;
  switch (operation) {
    case '+':
        result = parseFloat(op1) + parseFloat(op2);
        break;
    case '-':
        result = parseFloat(op1) - parseFloat(op2);
        break;
    case '/':
        result = parseFloat(op1) / parseFloat(op2);
        break;
    case '*':
        result = parseFloat(op1) * parseFloat(op2);
        break;
    case '%':
        result = parseFloat(op1) % parseFloat(op2);
        break;
  }
  results.push({ op1, op2, operation, result });
  req.session.results = results;
  res.redirect("/admin/calculate");
});


module.exports = router;