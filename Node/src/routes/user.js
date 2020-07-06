const express = require("express");
const router = new express.Router();
const User = require("../modles/user");
const auth = require("../middleware/auth");

const canBeUpdated = [
    "name",
    "email",
    "phone",
    "address",
    "password",
    "cart",
    "age",
    "dob",
    "gender",
];

router.get("/api/user", auth, async(req, res) => {
    try {
        res.send(req.user);
    } catch (e) {
        res.send(e);
    }
});

router.post("/api/login", async(req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post("/api/logout", auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.status(200).send();
    } catch (e) {
        res.status(405).send();
    }
});

router.post("/api/logout/all", auth, async(req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send("logout of all devices Successfully");
    } catch (e) {
        res.status(405).send();
    }
});

router.post("/api/user", async(req, res) => {
    try {
        const toBeUpdated = Object.keys(req.body);
        const isValid = toBeUpdated.every((update) =>
            canBeUpdated.includes(update)
        );
        if (!isValid) {
            return res.send("key not found");
        }
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(501).send(e);
    }
});

router.patch("/api/user", auth, async(req, res) => {
    try {
        const toBeUpdated = Object.keys(req.body);
        const isValid = toBeUpdated.every((update) =>
            canBeUpdated.includes(update)
        );
        if (!isValid) {
            res.status(401).send("key is not valid");
        }
        toBeUpdated.every((update) => {
            req.user[update] = req.body[update];
        });
        req.user.save();
        res.status(200).send(req.user);
    } catch (e) {
        console.log(e);
        res.status(405).send("Update Not Available");
    }
});

router.delete("/api/user", auth, async(req, res) => {
    try {
        req.user.delete();
        res.status(200).send();
    } catch (e) {
        res.sendStatus(405);
    }
});

module.exports = router;