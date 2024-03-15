const auth = require('../api/auth');
const registration = require('../api/registration');

module.exports = [
  {
    path: '/auth',
    method: 'post',
    func: auth,
  },
  {
    path: '/register',
    method: 'post',
    func: registration,
  },
];
