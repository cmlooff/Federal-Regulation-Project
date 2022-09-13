const jwt = require('jsonwebtoken');
const config = require('config'); // Need config for our jwtSecret

module.exports = function (req, res, next) {
  /** Token from Header
   * We want to send our token to the header named x-auth-token.
   * ? This is like setting Content-Type: application/json
   *
   * !Then check if there is a token or not
   *
   * Else we verify our token sent in the header
   * -> Use jwt.verify(token | )
   */
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  /** Verify Token
   * Setting the request object with the decoded user
   * In users.js we set the payload with the user wit han addition of the id being user.id
   * Now we're setting that to request.user
   *
   * Our error middleware in this case is express.validator that is occurring in the users.js file
   *
   * * req.user is now our specific user with the specific jwt
   */
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
