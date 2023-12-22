var express = require ("express");
var router = express.Router();
const Product = require ("../../models/product");

router.get("/", async (req, res) => {
    let products = await Product.find();
    res.send(products);
});

router.get("/:id", async (req, res) => {
    try{
        let product = await Product.findById(req.params.id);
        if (!product)
            return res.status(400).send("Product does not exist.")
        res.send(product);
    }
    catch (err) {
        return res.status(400).send("Invalid ID")
    }
});

router.post("/", async (req, res) => {
    let product = new Product(req.body);
    await product.save();
    res.send(product);
});

router.put("/:id", async (req, res) => {
    const product = await Product.findById(req.params.id);
    product.name = req.body.name;
    product.price = req.body.price;
    product.type = req.body.type
    await product.save();
    res.send(product);
});

router.delete("/:id", async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.send(product);
});

module.exports = router;