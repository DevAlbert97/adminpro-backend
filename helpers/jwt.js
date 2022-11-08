const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
    return new Promise((res, rej)=> {
        const payload = {
            uid
        };

        jwt.sign(payload,process.env.JWT_KEY, {
            expiresIn: '12h'
        }, (err, token)=> {
            if (err) {
                console.log(err);
            } else {
                res(token);
            }
        });
    });
}

module.exports = {
    generateJWT
}