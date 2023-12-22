var express = require ("express");
var router = express.Router();
const User = require ("../../models/user");

router.get("/", async (req, res) => {
    let users = await User.find();
    res.send(users);
});

router.get("/:id", async (req, res) => {
    try{
        let user = await User.findById(req.params.id);
        if (!user)
            return res.status(400).send("User does not exist.")
        res.send(user);
    }
    catch (err) {
        return res.status(400).send("Invalid ID")
    }
});

router.post("/", async (req, res) => {
    let user = new User(req.body);
    await user.save();
    res.send(user);
});

router.put("/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    user.name = req.body.name;
    await user.save();
    res.send(user);
});

router.delete("/:id", async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
});

module.exports = router;