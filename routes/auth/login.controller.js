const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { hash } = require('../../utils/crypto');

//@desc accedere con un utente
//@route POST /api/auth/login
//@access public
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = hash(password);

    if (hashedPassword === process.env.PASSWORD && username === process.env.USERNAME) {
        const accessToken = jwt.sign({
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

        res.status(200).send({
            accessToken
        });
    } else {
        res.status(404);
        throw new Error("username o password erratta");
    }
});

module.exports = { login }