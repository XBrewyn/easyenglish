const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const { HTTP_STATUS_CODES } = require('../../tools/constants');
const { send } = require('../../tools/functions');

module.exports = (req, res, next) => {
  const { TOKEN_NAME = '' } = process.env;
  const cookies = cookie.parse(req.headers.cookie || '');
  const originalUrl = req.originalUrl;
  const avoidEndpoints = ['auth', 'register'];
  const canAvoidEndpoint = avoidEndpoints.some((endpoint) => originalUrl === `/api/v1/${endpoint}`);
  let token = cookies[TOKEN_NAME] && cookies[TOKEN_NAME].replace(/"/g, '');

  if (
    canAvoidEndpoint ||
    !originalUrl.includes('api')
  ) {
    return next();
  }

  if (!token) {
    return send({
      res,
      status: HTTP_STATUS_CODES.UNAUTHORIZED,
      message: 'Access denied. No token provided.',
    });
  }

  try {
    req.auth = jwt.verify(token, process.env.ACCESS_KEY_TOKEN);

    next();
  } catch (e) {
    send({
      res,
      status: HTTP_STATUS_CODES.NOT_FOUND,
      message: 'Invalid token.',
    });
  }
};