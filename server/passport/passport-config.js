const UsersModel = require("../models/users/UsersModel");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { JWT_SECRET } = process.env;

//options
let opts = {
  jwtFromRequest: (req) => req.cookies["jwt"],
  secretOrKey: JWT_SECRET,
};

//verifty
const verify = async (jwtPayload, done) => {
  return UsersModel.findById(jwtPayload.sub)
    .then((user) => done(null, user))
    .catch((err) => done(err));
};

//JWT authentication strategy
function initialize(passport) {
  passport.use(new JwtStrategy(opts, verify));
}

module.exports = initialize;
