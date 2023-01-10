const jwt = require('jsonwebtoken');
const fs = require('fs');
const moment = require('moment')
const fnErr = require('../controllers/fnErr');
const custErr = require('../controllers/custErr');
const PUB_KEY = fs.readFileSync('./key/id_rsa_pub.pem', 'utf8');
const PRIV_KEY = fs.readFileSync('./key/id_rsa_priv.pem', 'utf8');

exports.authanticate = fnErr(async (req, res, next) => {
    let reqheader = JSON.stringify(req.headers)
    let header = JSON.parse(reqheader)
    console.log('Header: ', header.authorization);
    if(!req.headers.authorization || req.headers.authorization === undefined){
        await  next(new custErr('Token Error.', 404));
    };
    const authToken = await jwt.verify(req.headers.authorization, PUB_KEY, { algorithms: ['RS256'] });
        req.user = await authToken;
        await next();
  });

exports.createToken = async (data) => {
    const token = await jwt.sign(data, PRIV_KEY, {
          algorithm: 'RS256',
          expiresIn: '1d',
        });
        return token;
  };

exports.refreshToken = async (data) => {
  const token = await jwt.sign(data, PRIV_KEY, {
        algorithm: 'RS256',
        expiresIn: '31d',
      });
      return token;
};
