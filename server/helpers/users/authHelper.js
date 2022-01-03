const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  const { JWT_SECRET } = process.env;
  const payload = { sub: user._id };
  const expireTime = { expiresIn: "2h" };

  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, expireTime, (err, asyncToken) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(asyncToken);
    });
  });
};
