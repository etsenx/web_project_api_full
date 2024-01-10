const jwt = require('jsonwebtoken');

// handle Authentication Error function
const handleAuthError = (res) => {
  res.status(403).send({ message: 'Kesalahan Otorisasi' });
};

// extract bearer from token function
const extractBearerToken = (header) => header.replace('Bearer ', '');

// create authentication module
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  // Get authentication value (token) from request headers;
  const { authorization } = req.headers;

  // check if no authorization value or authorization value doesnt start with bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  // extract "bearer" text from value
  const token = extractBearerToken(authorization);
  let payload;

  // check if token is verified
  try {
    payload = jwt.verify(token, 'secretsecret');
  } catch (err) {
    return handleAuthError(res);
  }

  // set payload to request object
  req.user = payload;

  next();
};
