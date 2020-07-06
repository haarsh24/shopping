const jwt = require("jsonwebtoken");
const User = require("../modles/user");

const auth = async (req, res, next) => {
    try {
        console.log(req.header)
        const token = req.header("authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.TOKEN_STRING);
        const user = await User.findOne({
            _id: decoded._id,
            "tokens.token": token,
        });

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: "Please authenticate." });
    }
};

module.exports = auth;